/**
 * En JS, les classes utilisent l'héritage basé sur le prototype : on dira que deux objets sont des instances d'une même
 * classe s'il héritent des propriétés (le plus souvent des méthodes) d'un même prototype.
 * Par ailleurs, si deux objets héritent du même prototype, alors ils ont été créés par le même constructeur ou le même factory.
 * 
 * En JSn on peut définir un constructeur comme tout objet de type fonction qui a une propriété prototype. Ainsi donc, tous
 * les objets créés avec le même constructeur héritent du même objet - prototype - et sont membres d'une même classe.
 * 
 */

/** La propriété constructor 
 * Toute fonction régulière JS (sauf fonction chaniée, fonction générator, fonction asyn) peut être utilisée comme 
 * constructeur. Et comme tout appel à un constructeur nécessite un objet prototype. La valeur de cet objet prototype est
 * un objet qui a une unique et non-enumerable propriété constructor. Sa valeur est l'objet fonction.
*/
let F = function() {};
let p = F.prototype;
let c = p.constructor;
c === F; // => true

/** comme pour les déclaration de fonction, les déclarations de class peuvent prendre la forme d'une déclaration
 * ou d'une expression
 */
let Square = class {constructor(x) {this.area = x * x;}};
new Square(3).area // => 9

/** contrairement aux fonctions, les déclarations de classe ne sont pas hoisted
 * Pour déclarer une propriété privée dans une classe, il faut la nommée en commençant par #.
 */

/** AJout de méthode à une classe
 * Pour rappel l'héritage en JS est basé sur le prototype. Un objet hérite les propriétés de son prototype même
 * si les propriétés de ce dernier changent après que l'objet a été créé.
    let complex1 = new Complex(2, 3);
    Complex.prototype.conj = function() {return new Complex(this.r, -this.i)}
*/

/** 
 * Dans le constructeur d'une sous-classe, il faut faire appel à super() avant de pouvoir utiliser le This.
 */
require('./Complex')
let complex1 = new Complex(2, 3);
Complex.prototype.conj = function() {return new Complex(this.r, -this.i)}