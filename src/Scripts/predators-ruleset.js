function NewPredatorsRuleset() {
    //Table for number of Young Blood/Drones to add.
    //droneYoungBloodTable[<num players>][<objective number>]
    //droneYoungBloodTable[<num players>].prep
    var droneYoungBloodTable = {
        1: {
            1: 0,
            2: 0,
            3: 0,
            'prep': false
        },
        2: {
            1: 0,
            2: 1,
            3: 2,
            'prep': false
        },
        3: {
            1: 2,
            2: 3,
            3: 4,
            'prep': false
        },
        4: {
            1: 4,
            2: 5,
            3: 6,
            'prep': false
        },
        5: {
            1: 4,
            2: 5,
            3: 6,
            'prep': true
        }
    };
    
    var $filterEl;
    var $resultsEl;
    var internalDb;
    
    var filterTemplateSource = $('#encounters-predators-filter-template').html();
    var resultsTemplateSource = $('#encounters-predators-results-template').html();
    
    return {
        init: function(db, filterEl, resultsEl) {
            $filterEl = $(filterEl);
            $resultsEl = $(resultsEl);
            internalDb = db;//$.extend(true, {}, db);

            bindCardFilter();
        },
        generateScenario: function(playerCount) {
            saveCardFilter();
            var scenario = getPredatorsScenario(playerCount);
            bindResults(scenario);
        }
    }
    
    function bindResults(results) {
        var template = Handlebars.compile(resultsTemplateSource);
        var resultsHtml = template(results);
        $resultsEl.html(resultsHtml);
    }
    
    function bindCardFilter() {
        var template = Handlebars.compile(filterTemplateSource);
        var filterHtml = template(internalDb);
        $filterEl.html(filterHtml);
        
        $filterEl.find('input').change(function() {
            var value = $(this).is(':checked');
            //uncheck all child elements.
            $(this).closest('li').find('ul input').prop('checked', value);
            
            //If checked, check all parent elements.
            if(value) {
                $(this)
                    .parents('.sets li, .lines li')
                    .children('label').children('input')
                    .prop('checked', value);
            }
        });
    }
    
    function saveCardFilter() {
        var $lineElements = $filterEl.find('ul.lines > li > label > input');
        $lineElements.each(function() {
            for(var lineKey in internalDb) {
                var currentLine = internalDb[lineKey];
                if(currentLine.lineId === $(this).data('id')) {
                    currentLine.included = $(this).is(':checked');
                    break;
                }
            }
        });

        var $setElements = $filterEl.find('ul.sets > li > label > input');
        var sets = internalDb.getAllSets();
        $setElements.each(function() {
            for(var setKey in sets) {
                var currentSet = sets[setKey];
                if(currentSet.setId === $(this).data('id')) {
                    currentSet.included = $(this).is(':checked');
                    break;
                }
            }
        });
        
        var $cardElements = $filterEl.find('ul.cards > li > label > input');
        var cards = internalDb.getAllCards();
        $cardElements.each(function() {
            for(var cardKey in cards) {
                var currentCard = cards[cardKey];
                if(currentCard.cardId === $(this).data('id')) {
                    currentCard.included = $(this).is(':checked');
                    break;
                }
            }
        });
    }
    
    function getPredatorsScenario(playerCount) {
        var scenario = {};

        var stageOnePreys = internalDb.getSelectedCardsByType("stageOnePrey");
        var stageTwoPreys = internalDb.getSelectedCardsByType("stageTwoPrey");
        var stageThreePreys = internalDb.getSelectedCardsByType("stageThreePrey");
        var characters = internalDb.getSelectedCardsByType("character");
        
        var stageOneIndex = getRandomInt(0, stageOnePreys.length);
        scenario.StageOnePrey = stageOnePreys[stageOneIndex];
        scenario.StageOneMercenaries = droneYoungBloodTable[playerCount][1];
        
        var stageTwoIndex = getRandomInt(0, stageTwoPreys.length);
        scenario.StageTwoPrey = stageTwoPreys[stageTwoIndex];
        scenario.StageTwoMercenaries = droneYoungBloodTable[playerCount][2];
        
        var stageThreeIndex = getRandomInt(0, stageThreePreys.length);
        scenario.StageThreePrey = stageThreePreys[stageThreeIndex];
        scenario.StageThreeMercenaries = droneYoungBloodTable[playerCount][3];
        
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
        
        scenario.PrepRound = droneYoungBloodTable[playerCount].prep;
        
        return scenario;
    }

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
}