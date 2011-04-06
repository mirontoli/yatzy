/* 
 * Anatoly Mironov, M09K0272, 20100206
 * Yatzy spel funktionalitet
 * Innehåller bara kopplingen till javascript,
 * Detta är uppgift 1B
 * Jag har försökt att göra saker i flera steg i stället för krångliga långa meningar
 * Detta för bättre debugging och felsökning
 * Debugging gör jag i Firebug i Mozilla
 * och Utvecklingsverktyg F12 i Internet Explorer
 * Testat i Firefox, Internet Explorer, Chrome och Opera
 *
 * Om det är en spelare, så ska man helst göra så att det spelas på samma sätt
 * alltså utan att det hittas samma tabellceller igen och igen.
 *
 * Match är ett spel för en eller flera spelare. För varje spelare skapas ett eget Game
 */
//addEvent(window, "load", init);
window.onload = init;
var match;
var currentGame;
var diceElements = new Array();
var playerTdArrays; //för att hitta td för spelare en gång för hela matchen.
var currentRound;
var buttonRollDice;
var tdArrayAll; // alla td-element för att kunna iterera dem och hämta vissa av dem
var faceDescr; //array with text to show after clicking on face
var divFaceDescription; // div where to show text
var message; //message in communicationScreen

function init() {
    initSelectPlayerQuantity();
    //createANewGame();
    initTdArray();
    initPlayerTdArrays();
    initDice();

    initButtonRollDice();
    initFaceDescription();
    initTitleAttrFaceName();
    initMessaging();
}
function initSelectPlayerQuantity() {
    var select = document.getElementById("selectPlayer");
    select.removeAttribute("disabled"); //för att undvika cache problem
    select.value = "0"; // sätta tillbaka till "välj" om det är en cachad version
    select.onchange = decidePlayerQuantity;
}
function decidePlayerQuantity() {
    var select = document.getElementById("selectPlayer");
    
    var quantity = parseInt(select.value);
    //skapa match
    match = new Match(quantity);
    changePlayer();
    //match.toggleGames();
    //initColumn(currentGame.playerName);
    msg = "Det kommer vara " + quantity + " spelare.";
    msg += "\nOm du vill ändra antalet spelare, uppdatera sidan";
    msg += "\nTryck på \"Kasta tärningar\"!";
    showMessage(msg);
    select.disabled = "disabled";
}
function changePlayer() {
    match.toggleGames();
    emphasizeColumn(currentGame.playerName, true);
    showMessage("Nu är det dags för " + currentGame.playerName);
}
//Vi skapar ett spel bara för en spelare
//function createANewGame() {
//    currentGame = new Game(1, "Dostojevskij");
//}
function initPlayerTdArrays() {
    playerTdArrays = new Array();
    playerTdArrays["player1"] = getTdArrayForAClass(tdArrayAll, "player1");
    playerTdArrays["player2"] = getTdArrayForAClass(tdArrayAll, "player2");
    playerTdArrays["player3"] = getTdArrayForAClass(tdArrayAll, "player3");
    playerTdArrays["player4"] = getTdArrayForAClass(tdArrayAll, "player4");

}
function initDice() {
    for (var i = 0; i < 5; i++) {
        diceElements[i] = document.getElementById("die"+i);
    }
}
function initTitleAttrFaceName() {
    var faceNameTdArray = getTdArrayForAClass(tdArrayAll, "faceName");
    for(td in faceNameTdArray) {
        // konstigt, jag trodde man kunde anropa td direkt.
        // nej , man måste anropa faceNameTdArray[td]... märkligt
        // följt denna http://www.w3schools.com/jS/js_loop_for_in.asp
        faceNameTdArray[td].title = "klicka för att se regler för denna";
        addEvent(faceNameTdArray[td], "click", showDescr);
    }
}
function initFaceDescription() {
    divFaceDescription = document.getElementById("faceDescription");
}
function initMessaging() {
    communicationScreen = document.getElementById("communicationScreen");
}
function initTdArray() {
    tdArrayAll = document.getElementsByTagName("td");
    //emphasizeColumn(currentGame.playerName, true);
}
function emphasizeColumn(playerName, isToEmphasize) {
    var tdArrayForPlayer = playerTdArrays[playerName];
    for (var i = 0; i < tdArrayForPlayer.length; i++) {
        var td = tdArrayForPlayer[i];
        if(isToEmphasize) {
            addClass(td, "emphasized");
        }
        else {
            removeClass(td, "emphasized");
        }
    //enableClickingPlayerColumn(player, true);
    /*
        if(!(hasClass(td, "upperSum") || hasClass(td, "bonus") || hasClass(td, "lowerSum"))) {
            addEvent(td, "click", enterPoints);
        }
        */
    }
}
function enableClickingPlayerColumn(playerName, booleanValue) {
    var tdArrayForPlayer = playerTdArrays[playerName];//getTdArrayForAClass(tdArrayAll, player);
    for (var i = 0; i < tdArrayForPlayer.length; i++) {
        var td = tdArrayForPlayer[i];
        var tdClass = getFirstClass(td);
        //alert(tdClass);
        if (booleanValue) {
            if(!(tdClass == "upperSum" || tdClass == "bonus" || tdClass == "lowerSum")) { //de ska aldrig vara klickbara
                //alert(tdClass);
                if (!currentGame.faceArray[tdClass].face.reported) { // det får inte vara avslutat
                    //alert("inne i enableClickingPlayerColumn → if → for → if → if");
                    addEvent(td, "click", enterPoints);
                }
            }
            
        }
        else {
            //td.onclick = null;
            removeEvent(td, "click", enterPoints);
        }
    }
}
function getTdArrayForAClass(tdArray, theClassName) {
    var tds = new Array();
    var index = 0;
    for (var i = 0; i < tdArray.length; i++) {
        if (hasClass(tdArray[i], theClassName)) {
            tds[index] = tdArray[i];
            index++;
        }
    }
    return tds;
}
function getFacePlayerCell(player, face) {
    var tdArrayPart = getTdArrayForAClass(tdArrayAll, player);
    var tdArrayPartPart = getTdArrayForAClass(tdArrayPart, face);
    var searchedCell = tdArrayPartPart[0];
    return searchedCell;

}
//init functions onload
function initButtonRollDice() {
    buttonRollDice = document.getElementById("rollDice");
    addEvent(buttonRollDice, "click", rollDice);
}

