Dev deployment guide
0. config the dev.env and url definition in const.js
1. npm install
2. npm run start:dev

******************
Trong truong fail to build:
1. remove package-lock.json
2. delete node-modules folder
3. npm install
4. npm run start:dev
**********************************
Deployment on dev server
0. config the production.env and url definition, routeBase in const.js
"homepage":"http://192.168.1.127:2999/marketplace",
1. npm run build:production
2. copy WEB-INF to build folder
3. deploy build folder to production on webapps folder

************************************
Production deployment guide
0. config the production.env and url definition, routeBase in const.js
change homepage in package.json
"homepage": "http://salesplus.asia",
1. npm run build:production
2. copy WEB-INF to build folder
3. deploy build folder to production


****************************
