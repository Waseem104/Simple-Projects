function load() {
  var btns = document.querySelectorAll("#calculator span");
  var operators = ["+", "-", "x", "%"];
  var inputScreen = document.querySelector("#screen");
  var btnValue;
  var input;

  for (var i = 0; i < btns.length; i++) {
    var decimalAdded = false;

    btns[i].addEventListener("click", function () {
      btnValue = this.innerHTML;
      input = inputScreen.innerHTML;

      switch (btnValue) {
        case "C":
          inputScreen.innerHTML = "";
          decimalAdded = false;
          break;
        case "=":
          // last char of string
          var lastChar = input[input.length - 1];

          // replace x to *, + to /which could be calculated in eval
          input = input.replace(/x/g, "*").replace(/%/g, "/");

          // checking the last character of the input.
          // if it's an operator or a decimal ,remove it
          //  /.$/ means last char in regex
          if (operators.indexOf(lastChar) > -1 || lastChar == ".")
            input = input.replace(/.$/, "");

          if (input) {
            // if the argument is an expression, eval() evalues the expression
            // if the argument is one or more javascript statements, eval executes the statements
            inputScreen.innerHTML = eval(input);
          }
          decimalAdded = false;
          break;
        case ".":
          if (!decimalAdded) {
            inputScreen.innerHTML += btnValue;
            decimalAdded = true;
          }
          break;
        case "+":
        case "-":
        case "x":
        case "%":
          // las character of string
          var lastChar = input[input.length - 1];

          // only add operator if input is not empty and there is no operator at the last
          if (input != "" && operators.indexOf(lastChar) == -1)
            inputScreen.innerHTML += btnValue;
          // Allows minus if the string is empty.the first number could be under zero
          else if (input == "" && btnValue == "-")
            inputScreen.innerHTML += btnValue;

          // Allows to represent the last operation
          if (operators.indexOf(lastChar) > -1 && input.length > 1) {
            inputScreen.innerHTML = input.replace(/.$/, btnValue);
          }
          decimalAdded = false;
          break;
        default:
          inputScreen.innerHTML += btnValue;
          decimalAdded = false;
          break;
      }
    });
  }
}
