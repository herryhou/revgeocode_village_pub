var t1 = Date.now();
//require('leveldown').destroy('./db/leveldb/tgosRoads2', function (err) { console.log('done!') })
var levelup = require('levelup');
var ops = {};
var dbName = __dirname + '/village';

/*
if (process.argv.length <= 2) {
    console.log('Usage: dumpdb DB_name [search string]');
    console.log('EX: dumpdb village 1/220313112012332');
    process.exit();
}
*/

if (process.argv.length > 2) {
    var dbName = __dirname + '/' + process.argv[2];
}


if (process.argv.length > 3) {
    var start = process.argv[3];
    ops = {
        start: start,
        end: start + '\uFFFF'
    };
}

console.log(dbName);
var db = levelup(dbName);
var cnt = 0;
db.createReadStream(ops).on('data', function(data) {
    console.log(data.key + ' - ' + data.value);
    cnt++;
}).on('error', function(err) {
    console.log('Oh my!', err)
}).on('close', function() {
    console.log('Closed')
}).on('end', function() {
    console.log('Total count: ' + cnt)
    var t2 = Date.now()
    console.log('done!, time spend ' + (t2 - t1) + 'ms.');
});
