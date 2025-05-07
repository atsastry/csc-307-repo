function sum(a, b) {
     return a + b;
}

function div(a, b) {
     return a / b;
}

function containsNumbers(text) {
     for (let i = 0; i < text.length; i++) {
       const char = text.charAt(i);
       if (!isNaN(Number(char)) && char.trim() !== '') {
	  return true;
       }
     }
     return false;
}

export default { sum, div, containsNumbers };
