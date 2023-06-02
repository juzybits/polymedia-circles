#!/usr/bin/env bash

shopt -s expand_aliases
source ~/.bash_aliases
source ~/.bash_functions

echo "1) ----- Starting | $(sc active-env) | $(sc active-address)"

echo "2) ----- Sending 10 faucets to active-address"
loop 10 'zuifaucet $(sc active-address)'

echo "3) ----- Merging all gas coins"
sc pay-all-sui --gas-budget 1000000000 --recipient $(sc active-address) --input-coins $(sc gas | tail -n +3 | awk '{print $1}' | tr '\n' ' ')

echo "4) ----- Splitting gas coin"
sc pay-sui --gas-budget 1000000000 --recipients $(sc active-address) --amounts 5000000000 --input-coins $(sc gas | grep 0x | awk '{print $1}')

echo "----- Done"
