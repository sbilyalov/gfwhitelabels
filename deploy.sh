#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET="growthfountain-$CIRCLE_BRANCH"
DIR=dist
aws  s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE"  --recursive
DIR=app/dist
aws  s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE"  --recursive
