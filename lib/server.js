/*
 * simple-http-server
 *
 * This will serve up static html, css, and javascript
 * from the current directory, or a specified directory/port
 *
 * @author Andrew Thorp
 */ 
(function(){

  var SWITCHES, BANNER, colors, argv, libs, config, printLine;
  
  colors = require('colors');

  argv = require('optimist').argv;
  
  libs = {
    http: require('http'),
    url: require('url'),
    fs: require('fs'),
    path: require('path')
  };

  config = {
    port: argv.p || argv.port || 8000,
    directory: argv.d || argv.directory || process.cwd(),
    colors: argv.nocolors ? false : true
  };

  printLine = function(line) {
    return process.stdout.write(line + '\n');
  };

  BANNER = 'Usage: nserver [options]\n\nIf called without options, `nserver` will listen to the current directory on port ' + config.port + '.';

  SWITCHES =  [ 
                ['-d', '--directory', 'root directory to listen to'], 
                ['-p', '--port', 'port to listen on'], 
                ['', '--nocolors', 'disable colors, default: false'],
                ['', '--nologs', 'disable request logs, default: false'],
                ['', '--help', 'show this help screen']
              ];

  /*
   * run
   *
   * This function is what fires off the server
   * if --help is passed as a flag, it will print the
   * help screen. If not, the server will start.
   *
   * @author Andrew Thorp
   */
  exports.run = function(){

    // --help was passed
    if (argv.help) return usage();

    // Fire off the server!
    libs.http.createServer(function(request, response) {

      var url = libs.url.parse(request.url, true),
          file = decodeURIComponent(url.pathname),
          result = request.method + " " + file.bold,
          fileCount = 0;

      if (!config.colors){
        result = request.method + " " + file;
      }

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

              if (config.colors){
                result += " - 200 OK".green;
              } else {
                result += " - 200 OK";
              }
              logString(result);
            } else {
              if (config.colors){
                result += " - 500 Internal Server Error".red;
              } else {
                result += " - 500 Internal Server Error";
              }
              logString(result);
            }
          });

        } else {

          response.writeHead(404, {});
          response.write("<h1>404 - Not Found</h1>");
          response.end();

          if (config.colors){
            result += " - 404 Not Found".red;
          } else {
            result += " - 404 Not Found";
          }
          logString(result);

        }

      });

    }).listen(config.port);

    logString();

  };

  /*
   * usage
   *
   * print the help screen
   *
   * @author Andrew thorp
   */
  var usage = function(){
    var lines, spaces, i, len, switchLength, currSwitch, spaces, shortFlag, longFlag;

    lines = [];
    lines.unshift("" + BANNER + "\n");

    for (i = 0, len = SWITCHES.length; i < len; i++){
      currSwitch = SWITCHES[i];
      spaces = Array(16 - currSwitch[1].length).join(' ');

      if (currSwitch[0] === ""){
        shortFlag = "    ";
      } else {
        shortFlag = currSwitch[0] + ", ";
      }

      longFlag = currSwitch[1];

      lines.push('   ' + shortFlag + longFlag + spaces + currSwitch[2]);
    }

    return printLine("\n" + (lines.join('\n')) + "\n");
  };


  /*
   * logString
   *
   * log a string (used for requests)
   *
   * @variable string (if not passed, connection string is printed)
   * @author Andrew thorp
   */
  var logString = function(string){
    if (argv.nologs) return;

    if (string !== undefined){
      printLine(string);
      return;
    }

    var consoleStrings;

    if (config.colors){
      consoleStrings = {
        server: "simple-http-server".bold,
        directory: config.directory.green,
        url: "http://localhost:".green + config.port.toString().green + "/".green
      }
    } else {
      consoleStrings = {
        server: "simple-http-server",
        directory: config.directory,
        url: "http://localhost:" + config.port + "/"
      }
    }

    printLine(consoleStrings.server + " Now Serving: " + consoleStrings.directory + " at " + consoleStrings.url);
  };

}());