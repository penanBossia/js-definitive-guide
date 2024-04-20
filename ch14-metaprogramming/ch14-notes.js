/** Property attributes
 * Les propriétés d'un objet JS ont chacune un nom et une valeur. En plus elles ont chacune des attributs :
 * - writable : précise si la valeur de la propriété peut changer
 * - enumérable : indique si la propriété est énumérée dans une boucle for/in et dans la méthode Object.keys()
 * - configurable : précise si la propriété peut être supprimée ou si ses attributs peuvent changer.
 * 
 * Pour obtenir la description d'une propriété d'un objet, il faut faire appel à la méthode 
 * Object.getOwnPropertyDescriptor(obj, prop_name). Cette méthode renvoie undefined pour les propriétés héritées ou indéfinies
 */
Object.getOwnPropertyDescriptor({x:1}, "x"); // { value: 1, writable: true, enumerable: true, configurable: true }
const random = {
    get octet() {return Math.floor(Math.random() * 256)}
}
Object.getOwnPropertyDescriptor(random, "octet"); // {get: [Function: get octet], set: undefined, enumerable: true, configurable: true}

/** la méthode Object.defineProperty(obj, prop_name, descriptor_obj) permet de manipuler les propriété d'un objet ainsi
 * que les attributs de cette dernière
 */
const obj1 = {};
Object.defineProperty(obj1, "a", {
    value: 2,
    writable: false,
    enumerable: false,
    configurable: true
});
obj1.a; // => 2
Object.keys(obj1); // => []
obj1.a = 10;
obj1.a; // => 2
Object.defineProperty(obj1, "a", {writable: true});
obj1.a = 10;
obj1.a; // => 10
Object.defineProperty(obj1, "a", {get: function() {return 0}}); // a passe d'une data property à une accessor property
obj1.a; // => 0. 

/** Object.create(prototye, descriptor_obj) permet de créer un objet à partir d'un prototype et en même temps utiliser
 * l'objet descriptor (en mode multiple) pour lui ajouter des propriétés
 */
const obj2 = Object.create({a: "val1", b: "val2"}, {
    c: {value: "val3", writable: true, enumerable: true}, // configurabke de c est false
    d: {value: "val4"}

});
Object.getPrototypeOf(obj2); // => { a: 'val1', b: 'val2' }


/** OBject Extensibility
 * L'attribut extensible d'un objet précise si de nouvelles propriétés peuvent lui être ajoutées ou non.
 * Object.isExtensible(mon_obj) : permet de savoir si un object est extensible ou non.
 * Object.preventExtensions(mon_obj) : permet de rendre mon_obj non extensible. Toute tentative d'ajout d'une propriété provoque 
 * un TypeError en mode stricte ou reste dans effet en mode non-stricte.  Cette méthode est sans retour arrière.
 * 
 * Object.seal(mon_obj) : En plus de rendre mon_obj non extensible, elle fige aussi les attributs des propriétés de cet objet.
 * Cette méthode aussi est à sens unique. Pas possible d'ajouter ou de supprimer des propriétés. Les propriétés writable restent modifibales
 * Object.isSeal() : permet de savoir si un objet est seal ou non.
 * 
 * Object.freeze(mon_obj) : fait comme seal() mais rend en plus toutes les propriétés read-only. Cependant les accesseurs get et set
 * restent toujours fonctionnelles.
 * Object.isFrozen() : détermine si un objet est freeze
 */

/** Prototype attribute
 * L'attribut prototype d'un objet spécifie l'objet de qui il hérite. Dans le code cet attribut fait référence à une propriété
 * ordinaire de l'objet et non pas à l'attribut.
 * L'attribut prototype est instancié lors de la création de l'objet
 * 
 * Object.isPrototypeOf() permet de savoir si un objet fait partie de la chaine de prototype d"un autre objet. Fonctionne comme
 * instanceOf
 * 
 * Object.setPrototype() permet de modifier le prototype d'un objet
 */
Object.getPrototypeOf({}); // => Object.prototype 
Object.getPrototypeOf([]); // => Array.prototype 
Object.getPrototypeOf(()=>{}); // => Function.prototype

Object.prototype.isPrototypeOf([]); // => true

const myArray = [1, "3"];
myArray.at(1); // => "3";
Object.setPrototypeOf(myArray, {x: 1000});
// myArray.at(1); // => TypeError: myArray.at is not a function
myArray.x; // => 1000
Object.getPrototypeOf(myArray);

