# Simple HTTP Web Server #

A simple web server, built in javascript, distributed as an NPM package, for node.js.

At the time of this writing, it will serve up static HTML, CSS, and JS over a specified port.

This is similar to the python module `SimpleHTTPServer`.

## Installation ##

    npm -g install simple-http-server

The `-g` flag lets you use the command line tool.

## Usage ##

    nserver
    
By default, this will serve up the current directory on port 80. You can see what you can configure by running:

    nserver --help
    
This outputs:

    -d, --directory    root directory to serve
    -p, --port         port to listen on
        --nocolors     disable colors, default: false
        --nologs       disable logs, default: false
        --help         show this help screen
        
*Please note - the help screen can change, run it when you install to see what your version is capable of.*

## NPM Registry ##

http://search.npmjs.org/#/simple-http-server

Thanks to http://nodejs.org/ for making this possible.

## License ##

```
Copyright 2012 Andrew Thorp

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```