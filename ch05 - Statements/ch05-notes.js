/**
 * l'iterateur de Map n'itère pas sur ses keys ou ses values mais sur ses couples de key/value
 */
let map1 = new Map([["k1", "valeur1"]]);
for (let [key, value] of map1) {
    console.log("key :", key, " | ", "value :", value);
}

/**
 * la boucle for/await marche avec les iterateur asynschrones
 * for await (let x of z) {}
 */

/**
 * la boucle for/in marche de la même manière que la boucle for/of à la différence que là ou le for/of
 * attend un objet iterable à droite du of, il n'est attendu qu'un objet à droite du in. 
 * on itère sur les propriétés de cet objet et on affecte chacune d'elle à la variable à gauche du in.
 */

/**
 * Pour avoir des objets iterables sur un objet, on peut fait appel au methodes Object.keys(monObjet) 
 * ou Object.values(monObjet) ou encore Object.entries(monObjet)
 */

// ce code permet de copier les clé d'un objet dans un tableau
let obj1 = { x: 1, y: 2, z: 3 };
let array1 = [], i = 0;
for(array1[i++] in obj1) /* empty */;

console.log(array1);

let length = 4;
let array2 = [];
for (let i = 0; i < length; array2[i++] = 0) /* empty */;
console.log(array2);

/**
 * Le for/in loop sur les propriétés (y compris les noms de methodes de l'objet) d'un objet. 
 * ces propriétés sont qualifiées d'énumérables. mais les propriétés de l'objet qui sont de type Symbol et ceratains
 *  noms de methodes héritées de JS ne sont pas énumérables.
 * Il est possible de déclarer des propriétés que nous définisons non-enumérables.
 */

/**
 * l'instruction break permet d'aller directement à la fin d'une boucle ou d'une instruction.
 * l'instruction continue permet d'ignorer le reste du corps d'une boucle et de retourner au début de la boucle (passer
 * à l'itération suivante)
 * 
 * Avec la possibilité de nommer des instructions, les instructions break et continue peuvent cibler leur saut.
 * La syntaxe est la suivante : 
 * nomInstruction : instruction
 */
let n = 3;
let factorielN = 1;
maBoucle : while(n > 1) {
    factorielN *= n;
    n--;
    continue maBoucle; // ne sert à rien dans cet exemple. 
    //par contre break maBoucle stop le calcul et renvoie n (le premier produit du process)
}

/**
 * comme identifiant d'instruction, on peut utiliser tout mot qui n'est pas reservé par JS.
 * Etant donné que l'espace de nom des identifiants d'instructions, de fonctions et des variables ne sont différents,
 * une instruction peut avoir le même nom qu'une variable ou une fonction.
 * Un identifiant d'instruction n'est défini que dans l'instruction à laquelle il est rattaché.
 * Si une instruction imbriquée ne peut pas avoir le même nom que son parent, deux instructions non imbriquées
 * peuvent avoir le même identifiant.
 * 
 * Il n'est pas possible d'étiquetter une fonction et passer cette etiquette à un break. 
 */

/**
 * Comportement de continue dans les différents types de boucle :
 * - while : la condition est simplement évaluée de nouveau
 * - do/while : on passe à l'évaluation de la condition dans le while avant de repartir éventuellement dans le do
 * - for : on évalue l'instruction d'incrémentation et la condition de la boucle
 * - for/of, for/in : il y a assignation de la prochaine propriété à la variable de la boucle
 */

/**
 * l'instruction yield
 * C'est un peu comme le return mais elle esgt utilisée à partir de ES6 dans les fonction generator 
 * (la syntaxe de ces functions est  : function* generator() {...}) pour générer la prochaine valeur d'une
 * séquence sans toutefois retourner cette dernière (c'est toute la séquence qui est retournée à la fin)
 * 
 * Techniquement yield ressemble plus un opérateur qu'une instruction.
 */

function* range(from, to) {
    for(let i=from; i<= to; i++) {
        yield i;
    }
}

let range1 = range(3, 10);
console.log(range1.next().value); // => 3
console.log(range1.next().value); // => 4

/**
 * Dans une instruction try/finally (sans catch), s'il le bloc finally génère une execption ou une instruction 
 * continue, break, return ou throw, l'éventuelle execption dans le try est abandonnée au profit du nouveau saut. 
 * Si le bloc finally contient une instruction return, l'instruction try/catch/finally se termine normallement.
 * 
 * A partir de ES2019, on peut ignorer le type d'erreur qu'on souhaite catcher (catcher n'importe quel type d'erreur)
 */

function parseJson(s) {
    try {
        return JSON.parse(s)
    } catch {
        return undefined;
    }
}

/**
 * l'instruction with. Sa syntaxe est :
 * with (obj)
 *      instruction
 * cette instruction permet d'associer un scope temporaire avec les propriétés de obj comme variables et exécute 
 * l'instruction dans ce scope.
 * 
 * A éviter car n'est pas du tout optimisé par l'interpréteur. l'instruction sera plus rapidement exécutée dans with.
 */

/**
 * debugger
 * l'instruction ne fait rien normallement sauf si un programme de deboggage est dispo et en cours d'exécution.
 * Généralement cette instruction permet de marquer un breakpoint où elle est appelée.
 */

/** "use strict" - c'est une directive et pas une instruction : une directive est une instruction qui est une 
 * chaine de caractère spéciale et contenue entre des guillements doubles ou simples.
 * - n'inclut aucun mot clé du langage
 * - elle apparaît au début d'un script ou du corps d'une fonction  (avant toute instruction propre à la fonction)
 * 
 * Un strict code est exécuté en mode stricte. Le mode stricte est un sous-ensemble du langage JS qui fixe  certaines
 * lacunes de JS, permet iun checking plus poussé des erreurs et accroit la sécurité du code.
 * 
 * Différences entre le mode strict et le mode non stricte
 * 1. with est interdit en mode stricte
 * 2. en mode stricte, on a une ReferenceError lors d el'assignation d'une variable non déclarée et qui n'est ni
 * une fonction, un paramètre de fonction ou une propriété de l'objet global. En mode non stricte cette variable est
 * considérée implicitement comme une nouvelle propriété de l'objet global.
 * 3. en mode stricte, les fonctions qui ne sont pas des méthodes ('i.e définie dans une classe), ont une leur this
 * undefined. En mode non stricte, leur this est l'objet global.
 * Quand une fonction est invoquée avec call() ou apply, le this est le premier argument de l'appel.
 * 4. TypeError, en mode stricte, en cas d'assignation d'une propriété non modifiable ou d'ajout de nouvelle propriété
 * à un objet non-extensible.
 * 5. en mode stricte, le code passé à l'opérateur éval() ne peut déclarer ni variable, ni fonction dans le scope de 
 * son appelant (possible en mode non stricte). Celles-ci ne sont valables que dans le scope de l'eval qui disparait
 * à la fin de l'eval 
 * 
 */


/**
 * import et export
 * Ces déclarations sont utilsiées esnemble pour rendre des valeurs définies dans un module de JS accessibles dans un autre
 * module. Un module est tout simplement un fichier de code JS avec son propre namspace indépendant des autres modules.
 * La manière de rendre accessible un valeur (fonction / classe...) d'un module dans un autre est de faire export dans
 * le premier et import dans le second.
 * export {val1, val2} puis import {val1, val2} from '"hemin d'accès du fichier dans lequel est fait l'export"
 */