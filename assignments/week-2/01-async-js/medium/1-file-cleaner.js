// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs')

function cleanFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        data = data.replace(/\s+/g, ' ').trim()

        // console.log(data)

        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) {
                console.log(err)
                return
            }

            console.log('cleanup done successfully!')
        })
    })
}

cleanFile('file.txt')