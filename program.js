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