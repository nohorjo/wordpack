#!/bin/bash

# requires pup and jq
# go get github.com/ericchiang/pup
# https://stedolan.github.io/jq/

html=`curl -s https://dictionary.cambridge.org/dictionary/english-${1}/$(tr -dc '[[:print:]]' <<< "${2}" | tr '[[:upper:]]' '[[:lower:]]')`
selected=`echo ${html} | pup 'span.trans' json{}`
limited=`echo ${selected} | jq '.[] | .text' | head -n5 | sed 's/"//g' | xargs echo`
echo ${limited} | sed 's/ /, /g'