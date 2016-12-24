var startGame = function() {
  word = setWord();
  removeInput();
  createInput();
}

var setWord = function() {
  var wordBox = document.getElementById("chosen-word");
  var word = wordBox.value;

  var hiddenWord = document.createElement("h1");
  hiddenWord.setAttribute("id", "hidden-word");
  hiddenWord.innerHTML = "*".repeat(word.length);
  document.body.append(hiddenWord);

  return word;
}

var removeInput = function() {
  var wordBox = document.getElementById("chosen-word");
  var startButton = document.getElementById("start-game");
  var form = document.getElementById("first-form");

  wordBox.outerHTML = "";
  delete wordBox

  startButton.outerHTML = "";
  delete startButton;

  form.outerHTML = "";
  delete form;
}

var createInput = function() {
  var form = document.createElement("form");

  var inputBox = document.createElement("input");
  inputBox.setAttribute("id", "letter-box");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("onkeypress", "if (event.keyCode == 13) { revealLetter() ; return false }");

  var submitLetter = document.createElement("button");
  submitLetter.innerHTML = "Submit letter"
  submitLetter.setAttribute("type", "button");
  submitLetter.setAttribute("onclick", "revealLetter()");

  form.append(inputBox);
  form.append(submitLetter);
  document.body.append(form);
  inputBox.focus();
}

var revealLetter = function() {
  var inputBox = document.getElementById("letter-box");
  var letter = inputBox.value;
  var hiddenWord = document.getElementById("hidden-word");

  inputBox.value = null;

  for(var i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      var val = hiddenWord.innerHTML;
      var revealedStr = val.substr(0, i) + letter + val.substr(i + 1);
      hiddenWord.innerHTML = revealedStr;
    }
  }

  checkForWin()
}

var checkForWin = function() {
  var hiddenWord = document.getElementById("hidden-word");
  if (hiddenWord.innerHTML === word) {
    setTimeout(function() { alert("You win!") ; window.location.reload()  }, 500);
  }
}
