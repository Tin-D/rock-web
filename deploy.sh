#!/usr/bin/env bash

pubdir=/var/www/rock

git checkout master
git pull
yarn run build
rm -rf ${pubdir}/*
cp -ar ./dist/* ${pubdir}/
rm -rf ${pubdir}/js/*.map
rm -rf ${pubdir}/report.html
chown -R www-data:www-data ${pubdir}
