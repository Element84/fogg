stack_exists () {
	SE_STACK_NAME="$1"
	SE_POST_ARGS="$2"

	stack_check=$(aws cloudformation describe-stacks --stack-name "$SE_STACK_NAME" $ARGS $SE_POST_ARGS 2>&1)

	return $?
}

create_update_stack () {
	STACK_NAME="$1"
	CF_TEMPLATE="$2"
	CF_ARGS="$3"
	POST_ARGS="$4"

	stack_exists "$STACK_NAME" "$POST_ARGS" 
	stack_found=$?

	if [ "$stack_found" -eq 0 ]; then
		echo "Updating $STACK_NAME"

		update_output=$(aws cloudformation update-stack --stack-name "$STACK_NAME" \
			--template-body "file://${CF_TEMPLATE}" \
			$CF_ARGS $ARGS $POST_ARGS 2>&1)

		update_result="$?"
		
		if [ "$update_result" -eq 0 ]; then
			aws cloudformation wait stack-update-complete --stack-name "$STACK_NAME" $ARGS $POST_ARGS

			return $?
		elif [[ $update_output == *"No updates are to be performed"* ]]; then
			echo "No updates are to be performed."
			return 0
		else
			echo "$update_output"
			return $update_result
		fi


	else
		echo "Creating $STACK_NAME"

		aws cloudformation create-stack --stack-name "$STACK_NAME" \
			--template-body "file://${CF_TEMPLATE}" $CF_ARGS $ARGS $POST_ARGS

		create_result="$?"
		
		if [ "$create_result" -eq 0 ]; then
			aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" $ARGS $POST_ARGS
			return $?
		else
			return $create_result
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
