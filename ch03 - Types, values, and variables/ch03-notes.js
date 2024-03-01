/** 
 * Les types primitifs en JS sont : numbers, string, boolean, undefined, null, symbol
 * Tous les types qui ne sont pas primitifs sont des objets (type object), y compris 
 * array, set, map, regexp, date et error.
 * En JS les fonctions et les classes sont des valeurs manipulables par le programme. Ce sont 
 * d'autres types d'objets
 * 
 */

/**
 * L'interpreteur JS dispose d'un garbage collector pour les desallocation et la destruction des 
 * ojets et valeurs qui ne sont plus accessibles
 * 
 */

/**
 * JS support la POO. Plutôt que de définir des fonctions qui traitent des valeurs de différents types,
 * les types eux-mêmes décrivent les méthodes s'appliquant aux objets.
 * number, string, boolean se comportent comme s'ils avaient des objets, bien que ce soient des types primitifs.
 * Seuls à null et undefined ne peuvent s'appliquer des méthodes.
 */

/**
 * Les types primitifs sont immuables alors que es types objets sont muable - peut changer la valeur 
 * d'une propriété de l'objet.
 */

/**
 * Les nombres (numerci literal) en JS peuvent s'exprimer : 
 * - en base 10 : 100808
 * - en base hexadecimal : 0xABDEF01
 * - en base binaire : 0b10101
 * - en base octale : Oo01573
 * 
 * Exemples de nombres à virgule : 2.12; .33; 6.4e-23 => 6.4 x 10^-23
 * 
 * Il est possible d'utiliser un undersocre comme séparateur des grand nombres. Même s'il n'est pas encore
 * normalisé, il est compris par les navigateurs et node
 */

// quelques méthodes de l'objet Math en JS
let x = 30; y = 60; z = 90;

Math.pow(2,53) // 2 puissance 53
Math.round(.5) // arrondi à l'entier le plus proche 0.5 => 1
Math.ceil(.4) // arrondi à l'entoer supérieur
Math.floor(.6) // arrondi à l'entier inférieur
Math.abs(-5) // donne la valeur absolue
Math.max(x,y,z) // le max des valeurs
Math.min(x,y,z) // le min des valeurs
Math.random() // génère un nombre aléatoire compris entre 0 inclus et 1 exclu
Math.PI // pi
Math.E // base du logarithme népérien Math.log(Math.E) => 1
Math.sqrt(3) // racine carrée
Math.pow(3, 1/3) // 3 puissance 1/3
Math.sin(0) // sinus voire aussi Math.cos() et Math.tan() pour le cosinus et la tangente
Math.log(10) // le logarithme népérien de 10
Math.log(100) / Math.LN10 // Base 10 logarithm of 100 Math.log(100) / Math.LN10 => 2. voire Math.log10()
Math.log(512)/Math.LN2 // Base 2 logarithm of 512. voire Math.log2()
Math.exp(3) // Math.E puissance 3
// ES6 définit les fonctions suivantes
Math.cbrt(27) // racine cubique
Math.hypot(3, 4) // => longueur de l'hypotenus dy triangle de base 3 et hauteur 4
Math.log10(100) // => 2: Base-10 logarithm Math.log2(1024) // => 10: Base-2 logarithm
Math.log1p(x) // => Math.log(1 +x)
Math.expm1(x) // Math.exp(x) - 1
Math.sign(x) // => -1, 0 ou 1 suivant x <, == ou > 0
Math.imul(2,3) // => 6. multiplication optimisée d'entiers de 32 bits
Math.clz32(0xf) // => 28: nombre de 0 (inutiles) dans 15 encodé sur 32 bits
Math.trunc(3.9) // => 3: partie entière
Math.fround(x) // Math.fround(2.7) = 2.700000047683716. Conversion au flottant le plus proche encodé sur 32 bits
Math.sinh(x) // sinus hyperbolique. voir Math.cosh() et Math.tanh()
Math.asinh(x) // arcsinus hyerbolique. voir aussi Math.acosh() et Math.atanh()

