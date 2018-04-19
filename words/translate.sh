#!/bin/bash

# requires pup
# go get github.com/ericchiang/pup

html=`curl -s https://dictionary.cambridge.org/dictionary/english-${1}/$(tr -dc '[[:print:]]' <<< "${2}")`
selected=`echo ${html} | pup 'span.trans:first-of-type' text{}` 
echo ${selected} | head -n3 | tail -n1 | LC_ALL=C sed 's/^ *//g' | tr ',' '\n' | tr '/' '\n' | head -n1
