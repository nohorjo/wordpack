#!/bin/bash

echo \{\"date\":\"$(date +%Y/%m/%d)\",\"languages\":[$(ls | grep '[^(words)]\.json' | sed 's/\.json//g' | sed 's/.*/\\"&\\",/g' | xargs echo | sed 's/,$//g')]\} > words.json