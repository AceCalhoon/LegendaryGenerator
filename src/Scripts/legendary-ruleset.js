function NewLegendaryRuleset() {
    var $filterEl;
    var $resultsEl;
    var internalDb;
    
    var filterTemplateSource = $('#legendary-filter-template').html();
    var resultsTemplateSource = $('#legendary-results-template').html();
    
    return {
        init: function(db, filterEl, resultsEl) {
            $filterEl = $(filterEl);
            $resultsEl = $(resultsEl);
            internalDb = db;//$.extend(true, {}, db);

            bindCardFilter();
        },
        generateScenario: function(playerCount) {
            saveCardFilter();
            var scenario = getLegendaryScenario(playerCount);
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
    
    function getLegendaryScenario(playerCount) {
        var scenario = {};
        var scenarioOptions = {};
        
        var cardPool = {
            henchmen : internalDb.getSelectedCardsByType("henchman"),
            villains : internalDb.getSelectedCardsByType("villain"),
            masterminds : internalDb.getSelectedCardsByType("mastermind"),
            characters : internalDb.getSelectedCardsByType("character"),
            schemes : internalDb.getSelectedCardsByType("scheme")
        };
        
        switch(playerCount) {
            case '2':
                scenarioOptions.villainGroups = 2;
                scenarioOptions.henchmanGroups = 1;
                scenarioOptions.bystanders = 2;
                scenarioOptions.heroes = 5;
                break;
            case '3':
                scenarioOptions.villainGroups = 3;
                scenarioOptions.henchmanGroups = 1;
                scenarioOptions.bystanders = 8;
                scenarioOptions.heroes = 5;
                break;
            case '4':
                scenarioOptions.villainGroups = 3;
                scenarioOptions.henchmanGroups = 2;
                scenarioOptions.bystanders = 8;
                scenarioOptions.heroes = 5;
                break;
            case '5':
                scenarioOptions.villainGroups = 4;
                scenarioOptions.henchmanGroups = 2;
                scenarioOptions.bystanders = 12;
                scenarioOptions.heroes = 6;
                break;
        }
        
        scenario.Bystanders = scenarioOptions.bystanders;
        scenario.Mastermind = pickRandomCard(cardPool.masterminds);
        scenario.Scheme = pickRandomCard(cardPool.schemes);
        scenario.Henchmen = [];
        scenario.Villains = [];
        scenario.Characters = [];
        
        if(scenario.Mastermind) {
            var alwaysLead = internalDb.getCardById(scenario.Mastermind.alwaysLeads);
            if(alwaysLead.cardType === 'henchman') {
                scenarioOptions.henchmanGroups--;
                scenario.Henchmen.push(alwaysLead);
                //Remove the always lead faction from the card pool.
                pickSpecificCard(alwaysLead.cardId, cardPool.henchmen);
            }
            else if(alwaysLead.cardType === 'villain') {
                scenarioOptions.villainGroups--;
                scenario.Villains.push(alwaysLead);
                //Remove the always lead faction from the card pool.
                pickSpecificCard(alwaysLead.cardId, cardPool.villains);
            }
        }
        
        scenario.Henchmen = scenario.Henchmen.concat(pickRandomCards(scenarioOptions.henchmanGroups, cardPool.henchmen));
        sortByCardName(scenario.Henchmen);
        scenario.Villains = scenario.Villains.concat(pickRandomCards(scenarioOptions.villainGroups, cardPool.villains));
        sortByCardName(scenario.Villains);
        scenario.Characters = scenario.Characters.concat(pickRandomCards(scenarioOptions.heroes, cardPool.characters));
        sortByCardName(scenario.Characters);
        
        return scenario;
    }

    function pickRandomCard(arr) {
        var selection = pickRandomCards(1, arr);
        if(selection.length > 0) {
            return selection[0];
        }
        else {
            return null;
        }
    }
    
    function pickRandomCards(num, arr) {
        var picks = [];
        
        for(var i = 0; i < num && i < arr.length; ++i) {
            var pickIndex = getRandomInt(0, arr.length);
            picks.push(arr[pickIndex]);
            arr.splice(pickIndex, 1);
        }
        
        picks.sort(function(a, b) {
            return a.cardName.localeCompare(b.cardName);
        });
        
        return picks;
    }
    
    function pickSpecificCard(id, arr) {
        for(var i = 0; i < arr.length; ++i) {
            if(arr[i].cardId === id) {
                var chosenCard = arr[i];
                arr.splice(i, 1);
                
                return chosenCard;
            }
        }
    }
    
    function sortByCardName(arr) {
        arr.sort(function(a, b) {
            return a.cardName.localeCompare(b.cardName);
        });
    }
    
    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
}