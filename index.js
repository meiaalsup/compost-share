const express = require('express')
const app = express()
const port = 3000
const cors = require('cors') // enables everyone!!!



var config = require('./config')

const MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://" + config.mongoUsername + ":" + 
                         config.mongoPassword + 
                         "@cluster0-j1n2z.mongodb.net/test?retryWrites=true&w=majority"
app.use(cors())
app.use(express.json()) // for parsing application/json

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connection to Database Successful!')
    const db = client.db('Compost-Share')
    const usersCollection = db.collection('users')
    app.post('/addlocation', (req, res) => {
      console.log('add location body')
      console.log(req.body)
      usersCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })
    /** Search, pass in location,filters, etc, return results from database**/
    app.get('/search', (req, res) => { // have to pass in params, could be post or get
      console.log(req.body)
      usersCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })
    /** Get all locations **/
    app.get('getAll', (req, res) => {
      usersCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })
    
  })
  .catch(error => console.error(error))


app.get('/', (req, res) => res.send("hi"))

app.listen(port, () => console.log(`Compost-Share Server listening at http://localhost:${port}`))

