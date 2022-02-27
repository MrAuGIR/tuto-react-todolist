
`` npm init -y ``

`` npm i -D webpack webpack-dev-server cross-env typescript ts-loader ``

package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=developpement webpack-dev-server --hot",
    "build": "cross-env NODE_ENV=production webpack"
  },
```
creation a le racine du projet de webpack.config.js

creation du fichier tsconfig.json

mise en place de react
`` npm i react react-dom ``
ajouter les types  (typescript react ?)
`` npm i -D @types/react @types/react-dom ``

loader
`` npm install tslint tslint-loader tslint-config-standard ``
creation du fichier tslint.json a la racine
