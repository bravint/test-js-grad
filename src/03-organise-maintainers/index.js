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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
*/

module.exports = async function organiseMaintainers() {
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
  const arrResults = [];
  const arrNames = [];

  for (let i=0; i <data.content.length; i++) {
    for (let j=0; j <data.content[i].package.maintainers.length; j++) {
      if (!arrNames.includes(data.content[i].package.maintainers[j].username)) {
        arrNames.push(data.content[i].package.maintainers[j].username);
      }
    }
  }

  arrNames.sort();

  for (let i = 0; i <arrNames.length; i++) {
    let obj = {"username": arrNames[i], 'packageNames': []};
    arrResults.push(obj);
  }

  for (let i = 0; i < arrResults.length; i++) {
    for (let j = 0; j < data.content.length; j++) {
      for (let k = 0; k < data.content[j].package.maintainers.length; k++) {
        if (arrResults[i].username == data.content[j].package.maintainers[k].username) {
          (arrResults[i].packageNames).push(data.content[j].package.name);
        }
      }
    }  
  }

  for (let i=0; i <arrResults.length; i++) {
    arrResults[i].packageNames.sort();
  }

  return arrResults;
}