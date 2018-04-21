#!/bin/bash

# sed 's/.*/"&"/g' ${1} | paste -d , _all.txt - > $(sed 's/_//g' <<< $(sed 's/txt//g'  <<< ${1}))csv

json() {
    echo -n [
    while read eng <&3 && read lang <&4;
    do
        echo -n \{\"word\":\"${eng}\",\"translation\":\"$(sed 's/\$/\\n/g' <<< ${lang})\"\},
    done 3<_all.txt 4<${1}
    echo -n ]
}

sed 's/,]/]/g' <<< "$(json ${1})" > $(sed 's/_//g' <<< $(sed 's/txt//g'  <<< ${1}))json