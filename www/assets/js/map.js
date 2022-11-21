var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var black = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© CartoDB - © Openstreetmap© OpenStreetMap'
});

var baseMaps = {
    "OpenStreetMap": osm,
    "CartoDB Negro": black
};

const map = L.map('map', {
    center: [43.3571, -8.2561],
    zoom: 12,
    layers: [osm, black],
    fullscreenControl: true,
    fullscreenElement: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});

var layerControl = L.control.layers(baseMaps).addTo(map);


var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


function onEachFeature(feature, layer) {
    layer.bindPopup('<h5>' + feature.properties.title + '</h5>' + '<p>' + feature.properties.paragraph_1 + '</p>' + '<p>' + feature.properties.paragraph_2 + '</p>' +
        '<h6>' + feature.properties.person + ' - ' + feature.properties.neighborhood + '</h6>' +

        '<img src=\"images/' + feature.id + '.png\"\/>' +

        '<audio src=\ "' + feature.properties.mp3_file + '\ " preload="none" controls>O teu navegador non soporta o elemento <code>audio</code>.</audio>' +

        '<br/>'

    );
}

L.geoJSON(elementos, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },

    onEachFeature: onEachFeature

}).addTo(map);