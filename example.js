var request = require("request");

request("http://www.google.com", function(err, response, body) {
  if (err) {
    throw err;
  }

  console.log("Response Status Code:", response.statusCode);

});
