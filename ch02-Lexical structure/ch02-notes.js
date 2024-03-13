/** 
 * Les litérals
 * on appelle litérals des valeurs qui apparaissent directement dans le code
 * comme des nombres (12, 3.14), des chaines de caractères ("Hello world", 'Bonjour'), des booléen (true, false)
 * ou encofre la valeur null...
*/

/**
 * Les variables
 * Les variables peuvent commencer par une lettre, un underscore ou le $
*/

/** Unicode
 * JS permet l'utilisation de tous les caractères Unicode (lettres - avec accents -, digits,
 * et ideograph - mais pas les emojis -, i.e symboles mathématiques inclus) dans les noms des variables.
 * Par convention on n'utilisera que les lettres ASCII et les digits dans les nom de variables.
 * 
 * Certains OS n'affichant pas correctement tous les caractères Unicode, JS définit des séquences permettant
 * d'écrire ces caratères en utiliasant des caratères ASCII. Ces séquences commenecent par \u et sont suivies
 * soit par quatres valeurs hexadecimales, soit par six valeurs hexadécimales encapsulées dans {}
 */

console.log("caf\u00e9");
console.log("caf\u{E9}")
console.log("caf\u{e9}")
console.log("\u{1F600}") // pour afficher un emoji souriant

/** NOrmalisation
 * Unicode permet différentes façons d'encoder le même caractère. Par exemple le é s'encode
 * \u00E9 ou encore (le e suivi de l'encodage de son accent) e\u0301.
 * Si ces caratères s'affichent à l'identique, elles sont considérées diffentes par JS
 */
const cafe\u0301 = 1; // déclaration de café
const caf\u00e9  = 2; // déclaration de café


/**
 * Le point-virgule
 * Javascript interprète le retour à la ligne comme ";" - fin d'une assertions - quand il ne peut
 * pas parser la ligne suivante comme la cokntinuation de la précédente. Les exception à cette règle sont :
 * - les assertions return, throw, yield, breag et continue
 * - Les ++ et -- doivent apparaître sur la même ligne que l'expression à laquelle elles s'appliquent
 * - le => d'une fonction flêchée doit apparaître sur la même ligne que les paramètres de la fonction.
 */
