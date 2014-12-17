function NewGeneratorBase(db, el) {
    var $el = $(el);
    var currentRuleset = null;
    
    return {
        setRuleset: function(ruleset) {
            currentRuleset = ruleset;
            
            $filterEl = $el.find('.card-filter');
            $resultsEl = $el.find('.results');
            
            currentRuleset.init(db, $filterEl, $resultsEl);
        },
        generate: function(playerCount) {
            currentRuleset.generateScenario(playerCount);
        }
    };
}