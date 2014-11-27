"use strict"

function NewEncountersGenerator(db) {
	return {
		getScenario : getEncountersScenario
	};

	function getEncountersScenario(playerCount) {
		var scenario = {};

		var stageOneObjectives = db.getSelectedCardsByType("stageOneObjective");
		var stageTwoObjectives = db.getSelectedCardsByType("stageTwoObjective");
		var stageThreeObjectives = db.getSelectedCardsByType("stageThreeObjective");
		var characters = db.getSelectedCardsByType("character");
		var locations = db.getSelectedCardsByType("location");
		
		var locationIndex = getRandomInt(0, locations.length);
		scenario.Location = locations[locationIndex];
		
		var stageOneIndex = getRandomInt(0, stageOneObjectives.length);
		scenario.StageOneObjective = stageOneObjectives[stageOneIndex];
		
		var stageTwoIndex = getRandomInt(0, stageTwoObjectives.length);
		scenario.StageTwoObjective = stageTwoObjectives[stageTwoIndex];
		
		var stageThreeIndex = getRandomInt(0, stageThreeObjectives.length);
		scenario.StageThreeObjective = stageThreeObjectives[stageThreeIndex];
		
		scenario.Characters = [];
		for(var i = 0; i < 4; ++i) {
			//Pick a character at random, and then remove it from the characters array.
			var charIndex = getRandomInt(0, characters.length);
			scenario.Characters.push(characters[charIndex]);
			characters.splice(charIndex, 1);
		}
		scenario.Characters.sort(function(a, b) {
			return a.cardName.localeCompare(b.cardName);
		})
		
		scenario.HiveCards = playerCount;
		
		return scenario;
	}

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}
}