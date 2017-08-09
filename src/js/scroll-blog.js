var nextPages = ['rheinuferlauf2017', 'apfelkuchen', 'charitywalkandrun2017', 'kaesekuchen', 'screenbounce', 'bouncingball', 'chocolatechipcookies', 'start', 'erster'];

$(document).ready(function () {
  $('#blog-entries').infiniteScroll({
    path: function () {
      return nextPages[this.loadCount] + '.html';
    },
    append: '.container-fluid',
    status: '.scroller-status',
    scrollThreshold: 1
  });
});
