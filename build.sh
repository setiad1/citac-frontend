#!/bin/bash

npm run build
scp -r -P 61212 dist/* doidev@siroleg.xyz:/var/www/html/proxy.siroleg/
