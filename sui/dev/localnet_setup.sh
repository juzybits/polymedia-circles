#!/usr/bin/env bash

set -ueo pipefail

shopt -s expand_aliases
source ~/.bash_aliases
source ~/.bash_functions

clear

echo -e "1) ----- Starting | $(sc active-env) | $(sc active-address) -----"

echo -e "\n2) ----- Sending SUI to active-address and dev browser wallet -----\n"
zuifaucet $(sc active-address) | cut -c 1-63
zuifaucet 0x5d8133281aa26ad73542c0b53014c6831c37b9d98e7603fd0db2e1cc4453934a | cut -c 1-63

echo -e "\n3) ----- Publishing package -----\n"
sui client publish --gas-budget 700700700 | grep -v Display | grep -A1 "objectType.*::collection::Collection"

echo -e "\n4) ----- Opening Move.toml and circlesClient.ts -----\n"
code ./Move.toml ../web/src/app/lib/circlesClient.ts

# echo "3) ----- Merging all gas coins"
# sc pay-all-sui --gas-budget 1000000000 --recipient $(sc active-address) --input-coins $(sc gas | tail -n +3 | awk '{print $1}' | tr '\n' ' ')

# echo "4) ----- Splitting gas coin"
# sc pay-sui --gas-budget 1000000000 --recipients $(sc active-address) --amounts 5000000000 --input-coins $(sc gas | grep 0x | awk '{print $1}')

echo "5) ----- Done"
