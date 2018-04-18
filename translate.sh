#!/bin/bash

curl -s https://dictionary.cambridge.org/dictionary/english-${1}/${2} | cat |\
    pup 'span.trans:first-of-type' text{} |\
    head -n3 | tail -n1 | sed 's/^ *//g' | tr ',' '\n' | tr '/' '\n' | head -n1