;
/**
 * Les opérations arithmétiques ne génèrent pas d'erreurs en JS en cas d'overflow, underflow ou de division par 0.
 * Lorsque la valeur d'une opération arithmétique dépasse les plages des nombres, elle devient (+/-)Infinity.
 * -1/0 = -Infinity. Par contre 0 / 0 = NaN ou tout autre opération arithmétique non autorisée (Infinity / Infinity)...
 * 
 * JS définit des constantes (+/-)Infinity et NaN qui valent Number.POSITIVE_INFINITY (ou Number.MAX-VALUE * 1.1), 
 * Number.NEGATIVE_INFINITY (ou -Number.MAX-VALUE * 1.1) et Number.NaN
 * Number.MIN_VALUE / 2 = 0 c'est du underflow, -Number.MIN_VALUE / 2 = -1 / Infinity = -0 ou encore 
 * 
 * Le underflow se produit quand le résultat d'une opération est plus petit que le plus petot nombre représentable.
 * Dans ce cas JS renvoie 0 ou -0 (selon le cas) qui sont indifférentiable.
 */

// ES6 définit les propriétés suivantes
Number.parseInt("22") // parse un string en entier ou retourne NaN
Number.parseFloat("2.6") // parse un string en float
Number.isNaN(x) // détermine si la valeur X est un nombre
Number.isFinite(x) // x est-il une valeur finie ?
Number.isInteger(x) // x est-il un nombre entier ?
Number.isSafeInteger(x) // x est-il dans l'intervalle -(2**53) < x < 2**53 ?
Number.MIN_SAFE_INTEGER // => -(2**53 - 1) 
Number.MAX_SAFE_INTEGER // => 2**53 - 1
Number.EPSILON // 2**-52 :la plus petite différence entre deux nombre

/**
 * Il y a une infinité de nombre réels mais seulemtn un nombre d'entre eux qui peuvent être représentés 
 * de manière exacte.
 * La représentation en virgule flottante IEEE-754 utilisée par JS ne peut que représenter de manière exacte
 * des fractions comme 1/2, 1/8, 1/1024...
 * Les représentations des fractions telles que 1/10, 1/100 ne sont que des approximations.
 */
let float1 = .3 - .2;
let float2 = .2 - .1;
float1 === float2; // => false

/**
 * Pour régler ce problème de précision, il est par exemple préférable, lorsqu'on travaille avec des valeur monétaires,
 * de travailler avec leur valeur en centimes (pour éviter les parties flottantes)
 */

/**
 * ES2020 introduit un  nouveau type numérique BigInt qui permet de représenter un entier sur 64  bits.
 * La valeur doit se terminer par n quelque soit la base : 
 * 19870n (bigInt en base 10), 0x97FFn (en base hexa), 0b10101n (en base 2), 0o776510n (en base 8)
 * 
 * Les opérations arithmétiques fonctionnent avec les BigInt comme avec les nombres ordinaires sauf pour la division
 * où il ne renvoie que le quotient et ignore le reste (partie entière)
 * 
 * Il faut éviter de mixer les types BigInt et les autres types number. Les fonctions de Math ne supportent pas les BigInt
 */

/**
 * Les dates en JS sont des objets mais qui peuvent avoir une réprésentation numérique sous forme de timestamp représentant
 * le nombre de millsecondes écoulées depuis le 1 Janvier 1970
 */

let timestamp = Date.now(); // la date courante en millisecondes
let now = new Date(); // la date courante au format aaaa-mm-ddThh:mm:ss.MMMZ
let ms = now.getTime(); // conversion de la date en timestamp
let iso = now.toISOString(); // conversion en string iso aaaa-mm-ddThh:mm:ss.MMMZ

/**
 * Les string sont représentées entre des simples quotes '', des doubles quotes "" ou des backticks ``.
 * chacun des délimiteurs peut contenir les deux autres : 'Bonjour "Yves" et `Daniel`'.
 * 
 * Les backticks ont été introduits avec ES6 et permettent de faife l'interpolation à 'intérieur d'un string
 */

let string1 = "Bonjour \nHenry" // renvoie un string sur deux lignes
let string2 ="Bonjour \
Henry" // renvoie un string sur une ligne
let string3 =`Bonjour 
Henry` // renvoie une chaine sur deux lignes

