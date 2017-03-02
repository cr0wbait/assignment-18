(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('wat');

var talkaboutInboundFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals');
var talkaboutOutboundFlights = $.getJSON('http://apis.is/flight?language=en&type=departures');
var navOps = document.querySelector('.navop');
function renderContentTo(domEl, theRoute) {
  var allThangs = '';
  if (theRoute === 'home') allContent = '\n  \n  ';
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLEdBQVIsQ0FBWSxLQUFaOztBQUVBLElBQUksMEJBQTBCLEVBQUUsT0FBRixDQUFVLGlEQUFWLENBQTlCO0FBQ0EsSUFBSSwyQkFBMkIsRUFBRSxPQUFGLENBQVUsbURBQVYsQ0FBL0I7QUFDQSxJQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0MsUUFBaEMsRUFBeUM7QUFDdkMsTUFBSSxZQUFZLEVBQWhCO0FBQ0EsTUFBSSxhQUFhLE1BQWpCLEVBQ0E7QUFHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zb2xlLmxvZygnd2F0JylcblxubGV0IHRhbGthYm91dEluYm91bmRGbGlnaHRzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9mbGlnaHQ/bGFuZ3VhZ2U9ZW4mdHlwZT1hcnJpdmFscycpXG5sZXQgdGFsa2Fib3V0T3V0Ym91bmRGbGlnaHRzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9mbGlnaHQ/bGFuZ3VhZ2U9ZW4mdHlwZT1kZXBhcnR1cmVzJylcbmxldCBuYXZPcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2b3AnKVxuZnVuY3Rpb24gcmVuZGVyQ29udGVudFRvKGRvbUVsLCB0aGVSb3V0ZSl7XG4gIGxldCBhbGxUaGFuZ3MgPSAnJ1xuICBpZiAodGhlUm91dGUgPT09ICdob21lJylcbiAgYWxsQ29udGVudCA9IGBcbiAgXG4gIGBcbn1cbiJdfQ==
