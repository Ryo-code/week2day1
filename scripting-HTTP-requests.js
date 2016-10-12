var http = require("http");

function readHTML(url, callback) {
  var urlP = require('url');
  var urlObject = urlP.parse(url);
  var requestOptions = {
    host: urlObject.host,
    path: urlObject.path
  };

  http.get(requestOptions, (response) => { // HTTP Response Callback
    var page = '';
    response.setEncoding("utf8");     // Use UTF-8 encoding
    response.on("data", function(data) {    // On Data Received
      console.log("Chunk Received. Length:", data.length);
      page += data;
    });

    // On Data Completed
    response.on("end", function() {
      console.log("Response stream complete.");
      // debugger;
      callback(page);
    });
  });
}

function printHTML (htmlData) {
  console.log(htmlData);
}

readHTML("http://www.google.ca", printHTML);