let str = "Hello, world"
// pour avoir une portion d'une chaine de caratères
str.substring(1, 4) // => portion de str comprise entre la 1ere position incluse et la 4eme exclue
str.slice(1, 4) // pareille que le substring précédent
str.slice(-3) // portion composée des 3 derniers caractères
str.split(", ") // ["hello", "world"] : tableau des sous-parties séparées par des ", "

// rechecher une chaine
str.indexOf("l") // position du premier l de la chaine de caractères
str.indexOf("l", 3) // postion du premier l à partir de la position 3 de str. -1 si absent
str.lastIndexOf("l") // position du dernier l de str

// tests binaires avec string
str.startsWith("Bonjour") // true si str commence par Bonjour
str.endsWith(".") // true si str se termine par .
str.includes("Hell") // true si str contient Hell

// creation de versions modifiées d'un string
str.replace("Hello", "Bonjour") // crée une chaine en remplaçant Hello par Bonjour dans str
str.toLocaleLowerCase() // met str en minuscule
str.toUpperCase() // met en majuscule
str.normalize() // normalization unicode NFC ?? voir aussi NFKC, NFKD...

// inspection individuelle des caractères d'un string
str.charAt(0) // retourne le caractère à la position donnée
str.charCodeAt(1) // le code numérique de 16 bit du caractère à la position donnnée
str.codePointAt(1) // pareil que précédemment pour des codepoitns > 16 bits

// padding 
str.padStart(14) // ajoute des espaces blanc au début de str pour avoir une chaine de longueur 14.
str.padEnd(3) // pareil mais à la fin
str.padStart(14, "*") // ajoute plutôt des * au début
str.padEnd(14, "*") // ajoute plutôt des * à la fin

// triming
str.trim() // supprime les espaces au début et à la fin de str
str.trimStart() // supprime les espaces seulement au début
str.trimEnd() // seupprime les espaces à la fin

// autres fonctions de string
str.concat(" and Hello You") // concatene les deux chaines
"*".repeat(10) // concatene 10 copies de *

/**
 * Puisque un string peut être vu comme un tableau - en lecture seule - de caratères, on peut utiliser par exemple 
 * str[O] au lieu de str.charAt(0) pour avoir le même résultat.
 */

/** templates literals
 * La définition d'un string entre les backticks permet de définir plus q'un string ordianire car cette déclaration
 * peut inclure une expression JS qui sera évaluée pour créer la chaine. Cette expression devra être 
 * comprise entre "${" et "}"
 */
let firstName = "Choco"
let greeting = `Hello ${ firstName }`; // greeting = Hello Choco

/**
 * Les tagged templates
 * Une fonctionnalité puissante des templates literals est que si une finction précède le template litteral, alors le
 * texte et les valeurs des expressions à l'intérieur dy template sont passées comme arguments de la fonction. On appellera
 * cette fonction une tagged fonction
 * tagFunction`string text ${expression} string2 text2`; La fonction recoit deux ensembles de paramètres :
 * 1. Un tableau de strings : les strings qui sont autour des expressions
 * 2. Les résultats de l'évaluation des expressions
 */

function tagFunction(strings, ...values) {
    console.log(strings);
    console.log(values);
}

let firstanme = "Choco";
let lastname = "Coulibaly"
tagFunction`Hello ${firstName} mon ami ${lastname}`;

// les tagged templates sont parfois utiles par exemple pour  créer des congtenus des HTML ou SQL dynamiques
const sql = (strings, ...values) => {
    // Échapper les valeurs pour éviter les injections SQL
    const escapedValues = values.map(value => {
      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      }
      return value;
    });
  
    // Concaténer les chaînes de caractères et les valeurs
    const query = strings.reduce((acc, str, i) => acc + str + (escapedValues[i] || ''), '');
  
    // Retourner la requête SQL
    return query;
  };
  
  const name = 'John Doe';
  const age = 30;
  
  const query = sql`
  SELECT *
  FROM users
  WHERE name = ${name}
  AND age = ${age}
  `;
  
  console.log(query); // `SELECT * FROM users WHERE name = 'John Doe' AND age = 30`

// ES6 a une tag function : String.raw() qui retour le text sans traiter les templates literals. console.log est
console.log(String.raw`\n`) // => "\n"
console.log(`\n`.length); // => 1
console.log(String.raw`\n`.length); // => 2

