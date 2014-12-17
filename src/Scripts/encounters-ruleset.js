function NewEncountersRuleset() {
    var $filterEl;
    var $resultsEl;
    var internalDb;
    
    var filterTemplateSource = $('#encounters-filter-template').html();
    var resultsTemplateSource = $('#encounters-results-template').html();
    
    return {
        init: function(db, filterEl, resultsEl) {
            $filterEl = $(filterEl);
            $resultsEl = $(resultsEl);
            internalDb = db;//$.extend(true, {}, db);

            bindCardFilter();
        },
        generateScenario: function(playerCount) {
            saveCardFilter();
            var scenario = getEncountersScenario(playerCount);
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
    
    function getEncountersScenario(playerCount) {
        var scenario = {};

        var stageOneObjectives = internalDb.getSelectedCardsByType("stageOneObjective");
        var stageTwoObjectives = internalDb.getSelectedCardsByType("stageTwoObjective");
        var stageThreeObjectives = internalDb.getSelectedCardsByType("stageThreeObjective");
        var characters = internalDb.getSelectedCardsByType("character");
        var locations = internalDb.getSelectedCardsByType("location");
        
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