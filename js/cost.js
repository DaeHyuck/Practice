var hotel = {
  budgetPrice: 70,
  luxuryPrice: 200,
  tax: 0.1,
  nights: 1,
  rooms: 1,
  code: 'b',
  type: 'budget',
  roomCost: 0,
  calcCost: function() {
    if (document.getElementById('hotel').value == "b") {
      this.roomCost = this.budgetPrice
      return this.roomCost * this.nights * this.rooms + (this.roomCost * this.nights * this.rooms * this.tax);
    } else {
      this.roomCost = this.luxuryPrice
      return this.roomCost * this.nights * this.rooms + (this.roomCost * this.nights * this.rooms * this.tax);
    }
  }
};

var dinner = {
  entreeCost: 18.99,
  starterCost: 10.99,
  dessertCost: 6.99,
  childMealCost: 8.99,
  mealTax: 0.1,
  tip: 0.2,
  numAdults: 1,
  numChildren: 0,
  setNumAdults: function() {
    this.numAdults = Number(document.getElementById('adults').value);
    return this.numAdults.value;
  },
  setNumChildren: function() {
    this.numChildren = Number(document.getElementById('children').value);
    return this.numChildren.value;
  },
  calcMealCost: function() {
    return dinner.starterCost /*에피타이저*/ + (dinner.dessertCost * (dinner.numAdults + dinner.numChildren)) /*디저트*/ + (dinner.entreeCost * dinner.numAdults) /*어른밥*/ + (dinner.childMealCost * dinner.numChildren); /*어린이밥*/
  }
};

var message = "Total cost is $"; // V번 문제
var mealCost = dinner.calcMealCost();
var totalCost = message.concat(mealCost);

var span = document.createElement('span');
span.setAttribute('class', 'cost');
span += '$' + mealCost;

var paragraph = document.createElement('p');
paragraph.setAttribute('id', 'dinner');
paragraph.textContent = span;

function updateHotel() {
  var hotelElem = document.getElementById("hotel");
  hotel.code = hotelElem.options[hotelElem.selectedIndex].value;
  hotel.type = hotelElem.options[hotelElem.selectedIndex].text;
  displayCosts();
}

function updateNights() {
  var upNights = Number(document.getElementById('nights').value);
  if (upNights < 1) {
    alert("The number of nights must be 1 or more!");
    document.getElementById('nights').value = hotel.nights;
  } else {
    hotel.nights = upNights;
    displayCosts();
  }
}

function updateRooms() {
  var upRooms = Number(document.getElementById('rooms').value);
  if (upRooms < 1) {
    alert("The number of rooms must be 1 or more!");
    document.getElementById('rooms').value = hotel.rooms;
  } else {
    hotel.rooms = upRooms;
    displayCosts();
  }
}

function updateAdults() {
  var upAdults = Number(document.getElementById('adults').value);
  if (upAdults < 1) {
    alert("The number of adults must be 1 or more!");
    document.getElementById('adults').value = dinner.numAdults;
  } else {
    dinner.numAdults = upAdults;
    displayCosts();
  }
}

function updateChildren() {
  var upChildren = Number(document.getElementById('children').value);
  if (upChildren < 0) {
    alert("The number of children must be 0 or more!");
    document.getElementById('children').value = dinner.numChildren;
  } else {
    dinner.numChildren = upChildren;
    displayCosts();
  }
}

function displayCosts() {
  var calculatedHotel = hotel.calcCost().toFixed(2);
  var calculatedDinner = dinner.calcMealCost().toFixed(2);
  var results = "<table>";
  results += "<caption>Your " + hotel.type + "Hotel Stay:</caption>";
  results += "<tr><td>Cost per night</td><td>$" + hotel.roomCost + "</td></tr>" + "<tr><td>Number of night</td><td>" + hotel.nights + "</td></tr>" + "<tr><td>Number of rooms</td><td>" + hotel.rooms + "</td></tr>" + "<tr><td>Hotel tax</td><td>$" + (hotel.roomCost * hotel.nights * hotel.rooms * hotel.tax) + "</td></tr>" + "<tr><td>Total cost</td><td>$" + calculatedHotel + "</td></tr>" + "</table>";

  results += "<table><caption>Your Estimated Dinner Cost:</caption><tr><th>Item</th><th>Cost</th><th>Number</th><th>line-item Total</th></tr>" + "<tr><td>appetizer</td><td>$" + dinner.starterCost + "</td><td>1</td><td>$" + dinner.starterCost + "</td></tr>" +
    "<tr><td>adult entrees</td><td>$" + dinner.entreeCost + "</td><td>" + dinner.numAdults + "</td><td>$" + (dinner.entreeCost * dinner.numAdults).toFixed(2) + "</td></tr>" +
    "<tr><td>children's meals</td><td>$" + dinner.childMealCost + "</td><td>" + dinner.numChildren + "</td><td>$" + (dinner.childMealCost * dinner.numChildren).toFixed(2) + "</td></tr>" +
    "<tr><td>dessert</td><td>$" + dinner.dessertCost + "</td><td>" + (dinner.numAdults + dinner.numChildren) + "</td><td>$" + (dinner.dessertCost * (dinner.numAdults + dinner.numChildren)).toFixed(2) + "</td></tr>" +
    "<tr><td>tax</td><td>" + dinner.mealTax + "</td><td></td><td>$" + (calculatedDinner * 0.1).toFixed(2) + "</td></tr><tr><td>tip</td><td>" + dinner.tip + "</td><td></td><td>$" + ((calculatedDinner * 0.9) * 0.2).toFixed(2) + "</td></tr>" + "<tr><td>grand total</td><td></td><td></td><td>$" + (calculatedDinner * 1.1 + ((calculatedDinner * 0.9) * 0.2)).toFixed(2) + "</td></tr></table>";
  document.getElementById('results').innerHTML = results;
}
