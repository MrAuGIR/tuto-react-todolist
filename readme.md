
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
creation a le rcine du projet de webpack.config.js
