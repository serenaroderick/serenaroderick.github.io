var hist = [];
var current = 0;
var previous = 0;
var operation = null;
var isDec = false;
var curText = document.getElementById("current").innerText;

// Functionality for the operations buttons
function opFunc(id) {
  isDec = false;
  hist.push(Number(current));
  switch (id) {
    case 'add':
    operation = 'add';
    console.log("add");
    document.getElementById("previous").innerText = hist[hist.length - 1] + " + ";
    document.getElementById("current").innerText = 0;
    current = 0;
    break;
    case 'subtract':
    operation = 'subtract';
    document.getElementById("previous").innerText = hist[hist.length - 1] + " - ";
    document.getElementById("current").innerText = 0;
    current = 0;
    break;
    case 'multiply':
    operation = 'multiply';
    document.getElementById("previous").innerText = hist[hist.length - 1] + " x ";
    document.getElementById("current").innerText = 0;
    current = 0;
    break;
    case 'divide':
    operation = 'divide';
    document.getElementById("previous").innerText = hist[hist.length - 1] + " ÷ ";
    document.getElementById("current").innerText = 0;
    current = 0;
    break;
    default:
    break;
  }
}

// Functionality of the clear button
function ac() {
  current = 0;
  operation = 0;
  isDec = false;
  console.log("clear");
  hist.push(Number(current));
  document.getElementById("previous").innerText = hist[hist.length - 1];
  document.getElementById("current").innerText = 0;
}

// Functionality of the equals button
function calculate() {
  isDec = false;

  if (hist.length > 0) {
    previous = hist[hist.length - 1];
    hist.push(Number(current));
  }
  console.log(previous);
  switch (operation) {
    case 'add':
    document.getElementById("previous").innerText = previous + ' + ' + current + ' = ';
    document.getElementById("current").innerText =  previous + current;
    current = current + previous;
    break;
    case 'subtract':
    document.getElementById("previous").innerText = previous + ' - ' + current + ' = ';
    document.getElementById("current").innerText = previous - current;
    current = previous - current;
    break;
    case 'multiply':
    document.getElementById("previous").innerText = previous + ' x ' + current + ' = ';
    document.getElementById("current").innerText = previous * current;
    current = previous * current;
    break;
    case 'divide':
    document.getElementById("previous").innerText = previous + ' ÷ ' + current + ' = ';
    document.getElementById("current").innerText = previous / current;
    current = previous / current;
    break;
    default:
    document.getElementById("previous").innerText = current;
    document.getElementById("current").innerText = 0;
    current = current + previous;
    break;
  }
  previous = current;
   operation = null;
  console.log(previous);
}


var decIndex = 0;

// Function for number button click event
function numFunc(id) {
  // Checks if input was a decimal
  if (id == '.') {
    document.getElementById("current").innerText = '' + current + '.';
    if (isDec) {
      alert("broken!");
      ac();
    }
    isDec = true;

  // if else case is triggered, input must be a number
  } else {
    var buttonNum = Number(id);
    // Decimal already in current num
    if (isDec) {
      decIndex++;
      current = ((current * 10) + buttonNum) / 10;
      document.getElementById("current").innerText = current;
      // No decimal already in current number
    } else {
      current = (current * 10) + buttonNum;
      document.getElementById("current").innerText = current;
    }
  }
}
