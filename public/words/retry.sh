#!/bin/bash

replace_line(){
    head -n$[ ${2} - 1 ] ${1}
    echo ${3}
    tail -n$[ $(wc -l <${1}) - ${2} ] ${1}
}

EMPTIES=$(grep -n '^$' ${1} | sed 's/:.*//g')

for n in ${EMPTIES}
do
    WORD=$(./translate.sh $(sed 's/\.txt$//g' <<< $(sed 's/^_//g' <<< ${1})) $(sed "${n}q;d" _all.txt))
    echo ${n} ${WORD}
    replace_line ${1} ${n} "${WORD}" > ${1}.new
    mv ${1}.new ${1}
done