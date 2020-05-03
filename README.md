# compost-share
Cal Earth Hacks - Compost Sharing Map 


Authors: Jena Alsup, Meena Rajan, Meia Alsup

## Motivation Statement
Due to coronavirus budget cuts, New York City will be suspending curbside composting beginning on May 4, 2020 and ending in June 2021. Residents will no longer be able to discard food scraps and yard waste as compost and compostable items must be collected as garbage. Compost Share connects those with backyard or personal compost bins with those who want to continue to compost the waste from their homes.

## Development Stack
* [node](https://nodejs.org/en/) - javascript runtime
* [express](https://expressjs.com/) - javascript web framework, our back end server
* [react](https://reactjs.org/) - front end framework
* [mongodb](https://www.mongodb.com/) - database option

## Other Helpful Things / APIs leveraged
* Google Maps API
    * Maps Javascript API
    * Geocode
* [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - css styling
* [passportjs](http://www.passportjs.org/) - authentication, gives oauth and such
    * integrates easily with express

## Deployment
* [Netlify](https://www.netlify/) for React Front End
    * `npm run-script build`
    * `netlify deploy --dir=build --prod`

* [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true) for Express Back-End
    * `git push heroku master`
    * `heroku log --tail`


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
* Filters
    * types of food scraps
    * distance
    * hours / days available
* things to potentially add
    * input address, get 5-10 closest sites