//game functions
function rollDice() {
    // om man har precis börjat...
    // man måste skriva om rollDice()    
    if (currentGame.rounds.length == 0) {
        currentGame.roll();
        updateDice();
        makeDiceImagesLockable(true);
        enableClickingPlayerColumn(currentGame.playerName, true);
        showMessage("Bra! Du har alltid 3 försök att kasta tärningar. Glöm inte att du även kan låsa tärningar");
        
    }   
    else {
        var currentRound = currentGame.rounds[currentGame.rounds.length-1]; // hämta round
        if (!currentRound.booked) {
            try {
                currentRound.roll();
                updateDice();
            }
            catch (err) {
                showMessage(err);
            }

        }
        else {
            try {
                currentGame.roll(); //fortsätt spela - nästa round
                updateDice();
                makeDiceImagesLockable(true);
                enableClickingPlayerColumn(currentGame.playerName, true);
            }
            catch (err) {
                showMessage(err);
            }
        }
    }   
}

function makeDiceImagesLockable(lockable) {
    for (var i = 0; i < 5; i++) {
        if(lockable) {
            addEvent(diceElements[i], "click", handleLocking);
            diceElements[i].title = "klicka för att låsa";
        }
        else {
            removeEvent(diceElements[i], "click", handleLocking);
            diceElements[i].title = "";
        }
    }
}

