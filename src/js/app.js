console.log('My hovercraft is full of eels!')
// kudos to Andi for letting me adapt her methodology
let inFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals')
let outFlights = $.getJSON('http://apis.is/flight?language=en&type=departures')
let drivePools = $.getJSON('http://apis.is/rides/samferda-drivers/')
let ridePools = $.getJSON('http://apis.is/rides/samferda-passengers/')
let vikingMusic = $.getJSON('http://apis.is/concerts')
let clickers = document.querySelector('.nav')
let nowRoute = window.location.hash.slice(1)
console.log(nowRoute)

function renderContentTo(domEl, theRoute){
  let theThings = ''
  if(theRoute === 'home'){
    theThings =`
    <table class='facts'>
      <tr>
        <th>The Basic Facts</th>
      </tr>
      <tr>
        <td>Native Name</td>
        <td>&#205;sland</td>
      </tr>
      <tr>
        <td>Demonym</td>
        <td>Icelander</td>
      </tr>
      <tr>
        <td>Area(m2)</td>
        <td>103000</td>
      </tr>
      <tr>
        <td>Calling Code</td>
        <td>352</td>
      </tr>
    </table>`

    domEl.innerHTML = theThings

  }
  if(theRoute === 'concerts'){
      theThings += `
        <div class="panel panel-default">
          <div class="panel-body">
            CONCERTS
          </div>
          <div class="row">`
      vikingMusic.then(function(serverRes){
        forEach(serverRes.results, function(thingObjay){
          theThings +=`
            <div class="col-sm-3 col-md-4 thumbnail-container">
            <div class="clearfix visible-xs-block"></div>
              <div class="thumbnail">
                <img src="${thingObjay.imageSource}">
                <div class="info">
                  <h4>${thingObjay.name}</h4>
                  <p>Venue:${thingObjay.eventHallName}</p>
                  <p>${thingObjay.dateOfShow}</p>
                </div>
              </div>
            </div>`
        })
        theThings += `
          </div>
        </div>`
        domEl.innerHTML = theThings
      })
  }
  if(theRoute === 'carpools'){
        theThings += `
          <div class=row>
            <div class="panel panel-default">
              <div class="panel-heading">
                CARPOOLS
              </div>
              <table class="table">
                <thead>
                  <th>Time of Departure</th>
                  <th>From</th>
                  <th>To</th>
                </thead>`
      drivePools.then(function(serverRes){
        console.log(serverRes);
        forEach(serverRes.results, function(thingObjay){
        theThings += `
                  <tbody>
                    <tr>
                      <td>${thingObjay.date}</td>
                      <td>${thingObjay.from}</td>
                      <td>${thingObjay.to}</td>
                    </tr>
                  </tbody>`
        })
          theThings += `
              </table>
            </div>
          </div>`
        domEl.innerHTML = theThings
      })
  }
  if(theRoute === 'flights' ){
    theThings += `
    <div class='container-fluid flights-container'>
      <div class="panel panel-default">
        <div class="panel-body">
          FLIGHTS
        </div>
      </div>
      <div class='row'>
        <div class="col-md-6 flights-columns">
          <div class="panel panel-default flights-content">
            <div class="panel-heading flights-panel-heading">
              Arrivals
            </div>
            <table class="table">
              <thead>
                <th>Date</th>
                <th>Arrival Time</th>
                <th>Origin</th>
                <th>Airline</th>
              </thead>`
    $.when(inFlights, outFlights).then(function (serverResArrivals, serverResDepartures){
    forEach(serverResArrivals[0].results, function(thingObjay){
      theThings += `
              <tbody>
                <tr>
                  <td>${thingObjay.date}</td>
                  <td>${thingObjay.plannedArrival}</td>
                  <td>${thingObjay.from}</td>
                  <td>${thingObjay.airline}</td>
                </tr>
              </tbody>`
    })
    theThings += `
            </table>
          </div>
        </div>
        <div class="col-md-6 flights-columns">
          <div class="panel panel-default flights-content">
            <div class="panel-heading flights-panel-heading">
              Departures
            </div>
            <table class="table">
              <thead>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Destination</th>
                <th>Airline</th>
              </thead>`

    forEach(serverResDepartures[0].results, function(thingObjay){
      theThings += `
              <tbody>
                <tr>
                 <td>${thingObjay.date}</td>
                 <td>${thingObjay.plannedArrival}</td>
                 <td>${thingObjay.to}</td>
                 <td>${thingObjay.airline}</td>
                </tr>
              </body>`
    })
      theThings += `
            </table>
          </div>
        </div>
      </div>`
      domEl.innerHTML = theThings
  })
    }
}

clickers.addEventListener('click', function(evt){
  console.log('BANG')
  let clickTarg = evt.target
	let route = clickTarg.dataset.route
	window.location.hash = route

  if (clickTarg.classList.contains('home') === true){
    console.log('Let me go home!')
  }
  if (clickTarg.classList.contains('flights') === true){
    console.log("I'll fly away!")
  }
  if (clickTarg.classList.contains('carpools') === true){
    console.log('Life is a highway!')
  }
  if (clickTarg.classList.contains('concerts') === true){
    console.log('For those about to rock!')
  }
})

let airTrafficRouter = function(){
  	if(nowRoute === 'undefined'){
      nowRoute = 'home'
    }
  	let displayZone = document.querySelector('.display')
  	makeActive(nowRoute)
  	renderContentTo(displayZone, nowRoute)
}


function makeActive(nowRoute){
	let lastActive = document.querySelector(`[class="col-sm-3 navop active"]`)
	lastActive.classList.remove('active')
	let nowActive = document.querySelector(`[class="col-sm-3 navop" data-route="${nowRoute}"]`)
	nowActive.classList.add('active')
}

airTrafficRouter();
window.addEventListener('hashchange', airTrafficRouter)
