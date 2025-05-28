#!/bin/bash
cd /home/kavia/workspace/code-generation/eventsphere-22189-b98b1e70/eventsphere
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

