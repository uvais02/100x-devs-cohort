const express = require("express")

const app = express()
app.use(express.json())

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
        'Name' : users[n].name,
        'Total Kidneys'  : users[n].kidneys.length,
        'Healthy kidneys': healthyKidneys.length
    });
})

app.post("/", (req, res) => {
    const name = req.body.name

    if (users.some(user => user.name == name))
        return res.status(400).send("User already exists!")

    users.push(req.body)
    res.status(200).send({msg: "done!"})
})

app.put("/", (req, res) => {

})

app.delete("/", (req, res) => {
    const n = parseInt(req.query.n)

    if (isNaN(n) || n < 0 || n >= users.length) 
        return res.status(400).send("Invalid user index");

    if (!users[n].kidneys.find(kidney => kidney.healthy == false))
        return res.status(400).send("No unhealthy kidneys found!")

    users[n].kidneys = users[n].kidneys.filter(kidney => kidney.healthy)

    res.status(200).send("Removed unhealthy kidneys!")
})

const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})