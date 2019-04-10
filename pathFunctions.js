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
				resolve(pathEntered);
			}else {
				resolve(path.resolve(pathEntered));
			}
		} else {
			let error = new Error('no has ingresado una ruta');
      reject(error);
		}
	});
}

module.exports.validateAbsolute = validateAbsolute;

const validateDirectory = (pathEntered) => {
	let promise = new Promise( (resolve, reject) => {
		fs.stat(pathEntered, function(err, stats) {
			if (err) {
				reject(new Error('Ocurrion un rror al obtener las estadisticas del directorio'));
	    }
	    resolve(stats.isDirectory());
	 	});
	});
	return promise;
}

module.exports.validateDirectory = validateDirectory;

const validateFile = (pathEntered) => {

	let promise = new Promise( (resolve, reject) => {
		fs.stat(pathEntered, function(err, stats) {
			if (err) {
				reject(new Error('Ocurrion un error al obtener las estadisticas del archivo'));
	    }
	    resolve(stats.isFile());
	 	});
	});
	return promise;
}

module.exports.validateFile = validateFile;

const readDirectory = (pathEntered, ext) => {

	let promise = new Promise( (resolve, reject) => {
		let filesArray = [];
		fs.readdir(pathEntered, function(err, files) {
			if(err) reject(new Error('Ocurrio un error al leer el directorio'));
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
      if (error) reject(new Error('Ocurrio un error al leer el archivo'));
      resolve(data);
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
