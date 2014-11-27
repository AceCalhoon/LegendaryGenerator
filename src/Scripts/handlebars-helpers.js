"use strict"

//Source: http://stackoverflow.com/a/17061986/16911
Handlebars.registerHelper('checked', function(currentValue) {
	return currentValue == '1' ? ' checked="checked"' : '';
});

Handlebars.registerHelper('mult', function(val1, val2) {
	return val1 * val2;
});