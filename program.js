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