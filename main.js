const words = [
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Professional",
  "Youtube",
  "Python",
  "Fifa",
  "Call Of Duty",
  "League Of legends",
];
// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

let level = document.querySelector(".levels");
//default lvl
//change Level From Here
//change Level seconds From Here
//selectors
let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".control .time span");
let scoreGot = document.querySelector(".control .score .got");
let scoreTotal = document.querySelector(".control .score .total");
let finishMessage = document.querySelector(".finish");
let tryAgain = document.querySelector(".play-again");
//Setting Level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;
//start game
startBtn.onclick = function () {
  this.style.display = "none";
  input.focus();
  defaultLevelName = level.value;
  //default lvl
  //change Level From Here
  defaultLevelSeconds = lvls[defaultLevelName]; //change Level seconds From Here
  //generate word function
  //Setting Level name + seconds + score
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;
  generateWords();
};

//Disable Paste Event
input.onpaste = () => {
  return false;
};

function generateWords() {
  //get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //get word index
  let wordIndex = words.indexOf(randomWord);
  //remove word from array
  words.splice(wordIndex, 1);
  //show the word
  theWord.innerHTML = randomWord;
  //empty upcomingword
  upcomingWords.innerHTML = "";
  //generate upcomingword
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //start play function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML == 0) {
      //stop timer
      clearInterval(start);
      //compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input field
        input.value = "";
        //increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          //call generate word fun
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let txt = document.createTextNode("Congratulation");
          span.appendChild(txt);
          finishMessage.appendChild(span);
          //remove upcoming words
          upcomingWords.style.display = "none";
          tryAgain.style.display = "block";
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let txt = document.createTextNode("Game Over");
        span.appendChild(txt);
        finishMessage.appendChild(span);
        tryAgain.style.display = "block";
      }
    }
  }, 1000);
}
tryAgain.onclick = function () {
  location.reload();
};
