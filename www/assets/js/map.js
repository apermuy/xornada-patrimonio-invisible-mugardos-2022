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
    layers: osm,
    fullscreenControl: true,
    fullscreenElement: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});

var layerControl = L.control.layers(baseMaps).addTo(map);

function onEachFeature(feature, layer) {

    var header_popup = '<h4>' + feature.properties.title + '</h4>';
    var text_popup = header_popup;

    if (feature.properties.paragraph_1 != '') {
        var text_popup = header_popup + '<p>' + feature.properties.paragraph_1 + '</p>';
    }

    if (feature.properties.paragraph_2 != '') {
        var text_popup = header_popup + '<p>' + feature.properties.paragraph_1 + '</p>' + '<p>' + feature.properties.paragraph_2 + '</p>';
    }

    if (feature.properties.image_file != '') {
        var text_popup = header_popup +
            '<p>' + feature.properties.paragraph_1 + '</p>' +
            '<p>' + feature.properties.paragraph_2 + '</p>' +
            '<img src=\"' + feature.properties.image_file + '\"\/>';
    }

    if (feature.properties.sound_file != '') {
        var text_popup = header_popup +
            '<p>' + feature.properties.paragraph_1 + '</p>' +
            '<p>' + feature.properties.paragraph_2 + '</p>' +
            '<img class="img-fluid" src=\"' + feature.properties.image_file + '\"\/>' +
            '<audio src\"' + feature.properties.sound_file + '\" preload="none" controls>O teu navegador non soporta o elemento <code>audio</code>.</audio>';
    }

    layer.bindPopup(text_popup);

}

L.geoJSON(elementos, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    },

    onEachFeature: onEachFeature

}).addTo(map);

var imageUrl = 'images/logo_comunidadeozulo_mugardos.png',
    imageBounds = [[43.37, -8.12], [43.41, -8.17]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);