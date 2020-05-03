
let SERVER_URL = "http://localhost:3000"
if (process.env.NODE_ENV !== "development") {
  SERVER_URL = "https://compost-share-backend.herokuapp.com"
}
module.exports = {
  SERVER_URL: SERVER_URL
}

