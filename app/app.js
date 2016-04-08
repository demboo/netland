$(function() {

    moment.locale('pl');

    var map =  L.map('map');
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVtYm9vIiwiYSI6ImNpbXJ5czQxMDAwNHZ2emx5aTRlcmtmajAifQ.PkGA86ZQhcsc8sZYOdlsrg', {
        maxZoom: 18,
        id: 'mapbox.satellite'
    }).addTo(map);

    $.ajax({
        url: 'data/vdb.json',
        dataType: 'json',
        success: function(data) {

            var ids = Object.keys(data).slice(0,3);
            var boundPoints = [];

            for(var i in ids) {

                var id = ids[i];
                var obj = data[id];
                var row = createRow(id, obj);

                $('#app').append(row);

                var latLng = [
                    obj.latlng.lat,
                    obj.latlng.lng];

                boundPoints.push(latLng);

                var marker = L.marker(latLng)
                        .addTo(map)
                        .bindPopup(row.html());
            }

            var bounds = new L.LatLngBounds(boundPoints);
            map.fitBounds(bounds);
            $('.draggable').draggable();
        }
    });

    var createRow = function(id, obj) {

        var span = $('<span/>').css({
            display: 'inline-block',
            padding: '10px',
            borderLeft: 'solid black 1px'
        });

        var ago = obj.timestamp ?
                    moment.unix(obj.timestamp).fromNow():0;
        var div = $('<div/>')
                .addClass('draggable')
                .append(span.clone().html(id))
                .append(span.clone().html(obj.name || '-'))
                .append(span.clone().html(obj.location || '-'))
                .append(span.clone().html(ago || '-'));

        return div;
    };
});