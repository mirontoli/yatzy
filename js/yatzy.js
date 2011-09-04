/* 
 * Detta är logiken bakom spelet
 * Meningen är att separera själva spelet från eventhantering mm
 * Jag vill försöka göra det objektorienterat
 * Men det är svårt. Det här med prototyperna är inte lätt efter att
 * ha programmerat i strikta Java och ganska strikta C#
 */
var maxRounds = 15; // lite som final
var maxThrowings = 3;
function Match(quantityOfPlayers) {
// mediatorklass för Spelar-games...
// ska skriva den i lab 1C
    this.gamesArrayIndex = 0; // för att kunna växla mellan games
    this.quantityOfPlayers = quantityOfPlayers;
    this.games = this.getANewGamesArray(quantityOfPlayers);
}
Match.prototype.getANewGamesArray = function(quantityOfPlayers) {
    //skapa referenser till games
    var gamesArray = new Array(quantityOfPlayers);
    for(var i = 0; i < quantityOfPlayers; i++) {
        var playerName = "player" + (i+1); // player1, player2, player3, player4
        gamesArray[i] = new Game(i, playerName);
        //i+1 för att det räknas från 1 i tabellen.
    }
    return gamesArray;
};
Match.prototype.toggleGames = function() {
    currentGame = this.games[this.gamesArrayIndex];
    // update index: +1 och resten av modulooperator av antalet spelare
    this.gamesArrayIndex = ++this.gamesArrayIndex % this.quantityOfPlayers;
};
function Game(nr, name) {
    this.playerNr = nr;
    this.playerName = name;
    this.currentRoundNr = 0;
    this.upperSum = 0;
    this.bonus = 0;
    this.lowerSum = 0;
    this.rounds = new Array();

    this.faceArray = new Array();
    //upper section
    this.faceArray["aces"] = new Aces();
    this.faceArray["twos"] = new Twos();
    this.faceArray["threes"] = new Threes();
    this.faceArray["fours"] = new Fours();
    this.faceArray["fives"] = new Fives();
    this.faceArray["sixes"] = new Sixes();

    //lower section
    this.faceArray["onePair"] = new OnePair();
    this.faceArray["twoPair"] = new TwoPair();
    this.faceArray["threeOfAKind"] = new ThreeOfAKind();
    this.faceArray["fourOfAKind"] = new FourOfAKind();
    this.faceArray["smallStraight"] = new SmallStraight();
    this.faceArray["largeStraight"] = new LargeStraight();
    this.faceArray["fullHouse"] = new FullHouse();
    this.faceArray["chance"] = new Chance();
    this.faceArray["yahtzee"] = new Yahtzee();
}
//statisk array till Game
Game.faceDescr = {
    "aces":             "ETTOR: Det gäller att få ihop så stort antal ETTOR som möjligt. Varje ETTA ger en poäng.",
    "twos":             "TVÅOR-SEXOR: Här gäller samma som för ETTOR. Varje lika tärning ger poäng efter antalet prickar....",
    "threes":           "TVÅOR-SEXOR: Här gäller samma som för ETTOR. Varje lika tärning ger poäng efter antalet prickar....",
    "fours":            "TVÅOR-SEXOR: Här gäller samma som för ETTOR. Varje lika tärning ger poäng efter antalet prickar....",
    "fives":            "TVÅOR-SEXOR: Här gäller samma som för ETTOR. Varje lika tärning ger poäng efter antalet prickar....",
    "sixes":            "TVÅOR-SEXOR: Här gäller samma som för ETTOR. Varje lika tärning ger poäng efter antalet prickar....",
    "upperSum":         "Summan av alla poäng från ettor till sexor",
    "bonus":            "BONUS: En spelare som får en totalsumma på 63 poäng eller mer på övre halvan, får som bonus 50 poäng extra.",
    "onePair":          "1 PAR: Här gäller det att få ihop ett par. Poäng räknas efter tärningsparets prickar.",
    "twoPair":          "2 PAR: En spelare måste få ihop två par. Poäng räknas efter de två tärningsparens prickar. Observera att paren måste vara olika.",
    "threeOfAKind":     "TRETAL: Tre lika tärningar räknas som tretal. Ger poäng efter de tre tärningarnas antal prickar.",
    "fourOfAKind":      "FYRTAL: Fyra lika tärningar. Ger poäng efter tärningarnas prickar.",
    "smallStraight":    "LITEN STRAIGHT: En spelare måste få alla fem tärningarna i följd, från 1 uppåt (1, 2, 3, 4, 5). Summan av tärningarnas prickar (15 poäng) noteras i protokollet.",
    "largeStraight":    "glöm inte att skriva ner den regeln också",
    "fullHouse":        "glöm inte att skriva ner den regeln också",
    "chance":           "glöm inte att skriva ner den regeln också",
    "yahtzee":          "YATZY: Här måste en spelare få alla fem tärningarna lika. YATZY ger alltid 50 poäng."
};
// prototyp för att ha metoder för objekt
// http://mckoss.com/jscript/object.htm
Game.prototype.roll = function() {
    if (this.currentRoundNr < maxRounds) {
        this.rounds[this.currentRoundNr] = new Round();
        try {
            this.rounds[this.currentRoundNr].roll();
            this.currentRoundNr++;
        }
        catch(err) {
            //skicka exeption vidare
            throw err;
        }

    }
    else {
        //vi skapar nya exceptions
        // kolla här:
        // http://www.w3schools.com/js/js_throw.asp
        throw "du har slösat alla dina rounds!";
    //showMessage("du har slösat alla dina rounds!");
    }
};
Game.prototype.updateSums = function() {
    this.updateUpperSum();
    this.updateBonus();
    this.updateLowerSum();
}
Game.prototype.updateUpperSum = function() {
    this.upperSum =
    this.faceArray["aces"].face.score
    + this.faceArray["twos"].face.score
    + this.faceArray["threes"].face.score
    + this.faceArray["fours"].face.score
    + this.faceArray["fives"].face.score
    + this.faceArray["sixes"].face.score;
}
Game.prototype.updateBonus = function() {
    if (this.upperSum > 62) {
        this.bonus = 50;
    }
}
Game.prototype.updateLowerSum = function() {
    this.lowerSum = this.upperSum 
    + this.bonus// + alla andra
    + this.faceArray["onePair"].face.score
    + this.faceArray["twoPair"].face.score
    + this.faceArray["threeOfAKind"].face.score
    + this.faceArray["fourOfAKind"].face.score
    + this.faceArray["smallStraight"].face.score
    + this.faceArray["largeStraight"].face.score
    + this.faceArray["fullHouse"].face.score
    + this.faceArray["chance"].face.score
    + this.faceArray["yahtzee"].face.score;
}
function Round() {
    this.throwing = 0; // only three throwings available
    this.dice = new Array(new Die(), new Die(), new Die(), new Die(), new Die()); // five dice
    this.booked = false; // om man har redovisat i tabellen
}
Round.prototype.roll = function() {
    if(this.throwing < maxThrowings) {
        for (var i = 0; i < 5; i++) {
            if (!this.dice[i].locked) {
                // generera slumpmässigt tal mellan 1 och 6:
                //http://www.the-art-of-web.com/javascript/random/
                // jag gör det i flera steg för lättare felsökning
                var random = Math.random();
                var zeroToFive = Math.floor(random*6);
                var oneToSix = zeroToFive + 1;
                this.dice[i].amount = oneToSix;
            }
        }
        this.throwing++; //måste ta reda på kastet
    }
    else {
        throw "du får bara kasta tre gånger";
    //showMessage("du får bara kasta tre gånger");
    }
}
function Die() {
    this.amount = 0;
    this.locked = false; // default - false;
}

