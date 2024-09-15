// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs')

function writeFile(filepath, data) {
    fs.writeFile(filepath, data, 'utf-8',(err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('written to the file successfully!')
    })
}

const data = 'Hello, Everyone!'

writeFile('file1.txt', data)