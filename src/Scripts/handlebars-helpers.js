"use strict"

//Source: http://stackoverflow.com/a/17061986/16911
Handlebars.registerHelper('checked', function(currentValue) {
	return currentValue == '1' ? ' checked="checked"' : '';
});

Handlebars.registerHelper('mult', function(val1, val2) {
	return val1 * val2;
});

Handlebars.registerHelper('ifInCollection', function(val) {
    //Last argument is the options object.
    var options = arguments[arguments.length - 1];

    //Skip the first (val) and last (options) values in the arguments array
    for(var i = 1; i < arguments.length - 1; ++i) {
        if(val === arguments[i]) {
            return options.fn(this);
        }
    }

    return options.inverse(this);
});