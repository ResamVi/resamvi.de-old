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

$(document).ready(function () {
  var $container = $('#blog-entries').infiniteScroll({
    path: function () {
      return entries[this.loadCount] + '.html';
    },
    append: '.container-fluid',
    status: '.scroller-status',
    scrollThreshold: 1
  });

  $container.on('append.infiniteScroll', function (
    event,
    response,
    path,
    items
  ) {
    filter();
  });
});
