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
BUCKET_ARN="arn:aws:s3:::$BUCKET/*"
echo "Checking to see if ${BUCKET} exists"

aws s3api head-bucket --bucket "$BUCKET"
if [ $? -eq 0 ]; then
  echo "Bucket exists"
else
  echo "Bucket does not exist"
  echo "Creating ${BUCKET}"
  echo "$(aws s3 mb s3://"$BUCKET" --region us-west-2)"
  echo "$(aws s3 website s3://"$BUCKET" --index-document index.html)"
fi

echo "Checking to see if ${BUCKET} has a policy"
aws s3api get-bucket-policy-status --bucket "$BUCKET"
if [ $? -eq 0 ]; then
  echo "Bucket has a policy"
else
  echo "Bucket policy not found, adding bucket policy"
  touch policy.json
  echo '{"Version": "2012-10-17","Statement": [{"Sid": "PublicReadGetObject","Effect": "Allow","Principal": "*","Action": "s3:GetObject","Resource": "'"${BUCKET_ARN}"'"}]}' > policy.json
  echo "$(aws s3api put-bucket-policy --bucket "$BUCKET" --policy file://policy.json)"
fi
