/* Styles */
require.context('./css/', false, /.css$/);

/* Images */
require.context('./img/', true, /.*/);

var InfiniteScroll = require('infinite-scroll');

var entries = [
  'spayle',
  '100abos',
  'statement-vs-expression',
  'rheinuferlauf2017',
  'apfelkuchen',
  'charitywalkandrun2017',
  'kaesekuchen',
  'screenbounce',
  'bouncingball',
  'chocolatechipcookies',
  'start',
  'erster'
];

var infScroll = new InfiniteScroll('#main-blog', {
  path: function () {
    return entries[this.loadCount] + '.html';
  },
  append: '#copied-content',
  status: '.scroller-status',
  scrollThreshold: 1,
  debug: true
});
