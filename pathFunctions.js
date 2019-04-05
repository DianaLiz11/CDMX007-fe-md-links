const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
md = new MarkdownIt();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//Funcion que valda si la ruta es absoluta o relativa, devuelve una ruta absoluta
const validateAbsolute = (pathEntered) => {
	return new Promise((resolve, reject) => {
		if (pathEntered != null || pathEntered != undefined) {
			if(path.isAbsolute(pathEntered)){
				return resolve(pathEntered);
			}else {
				return resolve(path.resolve(pathEntered));
			}
		} else {
			let error = new Error('no has ingresado una ruta');
      return reject(error);
		}
	});
}

module.exports.validateAbsolute = validateAbsolute;

const validateDirectory = (pathEntered) => {
	let promise = new Promise( (resolve, reject) => {
		fs.stat(pathEntered, function(err, stats) {
			if (err) {
				reject(err);
	    }
	    resolve(stats.isDirectory());
	 	});
	});
	return promise;

	// fs.stat(pathEntered, function(err, stats) {
	// 	if (err) {
	// 		return(err);
	// 	}
	// 	console.log(pathEntered);
	// 	console.log(stats);
	// 	console.log(stats.isDirectory());
	// 	return(stats.isDirectory());
	// });
}

module.exports.validateDirectory = validateDirectory;

const validateFile = (pathEntered) => {
	// fs.stat(pathEntered, function(err, stats) {
	// 	if (err) {
	// 		return(err);
	// 	}
	// 	return (stats.isFile());
	// });
	let promise = new Promise( (resolve, reject) => {
		fs.stat(pathEntered, function(err, stats) {
			if (err) {
				reject(err);
	    }
	    resolve(stats.isFile());
	 	});
	});
	return promise;
}

module.exports.validateFile = validateFile;

const readDirectory = (pathEntered, ext) => {
	// fs.readdir(pathEntered, function(err, files) {
	// 	if(err) throw err;
	// 	files.forEach(element => {
	// 		if(path.extname(element) == ext){
	// 			const newPath = path.resolve(element);
	// 			console.log(newPath);
	// 		}
	// 	});
	// });
	let promise = new Promise( (resolve, reject) => {
		let filesArray = [];
		fs.readdir(pathEntered, function(err, files) {
			if(err) reject(err);
			files.forEach(element => {
				if(path.extname(element) == ext){
					const newPath = path.join(pathEntered, element);
					filesArray.push(newPath);
				}
			});
			resolve(filesArray);
		});
	});
	return promise;
}

module.exports.readDirectory = readDirectory;

const readFiles = (pathEntered) => {
	return new Promise((resolve, reject) => {
    fs.readFile(pathEntered, 'utf8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
	});
}

module.exports.readFiles = readFiles;

const obtainLinks = (file, pathFile) => {
	let linksArray = [];
	const html = md.render(file, {});
	const dom = new JSDOM(`${html}`);
	const aArray = dom.window.document.getElementsByTagName('a');
	for(let i = 0; i < aArray.length; i++){
		let linkObj = {};
		linkObj.href = aArray[i].href;
		linkObj.text = aArray[i].text;
		linkObj.file = pathFile.substr(-50,50);
		linksArray[i] = linkObj;
	}

	return (linksArray);
}

module.exports.obtainLinks = obtainLinks;