function handleLocking(event) { // event inspirerats studiemateriel 5
    //keyword this funkar inte i IE, man måste hämta eventObject
    var clickedDie = getEventTarget(event);
    var dieIndex = parseInt(clickedDie.id.charAt(3)); // die0, die1, die2, die3, die4
    
    var folder = "img/dice/";
    var extension = ".png";

    var currentRound = currentGame.rounds[currentGame.rounds.length-1];
    var die = currentRound.dice[dieIndex];
    var dieFace = die.amount;
    if (!die.locked) {
        die.locked = true;
        clickedDie.src = folder + "locked" + dieFace + extension;
        clickedDie.title = "klicka för att låsa upp";
    }
    else {
        die.locked = false;
        clickedDie.src = folder + dieFace + extension;
        clickedDie.title = "klicka för att låsa";
    }
}

function updateDice() {
    //alert(game.rounds.length-1);
    var round = currentGame.rounds[currentGame.rounds.length-1];
    for (var i = 0; i < 5; i++) {        
        var die = round.dice[i];
        if (!die.locked) {
            var face = die.amount;
            diceElements[i].src = "img/dice/" + face + ".png";
        }
    }
}

function enterPoints(event) {
    var currentRound = currentGame.rounds[currentGame.rounds.length-1];
    var clickedCell = getEventTarget(event);

    var faceName = getFirstClass(clickedCell);
    var face = currentGame.faceArray[faceName];
    face.updatePotential(currentRound.dice);
    face.face.report();
    

    var score = face.face.score;
    
    //var testAmount = currentRound.dice[0].amount;
    //var scoreNode = document.createTextNode(score);
    //clickedCell.appendChild(scoreNode);
    writeText(clickedCell, score);
    
    currentRound.booked = true;
    updateSumAndBonusCells();
    communicateToUser();
    makeDiceImagesLockable(false); // efter att ha redovisat kan man inte påverka tärningar
    enableClickingPlayerColumn(currentGame.playerName, false);
    emphasizeColumn(currentGame.playerName, false);
    changePlayer();
}
function updateSumAndBonusCells() {
    currentGame.updateSums();

    var upperSumCell = getFacePlayerCell(currentGame.playerName, "upperSum");
    var bonusCell = getFacePlayerCell(currentGame.playerName, "bonus");
    var lowerSumCell = getFacePlayerCell(currentGame.playerName, "lowerSum");

    replaceCellNumber(upperSumCell, currentGame.upperSum);
    replaceCellNumber(bonusCell, currentGame.bonus);
    replaceCellNumber(lowerSumCell, currentGame.lowerSum);

}
function replaceCellNumber(cell, number) {
    //first - remove existing
    while (cell.hasChildNodes()) {
        cell.removeChild(cell.firstChild);
    }
    var textNode = document.createTextNode(number);
    cell.appendChild(textNode);
}
function showDescr(event) {    
    var clickedCell = getEventTarget(event);   
    var faceName = getFirstClass(clickedCell);
    writeText(divFaceDescription, Game.faceDescr[faceName]);
}
function showMessage(msg) {
    writeText(communicationScreen, msg);
    // ta bort om en stund
    // http://www.w3schools.com/js/js_timing.asp
    var t = setTimeout("removeContent(communicationScreen)", 10000);
}
function communicateToUser() {
    if (currentGame.currentRoundNr == 15) {
        msg = "Grattis, " + currentGame.playerName + "! Du har fått " + currentGame.lowerSum + " poäng.";
        if(currentGame.lowerSum > 200) {
            msg += "\nBra jobbat!";
        }
        else if (currentGame.lowerSum > 300) {
            msg += "\nWow. Sånt resultat ser man inte så ofta";
        }
    }
    else {
        msg = currentGame.playerName + " har " + (maxRounds - currentGame.currentRoundNr) + " rounds kvar.";
    }
    showMessage(msg);
}



