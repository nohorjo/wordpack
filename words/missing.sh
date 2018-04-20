#!/bin/bash

EMPTIES=$(grep -n '^$' ${1} | sed 's/:.*//g')

for n in ${EMPTIES}
do
    sed "${n}q;d" _all.txt
done