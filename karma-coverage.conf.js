var metalKarmaConfig = require('metal-karma-config/coverage');

module.exports = function (config) {
	metalKarmaConfig(config);
	config.files.push('bower_components/jquery/dist/jquery.js');
}
