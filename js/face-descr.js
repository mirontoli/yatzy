//Denna fil innehåller beskrivningar för varje face

function initFaceDescription() {
    divFaceDescription = document.getElementById("faceDescription");
    faceDescr = {
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
}

