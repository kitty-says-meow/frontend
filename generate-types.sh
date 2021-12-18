#!/bin/bash

OUTPUT="./src/backend.d.ts"
source .env

dtsgen --out "$OUTPUT" --url "https://ict-hackathon.ga/api/schema/"
prettier --write "$OUTPUT"
