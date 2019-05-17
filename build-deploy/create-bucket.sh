#!/bin/bash

#
# To call this script:
#    ./create-bucket.sh fogg-108 fogg-108 dev --profile spacejam-dev
# 

set -o pipefail
set -o xtrace

. ./stack-functions.sh

if [[ "$#" -lt 2 ]]; then
    echo "Requires environment name as a parameter"
    exit 1
fi

ENVIRONMENT=$1
BUCKET=$2
STAGE=$3
shift
shift
shift

ARGS=$@

REGION=us-west-2
LAMBDA_ARN=$(aws cloudformation $ARGS describe-stacks --stack-name infrastructure-service-$STAGE | jq -c -r '.Stacks[0].Outputs[] | select(.OutputKey | contains("SaveS3LogToElasticSearchLambdaFunctionQualifiedArn")) | .OutputValue' | sed "s/:[0-9]*$//" )
ROLE=infrastructure-service-$STAGE-$REGION-lambdaRole
PARAMETERS="ParameterKey=Environment,ParameterValue=$STAGE ParameterKey=Name,ParameterValue=$BUCKET ParameterKey=Role,ParameterValue=$ROLE ParameterKey=LambdaARN,ParameterValue=$LAMBDA_ARN"

create_update_stack "Fogg-${BUCKET}" "./resources.yaml" \
  "--capabilities CAPABILITY_IAM --parameters ${PARAMETERS} --tags Key=owner,Value=Fogg" || exit 1


LAMBDA=infrastructure-service-$STAGE-saveS3LogToElasticSearch
# This permission could conceivably be set on the lambda itself, but
# there does not appear to be a way to add this type of permission through
# the serverless.yml.

aws $ARGS lambda get-policy --function-name infrastructure-service-dev-saveS3LogToElasticSearch 2>&1
POLICY_EXISTS=$?

if [[ "$POLICY_EXISTS" -eq 0 ]]; then
  aws lambda remove-permission --function-name $LAMBDA --statement-id fogg-logs-$BUCKET-$STAGE $ARGS
fi

aws lambda add-permission --function-name $LAMBDA --statement-id fogg-logs-$BUCKET-$STAGE --action "lambda:InvokeFunction" --principal s3.amazonaws.com --source-arn "arn:aws:s3:::$BUCKET-logs" $ARGS  || exit 1

# Cloudformation should allow you to connect S3 buckets to lambdas, but people have seen
# issues in the past where there are race conditions doing this:
# https://medium.com/@owentar/how-to-setup-s3-bucket-lambda-notifications-in-cloudformation-without-errors-f7250a6a9460
# 
# Also note that the structure of the JSON for put-bucket-notifiaction is similar to the 
# equivalant cloudformation, but the keys and arity of the properties are all different.
aws s3api put-bucket-notification-configuration --bucket $BUCKET-logs --notification-configuration '{"LambdaFunctionConfigurations":[{"LambdaFunctionArn":"'$LAMBDA_ARN'","Events":["s3:ObjectCreated:*"]}]}' $ARGS || exit 1
