/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function() {
    var inputField = document.getElementById("romanInput");
    var s = inputField.value;
    var result = document.getElementById("sumResult");
 
    let sum = 0;
    let numeralArr = ['I', 'V', 'X', 'L', 'C', 'D', 'M']; 
    let numArr = [1, 5, 10, 50, 100, 500, 1000]; 
    let conversionArr = [];
    let resultArr = []; 

    for (let i = 0; i < s.length; i++) {
        let numAtI = s.charAt(i); 
        let index = numArr[numeralArr.indexOf(numAtI)];
        conversionArr.push(index);
    }
    for (let i = conversionArr.length - 1; i >= 0; i--) {
        if (conversionArr[i] > conversionArr[i - 1]) {
            let diff = conversionArr[i] - conversionArr[i - 1];
            resultArr.push(diff); 
            i--;
        } else {
            resultArr.push(conversionArr[i]);
        }
    }
    resultArr.forEach(v => {
        console.log(v);
        sum += v;
    });

    if (!sum) {
        sum = "Error: Invalid Roman Numeral";
    }
    result.innerHTML = sum;
};

