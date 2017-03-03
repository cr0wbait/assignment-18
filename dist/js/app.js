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

function renderContentTo(domEl, theRoute) {
  var theThings = '';
  if (theRoute === 'home') {
    theThings = '\n    <table class=\'facts\'>\n      <tr>\n        <th>The Basic Facts</th>\n      </tr>\n      <tr>\n        <td>Native Name</td>\n        <td>&#205;sland</td>\n      </tr>\n      <tr>\n        <td>Demonym</td>\n        <td>Icelander</td>\n      </tr>\n      <tr>\n        <td>Area(m2)</td>\n        <td>103000</td>\n      </tr>\n      <tr>\n        <td>Calling Code</td>\n        <td>352</td>\n      </tr>\n    </table>';

    domEl.innerHTML = theThings;
  }
  if (theRoute === 'concerts') {
    theThings += '\n        <div class="panel panel-default">\n          <div class="panel-body">\n            CONCERTS\n          </div>\n          <div class="row">';
    vikingMusic.then(function (serverRes) {
      forEach(serverRes.results, function (thingObjay) {
        theThings += '\n            <div class="col-sm-3 col-md-4 thumbnail-container">\n            <div class="clearfix visible-xs-block"></div>\n              <div class="thumbnail">\n                <img src="' + thingObjay.imageSource + '">\n                <div class="info">\n                  <h4>' + thingObjay.name + '</h4>\n                  <p>Venue:' + thingObjay.eventHallName + '</p>\n                  <p>' + thingObjay.dateOfShow + '</p>\n                </div>\n              </div>\n            </div>';
      });
      theThings += '\n          </div>\n        </div>';
      domEl.innerHTML = theThings;
    });
  }
  if (theRoute === 'carpools') {
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
  if (theRoute === 'flights') {
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

var airTrafficRouter = function airTrafficRouter() {
  var nowRoute = window.location.hash.slice(1);
  if (nowRoute.length === 0) {
    nowRoute = 'home';
  }
  var displayZone = document.querySelector('.display');
  renderActive(nowRoute);
  renderContentTo(displayZone, nowRoute);
};

function renderActive(nowRoute) {
  var lastActive = document.querySelector('[class="navop active"]');
  lastActive.classList.remove('active');
  var nowActive = document.querySelector('[data-route="${theCurrentRoute}"]');
  nowActive.classList.add('active');
}

airTrafficRouter();
window.addEventListener('hashchange', airTrafficRouter);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLGlEQUFWLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLG1EQUFWLENBQWpCO0FBQ0EsSUFBSSxhQUFhLEVBQUUsT0FBRixDQUFVLHdDQUFWLENBQWpCO0FBQ0EsSUFBSSxZQUFZLEVBQUUsT0FBRixDQUFVLDJDQUFWLENBQWhCO0FBQ0EsSUFBSSxjQUFjLEVBQUUsT0FBRixDQUFVLHlCQUFWLENBQWxCO0FBQ0EsSUFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFmOztBQUVBLFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQyxRQUFoQyxFQUF5QztBQUN2QyxNQUFJLFlBQVksRUFBaEI7QUFDQSxNQUFHLGFBQWEsTUFBaEIsRUFBdUI7QUFDckI7O0FBdUJBLFVBQU0sU0FBTixHQUFrQixTQUFsQjtBQUVEO0FBQ0QsTUFBRyxhQUFhLFVBQWhCLEVBQTJCO0FBQ3ZCO0FBTUEsZ0JBQVksSUFBWixDQUFpQixVQUFTLFNBQVQsRUFBbUI7QUFDbEMsY0FBUSxVQUFVLE9BQWxCLEVBQTJCLFVBQVMsVUFBVCxFQUFvQjtBQUM3Qyx5TkFJa0IsV0FBVyxXQUo3QixzRUFNYyxXQUFXLElBTnpCLDBDQU9tQixXQUFXLGFBUDlCLG1DQVFhLFdBQVcsVUFSeEI7QUFZRCxPQWJEO0FBY0E7QUFHQSxZQUFNLFNBQU4sR0FBa0IsU0FBbEI7QUFDRCxLQW5CRDtBQW9CSDtBQUNELE1BQUcsYUFBYSxVQUFoQixFQUEyQjtBQUNyQjtBQVlGLGVBQVcsSUFBWCxDQUFnQixVQUFTLFNBQVQsRUFBbUI7QUFDakMsY0FBUSxHQUFSLENBQVksU0FBWjtBQUNBLGNBQVEsVUFBVSxPQUFsQixFQUEyQixVQUFTLFVBQVQsRUFBb0I7QUFDL0MsMkdBR29CLFdBQVcsSUFIL0IseUNBSW9CLFdBQVcsSUFKL0IseUNBS29CLFdBQVcsRUFML0I7QUFRQyxPQVREO0FBVUU7QUFJRixZQUFNLFNBQU4sR0FBa0IsU0FBbEI7QUFDRCxLQWpCRDtBQWtCSDtBQUNELE1BQUcsYUFBYSxTQUFoQixFQUEyQjtBQUN6Qjs7QUFxQkYsTUFBRSxJQUFGLENBQU8sU0FBUCxFQUFrQixVQUFsQixFQUE4QixJQUE5QixDQUFtQyxVQUFVLGlCQUFWLEVBQTZCLG1CQUE3QixFQUFpRDtBQUNsRixjQUFRLGtCQUFrQixDQUFsQixFQUFxQixPQUE3QixFQUFzQyxVQUFTLFVBQVQsRUFBb0I7QUFDeEQsK0ZBR2tCLFdBQVcsSUFIN0IscUNBSWtCLFdBQVcsY0FKN0IscUNBS2tCLFdBQVcsSUFMN0IscUNBTWtCLFdBQVcsT0FON0I7QUFTRCxPQVZEO0FBV0E7O0FBaUJBLGNBQVEsb0JBQW9CLENBQXBCLEVBQXVCLE9BQS9CLEVBQXdDLFVBQVMsVUFBVCxFQUFvQjtBQUMxRCw4RkFHaUIsV0FBVyxJQUg1QixvQ0FJaUIsV0FBVyxjQUo1QixvQ0FLaUIsV0FBVyxFQUw1QixvQ0FNaUIsV0FBVyxPQU41QjtBQVNELE9BVkQ7QUFXRTtBQUtBLFlBQU0sU0FBTixHQUFrQixTQUFsQjtBQUNILEtBOUNEO0FBK0NDO0FBQ0Y7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFTLEdBQVQsRUFBYTtBQUM5QyxVQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsTUFBSSxZQUFZLElBQUksTUFBcEI7QUFDRCxNQUFJLFFBQVEsVUFBVSxPQUFWLENBQWtCLEtBQTlCO0FBQ0EsU0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLEtBQXZCOztBQUVDLE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLE1BQTdCLE1BQXlDLElBQTdDLEVBQWtEO0FBQ2hELFlBQVEsR0FBUixDQUFZLGlCQUFaO0FBQ0Q7QUFDRCxNQUFJLFVBQVUsU0FBVixDQUFvQixRQUFwQixDQUE2QixTQUE3QixNQUE0QyxJQUFoRCxFQUFxRDtBQUNuRCxZQUFRLEdBQVIsQ0FBWSxnQkFBWjtBQUNEO0FBQ0QsTUFBSSxVQUFVLFNBQVYsQ0FBb0IsUUFBcEIsQ0FBNkIsVUFBN0IsTUFBNkMsSUFBakQsRUFBc0Q7QUFDcEQsWUFBUSxHQUFSLENBQVksb0JBQVo7QUFDRDtBQUNELE1BQUksVUFBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLFVBQTdCLE1BQTZDLElBQWpELEVBQXNEO0FBQ3BELFlBQVEsR0FBUixDQUFZLDBCQUFaO0FBQ0Q7QUFDRixDQWxCRDs7QUFvQkEsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQVU7QUFDaEMsTUFBSSxXQUFXLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUEyQixDQUEzQixDQUFmO0FBQ0EsTUFBRyxTQUFTLE1BQVQsS0FBb0IsQ0FBdkIsRUFBeUI7QUFDdEIsZUFBVyxNQUFYO0FBQ0Q7QUFDRixNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWxCO0FBQ0EsZUFBYSxRQUFiO0FBQ0Esa0JBQWdCLFdBQWhCLEVBQTZCLFFBQTdCO0FBQ0EsQ0FSRDs7QUFVQSxTQUFTLFlBQVQsQ0FBc0IsUUFBdEIsRUFBK0I7QUFDOUIsTUFBSSxhQUFhLFNBQVMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBakI7QUFDQSxhQUFXLFNBQVgsQ0FBcUIsTUFBckIsQ0FBNEIsUUFBNUI7QUFDQSxNQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLG1DQUF2QixDQUFoQjtBQUNBLFlBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixRQUF4QjtBQUNBOztBQUVEO0FBQ0EsT0FBTyxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxnQkFBdEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc29sZS5sb2coJ015IGhvdmVyY3JhZnQgaXMgZnVsbCBvZiBlZWxzIScpXG4vLyBrdWRvcyB0byBBbmRpIGZvciBsZXR0aW5nIG1lIGFkYXB0IGhlciBtZXRob2RvbG9neVxubGV0IGluRmxpZ2h0cyA9ICQuZ2V0SlNPTignaHR0cDovL2FwaXMuaXMvZmxpZ2h0P2xhbmd1YWdlPWVuJnR5cGU9YXJyaXZhbHMnKVxubGV0IG91dEZsaWdodHMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL2ZsaWdodD9sYW5ndWFnZT1lbiZ0eXBlPWRlcGFydHVyZXMnKVxubGV0IGRyaXZlUG9vbHMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL3JpZGVzL3NhbWZlcmRhLWRyaXZlcnMvJylcbmxldCByaWRlUG9vbHMgPSAkLmdldEpTT04oJ2h0dHA6Ly9hcGlzLmlzL3JpZGVzL3NhbWZlcmRhLXBhc3NlbmdlcnMvJylcbmxldCB2aWtpbmdNdXNpYyA9ICQuZ2V0SlNPTignaHR0cDovL2FwaXMuaXMvY29uY2VydHMnKVxubGV0IGNsaWNrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpXG5cbmZ1bmN0aW9uIHJlbmRlckNvbnRlbnRUbyhkb21FbCwgdGhlUm91dGUpe1xuICBsZXQgdGhlVGhpbmdzID0gJydcbiAgaWYodGhlUm91dGUgPT09ICdob21lJyl7XG4gICAgdGhlVGhpbmdzID1gXG4gICAgPHRhYmxlIGNsYXNzPSdmYWN0cyc+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD5UaGUgQmFzaWMgRmFjdHM8L3RoPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPk5hdGl2ZSBOYW1lPC90ZD5cbiAgICAgICAgPHRkPiYjMjA1O3NsYW5kPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD5EZW1vbnltPC90ZD5cbiAgICAgICAgPHRkPkljZWxhbmRlcjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+QXJlYShtMik8L3RkPlxuICAgICAgICA8dGQ+MTAzMDAwPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD5DYWxsaW5nIENvZGU8L3RkPlxuICAgICAgICA8dGQ+MzUyPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90YWJsZT5gXG5cbiAgICBkb21FbC5pbm5lckhUTUwgPSB0aGVUaGluZ3NcblxuICB9XG4gIGlmKHRoZVJvdXRlID09PSAnY29uY2VydHMnKXtcbiAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgIENPTkNFUlRTXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPmBcbiAgICAgIHZpa2luZ011c2ljLnRoZW4oZnVuY3Rpb24oc2VydmVyUmVzKXtcbiAgICAgICAgZm9yRWFjaChzZXJ2ZXJSZXMucmVzdWx0cywgZnVuY3Rpb24odGhpbmdPYmpheSl7XG4gICAgICAgICAgdGhlVGhpbmdzICs9YFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC1tZC00IHRodW1ibmFpbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCB2aXNpYmxlLXhzLWJsb2NrXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dGhpbmdPYmpheS5pbWFnZVNvdXJjZX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgPGg0PiR7dGhpbmdPYmpheS5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cD5WZW51ZToke3RoaW5nT2JqYXkuZXZlbnRIYWxsTmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD4ke3RoaW5nT2JqYXkuZGF0ZU9mU2hvd308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICB9KVxuICAgICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gXG4gICAgICAgIGRvbUVsLmlubmVySFRNTCA9IHRoZVRoaW5nc1xuICAgICAgfSlcbiAgfVxuICBpZih0aGVSb3V0ZSA9PT0gJ2NhcnBvb2xzJyl7XG4gICAgICAgIHRoZVRoaW5ncyArPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1yb3c+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgIENBUlBPT0xTXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0aD5UaW1lIG9mIERlcGFydHVyZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+RnJvbTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+VG88L3RoPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+YFxuICAgICAgZHJpdmVQb29scy50aGVuKGZ1bmN0aW9uKHNlcnZlclJlcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlclJlcyk7XG4gICAgICAgIGZvckVhY2goc2VydmVyUmVzLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5mcm9tfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS50b308L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5gXG4gICAgICAgIH0pXG4gICAgICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgZG9tRWwuaW5uZXJIVE1MID0gdGhlVGhpbmdzXG4gICAgICB9KVxuICB9XG4gIGlmKHRoZVJvdXRlID09PSAnZmxpZ2h0cycgKXtcbiAgICB0aGVUaGluZ3MgKz0gYFxuICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lci1mbHVpZCBmbGlnaHRzLWNvbnRhaW5lcic+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgIEZMSUdIVFNcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9J3Jvdyc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNiBmbGlnaHRzLWNvbHVtbnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdCBmbGlnaHRzLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIGZsaWdodHMtcGFuZWwtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICBBcnJpdmFsc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5BcnJpdmFsIFRpbWU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5PcmlnaW48L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5BaXJsaW5lPC90aD5cbiAgICAgICAgICAgICAgPC90aGVhZD5gXG5cbiAgJC53aGVuKGluRmxpZ2h0cywgb3V0RmxpZ2h0cykudGhlbihmdW5jdGlvbiAoc2VydmVyUmVzQXJyaXZhbHMsIHNlcnZlclJlc0RlcGFydHVyZXMpe1xuICAgIGZvckVhY2goc2VydmVyUmVzQXJyaXZhbHNbMF0ucmVzdWx0cywgZnVuY3Rpb24odGhpbmdPYmpheSl7XG4gICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LnBsYW5uZWRBcnJpdmFsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmZyb219PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkuYWlybGluZX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+YFxuICAgIH0pXG4gICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgZmxpZ2h0cy1jb2x1bW5zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHQgZmxpZ2h0cy1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBmbGlnaHRzLXBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgRGVwYXJ0dXJlc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5EZXBhcnR1cmUgVGltZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPkRlc3RpbmF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+QWlybGluZTwvdGg+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+YFxuXG4gICAgZm9yRWFjaChzZXJ2ZXJSZXNEZXBhcnR1cmVzWzBdLnJlc3VsdHMsIGZ1bmN0aW9uKHRoaW5nT2JqYXkpe1xuICAgICAgdGhlVGhpbmdzICs9IGBcbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgIDx0ZD4ke3RoaW5nT2JqYXkucGxhbm5lZEFycml2YWx9PC90ZD5cbiAgICAgICAgICAgICAgICAgPHRkPiR7dGhpbmdPYmpheS50b308L3RkPlxuICAgICAgICAgICAgICAgICA8dGQ+JHt0aGluZ09iamF5LmFpcmxpbmV9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L2JvZHk+YFxuICAgIH0pXG4gICAgICB0aGVUaGluZ3MgKz0gYFxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gXG4gICAgICBkb21FbC5pbm5lckhUTUwgPSB0aGVUaGluZ3NcbiAgfSlcbiAgfVxufVxuXG5jbGlja2Vycy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gIGNvbnNvbGUubG9nKCdCQU5HJylcbiAgbGV0IGNsaWNrVGFyZyA9IGV2dC50YXJnZXRcblx0bGV0IHJvdXRlID0gY2xpY2tUYXJnLmRhdGFzZXQucm91dGVcblx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZVxuXG4gIGlmIChjbGlja1RhcmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdob21lJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdMZXQgbWUgZ28gaG9tZSEnKVxuICB9XG4gIGlmIChjbGlja1RhcmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlnaHRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiSSdsbCBmbHkgYXdheSFcIilcbiAgfVxuICBpZiAoY2xpY2tUYXJnLmNsYXNzTGlzdC5jb250YWlucygnY2FycG9vbHMnKSA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coJ0xpZmUgaXMgYSBoaWdod2F5IScpXG4gIH1cbiAgaWYgKGNsaWNrVGFyZy5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmNlcnRzJykgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdGb3IgdGhvc2UgYWJvdXQgdG8gcm9jayEnKVxuICB9XG59KVxuXG5sZXQgYWlyVHJhZmZpY1JvdXRlciA9IGZ1bmN0aW9uKCl7XG5cdGxldCBub3dSb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG5cdGlmKG5vd1JvdXRlLmxlbmd0aCA9PT0gMCl7XG4gICAgbm93Um91dGUgPSAnaG9tZSdcbiAgfVxuXHRsZXQgZGlzcGxheVpvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzcGxheScpXG5cdHJlbmRlckFjdGl2ZShub3dSb3V0ZSlcblx0cmVuZGVyQ29udGVudFRvKGRpc3BsYXlab25lLCBub3dSb3V0ZSlcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWN0aXZlKG5vd1JvdXRlKXtcblx0bGV0IGxhc3RBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJuYXZvcCBhY3RpdmVcIl0nKVxuXHRsYXN0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdGxldCBub3dBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb3V0ZT1cIiR7dGhlQ3VycmVudFJvdXRlfVwiXScpXG5cdG5vd0FjdGl2ZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5haXJUcmFmZmljUm91dGVyKClcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgYWlyVHJhZmZpY1JvdXRlcilcbiJdfQ==
