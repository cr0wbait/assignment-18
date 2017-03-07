(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('My hovercraft is full of eels!');
// kudos to Andi for letting me adapt her methodology
var inFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals');
var outFlights = $.getJSON('http://apis.is/flight?language=en&type=departures');
var drivePools = $.getJSON('http://apis.is/rides/samferda-drivers/');
var ridePools = $.getJSON('http://apis.is/rides/samferda-passengers/');
var vikingMusic = $.getJSON('http://apis.is/concerts');
var clickers = document.querySelector('.nav');
var lastActive = document.querySelector('[class="col-sm-3 navop active"]');
var nowActive = document.querySelector('[class="col-sm-3 navop"]');

window.location.hash = 'home';
var nowRoute = window.location.hash.slice(1);

var airTrafficRouter = function airTrafficRouter() {
  if (nowRoute === 'undefined') {
    // nowRoute = 'home'
  }
  var displayZone = document.querySelector('.display');
  makeActive(nowRoute);
  renderContentTo(displayZone, window.location.hash.slice(1));
};

function renderContentTo(domEl, nowRoute) {
  var theThings = '';
  if (nowRoute === "home") {
    theThings = '\n    <table class=\'facts\'>\n      <tr>\n        <th>The Basic Facts</th>\n      </tr>\n      <tr>\n        <td>Native Name</td>\n        <td>&#205;sland</td>\n      </tr>\n      <tr>\n        <td>Demonym</td>\n        <td>Icelander</td>\n      </tr>\n      <tr>\n        <td>Area(m2)</td>\n        <td>103000</td>\n      </tr>\n      <tr>\n        <td>Calling Code</td>\n        <td>352</td>\n      </tr>\n    </table>';

    domEl.innerHTML = theThings;
  }
  if (nowRoute === "concerts") {
    theThings += '\n        <div class="panel panel-default">\n          <div class="panel-body">\n            CONCERTS\n          </div>\n          <div class="row">';
    vikingMusic.then(function (serverRes) {
      forEach(serverRes.results, function (thingObjay) {
        theThings += '\n            <div class="col-sm-3 col-md-4 thumbnail-container">\n            <div class="clearfix visible-xs-block"></div>\n              <div class="thumbnail">\n                <img src="' + thingObjay.imageSource + '">\n                <div class="info">\n                  <h4>' + thingObjay.name + '</h4>\n                  <p>Venue:' + thingObjay.eventHallName + '</p>\n                  <p>' + thingObjay.dateOfShow + '</p>\n                </div>\n              </div>\n            </div>';
      });
      theThings += '\n          </div>\n        </div>';
      domEl.innerHTML = theThings;
    });
  }
  if (nowRoute === "carpools") {
    theThings += '\n          <div class=row>\n            <div class="panel panel-default">\n              <div class="panel-heading">\n                CARPOOLS\n              </div>\n              <table class="table">\n                <thead>\n                  <th>Time of Departure</th>\n                  <th>From</th>\n                  <th>To</th>\n                </thead>';
    drivePools.then(function (serverRes) {
      console.log(serverRes);
      forEach(serverRes.results, function (thingObjay) {
        theThings += '\n                  <tbody>\n                    <tr>\n                      <td>' + thingObjay.date + '</td>\n                      <td>' + thingObjay.from + '</td>\n                      <td>' + thingObjay.to + '</td>\n                    </tr>\n                  </tbody>';
      });
      theThings += '\n              </table>\n            </div>\n          </div>';
      domEl.innerHTML = theThings;
    });
  }
  if (nowRoute === "flights") {
    theThings += '\n    <div class=\'container-fluid flights-container\'>\n      <div class="panel panel-default">\n        <div class="panel-body">\n          FLIGHTS\n        </div>\n      </div>\n      <div class=\'row\'>\n        <div class="col-md-6 flights-columns">\n          <div class="panel panel-default flights-content">\n            <div class="panel-heading flights-panel-heading">\n              Arrivals\n            </div>\n            <table class="table">\n              <thead>\n                <th>Date</th>\n                <th>Arrival Time</th>\n                <th>Origin</th>\n                <th>Airline</th>\n              </thead>';
    $.when(inFlights, outFlights).then(function (serverResArrivals, serverResDepartures) {
      forEach(serverResArrivals[0].results, function (thingObjay) {
        theThings += '\n              <tbody>\n                <tr>\n                  <td>' + thingObjay.date + '</td>\n                  <td>' + thingObjay.plannedArrival + '</td>\n                  <td>' + thingObjay.from + '</td>\n                  <td>' + thingObjay.airline + '</td>\n                </tr>\n              </tbody>';
      });
      theThings += '\n            </table>\n          </div>\n        </div>\n        <div class="col-md-6 flights-columns">\n          <div class="panel panel-default flights-content">\n            <div class="panel-heading flights-panel-heading">\n              Departures\n            </div>\n            <table class="table">\n              <thead>\n                <th>Date</th>\n                <th>Departure Time</th>\n                <th>Destination</th>\n                <th>Airline</th>\n              </thead>';

      forEach(serverResDepartures[0].results, function (thingObjay) {
        theThings += '\n              <tbody>\n                <tr>\n                 <td>' + thingObjay.date + '</td>\n                 <td>' + thingObjay.plannedArrival + '</td>\n                 <td>' + thingObjay.to + '</td>\n                 <td>' + thingObjay.airline + '</td>\n                </tr>\n              </body>';
      });
      theThings += '\n            </table>\n          </div>\n        </div>\n      </div>';
      domEl.innerHTML = theThings;
    });
  }
}

clickers.addEventListener('click', function (evt) {
  console.log('BANG');
  var displayZone2 = document.querySelector('.display');
  // let daRooooooooooot = window.location.hash.slice(1)
  var clickTarg = evt.target;
  var route = clickTarg.dataset.route;
  window.location.hash = route;

  if (clickTarg.classList.contains('home') === true) {
    console.log('Let me go home!');
    window.location.hash = 'home';
    renderContentTo(displayZone2, window.location.hash.slice(1));
  }
  if (clickTarg.classList.contains('flights') === true) {
    console.log("I'll fly away!");
    window.location.hash = 'flights';
    renderContentTo(displayZone2, window.location.hash.slice(1));
  }
  if (clickTarg.classList.contains('carpools') === true) {
    console.log('Life is a highway!');
    window.location.hash = 'carpools';
    renderContentTo(displayZone2, window.location.hash.slice(1));
  }
  if (clickTarg.classList.contains('concerts') === true) {
    console.log('For those about to rock!');
    window.location.hash = 'concerts';
    renderContentTo(displayZone2, window.location.hash.slice(1));
  }
});

function makeActive(nowRoute) {
  lastActive.classList.remove('active');
  nowActive.classList.add('active');
}

function forEach(arr, cb) {
  for (var i = 0; i < arr.length; i++) {
    cb(arr[i], i, arr);
  }
}

airTrafficRouter();
window.addEventListener('hashchange', airTrafficRouter);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLGlEQUFWLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLG1EQUFWLENBQWpCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLHdDQUFWLENBQWpCO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLDJDQUFWLENBQWhCO0FBQ0EsSUFBSSxjQUFjLEVBQUUsT0FBRixDQUFVLHlCQUFWLENBQWxCO0FBQ0EsSUFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0EsSUFBSSxhQUFhLFNBQVMsYUFBVCxtQ0FBakI7QUFDQSxJQUFJLFlBQVksU0FBUyxhQUFULDRCQUFoQjs7QUFHQSxPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsTUFBdkI7QUFDQSxJQUFJLFdBQVcsT0FBTyxRQUFQLENBQWdCLElBQWhCLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQWY7O0FBRUEsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQVU7QUFDOUIsTUFBRyxhQUFhLFdBQWhCLEVBQTRCO0FBQ3pCO0FBQ0Q7QUFDRixNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWxCO0FBQ0EsYUFBVyxRQUFYO0FBQ0Esa0JBQWdCLFdBQWhCLEVBQTZCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUEyQixDQUEzQixDQUE3QjtBQUNGLENBUEQ7O0FBU0EsU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDLFFBQWhDLEVBQXlDO0FBQ3ZDLE1BQUksWUFBWSxFQUFoQjtBQUNBLE1BQUcsYUFBYSxNQUFoQixFQUF1QjtBQUNyQjs7QUF1QkEsVUFBTSxTQUFOLEdBQWtCLFNBQWxCO0FBRUQ7QUFDRCxNQUFHLGFBQWEsVUFBaEIsRUFBMkI7QUFDdkI7QUFNQSxnQkFBWSxJQUFaLENBQWlCLFVBQVMsU0FBVCxFQUFtQjtBQUNsQyxjQUFRLFVBQVUsT0FBbEIsRUFBMkIsVUFBUyxVQUFULEVBQW9CO0FBQzdDLHlOQUlrQixXQUFXLFdBSjdCLHNFQU1jLFdBQVcsSUFOekIsMENBT21CLFdBQVcsYUFQOUIsbUNBUWEsV0FBVyxVQVJ4QjtBQVlELE9BYkQ7QUFjQTtBQUdBLFlBQU0sU0FBTixHQUFrQixTQUFsQjtBQUNELEtBbkJEO0FBb0JIO0FBQ0QsTUFBRyxhQUFhLFVBQWhCLEVBQTJCO0FBQ3JCO0FBWUYsZUFBVyxJQUFYLENBQWdCLFVBQVMsU0FBVCxFQUFtQjtBQUNqQyxjQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsY0FBUSxVQUFVLE9BQWxCLEVBQTJCLFVBQVMsVUFBVCxFQUFvQjtBQUMvQywyR0FHb0IsV0FBVyxJQUgvQix5Q0FJb0IsV0FBVyxJQUovQix5Q0FLb0IsV0FBVyxFQUwvQjtBQVFDLE9BVEQ7QUFVRTtBQUlGLFlBQU0sU0FBTixHQUFrQixTQUFsQjtBQUNELEtBakJEO0FBa0JIO0FBQ0QsTUFBRyxhQUFhLFNBQWhCLEVBQTBCO0FBQ3hCO0FBb0JBLE1BQUUsSUFBRixDQUFPLFNBQVAsRUFBa0IsVUFBbEIsRUFBOEIsSUFBOUIsQ0FBbUMsVUFBVSxpQkFBVixFQUE2QixtQkFBN0IsRUFBaUQ7QUFDcEYsY0FBUSxrQkFBa0IsQ0FBbEIsRUFBcUIsT0FBN0IsRUFBc0MsVUFBUyxVQUFULEVBQW9CO0FBQ3hELCtGQUdrQixXQUFXLElBSDdCLHFDQUlrQixXQUFXLGNBSjdCLHFDQUtrQixXQUFXLElBTDdCLHFDQU1rQixXQUFXLE9BTjdCO0FBU0QsT0FWRDtBQVdBOztBQWlCQSxjQUFRLG9CQUFvQixDQUFwQixFQUF1QixPQUEvQixFQUF3QyxVQUFTLFVBQVQsRUFBb0I7QUFDMUQsOEZBR2lCLFdBQVcsSUFINUIsb0NBSWlCLFdBQVcsY0FKNUIsb0NBS2lCLFdBQVcsRUFMNUIsb0NBTWlCLFdBQVcsT0FONUI7QUFTRCxPQVZEO0FBV0U7QUFLQSxZQUFNLFNBQU4sR0FBa0IsU0FBbEI7QUFDSCxLQTlDQztBQStDQztBQUNKOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBUyxHQUFULEVBQWE7QUFDOUMsVUFBUSxHQUFSLENBQVksTUFBWjtBQUNBLE1BQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbkI7QUFDQTtBQUNBLE1BQUksWUFBWSxJQUFJLE1BQXBCO0FBQ0QsTUFBSSxRQUFRLFVBQVUsT0FBVixDQUFrQixLQUE5QjtBQUNDLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixLQUF2Qjs7QUFFQSxNQUFJLFVBQVUsU0FBVixDQUFvQixRQUFwQixDQUE2QixNQUE3QixNQUF5QyxJQUE3QyxFQUFrRDtBQUNoRCxZQUFRLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLFdBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixNQUF2QjtBQUNBLG9CQUFnQixZQUFoQixFQUE4QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBOUI7QUFDRDtBQUNELE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLFNBQTdCLE1BQTRDLElBQWhELEVBQXFEO0FBQ25ELFlBQVEsR0FBUixDQUFZLGdCQUFaO0FBQ0EsV0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLFNBQXZCO0FBQ0Esb0JBQWdCLFlBQWhCLEVBQThCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUEyQixDQUEzQixDQUE5QjtBQUNEO0FBQ0QsTUFBSSxVQUFVLFNBQVYsQ0FBb0IsUUFBcEIsQ0FBNkIsVUFBN0IsTUFBNkMsSUFBakQsRUFBc0Q7QUFDcEQsWUFBUSxHQUFSLENBQVksb0JBQVo7QUFDQSxXQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsVUFBdkI7QUFDQSxvQkFBZ0IsWUFBaEIsRUFBNkIsT0FBTyxRQUFQLENBQWdCLElBQWhCLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQTdCO0FBQ0Q7QUFDRCxNQUFJLFVBQVUsU0FBVixDQUFvQixRQUFwQixDQUE2QixVQUE3QixNQUE2QyxJQUFqRCxFQUFzRDtBQUNwRCxZQUFRLEdBQVIsQ0FBWSwwQkFBWjtBQUNBLFdBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixVQUF2QjtBQUNBLG9CQUFnQixZQUFoQixFQUE2QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBN0I7QUFDRDtBQUNGLENBNUJEOztBQThCQSxTQUFTLFVBQVQsQ0FBb0IsUUFBcEIsRUFBNkI7QUFDNUIsYUFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLFFBQTVCO0FBQ0EsWUFBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLFFBQXhCO0FBQ0E7O0FBRUQsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLEVBQXlCO0FBQ3ZCLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxJQUFJLE1BQXhCLEVBQWdDLEdBQWhDLEVBQW9DO0FBQ2xDLE9BQUcsSUFBSSxDQUFKLENBQUgsRUFBVyxDQUFYLEVBQWMsR0FBZDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxPQUFPLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLGdCQUF0QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zb2xlLmxvZygnTXkgaG92ZXJjcmFmdCBpcyBmdWxsIG9mIGVlbHMhJylcbi8vIGt1ZG9zIHRvIEFuZGkgZm9yIGxldHRpbmcgbWUgYWRhcHQgaGVyIG1ldGhvZG9sb2d5XG5sZXQgaW5GbGlnaHRzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9mbGlnaHQ/bGFuZ3VhZ2U9ZW4mdHlwZT1hcnJpdmFscycpXG5sZXQgb3V0RmxpZ2h0cyA9ICQuZ2V0SlNPTignaHR0cDovL2FwaXMuaXMvZmxpZ2h0P2xhbmd1YWdlPWVuJnR5cGU9ZGVwYXJ0dXJlcycpXG5sZXQgZHJpdmVQb29scyA9ICQuZ2V0SlNPTignaHR0cDovL2FwaXMuaXMvcmlkZXMvc2FtZmVyZGEtZHJpdmVycy8nKVxubGV0IHJpZGVQb29scyA9ICQuZ2V0SlNPTignaHR0cDovL2FwaXMuaXMvcmlkZXMvc2FtZmVyZGEtcGFzc2VuZ2Vycy8nKVxubGV0IHZpa2luZ011c2ljID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9jb25jZXJ0cycpXG5sZXQgY2xpY2tlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2JylcbmxldCBsYXN0QWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2NsYXNzPVwiY29sLXNtLTMgbmF2b3AgYWN0aXZlXCJdYClcbmxldCBub3dBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbY2xhc3M9XCJjb2wtc20tMyBuYXZvcFwiXWApXG5cblxud2luZG93LmxvY2F0aW9uLmhhc2ggPSAnaG9tZSdcbmxldCBub3dSb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG5cbmxldCBhaXJUcmFmZmljUm91dGVyID0gZnVuY3Rpb24oKXtcbiAgXHRpZihub3dSb3V0ZSA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgLy8gbm93Um91dGUgPSAnaG9tZSdcbiAgICB9XG4gIFx0bGV0IGRpc3BsYXlab25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3BsYXknKVxuICBcdG1ha2VBY3RpdmUobm93Um91dGUpXG4gIFx0cmVuZGVyQ29udGVudFRvKGRpc3BsYXlab25lLCB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKSlcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29udGVudFRvKGRvbUVsLCBub3dSb3V0ZSl7XG4gIGxldCB0aGVUaGluZ3MgPSAnJ1xuICBpZihub3dSb3V0ZSA9PT0gXCJob21lXCIpe1xuICAgIHRoZVRoaW5ncyA9YFxuICAgIDx0YWJsZSBjbGFzcz0nZmFjdHMnPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+VGhlIEJhc2ljIEZhY3RzPC90aD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD5OYXRpdmUgTmFtZTwvdGQ+XG4gICAgICAgIDx0ZD4mIzIwNTtzbGFuZDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+RGVtb255bTwvdGQ+XG4gICAgICAgIDx0ZD5JY2VsYW5kZXI8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPkFyZWEobTIpPC90ZD5cbiAgICAgICAgPHRkPjEwMzAwMDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+Q2FsbGluZyBDb2RlPC90ZD5cbiAgICAgICAgPHRkPjM1MjwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+YFxuXG4gICAgZG9tRWwuaW5uZXJIVE1MID0gdGhlVGhpbmdzXG5cbiAgfVxuICBpZihub3dSb3V0ZSA9PT0gXCJjb25jZXJ0c1wiKXtcbiAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgIENPTkNFUlRTXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPmBcbiAgICAgIHZpa2luZ011c2ljLnRoZW4oZnVuY3Rpb24oc2VydmVyUmVzKXtcbiAgICAgICAgZm9yRWFjaChzZXJ2ZXJSZXMucmVzdWx0cywgZnVuY3Rpb24odGhpbmdPYmpheSl7XG4gICAgICAgICAgdGhlVGhpbmdzICs9YFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC1tZC00IHRodW1ibmFpbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCB2aXNpYmxlLXhzLWJsb2NrXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dGhpbmdPYmpheS5pbWFnZVNvdXJjZX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgPGg0PiR7dGhpbmdPYmpheS5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cD5WZW51ZToke3RoaW5nT2JqYXkuZXZlbnRIYWxsTmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD4ke3RoaW5nT2JqYXkuZGF0ZU9mU2hvd308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICB9KVxuICAgICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gXG4gICAgICAgIGRvbUVsLmlubmVySFRNTCA9IHRoZVRoaW5nc1xuICAgICAgfSlcbiAgfVxuICBpZihub3dSb3V0ZSA9PT0gXCJjYXJwb29sc1wiKXtcbiAgICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPXJvdz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgQ0FSUE9PTFNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRoPlRpbWUgb2YgRGVwYXJ0dXJlPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5Gcm9tPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5UbzwvdGg+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5gXG4gICAgICBkcml2ZVBvb2xzLnRoZW4oZnVuY3Rpb24oc2VydmVyUmVzKXtcbiAgICAgICAgY29uc29sZS5sb2coc2VydmVyUmVzKTtcbiAgICAgICAgZm9yRWFjaChzZXJ2ZXJSZXMucmVzdWx0cywgZnVuY3Rpb24odGhpbmdPYmpheSl7XG4gICAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmRhdGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmZyb219PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LnRvfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PmBcbiAgICAgICAgfSlcbiAgICAgICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YFxuICAgICAgICBkb21FbC5pbm5lckhUTUwgPSB0aGVUaGluZ3NcbiAgICAgIH0pXG4gIH1cbiAgaWYobm93Um91dGUgPT09IFwiZmxpZ2h0c1wiKXtcbiAgICB0aGVUaGluZ3MgKz0gYFxuICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lci1mbHVpZCBmbGlnaHRzLWNvbnRhaW5lcic+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgIEZMSUdIVFNcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9J3Jvdyc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNiBmbGlnaHRzLWNvbHVtbnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdCBmbGlnaHRzLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIGZsaWdodHMtcGFuZWwtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICBBcnJpdmFsc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5BcnJpdmFsIFRpbWU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5PcmlnaW48L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5BaXJsaW5lPC90aD5cbiAgICAgICAgICAgICAgPC90aGVhZD5gXG4gICAgJC53aGVuKGluRmxpZ2h0cywgb3V0RmxpZ2h0cykudGhlbihmdW5jdGlvbiAoc2VydmVyUmVzQXJyaXZhbHMsIHNlcnZlclJlc0RlcGFydHVyZXMpe1xuICAgIGZvckVhY2goc2VydmVyUmVzQXJyaXZhbHNbMF0ucmVzdWx0cywgZnVuY3Rpb24odGhpbmdPYmpheSl7XG4gICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LnBsYW5uZWRBcnJpdmFsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmZyb219PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkuYWlybGluZX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+YFxuICAgIH0pXG4gICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgZmxpZ2h0cy1jb2x1bW5zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHQgZmxpZ2h0cy1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBmbGlnaHRzLXBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgRGVwYXJ0dXJlc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5EZXBhcnR1cmUgVGltZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPkRlc3RpbmF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+QWlybGluZTwvdGg+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+YFxuXG4gICAgZm9yRWFjaChzZXJ2ZXJSZXNEZXBhcnR1cmVzWzBdLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkucGxhbm5lZEFycml2YWx9PC90ZD5cbiAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS50b308L3RkPlxuICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmFpcmxpbmV9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L2JvZHk+YFxuICAgIH0pXG4gICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gXG4gICAgICBkb21FbC5pbm5lckhUTUwgPSB0aGVUaGluZ3NcbiAgfSlcbiAgICB9XG59XG5cbmNsaWNrZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcbiAgY29uc29sZS5sb2coJ0JBTkcnKVxuICBsZXQgZGlzcGxheVpvbmUyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3BsYXknKVxuICAvLyBsZXQgZGFSb29vb29vb29vb290ID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSlcbiAgbGV0IGNsaWNrVGFyZyA9IGV2dC50YXJnZXRcblx0bGV0IHJvdXRlID0gY2xpY2tUYXJnLmRhdGFzZXQucm91dGVcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZVxuXG4gIGlmIChjbGlja1RhcmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdob21lJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdMZXQgbWUgZ28gaG9tZSEnKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2hvbWUnXG4gICAgcmVuZGVyQ29udGVudFRvKGRpc3BsYXlab25lMiwgd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaWdodHMnKSA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coXCJJJ2xsIGZseSBhd2F5IVwiKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2ZsaWdodHMnXG4gICAgcmVuZGVyQ29udGVudFRvKGRpc3BsYXlab25lMiwgd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnBvb2xzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdMaWZlIGlzIGEgaGlnaHdheSEnKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2NhcnBvb2xzJ1xuICAgIHJlbmRlckNvbnRlbnRUbyhkaXNwbGF5Wm9uZTIsd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmNlcnRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdGb3IgdGhvc2UgYWJvdXQgdG8gcm9jayEnKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2NvbmNlcnRzJ1xuICAgIHJlbmRlckNvbnRlbnRUbyhkaXNwbGF5Wm9uZTIsd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpXG4gIH1cbn0pXG5cbmZ1bmN0aW9uIG1ha2VBY3RpdmUobm93Um91dGUpe1xuXHRsYXN0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdG5vd0FjdGl2ZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoKGFyciwgY2Ipe1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XG4gICAgY2IoYXJyW2ldLCBpLCBhcnIpXG4gIH1cbn1cblxuYWlyVHJhZmZpY1JvdXRlcigpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBhaXJUcmFmZmljUm91dGVyKVxuIl19
