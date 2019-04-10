const fetch = require('node-fetch');
const colors = require('colors');
let count = 0;

const duplicate = (linksArray) => {
  const onlyLinksArray = linksArray.map(({href}) => (href));
  countDuplicate = 0;
  for (let i = 0; i < onlyLinksArray.length; i++) {
    for (let j = onlyLinksArray.length; j > i  ; j--) {
      if (onlyLinksArray[i] === onlyLinksArray[j]) {
        countDuplicate ++;
      }
    }
  }
  return countDuplicate;
}

module.exports = (linksArray, options) => {
  if (linksArray.length <= 0) {
    console.log('No se encontraron links');
  }

  const unique = linksArray.length - duplicate(linksArray);

  if (options.validate && options.stats) {
    for(let i = 0; i < linksArray.length; i++){

      fetch(linksArray[i].href)
      .then(res => {
        if (res.statusText !== 'OK') {
          count ++;
        }
        if (i+1 === linksArray.length) {
          console.log('Total: ' + linksArray.length + '\nUnique: ' + unique + '\nBroken: '+ count);
        }
      })
      .catch(err => console.log(err));
    }

  }else if (options.validate) {
    for(let i = 0; i < linksArray.length; i++){
      fetch(linksArray[i].href)
      .then(res => {
        if (res.statusText === 'OK') {
          console.log(linksArray[i].file.magenta + ' ' + linksArray[i].href.cyan + ' ' + res.statusText.green + ' ' + res.status.toString().green + ' ' + linksArray[i].text.yellow);
        }else {
          console.log(linksArray[i].file.magenta + ' ' + linksArray[i].href.cyan + ' ' + res.statusText.red + ' ' + res.status.toString().red + ' ' + linksArray[i].text.yellow);
        }

      })
      .catch(err => console.log(err));
    }
  }
  else if (options.stats) {
    console.log('Total: ' + linksArray.length + '\nUnique: ' + unique);
  }
  else {
    linksArray.forEach(element => {
      console.log(element.file.magenta + ' ' + element.href.cyan + ' ' + element.text.yellow);
    })
  }
}
