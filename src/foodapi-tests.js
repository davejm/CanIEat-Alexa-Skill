// Example usage of the foodapi

var foodapi = require('./foodapi.js');

foodapi.makeSession(() => {

  foodapi.search('peanuts', (upc) => {

    foodapi.getAllergens(upc, (allergens) => {

      console.log(allergens)

    })

  })

})