/** Well-known Symbols 
 * Symbol.iterator et Symbol.asyncIterator : permet à des objets ou des classes de se rendre itérables.
 * 
 * Symbol.hasInstance : pour rappel l'expression mon_obj instanceOf ma_function s'avlue en recherchant f.prototype dans la chaine de 
 * prototype de mon_obj. Cela reste vrai. Mais à partir de ES6 ma_function peut être remplacée par tout objet qui a une méthode 
 * nommée [Symbol.hasInstance]. L'évaluation de l'expression mon_objet instanceOf mon_obj_parent se fait en invoquant la méthode
 * Symbol.hasInstance de mon_obj_parent avec l'argument mon_obj.
 * 
 * Symbol.toStringTag : la métode Object.prototype.toString() n'était disponible que sur les instance de type prédéfinis. L'appel
 * à la méthode toString sur une instance de classe custom renvoyait [Object Object]. A partir de ES6, Object.prototype.toString()
 * recherche une propriété de la class avec le nom Symbol.toStringTag et renvoie la valeur de cette propriété
 *  
*/
// exemple bête
const unit8 = {
    [Symbol.hasInstance](x) {
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
}
126 instanceof unit8; // true

class Range {
    get [Symbol.toStringTag]() {
        return "Range";
    }
}

const obj3 = new Range();
Object.prototype.toString.call(obj3); // => [Object Range]
Object.prototype.toString.call(obj3).slice(8, -1); // => Range. Renvoie la class de l'objet

/**Symbol.species
 * Avec l'avènement de extends des classes (ES6), une classe qui éténd une classe hérite notamment de ses méthodes.
 * Quand ces méthodes sont appelées, elles renvoient des instances de la sous-classe.
 * Symbol.species permet de changer ce comportement par défaut.
 * Exemple avec la classe Array.
 * 1. Le constructeur Array() a une propriété nommée Symbol.species.
 * 2. Quand une sous-classe de Array est créée, le constructeur de celle-ci hérite des propriétés des propriétés de Array().
 * Donc hérite de Symbol.species (ou la sous-classe peut définir une propriété avec ce nom)
 * 3. Les méthodes comme map() et slice() qui créent et retournent de nouvelles array ont été modifiées à partir de ES6. Au lieu
 * de simplement créer des array, elles invoques le constructeur new this.constructor[Symbol.species]() pour créer de nouveaux
 * array
 */
class CustomArray extends Array {
    get first() {return this[0];}
    get last() {return this[this.length - 1];}
}
const customArray1 = new CustomArray(1, 3, 8, 7);
customArray1[2]; // => 8
customArray1.first; // => 1
const customArray2 = customArray1.map(x => x*x); // => CustomArray(4) [ 1, 9, 64, 49 ]
customArray2; //
/* par défaut la propriété Symbol.species du constructeur CustomArray() est valorisée à CustomArray. C'est ce qui fait que les
 méhodes map() et slice() renverront des instances de CustomArray. Si par exemple, il est souhaité qu'elle renvoient des instances
 de Array il faut modifier la propriété Symbol.species du constructeur à Array.
 Mais il n'est pas possible de faire CustomArray[Symbol.species] = Array car cette propriété est read-only. Plutôt faire :
 */
Object.defineProperty(CustomArray, Symbol.species, {value: Array})

customArray2.map(x => Math.sqrt(x)); // [ 1, 3, 8, 7 ], c'est un simple Array et non plus un CustomArray

// l'option la plus simple pour modifier Symbol.species serait peut-etre d'en définir un nouveau dans le constructeur :
class CustomArray2 extends Array {
    static get [Symbol.species]() {return Array}
    get first() {return this[0];}
    get last() {return this[this.length - 1];}
}
const customArray3 = new CustomArray2(2, 4, 8);
customArray3.slice(2) // => [8]

/** Symbol.isConcatSpreadable
 * Ce symbol s'utilise nitamment avec la méthode concat qui permet d'ajouter un array (ou un simple élélent) dans un autre array.
 * Avant ES6, un test était fait avec Array.isArray(argument) pour savoir comment traiter l'élément : un simple ajout ou un flat des
 * éléments ajoutés.
 * A partir de ES6, ce test est seulment remplacé par un appel à la méthode nommée Symbol.isConcatSpreadable() de l'objet pour 
 * savoir comment traiter l'argument ajouté : si true, flat de l'argument, sinon ajout simple
 */
const arrayLike = {
    length: 1,
    0: 4,
    [Symbol.isConcatSpreadable]() {return true;}
}
const array1 = [1, 2, 3];
array1.concat(arrayLike); // => [ 1, 2, 3, 4 ]

class CustomArray3 extends Array {
    get [Symbol.isConcatSpreadable]() {return false;}
}
const customArray4 = new CustomArray3(2, 4, 6);
[0, 1].concat(customArray4); // => [ 0, 1, CustomArray3(3) [ 2, 4, 6 ] ]

/** Symbol.toPrimitive
 * JS a trois manières de convertir les objets en valeurs primitive. Quand un string est préféré ou souhaité, JS appelle la 
 * méthode toString() et le cas échéant valueOf() ou ne fait rien.
 * Quand c'est une valeur numérique qui est attendue ou souhaitée, il fait d'abord appel à la méthode valueOf() et le cas échéant
 * toString() ou ne fait rien.
 * Quand il n'y a pas de préférence, il laisse l'objet décider. Par exemple, l'objet Date par exemple appelle toString() en premier.
 * 
 * En créant dans dans nos objets une méthode nommée Symbol.toPrimitive, nous prenons la main sur cet algorithme de conversion.
 * Cette méthode retourne une valeur primitive qui représente cet objet :
 *  - si l'argument est "string" : la valeur retournée espérée est un string. exemple lors d'utilisation de l'objet dans un lieral template
 *  - si l'argument est "number", la valeur retournée espérée est un number. exemple lors des comparaisons <, > ou opérateur - et *
 *  - si l'argument est "default", peut importe la valeur retournée. C'est le cas avec les opérateurs +, == !=
 * 
 * Une bonne raison de définr cette méthode serait de rendre une classe comparable and triable avec < et >
 */
const obj5 = {a: 10}
const obj4 = {
    a: 10,
    [Symbol.toPrimitive](arg) {
        switch(arg) {
            case "string": return `OBJ-${this.a}`;
            case "number": return this.a;
            case "default": return this.a * 2;
        }
    }
}

`Je travail sur ${obj5}`; // Je travail sur [object Object]
`Je travail sur ${obj4}`; // Je travail sur OBJ-10
9 * obj5; // NaN
9 * obj4; // 90
20 == obj5; // false
20 == obj4; // true