/**
 * JS définit les expressions régulières (un type de données) pour décrire et faire correspondre des motifs dans un texte.
 * Une expression régulière se définig entre deux "/"
 */
let pattern1 = /^Je/; // match les strings commençant par HTML
let pattern2 = /[1-9][0-9]*/g; // match tous les nombres commençant par un chiffre différent de 0
let pattern3 = /\bmazes\b/i; // match tous les mots "mazes" idifférement de la casse

let monText = "Je te salue 022 fois le matin Mazes Polo le matin, 123 le midi MAZES et 487 fois le soir mazes Chipolo";
pattern1.test(monText); // true s'il y a un matching du pattern dans le text
monText.search(pattern2); // retourne la position du premier matching du pattern dans monText
monText.match(pattern2) // retourne un tableau de tous (à cause du g à la fin du pattern) les motifs qui matchent. 
// Si pas de g à la fin, retourne un tableau contenant le premier motif, son index, le text et une propriéré groups.
monText.replace(pattern2, "#") // remplace tous les motifs de monText qui matchent pattern2 par #
monText.split(/\bmazes\b/i) // renvoie un tableau de monText splité suivant les motifs qui matchent le pattern

/** undefined et null réprésentent des absences de valeurs pour des variables.
 * On peut considérer null comme une absence de variable niveau programme, attendue comme telle 
 * et undefined comme une absence de niveau system, iniattendue
 */


/** Symbol
 * les symbols ont été introduit à partir de ES6 pour servir comme nom de propriété d'objets. Avant les nom des proriété
 * ne pouvaient être que des chaîne de caractères (espace acceptés à l'intérieur de la chaîne)
 */
let strname = "prop name"; // propriété de type string
let symame = Symbol("propname"); // propriété de type Symbol
let obj = {};
obj[strname] = 1;
obj[symame] = 2;
console.log(obj[symame]);

/**
 * La fonction Symbol() retourne une valeur unique même si elle est appelée avec le même argument.
 * Donc en utilisant les symboles comme propriété d'objet, on ne risque jamais d'écraser ces propriétés...même par les
 * autres modules du programme.
 * 
 * Par contre la méthode Symbol.for() retourne la même valeur quand elle est appelée avec le même argument (c'est un singleton lol)
 * La méthode Symbol.keyFor() retourne l'argument passé à la création du symbol.
 *
 */

/** Global Object
 * L'objet global en JS est un objet qui est créé au démarrage de l'interpreteur JS 
 * (ou quand le navigateur charge une nouvelle page). Cet objet global a les propriétés telles que :
 * - constantes globales : undefined, Infinity, NaN
 * - fonctions globales : isNaN(), parseInt(), eval()
 * - constructeur : Date(), RegExp(), String(), Array(), Object()
 * - objets : Math, JSON
 * 
 * Dans node, l'objet global a une propriété global qui représente l'objet global lui-même.
 * Dans le nabigateur, l'objet Window représente l'objet global pour tous le code JS cotenu dans la fenêtre de navigation
 * Les web worker threads (threads JS qui tournent en arrière-plan) ont un objet global différent de la fenêtre à laquelle
 * ils sont associés. Dans un worker, on accède à l'objet global s'appelle self
 * 
 * A partir de ES2020 l'objet global s'appelle globalThis quelque soit le contexte
 * 
 */

/**
 * Immutable type primitifs VS mutabes objets
 * Les types primitifs (null, undefied, number, string, booleen) sont immutable i.e leurs valeurs ne change jamais 
 * même pour les string qu'on peut mettre sous forme de tableau.
 * Tous les types objets sont mutables : modifier la  valeur d'une propriété, rajouter une nouvelle à un objet, 
 * changer une  valeur dans un objet, mondiifer la valeur d'une position dans un tableau, rajouter une nouvelle...
 * 
 * Les types primitifs sont comparés par valeur alors que les types objets sont comparés par référence
 */

/** Conversions de types
 * Comme pour les booleens JS essaie d'autres conversions pour les entiers et les strings
 */
10 + " objets" // => 10 objets
"" + "7" * "2"; // => 14
[] * 15; // => 0
[15] - 3 // => 12
true + false; // => 1

