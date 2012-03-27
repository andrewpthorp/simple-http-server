(function(){
  
  var libs = {
    http: require('http'),
    url: require('url'),
    fs: require('fs'),
    path: require('path')
  },
  config = {
    port: 8000,
    directory: process.cwd()
  };

  libs.http.createServer(function(request, response) {

    var url = libs.url.parse(request.url, true),
        file = decodeURIComponent(url.pathname),
        result = request.method + " " + file,
        fileCount = 0;

    // Default file to index.html
    if (file === "/"){
      file = "/index.html";
    }

    var path = libs.path.join(config.directory, file);

    libs.path.exists(path, function(exists){

      if (exists) {

        libs.fs.readFile(path, function(error, data) {
          if (!error){
            response.writeHead(200, {});
            response.write(data);
            response.end();
            result += " - 200 OK";
            console.log(result);
          } else {
            result += " - 500 Internal Server Error";
            console.log(result);
          }
        });

      } else {

        response.writeHead(404, {});
        response.write("<h1>404 - Not Found</h1>");
        response.end();
        result += " - 404 Not Found";
        console.log(result);

      }

    });

  }).listen(config.port);

  console.log("HTTPServer at http://localhost:" + config.port + "/");

}());