/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
*/

module.exports = async function oldestPackageName() {
  const fetch = require('node-fetch');
  const body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  }
  
    const response = await fetch("http://ambush-api.inyourarea.co.uk/ambush/intercept", {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 
      "Content-Type": "application/json" 
    }
  })

  const data = await response.json();
  const arrDates = [];
  let name = '';

  for (let i=0; i <data.content.length; i++) {
    arrDates.push(data.content[i].package.date);
  }

  arrDates.sort();
  
  for (let i=0; i <data.content.length; i++) {
    if (data.content[i].package.date === arrDates[0]) {
      name = (data.content[i].package.name);
    }
  }

  return name;
}