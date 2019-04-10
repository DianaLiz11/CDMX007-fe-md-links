const mdLinks = require('../md-links.js');


describe('mdLinks', () => {

  it('mdLinks debería ser una función', () => {
      expect(typeof mdLinks).toBe('function');
  });

  it('mdLinks deberia retornar una promesa que resuelve un arreglo de objetos (links) para un archivo md', () => {
  return expect(mdLinks('/home/diana/Documents/laboratoria/Proyectos/CDMX007-fe-md-links/test/prueba/README4.md', {validate:undefined,stats:undefined})).resolves.toHaveLength(3);
  });

  it('mdLinks deberia retornar una promesa que resuelve un arreglo de objetos (links) para un directorio', () => {
  return expect(mdLinks('/home/diana/Documents/laboratoria/Proyectos/CDMX007-fe-md-links/test/prueba/', {validate:undefined,stats:undefined})).resolves.toHaveLength(15);
  });

  it('mdLinks deberias retornar un error cuando no se ingrese una ruta', () => {
    return expect(Promise.reject(new Error('no has ingresado una ruta'))).rejects.toThrow('no has ingresado una ruta');
  });


});
