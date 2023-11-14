#!/usr/bin/env bash

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SDK_PATH='src/app/lib/sui-client-sdk'

# Generate the TS SDK
sui-client-gen \
 --clean \
 --manifest "$SCRIPT_PATH/gen.toml" \
 --out "$SCRIPT_PATH/../$SDK_PATH/"

# Check if sui-client-gen command was successful
if [ $? -ne 0 ]; then
    echo "'sui-client-gen' command failed. Exiting."
    exit 1
fi

# Prettify the TS SDK
cd "$SCRIPT_PATH/../"
npx prettier \
--write \
"$SDK_PATH/**/*.ts"
