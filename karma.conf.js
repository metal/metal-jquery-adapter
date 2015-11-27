var metalKarmaConfig = require('metal-karma-config');

module.exports = function (config) {
	metalKarmaConfig(config);
	config.files.push('bower_components/jquery/dist/jquery.js');
}
