/**
 * Une fonction est un block de code défini une fois mais qui peut être exécuté plusieurs fois.
 * Elle est paramétrée i.e sa définition peut inclure une liste d'identifiants - paramètres - qui fonctionnent 
 * comme des variables locales pour la fonction. L'appel de la fonction fournit des  valeurs - arguments - pour les
 * paramètres de la fonction.
 * en plus des arguments, chaque appel possède un contexte d'invocation qui est la valeur du This.
 * 
 * Quand une fonction est définie comme une propriété d'un objet, elle est appelée méthode.
 * Quand une fonction est appelée sur un objet, ce dernier est le contexte d'invocation de la fonction.
 * Une fonction définie pour initialiser un nouvel objet est appelée constructeur.
 * En JS, les fonctions sont des objets.
 * 
 * Une fonction peut être imbriquée dans une autre. La fonction imbriquée a accès à toutes les variables qui sont dans 
 * le scope où elles sont définies : les fonctions JS sont des closures.
 */

/** déclaration de fonction 
 * function nom_fonction(params-optionnels) {corps_fonction}.
 * Dans une déclaration de fonction, le nom de la fonction devient une variable dont la valeur est la fonction elle-même.
 * 
 * La déclaration de fonction est hissée (hoisting) en tête du bloc qui la contient. Ce qui fait qu'on peut écrire un
 * code qui fait appelle à une fonction définie plus bas que ce code.
 */
function factorial(x) {
    if (x <= 1) return 1; 
    return x * factorial(x-1);
}
factorial; // [Function: factorial]

/** expression de fonction
 * Une expression de fonction ressemble à une déclaration de fonction sauf qu'elle apparaît dans un contexte d'une
 * déclaration plus large ou d'une instruction, et son nom est optionnel.
 * 
 * Une bonne pratique est de déclarer en const la variable dans une expression de fonction pour ne pas l'écraser après
 */
const incrementBy1 = function(x) {return x + 1};
// expression de fonction qui inclut le nom, utile pour la récursion
const factoriel = function fact(x) {
    return x <= 1 ? 1 : x * fact(x - 1);
};
// expression de fonction comme argument
[3, 6, 1].sort(function(a, b) {return a - b;}); 
// une expression de fonction peut être immédiartement appelée
let dixPow2 = (function(x) {return x**2})(10);

/**
 * Il y a une différence fondamentale entre une déclaration de fonction est une expdession de fonction. Si la  
 * première est Hoisted, la seconde n'existe pas tant que l'expression qui la défnit n'est pas évaluée...donc ne peut 
 * pas être Hoisted
 */

/** fonction flêchée
 * C'est une expression de fonction avec une syntaxe raccourcie.
*/
const sum = (a, b) => a + b;
// attention aux erreurs de syntaxe
const f = x => { return {value:x}; }; // Good:f() returns an object
const g = x => ({ value: x }); // Good: g() returns an object
const h = x => { value: x }; // Bad: h() returnsnothing

/**
 * différences des fonctions flêchées :
 * - Elle héritent du This de leur environnement de définition plutôt que d'avoir leur propre This
 * - Elles n'ont pas de propriété prototype i.e elles ne peuvent pas être utilisées comme constructeur
 */

/** fonction imbriquée
 * Leur particularité intéressante est la portée des variables : une fonctioon imbriquée a accès à tous les 
 * paramètres et variables des fonctions à l'intérieur desquelles elle est imbriquée. En gros la fonction imbriquée s'en
 * fout de son niveau d'imbrication. Elle voit même dans les fonctions plusieurs niveau au-dessus d'elle.
 * 
 * Dans l'exemple ci-dessous, square peut lire et modifier a, b
 */
function hypotenuse(a, b) {
    let fake_var = 3;

    function square(x) { 
        return x*x; 
    }
    return Math.sqrt(square(a) + square(b)); 
}

/** Invocations de fonctions.
 * Les fonctions sont invoquées comme : fonctions, méthodes, constructeurs, via call() et apply(), via des mécaismes de JS
 */

