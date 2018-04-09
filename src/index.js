/* Styles */
require.context('./css/', false, /.css$/);

/* Images */
require.context('./img/', true, /.*/);

/* Scripts */
//require.context('./js', false, /.*/);

var InfiniteScroll = require('infinite-scroll');

var entries = ['spayle','100abos','statement-vs-expression', 'rheinuferlauf2017', 'apfelkuchen', 'charitywalkandrun2017', 'kaesekuchen', 'screenbounce', 'bouncingball', 'chocolatechipcookies', 'start', 'erster'];

var infScroll = new InfiniteScroll('#blog-entries', {
    path: function () {
        return entries[this.loadCount] + '.html';
    },
    append: '.container-fluid',
    status: '.scroller-status',
    scrollThreshold: 1,
    debug: true
});

console.log(infScroll);


infScroll.on( 'load', function( response ) {
    console.log("HEllo");
});