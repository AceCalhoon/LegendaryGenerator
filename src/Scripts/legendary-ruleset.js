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
        
        var henchmen = internalDb.getSelectedCardsByType("henchman");
        var villains = internalDb.getSelectedCardsByType("villain");
        var masterminds = internalDb.getSelectedCardsByType("mastermind");
        var characters = internalDb.getSelectedCardsByType("character");
        var schemes = internalDb.getSelectedCardsByType("scheme");

        var villainGroups;
        var henchmanGroups;
        var bystanders;
        var heroes;

        switch(playerCount) {
            case '2':
                villainGroups = 2;
                henchmanGroups = 1;
                bystanders = 2;
                heroes = 5;
                break;
            case '3':
                villainGroups = 3;
                henchmanGroups = 1;
                bystanders = 8;
                heroes = 5;
                break;
            case '4':
                villainGroups = 3;
                henchmanGroups = 2;
                bystanders = 8;
                heroes = 5;
                break;
            case '5':
                villainGroups = 4;
                henchmanGroups = 2;
                bystanders = 12;
                heroes = 6;
                break;
        }
        
        scenario.Bystanders = bystanders;
        
        scenario.Mastermind = pickRandomCard(masterminds);
        
        scenario.Henchmen = [];
        scenario.Villains = [];
        
        if(scenario.Mastermind) {
            var alwaysLead = internalDb.getCardById(scenario.Mastermind.alwaysLeads);
            if(alwaysLead.cardType === 'henchman') {
                henchmanGroups--;
                scenario.Henchmen.push(alwaysLead);
                pickSpecificCard(alwaysLead.cardId, henchmen);
            }
            else if(alwaysLead.cardType === 'villain') {
                villainGroups--;
                scenario.Villains.push(alwaysLead);
                pickSpecificCard(alwaysLead.cardId, villains);
            }
        }
        
        scenario.Henchmen = scenario.Henchmen.concat(pickRandomCards(henchmanGroups, henchmen));
        sortByCardName(scenario.Henchmen);
        scenario.Villains = scenario.Villains.concat(pickRandomCards(villainGroups, villains));
        sortByCardName(scenario.Villains);
        
        scenario.Scheme = pickRandomCard(schemes);
        scenario.Characters = pickRandomCards(heroes, characters);
        
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