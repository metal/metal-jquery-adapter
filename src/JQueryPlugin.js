'use strict';

import core from 'bower:metaljs/src/core';

/**
 * Acts as a bridge between Metal.js and jQuery, allowing Metal.js components to
 * be used as jQuery plugins.
 * @type {Object}
 */
var JQueryPlugin = {
  /**
   * Registers a Metal.js component as a jQuery plugin with the given name.
   * @param {string} name The name of the plugin that should be registered.
   * @param {!Function(Object)} Ctor The constructor of the Metal.js component.
   */
  register(name, Ctor) {
    if (!$) {
      throw new Error('jQuery needs to be included in the page for JQueryPlugin to work.');
    }
    if (!core.isString(name)) {
      throw new Error('The name string is required for registering a plugin');
    }
    if (!core.isFunction(Ctor)) {
      throw new Error('The constructor function is required for registering a plugin');
    }

    $.fn[name] = function(configOrMethodName) {
      handlePluginCall(name, Ctor, this, configOrMethodName);
    };
  }
};

/**
 * Creates an instace of a component for the given element, or updates it if one
 * already exists.
 * @param {string} name The name of the plugin.
 * @param {!Function(Object)} Ctor The constructor of the Metal.js component.
 * @param {!jQuery} element A jQuery collection with a single element.
 * @param {Object} config A config object to be passed to the component instance.
 */
function createOrUpdateInstance(name, Ctor, element, config) {
  var fullName = 'metal-' + name;
  var instance = element.data(fullName);
  config = $.extend({}, config, {
    element: element[0]
  });
  if (instance) {
    instance.setAttrs(config);
  } else {
    element.data(fullName, new Ctor(config).render());
  }
}

/**
 * Handles calls to a registered plugin.
 * @param {string} name The name of the plugin.
 * @param {!Function(Object)} Ctor The constructor of the Metal.js component.
 * @param {!jQuery} collection A jQuery collection of elements to handle the plugin for.
 * @param {?(string|Object)} configOrMethodName If this is a string, a method with
 * that name will be called on the appropriate component instance. Otherwise, an
 * the instance (which will be created if it doesn't yet exist) will receive this
 * as its config object.
 */
function handlePluginCall(name, Ctor, collection, configOrMethodName) {
  collection.each(function() {
    if (core.isString(configOrMethodName)) {

    } else {
      createOrUpdateInstance(name, Ctor, $(this), configOrMethodName);
    }
  });
}

export default JQueryPlugin;
