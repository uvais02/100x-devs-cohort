// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM) 


function clock() {
    const date = new Date()

    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    setInterval(() => {
        let time = h >= 12 ? 'PM' : 'AM';
        let hourFormatted = h < 10 ? '0' + h : h
        let minuteFormatted = m < 10 ? '0' + m : m
        let secondFormatted = s < 10 ? '0' + s : s

        console.log(`${hourFormatted}:${minuteFormatted}:${secondFormatted} ${time}`)
        incrementS()
    }, 1000)

    function incrementS() {
        if (s == 59) {
            s = 0
            incrementM()
        } else {
            s += 1
        }
    }

    function incrementM() {
        if (m == 59) {
            m = 0
            incrementH()
        } else {
            m += 1
        }
    }

    function incrementH() {
        if (h == 23)
            h = 0
        else
            h += 1
    }
}

clock()