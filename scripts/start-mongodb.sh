#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p mongodb-data

# Start MongoDB with local data directory
mongod --dbpath mongodb-data --port 27017 