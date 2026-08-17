function multiply(a, b) {
    console.log(a * b);
}

multiply(5, 10);
multiply(3, 7);
multiply(2, 4);

function getMultiplier() {
  return function (a, b) {
    console.log(a * b);
  };
}

const theMultiplier = getMultiplier();
theMultiplier(5, 10);
theMultiplier(3, 7);
theMultiplier(2, 4);

getMultiplier()(5, 10);

function getMultiplierClosure(multiplier) {
  return function (a) {
    return a * multiplier;
  };
}
const multiplyByFive = getMultiplierClosure(5);
console.log(multiplyByFive(2));

const multiplyBySix = getMultiplierClosure(6);
console.log(multiplyBySix(3));

console.log(getMultiplierClosure(7)(4));

///////

const abc = ['X', 'M', 'P'];

function ourEvery(arr, callback) {
  for(let i = 0; i < arr.length; i++) {
    if(!callback(arr[i])) {
      return false;
    }
  }
  return true;
};

const result = ourEvery(abc, function (n) {
  return n === n.toUpperCase();
});
console.log(result);

const result2 = ourEvery(abc, function (n) {
  return n === n.toLowerCase();
});
console.log(result2);

console.log(abc.every(function (n) {
  return n === n.toUpperCase();
}));

console.log(abc.every(function (n) {
  return n === n.toLowerCase();
}));

function ourSome(arr, callback) {
  for(let i = 0; i < arr.length; i++) {
    if(callback(arr[i])) {
      return true;
    }
  }
  return false;
};

function isUpperCase(n) {
  return n === n.toUpperCase();
}

function isLowerCase(n) {
  return n === n.toLowerCase();
}

const result3 = ourSome(abc, isUpperCase);
console.log(result3);

const result4 = ourSome(abc, isLowerCase);
console.log(result4);

abc.some(isUpperCase);
abc.some(isLowerCase);