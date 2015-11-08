'use strict';
var shapefile = require('shapefile-stream'),
    through = require('through2'),
    //iconv = require('iconv-lite'),
    villageUTF8 = require('../data/villageUTF8.js'),
    villageBig5 = require('../data/village.js'),
    geojsonCover = require('geojson-cover'),
    s2 = require('s2'),
    levelup = require('levelup');
var db = levelup(__dirname + '/../db/village');
var cover_options = {
    query_min_level: 16,
    index_min_level: 16,
    query_max_level: 20,
    index_max_level: 20,
    max_query_cells: 4000,
    max_index_cells: 4000
};
shapefile.createReadStream(__dirname + '/data/Village_NLSC/Village_NLSC_1040901.shp').pipe(through.obj(function(data, enc, next) {
    var vName = '未命名',
        v1 = villageUTF8[data.properties.VILLAGE_ID],
        v2 = villageBig5[data.properties.VILLAGE_ID];
    if (typeof v1 !== 'undefined') {
        vName = v1.join(' ');
    } else if (typeof v2 !== 'undefined') {
        vName = v2.join(' ');
    } else {
        console.log('missing ...' + data.properties.VILLAGE_ID);
    }
    //inner-ring
    //'6600700-005': ['臺中市', '南屯區', '春社里'],
    //'6500100-092': ['新北市', '板橋區', '中山里'],
    //'1001409-008': ['臺東縣', '太麻里鄉', '金崙村'],
    //muliti-ring
    //6703700-007 臺南市,中西區,郡王里
    //6401200-042 高雄市,鳳山區,興仁里
    //高雄市,前鎮區,忠誠里
    /*
    if (data.properties.VILLAGE_ID !== '6600700-005' &&
        data.properties.VILLAGE_ID !== '6500100-092' &&
        data.properties.VILLAGE_ID !== '1001409-008' &&
        data.properties.VILLAGE_ID !== '6703700-007' &&
        data.properties.VILLAGE_ID !== '6401200-042' &&
        data.properties.VILLAGE_ID !== '6400900-025') {
        next();
        return;
    }*/
    var cellTokens = geojsonCover.geometryIndexes(data.geometry, cover_options);
    cellTokens.forEach(function(token) {
        var cellid = (new s2.S2CellId()).fromToken(token);
        //db.put(cellid.toString(), [token, vName]);
        db.put(cellid.toString().substr(4), [token, data.properties.VILLAGE_ID]);
    });
    console.log('//--' + vName + ' total: '+cellTokens.length);
    /*
    geojsons = geojsonCover.geometryGeoJSON(data.geometry, cover_options);
    console.log('drawS2geoJson(' + JSON.stringify(data.geometry) + ')');
    console.log('drawS2geoJson(' + JSON.stringify(geojsons) + ')');
    */
    next();
}));
/*
{
  "type": "Feature",
  "properties": {
    "OBJECTID": 8573,
    "UID": 7064,
    "PRO_ID": "64",
    "COUNTY_ID": "64",
    "TOWN_ID": "6401000",
    "VILLAGE_ID": "6401000-013",
    "V_Name": "xxxx",
    "V_Desc": null,
    "Add_Date": "1899-11-29T16:00:00.000Z",
    "Add_Accept": null,
    "Del_Date": "1899-11-29T16:00:00.000Z",
    "Del_Accept": null,
    "CRS": null,
    "Meridian": 0,
    "Remark": null,
    "Area": 0,
    "T_Name": "xxxx",
    "C_Name": "xxxx",
    "X": 0,
    "Y": 0,
    "Shape_Leng": 0,
    "Shape_Area": 0,
    "Substitute": "xxxx",
    "V_Name_e": "0",
    "T_Name_e": "0",
    "C_Name_e": "0"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          120.29601027300009,
          22.576151306000042
        ],
        [
          120.296235335,
          22.57580850100004
        ]...
*/