# rides-code-challenge
![Image of Yaktocat](./challenge_instructions.png)
![Image of Yaktocat](./challenge_instructions2.png)

# System requirements

1. this was developed and tested with 
```
mongodb-win32-x86_64-windows-5.0.2
node v12.22.0
npm 6.12.0
```
2. you will need node and mongodb installed on your local machine running on port 27017
3. you won't need any sql database installed on your machine - it uses an embeded sqlite instance

# Instructions
1. git clone de project
2. cd to project folder and run the commands below
```
npm install
npm start
```
3. you should see this log in your console
```
$ npm start

> rides-code-challenge@1.0.0 start C:\Users\LEONARDOMARANHAOFARI\rides-code-challenge
> shx rm -rf ./build && tsc && shx cp ./src/db/rides.db ./build/db && node ./build/app.js

mongodb://127.0.0.1:27017/
app running on http://localhost:3000

```
4. open [http://localhost:3000/rides](http://localhost:3000/rides) in your browser