#!/bin/bash

echo [$(ls | grep '[^(words)]\.json' | sed 's/\.json//g' | sed 's/.*/\\"&\\",/g' | xargs echo | sed 's/,$//g')] > words.json