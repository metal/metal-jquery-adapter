'use strict';

import core from 'bower:metaljs/src/core';

var JQueryPlugin = {
	register(name, constructor) {
		if (!$) {
			throw new Error('jQuery needs to be included in the page for JQueryPlugin to work.');
		}
		if (!core.isString(name)) {
			throw new Error('The name string is required for registering a plugin');
		}
		if (!core.isFunction(constructor)) {
			throw new Error('The constructor function is required for registering a plugin');
		}

		$.fn[name] = function(optionsOrMethodName) {
			handlePluginCall(name, constructor, optionsOrMethodName, this);
		};
	}
}

function handlePluginCall(name, constructor, optionsOrMethodName, collection) {
	collection.each(function() {
		if (core.isString(optionsOrMethodName)) {

		} else {
			createOrUpdateInstance(name, constructor, optionsOrMethodName, $(this));
		}
	});
}

function createOrUpdateInstance(name, constructor, options, element) {
	var fullName = 'metal-' + name;
	var instance = element.data(fullName);
	options = $.extend({}, options, {element: element[0]});
	if (instance) {
		instance.setAttrs(options);
	} else {
		var instance = new constructor(options).render();
		element.data(fullName, instance);
	}
}

export default JQueryPlugin;
