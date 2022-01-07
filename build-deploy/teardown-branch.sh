#!/bin/bash

set -o pipefail

if [ "$#" -lt 1 ]; then
    echo "Requires environment name as a parameter"
    exit 1
fi

BUCKET=$1
shift

ARGS=$@

BUCKET="fogg-${BUCKET}"

echo "Tearing down ${BUCKET}"

echo $(aws s3 rm "s3://${BUCKET}" --recursive $ARGS)
echo $(aws s3 rm "s3://${BUCKET}-logs" --recursive $ARGS)
echo $(aws s3api delete-bucket --bucket "${BUCKET}" --region us-west-2 $ARGS)
echo $(aws s3api delete-bucket --bucket "${BUCKET}-logs" --region us-west-2 $ARGS)

STACK_NAME=Fogg-${BUCKET}
echo $(aws cloudformation delete-stack --stack-name $STACK_NAME)