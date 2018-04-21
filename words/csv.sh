#!/bin/bash

sed 's/.*/"&"/g' ${1} | paste -d , _all.txt - > $(sed 's/_//g' <<< $(sed 's/txt//g'  <<< ${1}))csv