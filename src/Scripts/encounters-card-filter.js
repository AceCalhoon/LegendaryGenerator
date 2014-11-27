"use strict"

function NewEncountersCardFilter(db, el, filterTemplate) {
	var $el = $(el);
	var $filterTemplate = $(filterTemplate);
	bindCardFilter();

	return {
		bindFilter : bindCardFilter,
		saveFilter : saveCardFilter
	};
	
	function bindCardFilter() {
		var source = $filterTemplate.html();
		var template = Handlebars.compile(source);
		var filterHtml = template(db);
		$el.html(filterHtml);
		
		$el.find('input').change(function() {
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
		var $lineElements = $el.find('ul.lines > li > label > input');
		$lineElements.each(function() {
			for(var lineKey in db) {
				var currentLine = db[lineKey];
				if(currentLine.lineId === $(this).data('id')) {
					currentLine.included = $(this).is(':checked');
					break;
				}
			}
		});

		var $setElements = $el.find('ul.sets > li > label > input');
		var sets = db.getAllSets();
		$setElements.each(function() {
			for(var setKey in sets) {
				var currentSet = sets[setKey];
				if(currentSet.setId === $(this).data('id')) {
					currentSet.included = $(this).is(':checked');
					break;
				}
			}
		});
		
		var $cardElements = $el.find('ul.cards > li > label > input');
		var cards = db.getAllCards();
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
}