// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

function createCounter(start = 0, delay = 1000) {
    let count = start

    function increment() {
        count += 1
        console.log(`counter: ${count}`)
        setTimeout(increment, delay)
    }

    increment()
}

createCounter(0, 1000)


