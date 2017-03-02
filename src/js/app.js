console.log('My hovercraft is full of eels!')

let inFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals')
let outFlights = $.getJSON('http://apis.is/flight?language=en&type=departures')
let drivePools = $.getJSON('http://apis.is/rides/samferda-drivers/')
let ridePools = $.getJSON('http://apis.is/rides/samferda-passengers/')
let vikingMusic = $.getJSON('http://apis.is/concerts')

let clickers = document.querySelector('.nav')

clickers.addEventListener('click', function(evt){
  console.log('BANG')
  var clickTarg = evt.target
  if (clickTarg.classList.contains('home') === true){
    console.log('Let me go home!')
    if (clickTarg.parent.classList.contains('active') === true){
      clickTarg.parent.classList.remove('active')
      clickTarg.parent.classList.add('inactive')
    } else {
      clickTarg.parent.classList.add('active')
    }

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
