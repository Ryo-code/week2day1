var request = require('request');
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb){
  var accessToken = "900275024a99c73b3d6a5c1f77be931eb14f2485";
  var githubUser = "Ryo-code";
  var endPoint = `api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  var requestURL = `https://${githubUser}:${accessToken}@${endPoint}`;
  var options = {
    url: requestURL,
    headers: {
      "User-Agent": "request"
    }
  };

  request(options, function (error, response, body) { //<-accessing the API
    if (!error && response.statusCode == 200) {
      console.log('here')
      var data = JSON.parse(body); //<- retrieve JSON data, which is parsed into
      // console.log(data);
      cb(data);
  } else {                 // an JavaScript array of objects
    console.log("NNNNNOPE!")
    }
  });
}

// getRepoContributors(owner, repo, (err, result) => {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

function downloadImageByURL(url, filePath) {
  var writeStream = fs.createWriteStream(filePath);
  request({url: url}).pipe(writeStream);
}

getRepoContributors(owner, repo, (contributors, err) => {
  // console.log(err, contributors)
  if (err) {
    console.log(err, "Awful. Just awful...");
    // return;
  }
  console.log('Way to go hombre!')

  contributors.forEach((contributor)=>{
    var avatarURL = contributor["avatar_url"];
    var username = contributor["login"];
    var filePath = `avatars/${username}.jpeg`;
    console.log(`Downloading ${username}'s avatar'`);
    downloadImageByURL(avatarURL, filePath);
  });
});
