/** La programmation modulaire consiste essentiellement à encapsuler ou cacher des détails d'implémentation 
 *  et garder un espace de nomage bien rangé, de sorte à ce qu'un module ne puisse pas modifier accidentellement
 * les variables, fonction et classes définies dans un autre module.
 * Ainsi, peuvent être considérés comme modules : classes, objets et les closures
 * 
 * En node, chaque fichier est considéré comme un module indépendant avec son espace de nom privé. Les Constantes, variables,
 * fonctions et classes définies dans un fichier restent privés jusqu'à ce que ce fichier ne les exporte.
 * Un module node importe un autre module via la fonction require()
*/
const Nbr = require('../ch09-Classes/Complex')
let compl1 = new Nbr(2, 1);
console.log(compl1);

/**
 * Les modules en ES6 sont les quasiment les mêmes qu'en node seulement que leurs syntaxe est différente.
 * En ES6 on utilise import et export pour importer et exporter un module.
 * Dans les modules, on est en mode strict (comme dans les classes). This est valorisé à undefined. Mais dans le
 * navigateur et dans node, il vaut l'objet global.
 */

const maFunction = function() {};
const MaClass = class {};

export {maFunction, MaClass}; // cette syntaxe traduit le fait d'exporter la fonction et la classe

/** L'on utilse aussi la syntaxe export default pour n'exporter qu'un seul élément...qui peut être même un objet,
 * une fonction anonyme...
 * un module ne peut avoir qu'un seul export default.
 * 
 * Note : import et export sont des top-level instrauctions i.e ne peuvent pas se mettre dans le body d'une function
 * ou d'une classe.
 * Comme pour les functions, les imports sont hoisted
 */

export default {x:1, y:2} // cette syntaxe traduit l'export de l'objet {x:1, y:2}.

/**
 * synatxe de l'import
 */
import Complex from '../ch09-Classes/Complex'; // import de Complex du module Complex. Le nom (chemin) du module - tout 
// à droite ne peut pas être une expression ou un template. il doit être un strign constant.

// Il est possible de rexporter un module sans avoir besloin de l'importer avant. AInsi :
import Complex from '../ch09-Classes/Complex';
export {Complex};
// est equivalent à
export {Complex} from '../ch09-Classes/Complex'

/**import()
 * la directive import permet d'importer de manière statique un module. Ainsi, ce import est exécuté avnt tout code
 * à l'intérieur du module qui fait l"import : ce qui peut causer des lenteurs dans des environnement où les capaciéts 
 * sont limitées.
 * L'import dynamique permet de contourner le problème de chargement/exécution. Exemple :
 * import("./mon-module.js").then(...). une utilisation des fonctions de ce module ressemblerait à ceci :
 * async ma-fonction(mon-param) {
 *  let module-fonctions = await import('./mon-module.js');
 *  return module-fonctions.fonction1(mon-param);
 * }
 * 
 * Dans un import dynamique, la valeur du module importé peut s'exprimer sous forme d'une expression
 */

/** import.meta.url
 * import.meta est un objet qui contient les information à propos du module courant. Ainsi import.meta.url de ce objet
 * est l'utl à partir de laquelle ce module a été chargé.
 * Un cas d'utilisation de import.meta.url est de permettre de retrouver les images, fichiers et autres ressources 
 * stockées dans le même module.
 */