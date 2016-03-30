var s2 = require('s2');
//var data = require('./testdata.js').input;  //雲林縣,西螺鎮
var data = require('./testdata1.js').input; //臺中市,南屯區,春社里

/*
var ll = new s2.S2LatLng(10, 10);
ll.isValid(); // true
var normalized = ll.normalized(); // true
var pt = ll.toPoint();

console.log(ll.toGeoJSON());
console.log(pt.toString());
*/
/*
//台中市文化街
var ll1 = new s2.S2LatLng(24.152116567839407,120.67029684269379);
//var ll2 = new s2.S2LatLng(24.152296432160593,120.67739315730624)
//
var h=0.000000000001; //約 20M
var h=0.00000000000001; //約 ？
var ll = new s2.S2Cap(ll1.normalized().toPoint(), h);
var llRect = ll.getRectBound(); //result as s2.S2LatLngRect
console.log(JSON.stringify(llRect.toGeoJSON()));
*/
function cellid_Info(_cellid) {
    console.log('//id: ' + _cellid.id());
    console.log('//level: ' + _cellid.level());
    console.log('//toString: ' + _cellid.toString());
    var latlng = new s2.S2LatLng(_cellid.toPoint());
    console.log('//latlng: ' + latlng.toString());
    //console.log(JSON.stringify(_cell.toGeoJSON()));
    show_Cell_Info(new s2.S2Cell(_cellid));
}

function show_Cell_Info(cell) {
    //console.log('>cell.id: ' + cell.id().id());
    //console.log('cell.getCenter: ' + JSON.stringify((new s2.S2LatLng(cell.getCenter())).toGeoJSON()));
    //console.log('//cell.level:' + cell.level());
    //console.log('>cell.toGeoJSON: ' + JSON.stringify(cell.toGeoJSON()));
    console.log('drawGeoJson(' + JSON.stringify(cell.toGeoJSON()) + ');');
}

function show_token_info(tokenStr) {
  var cellid = (new s2.S2CellId()).fromToken(tokenStr);
  cellid_Info(cellid);           //1/220313112012332310

  cellid_Info(cellid.child(0));  //1/2203131120123323100
  cellid_Info(cellid.child(3));  //1/2203131120123323103
  cellid_Info(cellid.parent(17));//1/22031311201233231
  cellid_Info(cellid.parent(16));//1/2203131120123323
  cellid_Info(cellid.parent(15));//1/220313112012332
}


//show_token_info('346eb0df69');

function get_cellid(lat,lng){
	var _cell = new s2.S2Cell(new s2.S2LatLng(lat, lng));
	var _cellid = _cell.id();  //level: 30
	return _cellid.toString(); //1/220313112012332310002222222133
}
//show_latlng_info(23.749197,120.416948);

function checkLevel() {
    var _cell = new s2.S2Cell(new s2.S2LatLng(23.736995747519753, 120.44584482272715));
    var _cellid = _cell.id();
    console.log('-- cell.id: ' + _cellid.id());
    console.log('cell.level:' + _cellid.level());
    console.log(JSON.stringify(_cell.toGeoJSON()));
    var _cellid0 = _cellid.parent(11);
    console.log('-- cell.id: ' + _cellid0.id());
    console.log('cell.level:' + _cellid0.level());
    var _cell0 = new s2.S2Cell(_cellid0.toLatLng());
    console.log(JSON.stringify(_cell0.toGeoJSON()))
    var _cellid1 = _cellid0.parent(10);
    console.log('-- cell.id: ' + _cellid1.id());
    console.log('cell.level:' + _cellid1.level());
    var _cell1 = new s2.S2Cell(_cellid1.toLatLng());
    console.log(JSON.stringify(_cell1.toGeoJSON()))
}
//checkLevel();
function draw_sample() {
    console.log('\n\n\n\n\n\n\n\n\n\n');
    console.log('L.polyline(' + JSON.stringify(data) + ',{color:"blue",weight:2}).addTo(map);');
    console.log('\n\n\n\n');
    var input = data.map(function(p) {
        return (new s2.S2LatLng(p[0], p[1])).normalized().toPoint();
    });
    var covers = s2.getCover([input], {
        type: 'polygon',
        min: 1,
        max: 32,
        max_cells: 1000,
        level_mod: 1
    });
    for (var i = 0; i < covers.length; i++) {
        var cell = covers[i];
        //var cap = cell.getCapBound();
        //var latlngRect = cap.getRectBound();
        console.log('//----cell.id: ' + cell.id().id());
        console.log('//cell.getCenter: ' + JSON.stringify((new s2.S2LatLng(cell.getCenter())).toGeoJSON()));
        console.log('//cell.level:' + cell.level());
        console.log('//cell.toGeoJSON: ' + JSON.stringify(cell.toGeoJSON()));
        console.log('drawGeoJson(' + JSON.stringify(cell.toGeoJSON()) + ');');
    };
    console.log('\n\n\n\n\n\n\n\n\n\nTotal cell: ' + covers.length);
}

draw_sample();

/*
var PTs = input.map(function(p){
	return (new s2.S2LatLng(p[0], p[1])).normalized().toPoint();
});

//console.log(PTs.toGeoJSON());
var covers1 = s2.getCover(PTs);

var covers = s2.getCover([PTs],{
		type: 'polygon',
        max_cells: 100,
        min: 1,
        max: 30});

covers.forEach(function(cellid){
	console.log(cellid.id());
});
*/