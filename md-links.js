const fs = require('fs');
const path = require('path');
const pathFunctions = require('./pathFunctions');

module.exports = (pathEntered, options) => {
  return new Promise((resolve, reject) => {
		if(pathEntered == ''){
			let error = new Error('no has ingresado una ruta');
      reject(error);
		}else {
      pathFunctions.validateAbsolute(pathEntered)
      .then(newPath => {
        pathFunctions.validateDirectory(newPath)
        .then(validationDir => {
          if (validationDir) {
            pathFunctions.readDirectory(newPath, '.md')
            .then(filesArray => {
              let linksFileArray = [];
              let arrayConcat = [];
              const filesCount = filesArray.length;
              filesArray.forEach(element => {
                pathFunctions.readFiles(element)
                .then(file =>{
                  const linksArray  = pathFunctions.obtainLinks(file, element);
                  arrayConcat = arrayConcat.concat(linksArray);
                  linksFileArray.push(linksArray);
                  if (linksFileArray.length == filesCount) {
                    resolve (arrayConcat);
                  }
                })
                .catch(error => console.error(error));
              });
            })
            .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
        pathFunctions.validateFile(newPath)
        .then(validationFile => {
          if(validationFile){
            pathFunctions.readFiles(newPath)
            .then(file =>{
              const linksArray = pathFunctions.obtainLinks(file, newPath);
              resolve (linksArray);

            })
            .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

    }

	});
};
