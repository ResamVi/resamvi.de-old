function load(){$(document).height()-$(window).height()-100<=$(window).scrollTop()&&($.ajax({url:"php/print-entry.php",data:{count:entryCount,search:$("#searchBox").val(),programming:$("#programming").prop("checked"),baking:$("#baking").prop("checked"),misc:$("#misc").prop("checked")},async:!1,dataType:"html",success:function(n){$("#blog-entries").append(n)},error:function(){}}),entryCount++)}$(document).ready(function(){function n(n){$("#icon"+n).css("visibility","visible"),$("#icon"+n).addClass("animated fadeInUp")}function e(){for(var n=1;n<=4;n++)$("#icon"+n).addClass("animated fadeOut")}function a(){for(var n=1;n<=4;n++)$("#icon"+n).css("visibility","hidden")}function o(){for(var n=1;n<=4;n++)$("#icon"+n).removeClass("animated fadeOut"),$("#icon"+n).removeClass("animated fadeInUp")}var i=!0;$("#trophy").click(function(){if(i){$("#smallarrow").css("visibility","visible"),$("#smallarrow").removeClass("animated fadeOut"),o(),$("#smallarrow").addClass("animated fadeInDown");for(var t=1;t<=4;t++)setTimeout(function(e){n(e)},150*t,t);i=!1}else $("#smallarrow").removeClass("animated fadeInDown"),o(),$("#smallarrow").addClass("animated fadeOut"),e(),setTimeout(function(){a()},700),i=!0})}),$(function(){$(".button-checkbox").each(function(){function n(){var n=o.is(":checked");a.data("state",n?"on":"off"),a.find(".state-icon").removeClass().addClass("state-icon "+t[a.data("state")].icon),n?a.removeClass("btn-default").addClass("btn-"+i+" active"):a.removeClass("btn-"+i+" active").addClass("btn-default")}var e=$(this),a=e.find("button"),o=e.find("input:checkbox"),i=a.data("color"),t={on:{icon:"glyphicon glyphicon-check"},off:{icon:"glyphicon glyphicon-unchecked"}};a.on("click",function(){o.prop("checked",!o.is(":checked")),o.triggerHandler("change"),n()}),o.on("change",function(){n()}),n(),0==a.find(".state-icon").length&&a.prepend('<i class="state-icon '+t[a.data("state")].icon+'"></i> ')})});var reload=function(n){console.log("hi"),$("#blog-entries").empty(),entryCount=0,load()};$(document).ready(function(){console.log("bonesaw ready"),$("#programming").click(reload),$("#baking").click(reload),$("#misc").click(reload)});var entryCount=0,searchTerm="";$(document).ready(function(){$(window).scroll(load)}),$("body").on({touchmove:load}),$(document).ready(function(){$("#searchBox").on("change keyup paste",function(){$("#blog-entries").empty(),entryCount=0,load()})}),$(document).ready(function(){var n=!1;$(".sandwich").click(function(){(n=!n)?($(".search").css("visibility","visible"),$(".search").addClass("animated fadeIn")):($(".search").css("visibility","hidden"),$(".search").removeClass("animated fadeIn"))})}),$(document).ready(function(){$("#form").submit(function(n){0==grecaptcha.getResponse().length&&($("#fail").fadeIn(1e3).delay(1500).fadeOut(1e3),n.preventDefault())})});