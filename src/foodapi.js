require('dotenv').config()
const request = require('request')

var sessionID = null
const apiKey = process.env.LABEL_API_KEY
const userID = 'XXXXX'
const devID = 'XXXXX'
const appID = 'aller'
const numResults = 20
const autoSelect = true

// create a new session
exports.makeSession = (cb) => {
  console.log('making session')

  request('http://api.foodessentials.com/createsession?uid=' + userID + '&devid=' + devID + '&appid=' + appID + '&f=json&v=2.00&api_key=' + apiKey,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const json = JSON.parse(body)
      console.log(json) // Show the HTML for the Google homepage.
      sessionID = json.session_id
      console.log('session made: ' + sessionID)

      cb()
    }
  })
}

exports.search = (searchTerm, cb) => {
  request('http://api.foodessentials.com/searchprods?q=' + searchTerm + '&sid=' + sessionID + '&n=' + numResults + '&s=1&f=json&v=2.00&api_key=' + apiKey, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const json = JSON.parse(body)
        console.log(json)
        if (autoSelect) {
          const mostRelevantUPC = getMostRelevant(json.productsArray, searchTerm)
          console.log(`Most relevant UPC = ${mostRelevantUPC}`)

          cb(mostRelevantUPC)
        }
      }
    })
}

function getMostRelevant(results, searchTerm) {
  var minDist = 9999999
  var mostRelevantItem
  var stringDist
  results.forEach((result) => {
    stringDist = levenshtein(result.product_name, searchTerm)
    if (stringDist < minDist) {
      mostRelevantItem = result.upc
      minDist = stringDist
    }
  })
  return mostRelevantItem
}

exports.getAllergens = (upc, cb) => {
  request('http://api.foodessentials.com/label?u=' + upc + '&sid=' +
    sessionID + '&appid=' + appID + '&f=json&api_key=' + apiKey,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const json = JSON.parse(body)
      console.log(json)

      cb(json.allergens)
    }
  })
}

// Function to compute string distance (used for search relevance)
const levenshtein = (a, b) => {
  if (!a || !b) return (a || b).length
  var m = []
  for (var i = 0; i <= b.length; i++) {
    m[i] = [i]
    if (i === 0) continue
    for (var j = 0; j <= a.length; j++) {
      m[0][j] = j
      if (j === 0) continue
      m[i][j] = b.charAt(i - 1) == a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] +
        1, m[i][j - 1] + 1, m[i - 1][j] + 1)
    }
  }
  return m[b.length][a.length]
}
