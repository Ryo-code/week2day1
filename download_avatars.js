var http = require('http');
var owner = process.argv[2]
var repo = process.argv[3]
var bl = require('bl')

function getRepoContributors(repoOwner, repoName, cb){
  var url = `http://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  http.get(url, function (response) {
    response.pipe(bl(function (err, data) {
      if (err){
        return console.error(err)
      }
      data = data.toString()
      console.log('test', data)
    }));
  });
}

getRepoContributors(owner, repo, (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
});
