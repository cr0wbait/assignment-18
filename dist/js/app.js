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
var nowRoute = window.location.hash.slice(1);
console.log(nowRoute);

var airTrafficRouter = function airTrafficRouter() {
  if (nowRoute === 'undefined') {
    nowRoute = 'home';
  }
  var displayZone = document.querySelector('.display');
  makeActive(nowRoute);
  renderContentTo(displayZone, nowRoute);
};

function renderContentTo(domEl, theRoute) {
  var theThings = '';
  if (theRoute === "home") {
    theThings = '\n    <table class=\'facts\'>\n      <tr>\n        <th>The Basic Facts</th>\n      </tr>\n      <tr>\n        <td>Native Name</td>\n        <td>&#205;sland</td>\n      </tr>\n      <tr>\n        <td>Demonym</td>\n        <td>Icelander</td>\n      </tr>\n      <tr>\n        <td>Area(m2)</td>\n        <td>103000</td>\n      </tr>\n      <tr>\n        <td>Calling Code</td>\n        <td>352</td>\n      </tr>\n    </table>';

    domEl.innerHTML = theThings;
  }
  if (theRoute === "concerts") {
    theThings += '\n        <div class="panel panel-default">\n          <div class="panel-body">\n            CONCERTS\n          </div>\n          <div class="row">';
    vikingMusic.then(function (serverRes) {
      forEach(serverRes.results, function (thingObjay) {
        theThings += '\n            <div class="col-sm-3 col-md-4 thumbnail-container">\n            <div class="clearfix visible-xs-block"></div>\n              <div class="thumbnail">\n                <img src="' + thingObjay.imageSource + '">\n                <div class="info">\n                  <h4>' + thingObjay.name + '</h4>\n                  <p>Venue:' + thingObjay.eventHallName + '</p>\n                  <p>' + thingObjay.dateOfShow + '</p>\n                </div>\n              </div>\n            </div>';
      });
      theThings += '\n          </div>\n        </div>';
      domEl.innerHTML = theThings;
    });
  }
  if (theRoute === "carpools") {
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
  if (theRoute === "flights") {
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
  var clickTarg = evt.target;
  var route = clickTarg.dataset.route;
  window.location.hash = route;

  if (clickTarg.classList.contains('home') === true) {
    console.log('Let me go home!');
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

function makeActive(nowRoute) {
  var lastActive = document.querySelector('[class="col-sm-3 navop active"]');
  lastActive.classList.remove('active');
  var nowActive = document.querySelector('[class="col-sm-3 navop" data-route="' + nowRoute + '"]');
  nowActive.classList.add('active');
}

airTrafficRouter();
window.addEventListener('hashchange', airTrafficRouter);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLGlEQUFWLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLG1EQUFWLENBQWpCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLHdDQUFWLENBQWpCO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLDJDQUFWLENBQWhCO0FBQ0EsSUFBSSxjQUFjLEVBQUUsT0FBRixDQUFVLHlCQUFWLENBQWxCO0FBQ0EsSUFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0EsSUFBSSxXQUFXLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUEyQixDQUEzQixDQUFmO0FBQ0EsUUFBUSxHQUFSLENBQVksUUFBWjs7QUFFQSxJQUFJLG1CQUFtQixTQUFuQixnQkFBbUIsR0FBVTtBQUM5QixNQUFHLGFBQWEsV0FBaEIsRUFBNEI7QUFDekIsZUFBVyxNQUFYO0FBQ0Q7QUFDRixNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWxCO0FBQ0EsYUFBVyxRQUFYO0FBQ0Esa0JBQWdCLFdBQWhCLEVBQTZCLFFBQTdCO0FBQ0YsQ0FQRDs7QUFTQSxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0MsUUFBaEMsRUFBeUM7QUFDdkMsTUFBSSxZQUFZLEVBQWhCO0FBQ0EsTUFBRyxhQUFhLE1BQWhCLEVBQXVCO0FBQ3JCOztBQXVCQSxVQUFNLFNBQU4sR0FBa0IsU0FBbEI7QUFFRDtBQUNELE1BQUcsYUFBYSxVQUFoQixFQUEyQjtBQUN2QjtBQU1BLGdCQUFZLElBQVosQ0FBaUIsVUFBUyxTQUFULEVBQW1CO0FBQ2xDLGNBQVEsVUFBVSxPQUFsQixFQUEyQixVQUFTLFVBQVQsRUFBb0I7QUFDN0MseU5BSWtCLFdBQVcsV0FKN0Isc0VBTWMsV0FBVyxJQU56QiwwQ0FPbUIsV0FBVyxhQVA5QixtQ0FRYSxXQUFXLFVBUnhCO0FBWUQsT0FiRDtBQWNBO0FBR0EsWUFBTSxTQUFOLEdBQWtCLFNBQWxCO0FBQ0QsS0FuQkQ7QUFvQkg7QUFDRCxNQUFHLGFBQWEsVUFBaEIsRUFBMkI7QUFDckI7QUFZRixlQUFXLElBQVgsQ0FBZ0IsVUFBUyxTQUFULEVBQW1CO0FBQ2pDLGNBQVEsR0FBUixDQUFZLFNBQVo7QUFDQSxjQUFRLFVBQVUsT0FBbEIsRUFBMkIsVUFBUyxVQUFULEVBQW9CO0FBQy9DLDJHQUdvQixXQUFXLElBSC9CLHlDQUlvQixXQUFXLElBSi9CLHlDQUtvQixXQUFXLEVBTC9CO0FBUUMsT0FURDtBQVVFO0FBSUYsWUFBTSxTQUFOLEdBQWtCLFNBQWxCO0FBQ0QsS0FqQkQ7QUFrQkg7QUFDRCxNQUFHLGFBQWEsU0FBaEIsRUFBMEI7QUFDeEI7QUFvQkEsTUFBRSxJQUFGLENBQU8sU0FBUCxFQUFrQixVQUFsQixFQUE4QixJQUE5QixDQUFtQyxVQUFVLGlCQUFWLEVBQTZCLG1CQUE3QixFQUFpRDtBQUNwRixjQUFRLGtCQUFrQixDQUFsQixFQUFxQixPQUE3QixFQUFzQyxVQUFTLFVBQVQsRUFBb0I7QUFDeEQsK0ZBR2tCLFdBQVcsSUFIN0IscUNBSWtCLFdBQVcsY0FKN0IscUNBS2tCLFdBQVcsSUFMN0IscUNBTWtCLFdBQVcsT0FON0I7QUFTRCxPQVZEO0FBV0E7O0FBaUJBLGNBQVEsb0JBQW9CLENBQXBCLEVBQXVCLE9BQS9CLEVBQXdDLFVBQVMsVUFBVCxFQUFvQjtBQUMxRCw4RkFHaUIsV0FBVyxJQUg1QixvQ0FJaUIsV0FBVyxjQUo1QixvQ0FLaUIsV0FBVyxFQUw1QixvQ0FNaUIsV0FBVyxPQU41QjtBQVNELE9BVkQ7QUFXRTtBQUtBLFlBQU0sU0FBTixHQUFrQixTQUFsQjtBQUNILEtBOUNDO0FBK0NDO0FBQ0o7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFTLEdBQVQsRUFBYTtBQUM5QyxVQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsTUFBSSxZQUFZLElBQUksTUFBcEI7QUFDRCxNQUFJLFFBQVEsVUFBVSxPQUFWLENBQWtCLEtBQTlCO0FBQ0EsU0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLEtBQXZCOztBQUVDLE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLE1BQTdCLE1BQXlDLElBQTdDLEVBQWtEO0FBQ2hELFlBQVEsR0FBUixDQUFZLGlCQUFaO0FBQ0Q7QUFDRCxNQUFJLFVBQVUsU0FBVixDQUFvQixRQUFwQixDQUE2QixTQUE3QixNQUE0QyxJQUFoRCxFQUFxRDtBQUNuRCxZQUFRLEdBQVIsQ0FBWSxnQkFBWjtBQUNEO0FBQ0QsTUFBSSxVQUFVLFNBQVYsQ0FBb0IsUUFBcEIsQ0FBNkIsVUFBN0IsTUFBNkMsSUFBakQsRUFBc0Q7QUFDcEQsWUFBUSxHQUFSLENBQVksb0JBQVo7QUFDRDtBQUNELE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLFVBQTdCLE1BQTZDLElBQWpELEVBQXNEO0FBQ3BELFlBQVEsR0FBUixDQUFZLDBCQUFaO0FBQ0Q7QUFDRixDQWxCRDs7QUFvQkEsU0FBUyxVQUFULENBQW9CLFFBQXBCLEVBQTZCO0FBQzVCLE1BQUksYUFBYSxTQUFTLGFBQVQsbUNBQWpCO0FBQ0EsYUFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLFFBQTVCO0FBQ0EsTUFBSSxZQUFZLFNBQVMsYUFBVCwwQ0FBOEQsUUFBOUQsUUFBaEI7QUFDQSxZQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsUUFBeEI7QUFDQTs7QUFFRDtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsZ0JBQXRDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnNvbGUubG9nKCdNeSBob3ZlcmNyYWZ0IGlzIGZ1bGwgb2YgZWVscyEnKVxuLy8ga3Vkb3MgdG8gQW5kaSBmb3IgbGV0dGluZyBtZSBhZGFwdCBoZXIgbWV0aG9kb2xvZ3lcbmxldCBpbkZsaWdodHMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL2ZsaWdodD9sYW5ndWFnZT1lbiZ0eXBlPWFycml2YWxzJylcbmxldCBvdXRGbGlnaHRzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9mbGlnaHQ/bGFuZ3VhZ2U9ZW4mdHlwZT1kZXBhcnR1cmVzJylcbmxldCBkcml2ZVBvb2xzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9yaWRlcy9zYW1mZXJkYS1kcml2ZXJzLycpXG5sZXQgcmlkZVBvb2xzID0gJC5nZXRKU09OKCdodHRwOi8vYXBpcy5pcy9yaWRlcy9zYW1mZXJkYS1wYXNzZW5nZXJzLycpXG5sZXQgdmlraW5nTXVzaWMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL2NvbmNlcnRzJylcbmxldCBjbGlja2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKVxubGV0IG5vd1JvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSlcbmNvbnNvbGUubG9nKG5vd1JvdXRlKVxuXG5sZXQgYWlyVHJhZmZpY1JvdXRlciA9IGZ1bmN0aW9uKCl7XG4gIFx0aWYobm93Um91dGUgPT09ICd1bmRlZmluZWQnKXtcbiAgICAgIG5vd1JvdXRlID0gJ2hvbWUnXG4gICAgfVxuICBcdGxldCBkaXNwbGF5Wm9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5JylcbiAgXHRtYWtlQWN0aXZlKG5vd1JvdXRlKVxuICBcdHJlbmRlckNvbnRlbnRUbyhkaXNwbGF5Wm9uZSwgbm93Um91dGUpXG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbnRlbnRUbyhkb21FbCwgdGhlUm91dGUpe1xuICBsZXQgdGhlVGhpbmdzID0gJydcbiAgaWYodGhlUm91dGUgPT09IFwiaG9tZVwiKXtcbiAgICB0aGVUaGluZ3MgPWBcbiAgICA8dGFibGUgY2xhc3M9J2ZhY3RzJz5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoPlRoZSBCYXNpYyBGYWN0czwvdGg+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+TmF0aXZlIE5hbWU8L3RkPlxuICAgICAgICA8dGQ+JiMyMDU7c2xhbmQ8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPkRlbW9ueW08L3RkPlxuICAgICAgICA8dGQ+SWNlbGFuZGVyPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD5BcmVhKG0yKTwvdGQ+XG4gICAgICAgIDx0ZD4xMDMwMDA8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPkNhbGxpbmcgQ29kZTwvdGQ+XG4gICAgICAgIDx0ZD4zNTI8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPmBcblxuICAgIGRvbUVsLmlubmVySFRNTCA9IHRoZVRoaW5nc1xuXG4gIH1cbiAgaWYodGhlUm91dGUgPT09IFwiY29uY2VydHNcIil7XG4gICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICBDT05DRVJUU1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5gXG4gICAgICB2aWtpbmdNdXNpYy50aGVuKGZ1bmN0aW9uKHNlcnZlclJlcyl7XG4gICAgICAgIGZvckVhY2goc2VydmVyUmVzLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgICAgIHRoZVRoaW5ncyArPWBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wtbWQtNCB0aHVtYm5haWwtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggdmlzaWJsZS14cy1ibG9ja1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGh1bWJuYWlsXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RoaW5nT2JqYXkuaW1hZ2VTb3VyY2V9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cbiAgICAgICAgICAgICAgICAgIDxoND4ke3RoaW5nT2JqYXkubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgPHA+VmVudWU6JHt0aGluZ09iamF5LmV2ZW50SGFsbE5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+JHt0aGluZ09iamF5LmRhdGVPZlNob3d9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgfSlcbiAgICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICBkb21FbC5pbm5lckhUTUwgPSB0aGVUaGluZ3NcbiAgICAgIH0pXG4gIH1cbiAgaWYodGhlUm91dGUgPT09IFwiY2FycG9vbHNcIil7XG4gICAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1yb3c+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgIENBUlBPT0xTXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0aD5UaW1lIG9mIERlcGFydHVyZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+RnJvbTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+VG88L3RoPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+YFxuICAgICAgZHJpdmVQb29scy50aGVuKGZ1bmN0aW9uKHNlcnZlclJlcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlclJlcyk7XG4gICAgICAgIGZvckVhY2goc2VydmVyUmVzLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5mcm9tfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS50b308L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5gXG4gICAgICAgIH0pXG4gICAgICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgZG9tRWwuaW5uZXJIVE1MID0gdGhlVGhpbmdzXG4gICAgICB9KVxuICB9XG4gIGlmKHRoZVJvdXRlID09PSBcImZsaWdodHNcIil7XG4gICAgdGhlVGhpbmdzICs9IGBcbiAgICA8ZGl2IGNsYXNzPSdjb250YWluZXItZmx1aWQgZmxpZ2h0cy1jb250YWluZXInPlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICBGTElHSFRTXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgZmxpZ2h0cy1jb2x1bW5zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHQgZmxpZ2h0cy1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBmbGlnaHRzLXBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgQXJyaXZhbHNcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0aD5EYXRlPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+QXJyaXZhbCBUaW1lPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+T3JpZ2luPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+QWlybGluZTwvdGg+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+YFxuICAgICQud2hlbihpbkZsaWdodHMsIG91dEZsaWdodHMpLnRoZW4oZnVuY3Rpb24gKHNlcnZlclJlc0Fycml2YWxzLCBzZXJ2ZXJSZXNEZXBhcnR1cmVzKXtcbiAgICBmb3JFYWNoKHNlcnZlclJlc0Fycml2YWxzWzBdLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkuZGF0ZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5wbGFubmVkQXJyaXZhbH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5mcm9tfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmFpcmxpbmV9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PmBcbiAgICB9KVxuICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGZsaWdodHMtY29sdW1uc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IGZsaWdodHMtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmcgZmxpZ2h0cy1wYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgIERlcGFydHVyZXNcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0aD5EYXRlPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+RGVwYXJ0dXJlIFRpbWU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5EZXN0aW5hdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPkFpcmxpbmU8L3RoPlxuICAgICAgICAgICAgICA8L3RoZWFkPmBcblxuICAgIGZvckVhY2goc2VydmVyUmVzRGVwYXJ0dXJlc1swXS5yZXN1bHRzLCBmdW5jdGlvbih0aGluZ09iamF5KXtcbiAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkuZGF0ZX08L3RkPlxuICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LnBsYW5uZWRBcnJpdmFsfTwvdGQ+XG4gICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkudG99PC90ZD5cbiAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5haXJsaW5lfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC9ib2R5PmBcbiAgICB9KVxuICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YFxuICAgICAgZG9tRWwuaW5uZXJIVE1MID0gdGhlVGhpbmdzXG4gIH0pXG4gICAgfVxufVxuXG5jbGlja2Vycy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gIGNvbnNvbGUubG9nKCdCQU5HJylcbiAgbGV0IGNsaWNrVGFyZyA9IGV2dC50YXJnZXRcblx0bGV0IHJvdXRlID0gY2xpY2tUYXJnLmRhdGFzZXQucm91dGVcblx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZVxuXG4gIGlmIChjbGlja1RhcmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdob21lJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdMZXQgbWUgZ28gaG9tZSEnKVxuICB9XG4gIGlmIChjbGlja1RhcmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlnaHRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiSSdsbCBmbHkgYXdheSFcIilcbiAgfVxuICBpZiAoY2xpY2tUYXJnLmNsYXNzTGlzdC5jb250YWlucygnY2FycG9vbHMnKSA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coJ0xpZmUgaXMgYSBoaWdod2F5IScpXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmNlcnRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdGb3IgdGhvc2UgYWJvdXQgdG8gcm9jayEnKVxuICB9XG59KVxuXG5mdW5jdGlvbiBtYWtlQWN0aXZlKG5vd1JvdXRlKXtcblx0bGV0IGxhc3RBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbY2xhc3M9XCJjb2wtc20tMyBuYXZvcCBhY3RpdmVcIl1gKVxuXHRsYXN0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdGxldCBub3dBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbY2xhc3M9XCJjb2wtc20tMyBuYXZvcFwiIGRhdGEtcm91dGU9XCIke25vd1JvdXRlfVwiXWApXG5cdG5vd0FjdGl2ZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5haXJUcmFmZmljUm91dGVyKCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGFpclRyYWZmaWNSb3V0ZXIpXG4iXX0=
