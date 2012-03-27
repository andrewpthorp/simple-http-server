# Simple HTTP Web Server #

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

**Thanks to http://nodejs.org/ for making this possible.**