/* Pour les invocations de fonctions, le contexte d'invocation est l'objet global en mode non-strict, undefined en mode 
 * strict. Les fonctions fléchées héritent toujours du this de l'endroit où elles sont définies.

A partir de ES20202, on peut faire des appels conditionnels sur les fonctions : maFonction?.(arguments)
*/
const isStrict = function() {return !this}; // test du strict mode

/** Recursivité et la stack
 * Quand une fonction en appelle une autre, un nouveau contexte d'exécution est crée puis sorti de la statck d'appel.
 * Une fonction qui s'appelle un millier de fois risque de finir en erreur "Maximum call-stack size execeeded"
 */

/** Methodes invocations
 * Les méthodes en JS ne sont rien de plus que des fonctions définies comme propriétés d'un objet. Elles invocations 
 * de méthdes sont comme les invocations de fonctions à la différences du contexte d'invocation (this) qui est l'objet 
 * pour les premières. Ces syntaxes d'invocation de méthodes suivantes sont valables :
 * - o.m(x, y)
 * - o["m"](x,y); // Another way to write o.m(x,y).
 * - a[0](z) // Also a method invocation (assuming a[0] is a function).
 * - f().m(); // Invoke method m() on return value of f()
 * 
 * chainage de méthodes : 
 * - doStepOne().then(doStepTwo).then(doStepThree).catch(handleErrors); // trois appels asynchrone en séquence
 * - new Square().x(100).y(100).size(50).outline("red").fill("blue").draw(); // appels multiples sur un objet
 */

/** this dans les fonctions imbriquées
 * la portée de this n'est pas comme celles des variables. Et à part les fonctions chainées, les fonctions imbriquées
 * n'héritent pas du this de la fonction mère. Si une fonction imbriquée est appelée comme fonction, son This est soit 
 * le This global ou undefined (en fonction du mode).
 * 
 */

let obj = {
    fonctionMere: function() {
        let self = this; // save le This dans la variable self
        this === obj; // => true

        fonctionImbriquee();

        function fonctionImbriquee() {
            this === obj; // => false
            self === obj; // => true
        }
        // une fonction chainée a directemenr accès au this
        const fonctionChainee = () => {
            this === obj; //=> true
        }

        fonctionChainee();

        // une autre manière d'accéder au this dans une fonction imbriquée est de lui bind le this de sa mère :
        const fonctionBindee = (function() {
            this === obj; // => true
        }).bind(this);

        fonctionBindee();
    }
}
obj.fonctionMere();


/** Invocation indirecte
 * Comme tous les objets JS, les fonctions ont des maéthodes. Deux d'entre elles sont call() et apply() qui permettent
 * d'appeler la fonction indirectement en lui passant le This pour l'invocation. Ce qui veut dire que n'importe quelle 
 * fonction sur n'importe quel objet
 */

/** invoctaion implicite peuvent se produire dans plusiseurs cas :
 * - appel de setter et de getter
 * - quand un objet est utilisé dans un contexte où un string/number est attendu (appel implicité de toString()/valueOf())
 * - loop sur les éléments d'un objet iterable
 * - les tagged templates (fonction appelée avec un template literal maFunction`mon_template`)
 * -les objets proxy pour lesquels toute opération génère l'invocation d'une fonction.
 * 
 */

/** Arguments et paramètres de fonctions
 * Une fonction peut être appelé avec moins d'arguments qu'elle n'a de paramètres. Par defaut les paramètres manquants
 * sont undefined. Les paramètres par défaut sont placés après les autres.
 * Dans la déclaration de la fonction, on peut préciser la valeur par défaut des paramètres : maFonction(param = 0) ou
 * encore maFonction(par1, par2 = par2**2)
 */

