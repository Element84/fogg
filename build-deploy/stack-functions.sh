stack_exists () {
	SE_STACK_NAME="$1"
	SE_POST_ARGS="$2"

	aws cloudformation describe-stacks --stack-name "$SE_STACK_NAME" $ARGS $SE_POST_ARGS

	stack_check=$(aws cloudformation describe-stacks --stack-name "$SE_STACK_NAME" $ARGS $SE_POST_ARGS 2>&1)

	return $?
}

print_stack_url() {
	STACK_NAME="$1"

	STACK_ID=$(aws cloudformation list-stacks $args --max-items 10000 | jq -r -c '.StackSummaries | .[] | select(.StackName == "'$STACK_NAME'") | select(.StackStatus != "DELETE_COMPLETE") | .StackId')
	URL="https://$AWS_REGION.console.aws.amazon.com/cloudformation/home?region=$AWS_REGION#/stacks/stackinfo?stackId="$STACK_ID

	echo "YOUR STACK IS HERE! $URL"
}

print_stack_completion_log() {
	STACK_NAME="$1"

	aws cloudformation describe-stack-events $ARGS --stack-name $STACK_NAME --max-items 1000 \
		| jq '.StackEvents | .[] | select(.ResourceStatus == "CREATE_FAILED") | select(.ResourceStatusReason != "Resource creation cancelled")' \
		| jq reverse \
		| jq '{StackId,StackName,LogicalResourceId,PhysicalResourceId,ResourceType,ResourceStatusReason,ResourceProperties}'
}

create_update_stack () {
	STACK_NAME="$1"
	CF_TEMPLATE="$2"
	CF_ARGS="$3"
	POST_ARGS="$4"
	TIMEOUT="$5"

	if [[ ! -z "$TIMEOUT" ]]; then
	    TIMEOUT="--timeout-in-minutes "$TIMEOUT
	fi

	stack_exists "$STACK_NAME" "$POST_ARGS"
	stack_found=$?

	if [[ "$stack_found" -eq 0 ]]; then
		echo "Updating $STACK_NAME"

		update_output=$(aws cloudformation update-stack --stack-name "$STACK_NAME" \
			--template-body "file://${CF_TEMPLATE}" \
			${CF_ARGS} ${ARGS} ${POST_ARGS} 2>&1)

		update_result="$?"

		print_stack_url ${STACK_NAME}

		if [[ "$update_result" -eq 0 ]]; then
			aws cloudformation wait stack-update-complete --stack-name "$STACK_NAME" ${ARGS} ${POST_ARGS}

            update_result="$?"

			print_stack_completion_log ${STACK_NAME}

			return ${update_result}
		elif [[ ${update_output} == *"No updates are to be performed"* ]]; then
			echo "No updates are to be performed."
			return 0
		else
			echo "$update_output"

			print_stack_completion_log ${STACK_NAME}

			return ${update_result}
		fi


	else
		echo "Creating $STACK_NAME"

		aws cloudformation create-stack --stack-name "$STACK_NAME" \
			--template-body "file://${CF_TEMPLATE}" --on-failure DELETE ${CF_ARGS} ${ARGS} ${POST_ARGS}

		create_result="$?"

		print_stack_url ${STACK_NAME}

		if [[ "$create_result" -eq 0 ]]; then
			OUTPUT=$(aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" ${ARGS} ${POST_ARGS})

			print_stack_completion_log ${STACK_NAME}

			return $?
		else
			print_stack_completion_log ${STACK_NAME}

			return ${create_result}
		fi
	fi
}

lookupSecrets () {
	TYPE="$1"
	ENV="$2"

	TYPE=$(echo "${TYPE}" | tr '[:upper:]' '[:lower:]')
	SECRET_NAME="${TYPE}_${ENV}"

	SECRET_RESULT=$(aws secretsmanager get-secret-value --secret-id "$SECRET_NAME" $ARGS |jq -r '.SecretString')

	jq -r -c -n --arg SECRETS "${SECRET_RESULT}" '$SECRETS'
}

changelog () {
    TABLE=versions
    COMPONENT=$(git remote get-url origin | sed s/.*[/]// | sed s/[.]git//)

    VERSION_1=$(aws dynamodb get-item ${ARGS} --table-name ${TABLE} --key '{"component": {"S": "'${COMPONENT}'"}}' | jq -rc .Item.version.S)
    VERSION_2=${BRANCH_NAME}

    if [[ -z "$VERSION_1" ]]; then
        echo "Release notes not found ($VERSION_1, $VERSION_2)"
    else
        LOG=$(git log origin/${VERSION_1}...origin/${VERSION_2} --pretty=format:"%h %s" | \
          grep '\(FD\|JAM\)-' | \
          tr '[:lower:]' '[:upper:]' | \
          sed -E 's/.*((JAM|FD)-([0-9]{0,})).*/\1/g' |\
          sort | \
          uniq)

        SELECTED=$(echo ${LOG} | sed 's/ .*//g')
        CSV=$(echo ${LOG} | tr ' ' '%2C')
        echo "Click here for release notes: https://element84.atlassian.net/issues/${SELECTED}?jql=id%20IN%20($CSV)"
    fi

    aws dynamodb put-item ${ARGS} \
        --table-name versions     \
        --item '{"version": {"S": "'${VERSION_2}'"}, "component": {"S": "'${COMPONENT}'"}}'
}


addCloudformationParameter () {
	PARAMS=$1
	NEXT_PARAM_NAME=$2
	NEXT_PARAM_VALUE=$3

	PARAMS=$(echo "${PARAMS}" \
		|jq -c --arg KEY "$NEXT_PARAM_NAME" --arg VALUE "$NEXT_PARAM_VALUE" \
		'.[. | length] |= . + {"ParameterKey":$KEY, "ParameterValue":$VALUE}')

	jq -r -c '.' <<< "${PARAMS}"
}

secretToCloudformationParameter () {
	PARAMS=$1
	SECRET_JSON=$2
	PARAM_NAME=$3

	VALUE=$(jq -r -c --arg FIELD "$PARAM_NAME" '.[$FIELD]' <<< "${SECRET_JSON}")

	addCloudformationParameter "$PARAMS" "$PARAM_NAME" "$VALUE"
}

delete_stack () {
    STACK_NAME="$1"

    echo "Tearing down ${STACK_NAME}"

    stack_exists "$STACK_NAME" ""
    stack_found=$?

    if [ "$stack_found" -eq 0 ]; then

        aws cloudformation delete-stack --stack-name "$STACK_NAME" $ARGS
        delete_result="$?"

        if [ "$delete_result" -eq 0 ]; then
            aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" $ARGS
            return $?
        else
            return $delete_result
        fi
    else
        echo "Stack not found"
    fi
}

