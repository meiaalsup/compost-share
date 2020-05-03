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

    /**Add Location to database **/
    app.post('/addlocation', (req, res) => {
      usersCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })

    /**Delete Location to database **/
    app.post('/deletelocation', (req, res) => {
      let address_filters = [];
      for (const [key, value] of Object.entries(req.body.address)) {
        let query = {};
        let key2 = "address.".concat(key);
        query[key2] = value;
        address_filters.push(query);
      }
      let filters = { $and: address_filters};
      usersCollection.deleteMany(filters)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })

    /**Update Location to database **/
    app.post('/updatelocation', (req, res) => {
      let address_filters = [];
      for (const [key, value] of Object.entries(req.body.address)) {
        let query = {};
        let key2 = "address.".concat(key);
        query[key2] = value;
        address_filters.push(query);
      }
      let filters = { $and: address_filters};
      let update_fields = { $set : req.body.availability};
      usersCollection.updateMany(filters, update_fields)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })

    /** Search, pass in location,filters, etc, return results from database**/
    app.post('/search', (req, res) => {
      let availability_filters = [];
      for (const [key, value] of Object.entries(req.body.availability)) {
        if (value) {
          let key2 = "availability.".concat(key);
          let query = {};
          query[key2] = value;
          availability_filters.push(query);
        }
      }  
     let filters = { $and: [{"address.state" : {$eq: req.body.address.state} }, {$or: availability_filters}]};
     usersCollection.find(filters).toArray()
        .then(result => {
          console.log('search results:' + result)
          res.send(result)
        })
        .catch(error => console.log(error))
    })

    /** Get all locations **/
    app.get('/getAll', (req, res) => {
      usersCollection.find().toArray()   
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log(error))
    })
    
  })
  .catch(error => console.error(error))


app.get('/', (req, res) => res.send("hi"))
app.listen(port, () => console.log(`Compost-Share Server listening at http://localhost:${port}`))