/** Rest parameters
 * Ils permettent d'appeler une fonction avec plus d'arguments qu'elle n'a de paramètres. Le Rest parameter doit être précédé
 * de ... et placé à la fin. Il sera toujours un array, au pire vide.
 * 
 * Note : ne pas confondre le Rest parameter qui définit un reste de paramàtres dans la définition d"une fonction et 
 * le spread operator qui est définit lors de l'invocation d'une fonction.
 */

function max(permier=-Infinity, ...rest) {
    let max = permier;
    for(let val of rest) {
        if(val > max) {
            max = val;
        }
    }
    return max;
}
max(1, 3, 7, -1, 29, 50, 2, 7); // => 50

/** Arguments parameter
 * Rest parameter a été introduit avec ES6 Mais avant, c'est arguments qui était utilisé à la place de Rest parameter.
 * Vaut mieux préférer le Rest parameter. Un exemple avec Arguments parameter
 */

function max2(x) {
    let maxValue = -Infinity;
    for(let i=0; i<arguments.length; i++) {
        if(maxValue < arguments[i]) {
            maxValue = arguments[i];
        }
    }
    return maxValue;
}
max2(3, -1, 40, 4, 89, 0); // x = 3, arguments c'est tous les arguments : de 3 à 0

/** 
 * Le spread operator ... et le rest parameters ... ont des utilisations opposées.
 * Le premier dispache les éléments d'un array dans plusieurs paramètres alors que le rest parameter agrège plusieurs
 * paramètres dans un tableau. Ces deux peuevnt être utilisés ensemble comme dans l'eemple ci-dessous :
 */

function logResponseTime(f) {
    return function(...args) { // cette fonction est une valeur qui est retournée par logResponseTime
        console.log(...args)
        console.log(`Debut d'exécution de la fonction : ${f.name}`);
        let startime = Date.now();
        try {
            return f(...args);
        } finally {
            console.log(`Fin d'exécution de la fonction ${f.name} après : ${Date.now() - startime}ms`);
        }
    };
}

function benchmark(n) {
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i; return sum;
}

//logResponseTime(benchmark)(10000000);

/** Fonctions as values 
 * En JS, en plus de pouvoir être définies et invoquées, les fonctions ne sont seulement une syntaxe mais des valeurs
 * (comme dans la fonction retournée dans l'exemple précédent), ce qui signifie qu'elles peuvent être assignées à des 
 * variables, passées à des propriétés d'un objet....
*/
function square(x) {return x*x;}
const s = square;
square(4), s(4);
let obj1 = {square: function(x) {return x*x;}}
obj1.square(4);
let a = [x => x*x, 10];
a[0](4); // => 16

/** Fonctions properties
 * Une fonction n'est pas un type primitif en JS mais un objet un peu spécial, et donc qui peut avoir ses propriétés.
 * Quand une fonction a besoin d'une valeur static qui ne bouge pas avec ses invocations, il convient de lui définir
 *  une propriété.
 * 
 */

/**CLosures.
 * Une fonction est toujours exécutée en utilisant les variables qui lui sont accessibles lors de sa définition; jamais celles
 * accessibles lors de son invocation.
 * un appel de fonctions en JS combine le corps de la fonctoon au scope dans lequel cette fonction est déinie : c'est 
 * ce qu'on appelle une closure.
 * toutes les fonction JS sont des closures. Mais comme elles sont définies dans le même scope que leurs invocations, alors
 * on ne les voit pas comme des closures.
*/

/**call et apply
 * Ce sont des methodes de fonction permettant d'appeler une fonction sur un objet. Le premier argument est l'objet sur
 * lequel porte l'appel (le contexte d'invocation, le this défini dans la méthode), suivent ensuite les autres paramètres.
 * Dans le cas d'une fonction fléchée, le premier argument est ignoré car son This, est le this de son scope.
 * Call prend en plus de l'objet, une liste d'argument alors que apply prend un tableau :
 * f.apply(obj), f.call(obj) <=> o.m = f puis o.m();
 * f.call(o, 1, 2) <=>  f.apply(o, [1, 2])
 */