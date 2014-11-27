"use strict"

function initDatabase() {
	sortDbRecords();
	attachDbMethods();
    attachParentProperties();
}

function sortDbRecords() {
	database.sort(function(a, b) {
		return a.lineName.localeCompare(b.lineName);
	});
	
	for(var lineIndex in database) {
		var currentLine = database[lineIndex];
		currentLine.sets.sort(function(a, b) {
			return a.setName.localeCompare(b.setName);
		});
		
		for(var setIndex in currentLine.sets) {
			var currentSet = currentLine.sets[setIndex];
			currentSet.cards.sort(function(a, b) {
				var typeOrder = [
					'location',
					'stageOneObjective',
					'stageTwoObjective',
					'stageThreeObjective',
					'character'
				];
				var typeCompare = typeOrder.indexOf(a.cardType) - typeOrder.indexOf(b.cardType);
				if(typeCompare === 0) {
					return a.cardName.localeCompare(b.cardName);
				}
				else {
					return typeCompare;
				}
			});
		}
	}
}

function attachDbMethods() {
	database.getAllSets = getAllSets;
	database.getAllCards = getAllCards;
	database.getSelectedCardsByType = getSelectedCardsByType;
}

function attachParentProperties() {
    for(var lineKey in database) {
        var currentLine = database[lineKey];
        
        for(var setKey in currentLine.sets) {
            var currentSet = currentLine.sets[setKey];
            currentSet.line = currentLine;
            
            for(var cardKey in currentSet.cards) {
                var currentCard = currentSet.cards[cardKey];
                currentCard.set = currentSet;
            }
        }
    }
}

function getAllSets() {
	var setList = [];
	for(var lineKey in database) {
		var currentLine = database[lineKey];
		
		for(var setKey in currentLine.sets) {
			var currentSet = currentLine.sets[setKey];
			setList.push(currentSet);
		}
	}
	
	return setList;
}

function getAllCards() {
	var cardList = [];
	var sets = getAllSets();
	for(var setKey in sets) {
		var currentSet = sets[setKey];
		
		for(var cardKey in currentSet.cards) {
			cardList.push(currentSet.cards[cardKey]);
		}
	}
	
	return cardList;
}

function getSelectedCardsByType(cardType) {
	var selectedCards = [];
	for(var lineKey in database) {
		var currentLine = database[lineKey];
		if(currentLine.included) {
			for(var setKey in currentLine.sets) {
				var currentSet = currentLine.sets[setKey];
				if(currentSet.included) {
					for(var cardKey in currentSet.cards) {
						var currentCard = currentSet.cards[cardKey];
						if(currentCard.included && currentCard.cardType === cardType) {
							selectedCards.push(currentCard);
						}
					}
				}
			}
		}
	}
	
	return selectedCards;
}

