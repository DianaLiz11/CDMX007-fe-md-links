const parseArgs = require('minimist')
const mdLinks = require("./md-links.js");
const validateOptions = require("./validateOptions.js");
const argv = parseArgs(process.argv.slice(2), {
  boolean: [ 'validate' , 'stats' ],
  alias: { v: 'validate', s: 'stats' }
});



mdLinks(argv._[0], argv)
.then(array => {

	validateOptions(array, argv)

})
.catch(error => console.error(error));
