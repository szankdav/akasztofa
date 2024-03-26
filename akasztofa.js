"use strict";

const words = [
    "gyalogátkelőhely",
    "akasztófa",
    "webfejlesztés",
    "karburátor",
    "dezodor",
    "macskamenta",
    "edzőterem",
    "autóbusz",
    "csirkemell",
    "politika",
    "adatbázis",
    "szobanövény",
    "alkatrész",
    "napszeműveg",
    "porcelán",
    "vasútállomás",
    "szóösszetétel",
    "szokványos",
    "mesterkélt",
    "köznyelvben",
    "mássalhangzó",
    "közbeszédben",
    "abszolútérték",
    "tulajdonnév",
    "támaszték",
    "szókincs",
    "kimondhatatlan",
    "településnév",
    "feladatgyűjtemény"
];

const alphabet = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H", "I","Í", "J", "K", "L", "M","N", "O", "Ó", "Ö", "Ő","P", "Q", "R", "S", "T","U", "Ú", "Ü", "Ű", "V","W", "X", "Y", "Z"];

const gameStartButton = document.getElementById("gameStartButton");
gameStartButton.addEventListener("click", getGameWord);
const randomStartButton = document.getElementById("randomStartButton");
randomStartButton.addEventListener("click", getGameWord);
const alphabetCol = document.getElementById("alphabetCol");
const gameLetterDivCol = document.getElementById("gameLettersDivCol");
const gameWordInput = document.getElementById("gameWord");
const winH5 = document.getElementById("wins");
const losesH5 = document.getElementById("loses");

const canvas = document.getElementById("hangPicture");
const ctx = canvas.getContext("2d");

let gameWord = null;
let counter = 0;
let wrongGuess = 0;
let wins = 0;
let loses = 0;

letterMaker();

function letterMaker(){
    for (let i = 0; i < alphabet.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.append(document.createTextNode(alphabet[i]));
        letterDiv.classList.add("letterDiv");
        alphabetCol.append(letterDiv);    
    }
    
    const letterDivsAsButtons = document.querySelectorAll(".letterDiv");
    for (let i = 0; i < letterDivsAsButtons.length; i++) {
        letterDivsAsButtons[i].addEventListener("click", letterClick);    
    }
    winH5.innerHTML = "";
    winH5.append(document.createTextNode(`Nyert: ${wins}`));
    losesH5.innerHTML = "";
    losesH5.append(document.createTextNode(`Vesztett: ${loses}`));
}

function getGameWord(e){
    e.preventDefault();
    const clickedButton = e.target;
    const clickedButtonText = clickedButton.textContent;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.strokeStyle = "black";
    if (clickedButtonText == "Mehet!"){
        gameWord = gameWordInput.value;
        gameLetterDivCol.innerHTML = "";
        gameWordInput.value = "";
        makeGameLetterDivs(gameWord);
    }
    else if (clickedButtonText == "Véletlen szó!"){
        gameWord = words[Math.floor(Math.random() * words.length)];
        makeGameLetterDivs(gameWord);
    }
    gameStartButton.disabled = true;
    randomStartButton.disabled = true;
}

function makeGameLetterDivs(word){
    for (let i = 0; i < word.length; i++) {
        const gameLetterDiv = document.createElement('div');
        const pTag = document.createElement('p');
        pTag.style.display = "none";
        pTag.append(document.createTextNode(word[i]));
        pTag.classList.add("gameWordLetter");
        gameLetterDiv.append(pTag);
        gameLetterDiv.style.margin = ".3rem";
        gameLetterDiv.style.borderBottom = "2px solid black";
        gameLetterDiv.style.width = "3rem";
        gameLetterDiv.style.textAlign = "center";
        gameLetterDivCol.append(gameLetterDiv);
    }
}

function letterClick(e){
    letterChecker(e);
    gameStatusChecker();
}

function letterChecker(e){
    const clickedDiv = e.target;
    const clickedDivBorderColor = getComputedStyle(clickedDiv).borderColor;
    if(gameWord != null){
        if(clickedDivBorderColor == 'rgb(0, 0, 0)'){
            let hit = false;
            const letters = document.querySelectorAll(".gameWordLetter");
            for(const letter of letters){
                if(letter.innerHTML.toLowerCase() == clickedDiv.innerHTML.toLowerCase()){
                    letter.style.display = "unset";
                    hit = true;
                    counter++;
                }
            }
            if(hit == true){
                clickedDiv.style.borderColor = "green";
                clickedDiv.style.color = "green";
                clickedDiv.removeEventListener("click", letterClick);

            }
            else{
                clickedDiv.style.borderColor = "red";
                clickedDiv.style.color = "red";
                clickedDiv.removeEventListener("click", letterClick);
                wrongGuess++;
                drawHanger();                
            }
        }
    }
}

function gameStatusChecker(){
    setTimeout(() => {
        if(gameWord != null){
            if(counter == gameWord.length){
                alert("Nyertél!");
                wins++;
                counter = 0;
                wrongGuess = 0;
                gameWord = null;
                gameLetterDivCol.innerHTML = "";
                alphabetCol.innerHTML = "";
                gameStartButton.disabled = false;
                randomStartButton.disabled = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                letterMaker();
            }
            else if (wrongGuess == 10){
                alert("Vesztettél!");
                loses++;
                counter = 0;
                wrongGuess = 0;
                gameWord = null;
                gameLetterDivCol.innerHTML = "";
                alphabetCol.innerHTML = "";
                gameStartButton.disabled = false;
                randomStartButton.disabled = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                letterMaker();
            }
        }
    }, 200);
}

function drawHanger(){
    switch (wrongGuess) {
        case 1:
            ctx.lineTo(20, 200);
            ctx.stroke();
            break;
        case 2:
            ctx.moveTo(20, 20);
            ctx.lineTo(130, 20);
            ctx.stroke();
            break;
        case 3:
            ctx.moveTo(20, 60);
            ctx.lineTo(60, 20);
            ctx.stroke();
            break;
        case 4:
            ctx.moveTo(130, 20);
            ctx.lineTo(130, 50);
            ctx.stroke();
            break;
        case 5:
            ctx.moveTo(140, 60);
            ctx.arc(130, 60, 10, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 6:
            ctx.moveTo(130, 70);
            ctx.lineTo(130, 100);
            ctx.stroke();
            break;
        case 7:
            ctx.moveTo(130, 75);
            ctx.lineTo(140, 85);
            ctx.stroke();
            break;
        case 8:
            ctx.moveTo(130, 75);
            ctx.lineTo(120, 85);
            ctx.stroke();
            break;
        case 9:
            ctx.moveTo(130, 100);
            ctx.lineTo(140, 110);
            ctx.stroke();
            break;
        case 10:
            ctx.moveTo(130, 100);
            ctx.lineTo(120, 110);
            ctx.stroke();
            break;
    }
}