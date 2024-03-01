let array1 = [1,,4,]
console.log(array1.length) // => 3. la virgule de fin est ignorée

/**
 * acces conditionnel à une propriété ?. ou ?.[]
 */
let obj1 = {a: null}
obj1.a?.b; // => undefined
// (obj1.a?.b).c; // => TypeError: Cannot read properties of undefined (reading 'c')
console.log(obj1.a?.b.c) // => undefined: l'operateur conditionnel est short-circuiting

/**
 * L'opérateur conditionnel peut aussi s'appliquer, en gardant le même principe,
 * pour les fonction grâce à la syntaxe ?.()
 */

/**
 * Lors de la creation d'un objet en JS, si la méthode constructeur n'a pas de paramètres, on peut les ommettre
 */
let obj2 = new Object();
let obj3 = new Object;
console.log(~3)
/**
 * Les opérateurs sont utilisés par JS pour les expressions logiques, arithmétiques, de comparaison, d'assignation
 * et plus (delete - suppression d'une propriété d'un objet , intanceof)
 * - (unaire) : convertir en number (si possible) et retourner l'opposé -2; -"2"
 * + (unaire) : convertir en number. ex : +x
 * ~: inverstion de bits
 * delete : supprimer une propriété d'un objet - cerataine sont immunisées - ou une valeur dans un tableau - sans modifier la taille.
 * // exemple : delete obj.x. retourne un boolean
 * typeof : détermine le type de l'opérande : typeof obj. retourne un string
 * void : retourne une valeur undefined : void something. retourne undefined
 * ** : exponentielle : 4**2. retourne un nombre
 * << : shift left. decalage de bits. 3 << 2 => 12 (11 << 2 => 1100)
 * >> : shift right avec extension du signe
 * >>> : shift right avec extension de 0
 * instanceof : test la classe d'un objet. {} instanceof Object => true
 * in : test si une propriété est existe : "x" in obj => true si x est une propriété de obj. 
 *  Pour les tableau, les propriétés seront kes indices "0" in [1, 3] => true
 * & : bitwise AND. le ET logique appliquée au valeurs binaires des opérandes. 1 & 4 => 0
 * ^ : bitwise XOR. 1 si bits différents, 0 si même bit. 1 ^ 5 => 4
 * | : bitwise OR. 1 | 4 => 5
 * ?? : renvoie le 1er opérande defini. 1 ?? 4 => 1
 * 
 */

/**
 * Pour évaluer une expression o instanceof f, JS évalue l'expression f.prototype.
 * Ensuite JS regarde cherche ensuite à voir si l'une de ces valeurs (retournées par f.prototype) est dans la 
 * chaine de prototype de o.
 */
let var3 = [];
console.log(var3)
console.log(Array.prototype);

let array2 = [7, 2];
let array3 = Array.from(array2);
console.log(array2, array3);
let i = j = 0;
array2[i++] *= 2; // i est évalué deux fois en tout. Une première fois avant assignement et une seconde fois après
array3[j++] = array3[j++] * 2; // j est évalué trois fois en tout. je prens j et je l'incrémente à gauche. j 0 puis 1.
// et à droite je prends j (qui vaut 1) puis l'incrémente après assignement.
console.log(array2, array3); // [14, 2], [4, 2]
console.log(i, j) // 1, 2


/**
 * l'opérateur await a été introduit dans ES2017 pour rendre la programmation asynchrone en JS plus naturelle.
 * await attend comme réponse un objet Promise (qui représente un traitement asynchrone).
 * await fonctionne comme s'il mettait en attente notre programme la d'un traitement asynchrone. Mais en réalité il ne
 * le fait pas et n'empêche pas l'exécution parallèle d'autres traitrements asynchrone.
 * await n'est valable que dans les fonction déclarée asynchrone (déclaration précédée de async)
 */


/**
 * l'opérateur void permet de ne pas considérer la valeur de retour de son opérande. void x => renvoie undefined.
 * On peut l'utiliser pour les fonctions dont on veut ignorer la valeur de retour (celles dont on ne se préocupe que
 * de leur effet de bord)
 */
let counter = 0;
const increment = () => void counter++; 
increment() // => undefined. sinon 1 sans le void
counter // => 1

// l'equivalent en fonction avec les accolades
const increment2 = function() {
    counter++;
}
increment() // => undefined

/**
 * eval fonction / operateur
 * eval() prend un paramètre et le traite comme un code JS et renvoie la valeur de la dernière expression ou 
 * undefined ou une exception
 * 
 * Il faut noter que eval() a accès aux variables du code qui l'appelle et peut en déclarer de nouvelles.
 * Si celles-ci sont déclarées let ou const, elle ne seront accessibles que lors de l'appel d'eval(). Mais avec var
 * elles seront accessibles en dehors de l'exécution de eval()
 */
let eval1 = `
    counter = 10;
    console.log(counter);
    ++counter
`
let result = eval(eval1); // => 11

// Il est possible de déclarer une fonction dans un eval()
let eval2 = `
    function evalFunction(x) {
        return x + 1;
    }
`
eval(eval2);
console.log(evalFunction(2));

/**
 * On appellera eval global l'appel d'eval() passant par un alias i.e let evalAlias = eval.
 * quand une fonction appelle directement eval(), dans cet eval(), le code ne pourra que modifier les variables locales
 * définies dans cette fonction qui l'appelle.
 * Par contre quand une fonction appelle un eval global i.e alias d'eval() - let aliasEval = eval - celui-ci ne peut pas modifier les variables
 * locales de la focntion qui l'appelle. Mais il peut modifier les variables globales
 */

/*
const geval = eval; // definition d'un eval global
let  x = "global", y = "global"; 
function f() {
    let x = "local";
    eval("x += 'changed';"); // appel direct eval. accès uniquement au variables locales de f
    // donc cet appel à eval modifie x.
    return x; // retourne localchanged. Mais le x global ne change pas.
}

function g() {
    let y = "local";
    geval("y += 'changed';"); // appel eval global. pas d'accès au variables locales de f mais aux variables gloables
    // donc cet appel à eval modifie le y de global à globalchanged. le y de g ne change pas.
    return y; // retourne local
}

console.log(f(), x);
console.log(g(), y);
*/