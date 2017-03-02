console.log('wat')

let talkaboutInboundFlights = $.getJSON('http://apis.is/flight?language=en&type=arrivals')
let talkaboutOutboundFlights = $.getJSON('http://apis.is/flight?language=en&type=departures')
let navOps = document.querySelector('.navop')
function renderContentTo(domEl, theRoute){
  let allThangs = ''
  if (theRoute === 'home')
}
