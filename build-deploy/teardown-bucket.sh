#!/bin/bash

set -o pipefail

if [ "$#" -lt 1 ]; then
    echo "Requires environment name as a parameter"
    exit 1
fi

ENVIRONMENT=$1
shift

ARGS=$@

BUCKET="capella-dashboard-components-${ENVIRONMENT}"

echo "Tearing down ${BUCKET}"

echo $(aws s3 rm "s3://${BUCKET}" --recursive)
echo $(aws s3api delete-bucket --bucket "${BUCKET}" --region us-west-2)
