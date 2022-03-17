var testingdb = document.getElementById('testingdb')

/*
const { remote } = require('electron')
const main = remote.require('../main')

main.hello()

*/
console.log("Hello World")
testingdb.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Hello World from buttom")
})

