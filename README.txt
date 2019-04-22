HOW TO BUILD AN EXPRESS APP
STEP 1
    - install npm and verify working with console commands 
        - npm -v 
        - node --version
    - create folder for your project
    - in command line navigate to folder and init npm with  
        - npm init
    - a package.json file will be created 
    - install useful libraries with 
        - npm install jquery
        - npm install nodemon
        - npm install express
        - npm install bootstrap
        - npm install vash
    - boom! we have our packages
    - a quick note on the packages
        - jquery is your "DOM query language" package
        - nodemon is your node runner that restarts your server on saves... super convenient
        - express is your web framework. it does the heavy lifting
        - bootstrap is your css package and it makes things pretty
        - vash is a templating engine similar to razor
STEP 2
    - create a file in this directory and name it app.js
    - go into package.json and change index.js to app.js    
        - we're setting the default file for node to execute
    - in your app.js do the following