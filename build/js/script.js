function load(){$(document).height()-$(window).height()-100<=$(window).scrollTop()&&($.ajax({url:"php/print-entry.php",data:{count:entryCount,search:$("#searchBox").val(),programming:$("#programming").prop("checked"),baking:$("#baking").prop("checked"),misc:$("#misc").prop("checked")},async:!1,dataType:"html",success:function(a){$("#blog-entries").append(a)},error:function(){}}),entryCount++)}$(document).ready(function(){function a(a){$("#icon"+a).css("visibility","visible"),$("#icon"+a).addClass("animated fadeInUp")}function e(){for(var a=1;a<=4;a++)$("#icon"+a).addClass("animated fadeOut")}function n(){for(var a=1;a<=4;a++)$("#icon"+a).css("visibility","hidden")}function i(){for(var a=1;a<=4;a++)$("#icon"+a).removeClass("animated fadeOut"),$("#icon"+a).removeClass("animated fadeInUp")}var o=!0;$("#trophy").click(function(){if(o){$("#smallarrow").css("visibility","visible"),$("#smallarrow").removeClass("animated fadeOut"),i(),$("#smallarrow").addClass("animated fadeInDown");for(var t=1;t<=4;t++)setTimeout(function(e){a(e)},150*t,t);o=!1}else $("#smallarrow").removeClass("animated fadeInDown"),i(),$("#smallarrow").addClass("animated fadeOut"),e(),setTimeout(function(){n()},700),o=!0})});var reload=function(){$("#blog-entries").empty(),entryCount=0,load()};$(document).ready(function(){$("#programming").click(reload),$("#baking").click(reload),$("#misc").click(reload)});var entryCount=0,searchTerm="";$(document).ready(function(){$(window).scroll(load)}),$("body").on({touchmove:load}),$(document).ready(function(){$("#searchBox").on("change keyup paste",function(){$("#blog-entries").empty(),entryCount=0,load()})}),$(document).ready(function(){var a=!1;$(".sandwich").click(function(){(a=!a)?($(".search").css("visibility","visible"),$(".search").addClass("animated fadeIn")):($(".search").css("visibility","hidden"),$(".search").removeClass("animated fadeIn"))})}),$(document).ready(function(){$("#form").submit(function(a){0==grecaptcha.getResponse().length&&($("#fail").fadeIn(1e3).delay(1500).fadeOut(1e3),a.preventDefault())})});