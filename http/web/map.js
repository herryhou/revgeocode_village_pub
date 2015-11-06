var map, myIcon;

function map_init() {
    map = new L.Map('map', {
        center: new L.LatLng(24.153, 120.68),
        zoom: 16
    });
    var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 24
    });
    var ggl = new L.Google('ROADMAP', {
        maxZoom: 24
    });
    var ggl2 = new L.Google('SATELLITE', {
        maxZoom: 24
    });
    // for all possible values and explanations see "Template Parameters" in https://msdn.microsoft.com/en-us/library/ff701716.aspx
    var imagerySet = "Aerial"; // AerialWithLabels | Birdseye | BirdseyeWithLabels | Road
    var bing = new L.BingLayer("LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc", {
        type: imagerySet
    });
    map.addLayer(ggl);
    map.addControl(new L.Control.Layers({
        'OSM': osm,
        'Google': ggl,
        'Google Terrain': ggl2,
        'bing': bing
    }, {}));
    L.control.scale().addTo(map);
    map.on('click', onMapClick);
    myIcon = L.divIcon({
        iconSize: new L.Point(10, 10),
        html: '.'
    });
}

function click_village(e) {
    //console.log(e.latlng);
    //var marker = L.marker(e.latlng).addTo(map);
    var latlng = e.latlng.lat + ',' + e.latlng.lng;
    $.get("/village/" + latlng, function(res) {
        kkk = res;
        var data = res.data;
        data.forEach(function(value) {
            if (typeof value['geojson'] === 'object') {
                L.geoJson(value['geojson'], {
                    opacity: 0.2,
                    color: "#770077",
                    weight: 1,
                    clickable: false
                }).addTo(map);
            }
            console.log(value.key + ',' + value.value);
        });
    });
}

function onMapClick(e) {
    click_village(e);
}
//讀取 IOT(運研所) geo 格式的 PTs(lng,lat,lng,lat....)
function latlngs(lnglatStr) {
    var a = lnglatStr.split(',');
    var pts = [];
    for (var i = 0; i < a.length - 1;) {
        var lng = a[i++];
        var lat = a[i++];
        pts.push(L.latLng(lat, lng));
    }
    return pts;
}

function drawIOTPolyline(pointString) {
    l = L.polyline(latlngs(pointString), {
        color: 'red',
        weight: 1
    }).addTo(map);
    map.panInsideBounds(l.getBounds());
}
//drawIOTPolyline( $('#pline').val());
$(document).ready(function() {
    map_init();
});
//
function drawRtreeBox(rect) {
    var bounds;
    if (rect.length >= 4) {
        bounds = [
            [rect[0][1], rect[0][0]],
            [rect[1][1], rect[1][0]]
        ];
    } else {
        bounds = [
            [rect[1], rect[0]],
            [rect[3], rect[2]]
        ];
    }
    L.rectangle(bounds, {
        opacity: 0.2,
        color: "#007800",
        weight: 1
    }).addTo(map);
    //map.fitBounds(bounds);
}
//s2 geoJson
//{"type":"Polygon","coordinates":[[[[-180,-90],[180,-90],[180,90],[-180,90],[-180,-90]]]]}
function drawS2geoJson(data) {
    //var pts = json.coordinates;
    //drawIOTPolyline(pts.toString());
    L.geoJson(data, {
        opacity: 0.2,
        color: "#007877",
        weight: 1,
        clickable: false
    }).addTo(map);
}