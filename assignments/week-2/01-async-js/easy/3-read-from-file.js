// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 


const fs = require('fs')

function expensiveOperation(n) {
    for (let i=0; i<n; i++)
        console.log(i)
}

function readFile(filePath, n) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        console.log(data)
    }) 

    expensiveOperation(n)
}

// alter the second parameter
readFile('file.txt', 10000)
