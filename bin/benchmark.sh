#!/bin/bash

echo "===== Preparing to benchmark with Apache Bench ===="
echo "See http://httpd.apache.org/docs/2.2/programs/ab.html"
echo 

numRequests=9999
numUsers=100
address=http://127.0.0.1:8080/

read -p "Enter number of requests (default: $numRequests): " temp
numRequests=${temp:-$numRequests}
read -p "Enter number of users (default: $numUsers): " temp
numUsers=${temp:-$numUsers}
read -p "Enter server address (default: $address): " temp
address=${temp:-$address}
echo


command="ab -n $numRequests -c $numUsers -k -r $address"
echo "Apache Bench command:"
echo "  $command"
echo
echo "To view the Administrator Web UI Console, in your web browser go to ${address}admin"
echo
read -p "Press [Enter] key to continue and start benchmarking."
echo
echo "**********"
echo
$command