// faces
function Face() { //en allmän prototyp -typ superklass
    this.score = 0; 
    this.potential = 0; // för att eventuellt visa möjliga resultat vid mouseover
    this.reported = false;
}
Face.prototype.prototype = { 
    report: function() {
        this.score = this.potential;
        this.potential = 0;
        this.reported = true;
    }
}

//helpers
function getSumOf(diceArray, faceNumber) {
    var sum = 0;
    for (var i = 0; i < 5; i++) {
        if (diceArray[i].amount == faceNumber) {
            sum += faceNumber;
        }
    }
    return sum;
}
function getQuantityOf(diceArray, faceNumber) {
    var quantity = 0;
    for (var i = 0; i < 5; i++) {
        //alert("inne i getQuantity → for");
        if (diceArray[i].amount == faceNumber) {
            quantity++;
        }
    }
    return quantity;
}
function Aces() {
    this.face = new Face();
}
Aces.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 1);
}
function Twos() {
    this.face = new Face();
}
Twos.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 2);
}
function Threes() {
    this.face = new Face();
}
Threes.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 3);
}
function Fours() {
    this.face = new Face();
}
Fours.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 4);
}
function Fives() {
    this.face = new Face();
}
Fives.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 5);
}
function Sixes() {
    this.face = new Face();
}
Sixes.prototype.updatePotential = function(dice) {
    this.face.potential = getSumOf(dice, 6);
}
function OnePair() {
    this.face = new Face();
}
OnePair.prototype.updatePotential = function(dice) {
    //vi måste hämta om möjligt två möjliga par och välja det med högsta poäng
    var counter = 0;
    for (var i = 1; i <= 6; i++) {
        if (getQuantityOf(dice, i) >= 2) {
            this.face.potential = i * 2; // vi räknar från 1 till 6, då blir det med högsta
            counter++;
            if (counter >= 2) { // det kan vara högst två par
                break;
            }
        }
    }
}
function TwoPair() {
    this.face = new Face();
}
TwoPair.prototype.updatePotential = function(dice) {
    var counter = 0;
    var sum = 0;
    for (var i = 1; i <= 6; i++) {
        if (getQuantityOf(dice, i) >= 2) {
            sum += i * 2;
            counter++;
            if (counter == 2) { // det måste finnas två par
                this.face.potential = sum;
                break;
            }
        }
    }
}
function ThreeOfAKind() {
    this.face = new Face();
}
ThreeOfAKind.prototype.updatePotential = function(dice) {
    for (var i = 1; i <= 6; i++) {
        if (getQuantityOf(dice, i) >= 3) {
            this.face.potential = i * 3;
            break;
        }
    }
}
function FourOfAKind() {
    this.face = new Face();
}
FourOfAKind.prototype.updatePotential = function(dice) {
    for (var i = 1; i <= 6; i++) {
        if (getQuantityOf(dice, i) >= 4) {
            this.face.potential = i * 4;
            break;
        }
    }
}
function SmallStraight() {
    this.face = new Face();
}
SmallStraight.prototype.updatePotential = function(dice) {
    if( (getQuantityOf(dice, 1) == 1)
        && (getQuantityOf(dice, 2) == 1)
        && (getQuantityOf(dice, 3) == 1)
        && (getQuantityOf(dice, 4) == 1)
        && (getQuantityOf(dice, 5) == 1)) {
        this.face.potential = 15;
    }
}
function LargeStraight() {
    this.face = new Face();
}
LargeStraight.prototype.updatePotential = function(dice) {
    if( (getQuantityOf(dice, 2) == 1)
        && (getQuantityOf(dice, 3) == 1)
        && (getQuantityOf(dice, 4) == 1)
        && (getQuantityOf(dice, 5) == 1)
        && (getQuantityOf(dice, 6) == 1)) {
        this.face.potential = 20;
    }
}
function FullHouse() { // Kåk
    this.face = new Face();
}
FullHouse.prototype.updatePotential = function(dice) {
    // Det fungerar nästan som TwoPair, fast det ena är med tre stycken
    var counter = 0;
    var sum = 0;
    for (var i = 1; i <= 6; i++) {
        if (getQuantityOf(dice, i) == 2) {
            sum += i * 2;
            counter++;
        }
        if (getQuantityOf(dice, i) == 3) {
            sum += i * 3;
            counter++;
        }
    }
    if (counter == 2) { // det måste finnas två "par"
        this.face.potential = sum;
    }
}
function Chance() {
    this.face = new Face();
}
Chance.prototype.updatePotential = function(dice) {
    //this.face.potential = upperSectionCalculate(dice, 6);
    this.face.potential = 0;
    for (var i = 0; i < 5; i++) {
        this.face.potential += dice[i].amount;
    }
}
function Yahtzee() {
    this.face = new Face();
}
Yahtzee.prototype.updatePotential = function(dice) {
    if( (getQuantityOf(dice, 1) == 5)
        || (getQuantityOf(dice, 2) == 5)
        || (getQuantityOf(dice, 3) == 5)
        || (getQuantityOf(dice, 4) == 5)
        || (getQuantityOf(dice, 5) == 5)
        || (getQuantityOf(dice, 6) == 5)) {
        this.face.potential = 50;
    }
}