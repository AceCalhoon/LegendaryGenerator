"use strict"

function NewEncountersResults(db, el, filterTemplate) {
	var $el = $(el);
	var $filterTemplate = $(filterTemplate);

	return {
		bindResults : bindResults
	};

	function bindResults(results) {
		var source = $filterTemplate.html();
		var template = Handlebars.compile(source);
		var resultsHtml = template(results);
		$el.html(resultsHtml);
	}
}