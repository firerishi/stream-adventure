// lesson #14
// crypt
var crypto = require('crypto');
var stream = crypto.createDecipher('aes256', process.argv[2]);

stream.pipe(process.stdout);
process.stdin.pipe(stream);


// lesson #13
// combiner
var combine = require('stream-combiner');
var through = require('through');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
    var grouper = through(write, end);
    var current;
    
    function write (line) {
        if (line.length === 0) return;
        var row = JSON.parse(line);
        
        if (row.type === 'genre') {
            if (current) {
                this.queue(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] };
        }
        else if (row.type === 'book') {
            current.books.push(row.name);
        }
    }
    function end () {
        if (current) {
            this.queue(JSON.stringify(current) + '\n');
        }
        this.queue(null);
    }
    
    return combine(split(), grouper, zlib.createGzip());
};

// lesson #12
// duplexer redux
var duplexer = require('duplexer');
var through = require('through');

module.exports = function(counter) {
	
	var writeable = through(write, end);
	var counts = {};

	function write(buf) {
		counts[buf.country] = (counts[buf.country] || 0) + 1;
	}

	function end() {
		counter.setCounts(counts);
	}

	return duplexer(writeable, counter);
};


// lesson #11
// duplexer
var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function(cmd, args) {
	var ps = spawn(cmd, args);
	return duplexer(ps.stdin, ps.stdout);
};


// lesson #10
// html stream
var trumpet = require('trumpet');

var tr = trumpet();
var through = require('through');

var write = function(buf){
	this.queue(buf.toString().toUpperCase());
}
var end = function() {
	this.queue(null);
}

var loud = tr.select('.loud').createStream();
loud.pipe(through(write, end)).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);


// lesson #9
// websockets
var ws = require('websocket-stream');
var stream = ws("ws://localhost:8000");

stream.write('hello\n');
stream.end();


// lesson #8
// http client
var request = require('request');
var r = request.post('http://localhost:8000');

process.stdin.pipe(r).pipe(process.stdout);


// lesson #7
// http server
var http = require('http');
var through = require('through');

var write = function(buf){
	this.queue(buf.toString().toUpperCase());
}
var end = function() {
	this.queue(null);
}

var server = http.createServer(function(req, res){
	if (req.method == 'POST') {
		req.pipe(through(write, end)).pipe(res);	
	}
	else {
		res.end('Send me a POST');
	}
});

server.listen(process.argv[2]);


// lesson #6
// concat
var concat = require('concat-stream');
var rev = function(buf) {
	console.log(buf.toString().split('').reverse().join(''));
}

process.stdin.pipe(concat(rev));


// lesson #5
// lines
var split = require('split');
var through = require('through');
var tr = through(write);
var count = 0;

function write (line) { 
	(count % 2 == 0)? console.log(line.toString().toLowerCase()): console.log(line.toString().toUpperCase());
	count += 1;
}

process.stdin.pipe(split()).pipe(tr);


// lesson #4
// transform
var through = require('through');
var tr = through(write, end);

function write (buf) { this.queue(buf.toString().toUpperCase())}
function end () { this.queue(null) }

process.stdin.pipe(tr).pipe(process.stdout);


// lesson #3
// input output
process.stdin.pipe(process.stdout);


// lesson #2
// meet pipe
var fs = require('fs');

fs.createReadStream(process.argv[2]).pipe(process.stdout);


// lesson #1
// beep boop
console.log('beep boop');