/**
 * Certains opérateurs JS permettent de réaliser des conversions de type implicites
 */
x + "" // => String(x)
+x // => Number(x)
x - 0 // => Number(x)
!!x // => Boolean(x)

/**
 * La méthode toSgtring() de la classe Number accepte un paramètre optionnel qui est la base de conversion du nombre
 */
console.log("0b" + x.toString(2)) // conversion de x en base 2

/**
 * La classe number propose trois autres méthodes de conversion de nombre en string - en plus du constructeur :
 * - toFixed(n) : fait une conversion en précisant le nombre de chiffres après la virgule
 * - toExponential(n) : fait une conversion en notation de puissance en précisant 
 *  le nombre de chiffres après la virgule
 * - toPrecision(n) : fait une conversion en précisant le nombre de chiffres attendus avant et après la virgule
 * 
 * Les fonctions globales parseInt(), parseFloat() permettent également des conversions de string en number et sont plus 
 * flexibles que Number() car elle acceptent des valeurs encodées en base (0b1011, 0o6752, ...), peuvent ignorer certains
 * caratères lors de la conversion
 */
parseInt("3 blind mice") // => 3
parseFloat(" 3.14 meters") // 3.14
parseInt("-12.34") // -12
parseInt("0xFF") // => 255
parseInt("0xff") // => 255
parseInt("-0XFF") // => -255
parseFloat(".1") // => 0.1
parseInt("0.1") // => 0
parseInt(".1") // NaN car un entier ne peut commencer par "."
parseFloat("$72.47") // idem que précédemment

// ces deux fonctions peuvent aussi prendre en plus u radix (base de conversion) comme paramètre


/**
 * La comparaison avec == tient compte de la co version des types. Par eemple "0" == 0 sera true.
 * Par contre la conversion stricte avec === ne la prend pas en compte. "0" === 0 sera false.
 */

/**
 * Le hoisting est le fait pour l'interpreteur JS de relonter une variable déclarée avec var (var test) de remonter
 * sa déclaration au début de la fonction dans lequel elle est accessible.
 * Cette variable peut donc être utilisée, sans erreur partout, dans la fonction
 */

/**
 * ES6 permet d'utiliser une nouvelle syntaxe de déclaration et d'affectation de variable connue comme
 * le destructuring assignment.
 * Dans une telle déclaration, la partie à droite de "=" est un tableau (ou un objet structuré) et la partie à gauche
 * définit les variables en utilisant une syntaxe qui ressemble au tableau ou à un objet
 */

let [var1, var2] = [1, 2]; // => var1 = 1 et var2 = 2
[var1, var2] = [var1 + 1, var2 + 2]; // var1 = 2 et var2 = 3
[var1, var2] = [var2, var1] // fait un swap

// Il est possible d'utiliser la destructuration dans les boucles
let obj1 = {x: 1, y: 2};
for (const [name, value] of Object.entries(obj1)) {
    console.log(name, value); // => "x 1" et "y 2" 
}

/**
 * Dans le destructuring assignment, le nombre de variables à gauche de "=" ne doit pas forcément matcher avec celui de
 * droite. Les variables qui n'ont pas de matching sont undefined.
 * Si on a plus de valeur à droite qu'à gauche, on peut affecter le surplus de varibales de droite à la dernière variable
 * à gauche sous forme de tableau en utilisant ... devant cette dernière variable
 */
let [var3, ...var4] = [1, 2, 3, 4]
console.log(var3); // 1
console.log(var4); // [2, 3, 4]

// On peut destructufrer en utilisant n'importe quel objet iterable ou un objet
let [var5, var6] = "Hello"; // var5 = H et var6 = ["e", "l", "l", "o"]
let obj2 = {r: 1, g:2, b:3, a:0.0}
let {r, g, b} = obj2; // r=1, g=2, b=3. les noms des variables soivent matcher avec les proprités de l'objet dans
// cette notation raccourcie 
let {cos, sin, tan} = Math; // sin = Math.sin...., s'il y a une variable dont le nom ne matche pas avec une fonction de
// Math, elle sera undefined
// ou on pourrait faire :
let {r: rBis, g: gBis, b: bBis} = obj2; // rBis=1, gBis=2, bBis=3