var database = [
	{
		"lineName" : "Legendary Encounters",
		"lineId" : "LegendaryEncounters",
		"included" : true,
		"sets" : [
			{
				"setName" : "Core Set",
				"setId" : "EncountersCoreSet",
				"included" : true,
				"cards" : [
					{
						"cardType" : "stageOneObjective",
						"cardName" : "The S.O.S.",
						"cardId" : "theSos",
						"included" : true
					},
					{
						"cardType" : "stageOneObjective",
						"cardName" : "The Lost Colony",
						"cardId" : "theLostColony",
						"included" : true
					},
					{
						"cardType" : "stageOneObjective",
						"cardName" : "Breakout",
						"cardId" : "breakout",
						"included" : true
					},
					{
						"cardType" : "stageOneObjective",
						"cardName" : "Where are the Brothers?",
						"cardId" : "whereAreTheBrothers",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "No One can Hear you Scream",
						"cardId" : "noOneCanHearYouScream",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "The Beast is Out There",
						"cardId" : "theBeastIsOutThere",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "You're a Thing. A Construct.",
						"cardId" : "youreAThingAConstruct",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "They Mostly Come at Night",
						"cardId" : "theyMostlyComeAtNight",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "A Perfect Organism",
						"cardId" : "aPerfectOrganism",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "Nobody Can Stop It",
						"cardId" : "nobodyCanStopIt",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "She'll Breed. You'll Die.",
						"cardId" : "shellBreedYoullDie",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "Who's Laying the Eggs",
						"cardId" : "whosLayingTheEggs",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Johner",
						"cardId" : "johner",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Ripley No. 8",
						"cardId" : "ripleyNo8",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Christie",
						"cardId" : "christie",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Call",
						"cardId" : "call",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Sister Ripley",
						"cardId" : "sisterRipley",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "CMO Clemens",
						"cardId" : "cmoClemens",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Brother Dillion",
						"cardId" : "brotherDillion",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Francis \"85\" Aaron",
						"cardId" : "francis85Aaron",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Private Hudson",
						"cardId" : "privateHudson",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Lieutenant Ripley",
						"cardId" : "lieutenantRipley",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Corporal Hicks",
						"cardId" : "corporalHicks",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Bishop",
						"cardId" : "bishop",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Chief Engineer Parker",
						"cardId" : "chiefEngineerParker",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Navigator Lambert",
						"cardId" : "navigatorLambert",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Warrant Officer Ripley",
						"cardId" : "warrantOfficerRipley",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Captain Dallas",
						"cardId" : "captainDallas",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "Hadley's Hope",
						"cardId" : "hadleysHope",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "Fiorina \"Fury\" 161",
						"cardId" : "firoinaFury161",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "The Auriga",
						"cardId" : "theAuriga",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "The Nostromo",
						"cardId" : "theNostromo",
						"included" : true
					}
				]
			}
		]
	},
    {
		"lineName" : "Legendary",
		"lineId" : "Legendary",
		"included" : true,
		"sets" : [
			{
				"setName" : "Core Set",
				"setId" : "LegendaryCoreSet",
				"included" : true,
				"cards" : [
					{
						"cardType" : "character",
						"cardName" : "Black Widow",
						"cardId" : "blackWidow",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Captain America",
						"cardId" : "captainAmerica",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Cyclops",
						"cardId" : "cyclops",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Deadpool",
						"cardId" : "deadpool",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Emma Frost",
						"cardId" : "emmaFrost",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Gambit",
						"cardId" : "gambit",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Hawkeye",
						"cardId" : "hawkeye",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Hulk",
						"cardId" : "hulk",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Iron Man",
						"cardId" : "ironMan",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Nick Fury",
						"cardId" : "nickFury",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Rogue",
						"cardId" : "rogue",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Spider-Man",
						"cardId" : "spiderMan",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Storm",
						"cardId" : "storm",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Thor",
						"cardId" : "thor",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Wolverine",
						"cardId" : "wolverine",
						"included" : true
					}
				]
			},
            {
				"setName" : "Dark City",
				"setId" : "DarkCity",
				"included" : true,
				"cards" : [
					{
						"cardType" : "character",
						"cardName" : "Angel",
						"cardId" : "angel",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Bishop",
						"cardId" : "bishop",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "The Punisher",
						"cardId" : "thePunisher",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Blade",
						"cardId" : "blade",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Cable",
						"cardId" : "cable",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Colossus",
						"cardId" : "colossus",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Daredevil",
						"cardId" : "daredevil",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Domino",
						"cardId" : "domino",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Elektra",
						"cardId" : "elektra",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Ghost Rider",
						"cardId" : "ghostRider",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Forge",
						"cardId" : "forge",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Iceman",
						"cardId" : "iceman",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Jean Grey",
						"cardId" : "jeanGrey",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Iron Fist",
						"cardId" : "ironFist",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Nightcrawler",
						"cardId" : "nightcrawler",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Professor X",
						"cardId" : "professorX",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Wolverine (Dark City)",
						"cardId" : "wolverineDarkCity",
						"included" : true
					}
				]
			},
            {
				"setName" : "Fantastic Four",
				"setId" : "FantasticFour",
				"included" : true,
				"cards" : [
					{
						"cardType" : "character",
						"cardName" : "Mr. Fantastic",
						"cardId" : "mrFantastic",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Thing",
						"cardId" : "thing",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Human Torch",
						"cardId" : "humanTorch",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Silver Surfer",
						"cardId" : "silverSurfer",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Invisible Woman",
						"cardId" : "invisibleWoman",
						"included" : true
					}
				]
			},
            {
				"setName" : "Paint the Town Red",
				"setId" : "paintTheTownRed",
				"included" : true,
				"cards" : [
					{
						"cardType" : "character",
						"cardName" : "Scarlet Spider",
						"cardId" : "scarletSpider",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Spider-Woman",
						"cardId" : "spiderWoman",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Black Cat",
						"cardId" : "blackCat",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Symbiote Spider-Man",
						"cardId" : "symbioteSpiderMan",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Moon Knight",
						"cardId" : "moonKnight",
						"included" : true
					}
				]
			},
            {
				"setName" : "Guardians of the Galaxy",
				"setId" : "guardiansOfTheGalaxy",
				"included" : true,
				"cards" : [
					{
						"cardType" : "character",
						"cardName" : "Star Lord",
						"cardId" : "starLord",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Drax the Destroyer",
						"cardId" : "draxTheDestroyer",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Gamora",
						"cardId" : "gamora",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Rocket",
						"cardId" : "rocket",
						"included" : true
					},
                    {
						"cardType" : "character",
						"cardName" : "Groot",
						"cardId" : "groot",
						"included" : true
					}
				]
			}
		]
	}
];

initDatabase();