# compost-share
Cal Earth Hacks - Compost Sharing Map
Authors: Jena Alsup, Meena Rajan, Meia Alsup

## TODO LIST
* load the markers on page load at the beginning
* remove our home addresses, and put more dummy data
* make the rest of search do something, or only include the state box
* Make repo public
    * generate new private api keys and put in a file to be git ignored
* Turn in results
    * Screenshots / Video

## Motivation Statement
* Cambridge cancelled compost

## Development Stack
* [express](https://expressjs.com/) - javascript web framework, our back end server
* [react](https://reactjs.org/) - front end framework
* [node](https://nodejs.org/en/) - javascript runtime
* [mongodb](https://www.mongodb.com/) - database option?

## Other Helpful Things
* [passportjs](http://www.passportjs.org/) - authentication, gives oauth and such
    * integrates easily with express
* Google Maps API
* [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - css styling


## Deployment
* [Netlify](https://www.netlify/) for React Front End
    * `npm run-script build`
    * `netlify deploy --dir=build --prod`

* [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
    * `git push heroku master`
    * `heroku log --tail`


## Initial Setup Instructions

### Install Node
`brew install node`

### React Front End

### Express Back End

## Features

### Upload
* Location
* Hours / Days Available
* Types of food scraps accepted
* Things to potentially add?
    * Capacity - for later
    * Price - for later
    * scheduler: 15 min blocks: Covid Only Scenario

### Search
* input address, get 5-10 closest sites
* things to potentially add
    * Filters
        * types of food scraps
        * distance
        * hours / days available


###
* Database (fill in and read from)
* Google Maps Distance API
* Front End Upload Page
* Front End Search Page
    * Google Maps component renderer
* Later: Login / users

