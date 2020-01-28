#!/bin/bash 

JSDIFF=$(git diff --name-only --diff-filter=d $(git merge-base HEAD origin/master) | grep -E "\.(jsx?|graphql)$" | grep -v "eslintrc")
CSSDIFF=$(git diff --name-only --diff-filter=d $(git merge-base HEAD origin/master) | grep -E "\.(s?css)$"| grep -v "eslintrc")
echo "Runiing.."

if [ -n "$JSDIFF" ]
then
  echo "Running eslint"
  npx eslint $JSDIFF
else
  echo "Running eslint"
  npx eslint ./src
fi

if [ -n "$CSSDIFF" ]
then
  echo "Running stylelint"
   npx stylelint $CSSDIFF
else
  echo "Running stylelint"
  npx stylelint ./src
fi
