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
***************************

Production deployment guide
0. config the production.env and url definition in const.js
1. npm run build:production
2. copy WEB-INF to build folder
3. deploy build folder to production


****************************
