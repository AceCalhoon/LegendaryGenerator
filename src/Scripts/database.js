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
                    'character',
					'location',
					'stageOneObjective',
					'stageTwoObjective',
					'stageThreeObjective',
					'stageOnePrey',
					'stageTwoPrey',
					'stageThreePrey',
					'mastermind',
                    'scheme',
                    'villain',
                    'henchman'
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
    database.getCardById = getCardById;
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

function getCardById(id) {
	for(var lineKey in database) {
		var currentLine = database[lineKey];
        for(var setKey in currentLine.sets) {
            var currentSet = currentLine.sets[setKey];
            for(var cardKey in currentSet.cards) {
                var currentCard = currentSet.cards[cardKey];
                if(currentCard.cardId === id) {
                    return currentCard;
                }
            }
        }
	}
}

function getSetById(id) {
    for(var lineKey in database) {
		var currentLine = database[lineKey];
        for(var setKey in currentLine.sets) {
            var currentSet = currentLine.sets[setKey];
            if(currentSet.setId === id) {
                return currentSet;
            }
        }
	}
}

var database = [
	{
		"lineName" : "Legendary Encounters",
		"lineId" : "LegendaryEncounters",
		"included" : true,
		"sets" : [
			{
				"setName" : "Aliens",
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
			},
			{
				"setName" : "Predators",
				"setId" : "EncountersPredators",
				"included" : true,
				"cards" : [
					{
						"cardType" : "stageOneObjective",
						"cardName" : "Expendable Assets",
						"cardId" : "expendableAssets",
						"included" : true
					},
					{
						"cardType" : "stageOneObjective",
						"cardName" : "War Zone",
						"cardId" : "warZone",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "Flares, Frags, and Claymores",
						"cardId" : "flaresFragsAndClaymores",
						"included" : true
					},
					{
						"cardType" : "stageTwoObjective",
						"cardName" : "Personal Little War",
						"cardId" : "personalLittleWare",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "Get to the Choppa!",
						"cardId" : "getToTheChoppa",
						"included" : true
					},
					{
						"cardType" : "stageThreeObjective",
						"cardName" : "Other-world Life-form",
						"cardId" : "otherWorldLifeForm",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Blain",
						"cardId" : "blain",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Dillon",
						"cardId" : "dillon",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Dutch",
						"cardId" : "dutch",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Mac",
						"cardId" : "mac",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Danny",
						"cardId" : "danny",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Harrigan",
						"cardId" : "harrigan",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Keyes",
						"cardId" : "keyes",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Lambert",
						"cardId" : "lambert",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "The Val Verdean Jungle",
						"cardId" : "theValVerdeanJungle",
						"included" : true
					},
					{
						"cardType" : "location",
						"cardName" : "The Streets of Los Angeles",
						"cardId" : "theStreetsOfLosAngeles",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Woodland - Intel",
						"cardId" : "woodlandIntel",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Woodland - Strength",
						"cardId" : "woodlandStrength",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Woodland - Survival",
						"cardId" : "woodlandSurvival",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Woodland - Tech",
						"cardId" : "woodlandTech",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Urban - Intel",
						"cardId" : "urbanIntel",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Urban - Strength",
						"cardId" : "urbanStrength",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Urban - Survival",
						"cardId" : "urbanSurvival",
						"included" : true
					},
					{
						"cardType" : "character",
						"cardName" : "Urban - Tech",
						"cardId" : "urbanTech",
						"included" : true
					},
					{
						"cardType" : "stageOnePrey",
						"cardName" : "No Sport",
						"cardId" : "noSport",
						"included" : true
					},
					{
						"cardType" : "stageOnePrey",
						"cardName" : "Drawn By Heat and Conflict",
						"cardId" : "drawnByHeatAndConflict",
						"included" : true
					},
					{
						"cardType" : "stageTwoPrey",
						"cardName" : "Payback Time",
						"cardId" : "paybackTime",
						"included" : true
					},
					{
						"cardType" : "stageTwoPrey",
						"cardName" : "This is History",
						"cardId" : "thisIsHistory",
						"included" : true
					},
					{
						"cardType" : "stageThreePrey",
						"cardName" : "What the Hell Are You?",
						"cardId" : "whatTheHellAreYou",
						"included" : true
					},
					{
						"cardType" : "stageThreePrey",
						"cardName" : "A Taste for Beef",
						"cardId" : "aTasteForBeef",
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
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Dr. Doom",
						"cardId" : "drDoom",
						"included" : true,
                        "alwaysLeads" : "doombotLegion"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Loki",
						"cardId" : "loki",
						"included" : true,
                        "alwaysLeads" : "enemiesOfAsgard"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Magneto",
						"cardId" : "magneto",
						"included" : true,
                        "alwaysLeads" : "brotherhood"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Red Skull",
						"cardId" : "redSkull",
						"included" : true,
                        "alwaysLeads" : "hydra"
					},
                    {
						"cardType" : "villain",
						"cardName" : "Brotherhood",
						"cardId" : "brotherhood",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Enemies of Asgard",
						"cardId" : "enemiesOfAsgard",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "HYDRA",
						"cardId" : "hydra",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Radiation",
						"cardId" : "radiation",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Skrulls",
						"cardId" : "skrulls",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Spider-Foes",
						"cardId" : "spiderFoes",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Masters of Evil",
						"cardId" : "mastersOfEvil",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Doombot Legion",
						"cardId" : "doombotLegion",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Hand Ninjas",
						"cardId" : "handNinjas",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Savage Land Mutates",
						"cardId" : "savageLandMutates",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Sentinels",
						"cardId" : "sentinels",
						"included" : true
					},
                    {
						"cardType" : "scheme",
						"cardName" : "The Legacy Virus",
						"cardId" : "legacyVirus",
						"included" : true,
                        "setup" : "8 Scheme Twists. Wound stack holds 6 Wounds per player"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Midtown Bank Robbery",
						"cardId" : "midtownBankRobbery",
						"included" : true,
                        "setup" : "8 Scheme Twists. 12 total Bystanders in the Villain Deck",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenario.Bystanders = 12;
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Negative Zone Prison Breakout",
						"cardId" : "negativeZonePrisonBreakout",
						"included" : true,
                        "setup" : "8 Scheme Twists. Add an extra Henchmen group to the Villain Deck",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenarioOptions.henchmanGroups ++;
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Portals to the Dark Dimension",
						"cardId" : "portalsToTheDarkDimension",
						"included" : true,
                        "setup" : "7 Scheme Twists. Each twist is a Dark Portal"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Replace Earth's Leaders with Killbots",
						"cardId" : "replaceEarthsLeadersWithKillbots",
						"included" : true,
                        "setup" : "5 Scheme Twists. 3 Additional Scheme Twists next to this Scheme. 18 total Bystanders in the Villain Deck.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenario.Bystanders = 18;
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Secret Invasion of the Skrull Shapeshifters",
						"cardId" : "secretInvasionOfTheSkrullShapeshifters",
						"included" : true,
                        "setup" : "8 Scheme Twists. 6 Heroes. Skrull Villain Group required. Shuffle 12 Random Heroes from the Hero Deck into the Villain Deck.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenarioOptions.heroes = 6;
                            if(!cardPool.containsCard('skrulls', scenario.Villains)) {
                                var skrulls = cardPool.db.getCardById('skrulls');
                                scenarioOptions.villainGroups--;
                                scenario.Villains.push(skrulls);
                                cardPool.pickSpecificCard(skrulls.cardId, cardPool.villains);
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Super Hero Civil War",
						"cardId" : "superHeroCivilWar",
						"included" : true,
                        "setup" : "For 2-3 players, use 8 Scheme Twists. For 4-5 players, use 5 Scheme Twists. If only 2 players, use only 4 heroes in the Hero Deck.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            if(scenarioOptions.playerCount === '2') {
                                scenarioOptions.heroes = 4;
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Unleash the Power of the Cosmic Cube",
						"cardId" : "unleashThePowerOfTheCosmicCube",
						"included" : true,
                        "setup" : "8 Scheme Twists"
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
						"cardId" : "bishop_dark_city",
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
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Apocalypse",
						"cardId" : "apocalypse",
						"included" : true,
                        "alwaysLeads" : "fourHorsemen"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Kingpin",
						"cardId" : "kingpin",
						"included" : true,
                        "alwaysLeads" : 'streetsOfNewYork'
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Mr. Sinister",
						"cardId" : "mrSinister",
						"included" : true,
                        "alwaysLeads" : "marauders"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Stryfe",
						"cardId" : "stryfe",
						"included" : true,
                        "alwaysLeads" : "mlf"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Mephisto",
						"cardId" : "mephisto",
						"included" : true,
                        "alwaysLeads" : "underworld"
					},
                    {
						"cardType" : "villain",
						"cardName" : "Emissaries of Evil",
						"cardId" : "emissariesOfEvil",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Four Horsemen",
						"cardId" : "fourHorsemen",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "MLF",
						"cardId" : "mlf",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Marauders",
						"cardId" : "marauders",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Streets of New York",
						"cardId" : "streetsOfNewYork",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Underworld",
						"cardId" : "underworld",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Maggia Goons",
						"cardId" : "maggiaGoons",
						"included" : true
					},
                    {
						"cardType" : "henchman",
						"cardName" : "Phalanx",
						"cardId" : "Phalanx",
						"included" : true
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Capture Baby Hope",
						"cardId" : "captureBabyHope",
						"included" : true,
                        "setup" : "8 Scheme Twists. Put a token on this Scheme to represent the baby, Hope Summers."
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Detonate the Helicarrier",
						"cardId" : "detonateTheHelicarrier",
						"included" : true,
                        "setup" : "8 Scheme Twists. 6 Heroes in the Hero Deck.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenarioOptions.heroes = 6;
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Massive Earthquake Generator",
						"cardId" : "massiveEarthquakeGenerator",
						"included" : true,
                        "setup" : "8 Scheme Twists"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Organized Crime Wave",
						"cardId" : "organizedCrimeWave",
						"included" : true,
                        "setup" : "8 Scheme Twists. Include 10 Maggia Goons as one of the Henchman groups.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            if(!cardPool.containsCard('maggiaGoons', scenario.Henchmen)) {
                                var goons = getCardById('maggiaGoons');
                                var smallGoons = {
                                    cardType: goons.cardType,
                                    cardName: '10 ' + goons.cardName,
                                    cardId: goons.cardId,
                                    set: goons.set
                                };
                                scenario.Henchmen.push(smallGoons);
                                scenarioOptions.henchmanGroups--;
                                cardPool.pickSpecificCard(goons.cardId, cardPool.henchmen);
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Save Humanity",
						"cardId" : "saveHumanity",
						"included" : true,
                        "setup" : "8 Scheme Twists. 24 Bystanders in the Hero Deck (1 player: 12 Bystanders in the Hero Deck)"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Steal the Weaponized Plutonium",
						"cardId" : "stealTheWeaponizedPlutonium",
						"included" : true,
                        "setup" : "8 Scheme Twists representing plutonium. Add an extra Villain Group.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenarioOptions.villainGroups++;
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Transform Citizens into Demons",
						"cardId" : "transformCitizensIntoDemons",
						"included" : true,
                        "setup" : "8 Scheme Twists. Villain Deck includes 14 extra Jean Grey and no Bystanders.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenario.Bystanders = 0;
                            cardPool.pickSpecificCard('jeanGrey', cardPool.characters);
                            
                            var jean = getCardById('jeanGrey');
                            var jeanCard = {
                                cardType: 'character',
                                cardName: '14 ' + jean.cardName + ' (Villain Deck)',
                                cardId: jean.cardId,
                                included: true,
                                set: jean.set
                            }
                            scenario.Characters.push(jeanCard);
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "X-Cutioner's Song",
						"cardId" : "xcutionersSong",
						"included" : true,
                        "setup" : "8 Scheme Twists. Villain Deck includes 14 cards for an extra Hero and no Bystanders",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            scenario.Bystanders = 0;
                        
                            var target = cardPool.pickRandomCard(cardPool.characters);
                            var targetCard = {
                                cardType: 'character',
                                cardName: '14 ' + target.cardName + ' (Villain Deck)',
                                cardId: target.cardId,
                                included: true,
                                set: target.set
                            }
                            scenario.Characters.push(targetCard);
                        }
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
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Mole Man",
						"cardId" : "moleMan",
						"included" : true,
                        "alwaysLeads" : "subterranea"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Galactus",
						"cardId" : "galactus",
						"included" : true,
                        "alwaysLeads" : "heraldsOfGalactus"
					},
                    {
						"cardType" : "villain",
						"cardName" : "Subterranea",
						"cardId" : "subterranea",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Heralds of Galactus",
						"cardId" : "heraldsOfGalactus",
						"included" : true
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Bathe Earth in Cosmic Rays",
						"cardId" : "batheEarthInCosmicRays",
						"included" : true,
                        "setup" : "6 Scheme Twists"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Flood the Planet with Melted Glaciers",
						"cardId" : "floodThePlanetWithMeltedGlaciers",
						"included" : true,
                        "setup" : "8 Scheme Twists"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Invincible Force Field",
						"cardId" : "invincibleForceField",
						"included" : true,
                        "setup" : "7 Scheme Twists"
					},
                    {
                        "cardType" : "scheme",
                        "cardName" : "Pull Reality into the Negative Zone",
                        "cardId" : "pullRealityIntoTheNegativeZone",
                        "included" : true,
                        "setup" : "8 Scheme Twists"
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
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Carnage",
						"cardId" : "carnage",
						"included" : true,
                        "alwaysLeads" : "maximumCarnage"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Mysterio",
						"cardId" : "mysterio",
						"included" : true,
                        "alwaysLeads" : "sinisterSix"
					},
                    {
						"cardType" : "villain",
						"cardName" : "Sinister Six",
						"cardId" : "sinisterSix",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Maximum Carnage",
						"cardId" : "maximumCarnage",
						"included" : true
					},
                    {
						"cardType" : "scheme",
						"cardName" : "The Clone Saga",
						"cardId" : "theCloneSaga",
						"included" : true,
                        "setup" : "8 Scheme Twists"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Splice Humans with Spider DNA",
						"cardId" : "spliceHumansWithSpiderDna",
						"included" : true,
                        "setup" : "8 Scheme Twists. Include Sinister Six as one of the Villain Groups.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            if(!cardPool.containsCard('sinisterSix', scenario.Villains)) {
                                var six = getCardById('sinisterSix');
                                scenario.Villains.push(six);
                                scenarioOptions.villainGroups--;
                                cardPool.pickSpecificCard(six.cardId, cardPool.villains);
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Web of Lies",
						"cardId" : "webOfLies",
						"included" : true,
                        "setup" : "7 Scheme Twists"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Invade the Daily Bugle News HQ",
						"cardId" : "invadeTheDailyBugleNewsHq",
						"included" : true,
                        "setup" : "8 Scheme Twists. Add 6 extra Henchmen from a single Henchmen Group to the Hero Deck.",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            var hench = cardPool.pickRandomCard(cardPool.henchmen);
                            var henchHero = {
                                "cardType" : hench.cardType,
                                "cardName" : '6 ' + hench.cardName + ' (Henchman)',
                                "cardId" : hench.cardId,
                                "include" : hench.included,
                                "set" : hench.set
                            };
                            
                            scenario.Characters.push(henchHero);
                        }
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
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Supreme Intelligence of the Kree",
						"cardId" : "supremeIntelligenceOfTheKree",
						"included" : true,
                        "alwaysLeads" : "kreeStarforce"
					},
                    {
						"cardType" : "mastermind",
						"cardName" : "Thanos",
						"cardId" : "thanos",
						"included" : true,
                        "alwaysLeads" : "infinityGems"
					},
                    {
						"cardType" : "villain",
						"cardName" : "Infinity Gems",
						"cardId" : "infinityGems",
						"included" : true
					},
                    {
						"cardType" : "villain",
						"cardName" : "Kree Starforce",
						"cardId" : "kreeStarforce",
						"included" : true
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Unite the Shards",
						"cardId" : "uniteTheShards",
						"included" : true,
                        "setup" : "30 shards in the supply. Scheme Twists equal to the number of players plus 5"
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Forge the Infinity Gauntlet",
						"cardId" : "forgeTheInfinityGauntlet",
						"included" : true,
                        "setup" : "8 Scheme Twists. Always include the Infinity Gems Villain Group",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            if(!cardPool.containsCard('infinityGems', scenario.Villains)) {
                                var gems = getCardById('infinityGems');
                                scenario.Villains.push(gems);
                                scenarioOptions.villainGroups--;
                                cardPool.pickSpecificCard(gems.cardId, cardPool.villains);
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "The Kree-Skrull War",
						"cardId" : "theKreeSkrullWar",
						"included" : true,
                        "setup" : "8 Scheme Twists. Always include Kree Starforce and Skrull Villain Groups",
                        "setupFn" : function(scenario, scenarioOptions, cardPool) {
                            if(!cardPool.containsCard('kreeStarforce', scenario.Villains)) {
                                var kree = getCardById('kreeStarforce');
                                scenario.Villains.push(kree);
                                scenarioOptions.villainGroups--;
                                cardPool.pickSpecificCard(kree.cardId, cardPool.villains);
                            }
                            
                            if(!cardPool.containsCard('skrulls', scenario.Villains)) {
                                var skrulls = getCardById('skrulls');
                                scenario.Villains.push(skrulls);
                                scenarioOptions.villainGroups--;
                                cardPool.pickSpecificCard(skrulls.cardId, cardPool.villains);
                            }
                        }
					},
                    {
						"cardType" : "scheme",
						"cardName" : "Intergalactic Kree Nega-Bomb",
						"cardId" : "intergalacticKreeNegaBomb",
						"included" : true,
                        "setup" : "8 Scheme Twists. Make a face down 'Nega-Bomb' deck of 6 Bystanders"
					}
				]
			}
		]
	}
];

initDatabase();