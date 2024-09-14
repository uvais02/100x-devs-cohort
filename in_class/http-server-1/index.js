const express = require("express")

const app = express()

var users = [{
    name: 'John',
    kidneys: [
        {
            healthy: false
        },
        {
            healthy: true
        }
    ]
}]

app.get("/", (req, res) => {
    const n = parseInt(req.query.n)

    if (isNaN(n) || n < 0 || n >= users.length) {
        return res.status(400).send("Invalid user index");
    }
    
    let healthyKidneys = users[n].kidneys.filter(kidney => kidney.healthy)
    res.status(200).send({
        'Total Kidneys'  : users[n].kidneys.length,
        'Healthy kidneys': healthyKidneys.length
    });
})

app.post("/", (req, res) => {

})

app.put("/", (req, res) => {

})

app.delete("/", (req, res) => {

})

const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})