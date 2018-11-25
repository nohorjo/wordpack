#!/bin/bash

FILE=_${1}.txt

rm ${FILE} 2> /dev/null

while read w; do
    WORD=$(./translate.sh ${1} ${w})
    echo ${WORD}
    echo ${WORD} >> ${FILE}
done <_all.txt