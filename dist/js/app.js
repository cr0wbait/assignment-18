(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('My hovercraft is full of eels!');

var inFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals');
var outFlights = $.getJSON('http://apis.is/flight?language=en&type=departures');
var drivePools = $.getJSON('http://apis.is/rides/samferda-drivers/');
var ridePools = $.getJSON('http://apis.is/rides/samferda-passengers/');
var vikingMusic = $.getJSON('http://apis.is/concerts');

var clickers = document.querySelector('.nav');

clickers.addEventListener('click', function (evt) {
  console.log('BANG');
  var clickTarg = evt.target;
  if (clickTarg.classList.contains('home') === true) {
    console.log('Let me go home!');
    if (clickTarg.parent.classList.contains('active') === true) {
      clickTarg.parent.classList.remove('active');
      clickTarg.parent.classList.add('inactive');
    } else {
      clickTarg.parent.classList.add('active');
    }
  }
  if (clickTarg.classList.contains('flights') === true) {
    console.log("I'll fly away!");
  }
  if (clickTarg.classList.contains('carpools') === true) {
    console.log('Life is a highway!');
  }
  if (clickTarg.classList.contains('concerts') === true) {
    console.log('For those about to rock!');
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLEdBQVIsQ0FBWSxnQ0FBWjs7QUFFQSxJQUFJLFlBQVksRUFBRSxPQUFGLENBQVUsaURBQVYsQ0FBaEI7QUFDQSxJQUFJLGFBQWEsRUFBRSxPQUFGLENBQVUsbURBQVYsQ0FBakI7QUFDQSxJQUFJLGFBQWEsRUFBRSxPQUFGLENBQVUsd0NBQVYsQ0FBakI7QUFDQSxJQUFJLFlBQVksRUFBRSxPQUFGLENBQVUsMkNBQVYsQ0FBaEI7QUFDQSxJQUFJLGNBQWMsRUFBRSxPQUFGLENBQVUseUJBQVYsQ0FBbEI7O0FBRUEsSUFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFmOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBUyxHQUFULEVBQWE7QUFDOUMsVUFBUSxHQUFSLENBQVksTUFBWjtBQUNBLE1BQUksWUFBWSxJQUFJLE1BQXBCO0FBQ0EsTUFBSSxVQUFVLFNBQVYsQ0FBb0IsUUFBcEIsQ0FBNkIsTUFBN0IsTUFBeUMsSUFBN0MsRUFBa0Q7QUFDaEQsWUFBUSxHQUFSLENBQVksaUJBQVo7QUFDQSxRQUFJLFVBQVUsTUFBVixDQUFpQixTQUFqQixDQUEyQixRQUEzQixDQUFvQyxRQUFwQyxNQUFrRCxJQUF0RCxFQUEyRDtBQUN6RCxnQkFBVSxNQUFWLENBQWlCLFNBQWpCLENBQTJCLE1BQTNCLENBQWtDLFFBQWxDO0FBQ0EsZ0JBQVUsTUFBVixDQUFpQixTQUFqQixDQUEyQixHQUEzQixDQUErQixVQUEvQjtBQUNELEtBSEQsTUFHTztBQUNMLGdCQUFVLE1BQVYsQ0FBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsUUFBL0I7QUFDRDtBQUVGO0FBQ0QsTUFBSSxVQUFVLFNBQVYsQ0FBb0IsUUFBcEIsQ0FBNkIsU0FBN0IsTUFBNEMsSUFBaEQsRUFBcUQ7QUFDbkQsWUFBUSxHQUFSLENBQVksZ0JBQVo7QUFFRDtBQUNELE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLFVBQTdCLE1BQTZDLElBQWpELEVBQXNEO0FBQ3BELFlBQVEsR0FBUixDQUFZLG9CQUFaO0FBRUQ7QUFDRCxNQUFJLFVBQVUsU0FBVixDQUFvQixRQUFwQixDQUE2QixVQUE3QixNQUE2QyxJQUFqRCxFQUFzRDtBQUNwRCxZQUFRLEdBQVIsQ0FBWSwwQkFBWjtBQUVEO0FBQ0YsQ0F6QkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc29sZS5sb2coJ015IGhvdmVyY3JhZnQgaXMgZnVsbCBvZiBlZWxzIScpXG5cbmxldCBpbkZsaWdodHMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL2ZsaWdodD9sYW5ndWFnZT1lbiZ0eXBlPWFycml2YWxzJylcbmxldCBvdXRGbGlnaHRzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9mbGlnaHQ/bGFuZ3VhZ2U9ZW4mdHlwZT1kZXBhcnR1cmVzJylcbmxldCBkcml2ZVBvb2xzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9yaWRlcy9zYW1mZXJkYS1kcml2ZXJzLycpXG5sZXQgcmlkZVBvb2xzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9yaWRlcy9zYW1mZXJkYS1wYXNzZW5nZXJzLycpXG5sZXQgdmlraW5nTXVzaWMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL2NvbmNlcnRzJylcblxubGV0IGNsaWNrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpXG5cbmNsaWNrZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcbiAgY29uc29sZS5sb2coJ0JBTkcnKVxuICB2YXIgY2xpY2tUYXJnID0gZXZ0LnRhcmdldFxuICBpZiAoY2xpY2tUYXJnLmNsYXNzTGlzdC5jb250YWlucygnaG9tZScpID09PSB0cnVlKXtcbiAgICBjb25zb2xlLmxvZygnTGV0IG1lIGdvIGhvbWUhJylcbiAgICBpZiAoY2xpY2tUYXJnLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpID09PSB0cnVlKXtcbiAgICAgIGNsaWNrVGFyZy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgIGNsaWNrVGFyZy5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGlja1RhcmcucGFyZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaWdodHMnKSA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coXCJJJ2xsIGZseSBhd2F5IVwiKVxuXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnBvb2xzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdMaWZlIGlzIGEgaGlnaHdheSEnKVxuXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmNlcnRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdGb3IgdGhvc2UgYWJvdXQgdG8gcm9jayEnKVxuXG4gIH1cbn0pXG4iXX0=
