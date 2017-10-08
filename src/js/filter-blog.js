var progEntries = ['#statement']; // TODO: Add "Editing" categor
var miscEntries = ['#100abos','#rheinuferlauf2017', '#charitywalkandrun2017', '#screenbounce', '#bouncingball', '#start', '#erster'];
var bakeEntries = ['#apfelkuchen', '#kaesekuchen', '#chocolatechipcookies'];

var filterProg = true;
var filterBaking = true;
var filterMisc = true;

function filter(event) {
  if(!filterMisc) $(miscEntries.join(", ")).css('display', 'none'); else  $(miscEntries.join(", ")).css('display', 'block');
  
  if(!filterProg) $(progEntries.join(", ")).css('display', 'none'); else $(progEntries.join(", ")).css('display', 'block');
  
  if(!filterBaking) $(bakeEntries.join(", ")).css('display', 'none'); else $(bakeEntries.join(", ")).css('display', 'block');
};

$(document).ready(function () {

  $('#programming').click(function () {
    filterProg = !filterProg;

    if (!filterProg) {
      $('#programming').removeClass('btn-success');
      $('#programming').addClass('btn-default');
    } else {
      $('#programming').addClass('btn-success');
      $('#programming').removeClass('btn-default');
    }

    filter();
  });

  $('#baking').click(function () {
    filterBaking = !filterBaking;

    if (!filterBaking) {
      $('#baking').removeClass('btn-success');
      $('#baking').addClass('btn-default');
    } else {
      $('#baking').addClass('btn-success');
      $('#baking').removeClass('btn-default');
    }

    filter();
  });
  $('#misc').click(function () {
    filterMisc = !filterMisc;

    if (!filterMisc) {
      $('#misc').removeClass('btn-success');
      $('#misc').addClass('btn-default');
    } else {
      $('#misc').addClass('btn-success');
      $('#misc').removeClass('btn-default');
    }

    filter();
  });
});
