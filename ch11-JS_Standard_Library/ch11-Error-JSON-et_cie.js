/** les instructions throw et catch en JS peuvent s'utiliser sur n'importe quelle valeur , y compris 
les valeurs primitives. Exemple :
*/
const thrower = value => {throw value;}

try {
    thrower(100);
} catch (value){
    console.log(value);
}
/** C'est traditionnel d'utiliser une instance de Error (ou une sous-classe). Une bonne raison d'utiliser un 
 * objet de type Error est qu'il capture l'état de la stack, ce qui est utile pour le deboggage. La stack dont il est
 * question est celle au moment de la création de l'objet, non pas celle au moment ou celui-ci est propagé.
 * 
 * l'objet error a deux propriétés et une méthode :
 * - name : le nom de l'error. C'est toujours "Error" pour ceux créés avec le constructeur Error()
 * - messqge : contient la valeur passée au constructeur au moment de la création
 * - toString() renvoie une valeur du type "name : message"
 * 
 * Bien qu'elle ne fasse pas encore partie de ECMAScript, la propriété stack, implémentér par Node et certains navigateurs
 * permet d'obtenir une stack de l'error
 * 
 * Les sous-classes d'erreur définies par JS sont : EvalError, RangeError, ReferenceError, SyntaxError, 
 * TypeError et URIError.
 * Il est possible de définir ses propres sous-classes en étendant Error. Exemple :
 */
class HTTPError extends Error { 
    constructor(status, statusText, url) {
        super(`${status} ${statusText}: ${url}`); this.status = status;
        this.statusText = statusText;
        this.url = url; 
    }
    get name() { 
        return "HTTPError"; 
    } 
}
let error = new HTTPError(404, "Not Found", "http://example.com/");
error.status // => 404
error.message // => "404 Not Found: http://example.com/"
error.name // => "HTTPError"

/** JSON Serialization and parsing
 * Qaund un programme a besoin de sauvegarder des données ou de les transmettre à un autre programme à travers un reseau 
 * connecté, il doit convertir ces structures mémoire en  chaines de bytes ou de caractères qui peuvent être stockées 
 * ou transmises et plutard être restituées comme les structures mémoire d'origine.
 * Ce processus de conversion de données en flux d'octets ou de cara tères est appelé seraialization ou marshalling ou pickling
 * 
 * Le moyen le plus facile de serialization des données utilise le format JSON (JavaScript Objet Notation). 
 * JSON ne supporte pas les types comme Map, Set, RegExp, Date ou les typedArray
 * 
 * JSON.stringify() pour serializer et JSON.parse() pour déseralizer.
 * JSON.stringify() peut prendre jusqu'à trois argument
 * JSON.parse() peut en prendre jusqu'à deux
 * 
 */
let object = {s: "test", n: 0};
JSON.stringify(object); // => '{"s":"test","n":0}'
/** Le troisième argument permet de rendre l'objet serializé human-readable (s'il est utilisé comme fichier de conf par exemple) 
 * Quand il est précisé, il indique qu'il doit avoir des indentiations. Si ce troisième argument est un nombre, il indique
 * le nombre d'espace de l'indentation. Sinon, c'est cette valeur qui est utilisé comme indentation
*/
JSON.stringify(object, null, 2); // => '{\n "s": "test",\n "n": 0\n}'. Utilisation de deux espaces pour indenter
JSON.stringify(object, null, '\t'); // => la tabulation est utilisée pour indenter

// Note : La déserialization JSON.parse() ignore tous les espace

/**Deuxième argument de JSON.parse() 
 * Quand JSON.stringify() a besoin de serializer un objet qui n'est pas supporté nativement (SET, MAP, Date..) 
 * il fait appel à la méthode toJSON() si elle existe. 
 * C'est le cas par exemple pour l'objet Date dont la méthode toJSON() renvoie la valeur la date au format 
 * ISO (méthode toISOString() de Date). Mais lorsque cet objet sera désérialzé avec JSON.parse() il ne saura plus retrouver
 * la date au format Date mais la valeur restera un string. C'est pour pallier cette insuffisaance qu'il JSON.parse()
 * prend un deuxième argument qui est une fonction "reviver".
 * La fonction reviver est invoquée une fois pour chaque valeur primitive (pas pour les objets ou arrays qui les contiennent)
 * - premier argument : le nom de la propriété ou un nom de propriété d'un objet ou un index converti en string
 * - deuxième argument : la valeur primitive de cette propriété.
 * De plus cette fonction est appelé comme une méthode de l'objet qui contient la propriété traitée. Donc il est possible de
 * référencer cet objet avec This.
 * La valeur retournée par cette fonction devient la valeur de la propriété dans l'objet parsé. Si la fonction renvoie undefined
 * la propriété sera supprimée de l'objet parsé 
*/
let myReviver = function(key, value) {
    // Remove any values whose property name begins with an underscore
    if (key[0] === "_") return undefined;
        // If the value is a string in ISO 8601 date format convert it to a Date.
    if (typeof value === "string" && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
         return new Date(value);
    }
    // Otherwise, return the value unchanged
    return value; 
};

const objet2 = {date: new Date, desc: "current date", _comment: "juste for test"};
const object2String = JSON.stringify(objet2); //=> '{"date":"2024-03-15T14:50:46.444Z","desc":"current date","comment":"juste for test"}'
JSON.parse(object2String); //=> 
/*{
    date: '2024-03-15T14:52:47.345Z',
    desc: 'current date',
    _comment: 'juste for test'
}*/ // la date est un string dans l'objet parsé

JSON.parse(object2String, myReviver); //=>
 /* { date: 2024-03-15T14:55:26.435Z, desc: 'current date' }. 
 date est afficher comme renvoyée comme une date -absence de quote - et _comment absent*/

/**Deuxième argument de JSON.stringify()
* le deuxième argument de cette méthode peut être un tableau de string qui sont les noms de propriété d'objets 
* (les entiers seront convertis en string et représenteront les index de array). Les propriétés dont les noms ne seront
* pas dans le tableau seront ignorés lors de la sérialization. L'ordre des propriétés dans le tableau sera respecté dans 
* la sérialization.
 * 
* Quand c'est une fonction elle est qualifiée de "replacer" et elle est à l'image de la fonction reviver de JSON.parse()
*/
const objet3 = {state: "VAL-OISE", country: "FRANCE", city: "SANNOIS", 
                posiiton: "NORTH", regExp: new RegExp("Java\\s")};
JSON.stringify(objet3, ["city", "state", "country"]); // => {"city":"SANNOIS","state":"VAL-OISE","country":"FRANCE"}
JSON.stringify(objet3, (name,  value) => value instanceof RegExp ? undefined : value); // => {"state":"VAL-OISE","country":"FRANCE","city":"SANNOIS","posiiton":"NORTH"}



/** Internationalization API
 * Cette API consiste en trois classes Inrl.NumberFormat, Intl.DateTimeFormat et Intl.Collator. Elles permettent de formater
 * les nombres (monnaies, pourcentages), les datetime et de comparer des string en prenangt en compte les le formatage local.
 * Cette API ne fait pas encore partie de ECMAScript mais elle est supportée par les navigateurs web et par Node.
 * 
 * Note : une des fonctionnalités importante de cette API est l'affichage de texte traduit dans la langue de l'utilisateur.
 */

/** Formatage des nombres
 * La classe Intl.NumberFormat a une méthode format() qui prend en compte presque tous les formatage possibles de nombres.
 * Le constructeur de Intl.NumberFormat() prend deux argument : la localisation du formatage  (en-US, fr...par défaut la localisation 
 * du l'OS/interpréteur), un objet qui donne plus de détais sur la manière de formater le nombre.
 *  Le premier argument peut être aussi un array de string auquel cas la localisation le constructeur choisia la localisation
 * le plus spécifique et la mieux supportée.
 *
 * Le second argument est un objet qui doit avoir les propriétés suivantes :
 * - style : décimal (par défaut). percent ou currency
 * - currency (si style est currency): pour préciser le code ISO de la monnaie : USD, GBP,...
 * - currencyDisplay (si style currency) : symbol par défaut (pour afficher le symbole de la monnaie), 
 *                                         code ISO à trois chiffres ou name (nom complet de la monnaie)
 * - useGrouping : mettre false si on  ne veut pas d'une séparation par milliers (ou l'equivalent local)
 * - minimumIntegerDigits : nombre d'entier min sur lesquels afficher la partie entière : entre 1 et 21
 * - minimumFractionDigits, maximumFractionDigits : compris entre 0 et 20. Le min par défaut est 0 et le max par défaut est 3
 *                                                  sauf quand celui-ci dépend de la monnaie. La partie fractionnelle peut être arrondie.
 * - minimumSignificantsDigits, maximumSignificantsDigits : si elle sont précisées, elles écrasent les propriétés sur les parties
 *                                                          entières et décimales précisées ci-dessus
 */

let dollar = Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
dollar.format(10); // => $10.00

/** Une caractéristique utile de Intl.NUmberFormat (valable aussi pour les autres classes) est que la méthode format()
 * est liée à l'objet NumberFomrat (le 2em argument du constructeur).
 * Donc plutôt que de définir une variable qui fait référence à l'objet et ensuite appeler la méthode, il est possible d'assigner
 * la méthode format() à une variable et de l'utiliser comme fonction autonome
*/
let data = [0.049, 0.1, 1]
const percentFormat = Intl.NumberFormat(undefined, {
    style: "percent",
    minimumIntegerDigits: 1,
    maximumFractionDigits: 1
}).format;

data.map(percentFormat); // => [ '4,9 %', '10 %', '100 %' ] en local fr

/** Formatting  Dates and Times
 * Int.DateTimeFormat est assez similaire à Intl.NumberFormat.
 * Les methodes toLocaleDateString() et toLocaleTimeString() peremettent d'afficher les date et l'heure au format local.
 * Mais elle ne donnent pas la possibilité de choisir les champs à affciher : c'est ce que permet Intl.DateTimeFormat.
 * La méthode format() de cette classe n'affiche pas toujours exactement ce qui est souhaité mais ce qui s'en rapproche le plus
 * L'objet qui précise les options de formattage a les propriétés suivantes :
 * - year : "numeric" pour une année sur 4 chiffres, "2-digit" pour une année sur 2 chiffres.
 * - month : "numeric" (1 à 12), "2-digit" (01 à 12), "long" (Janvier...), "short" (Jan...), "narrow" (J, F...)
 * - day : "numeric" (1 à 31), "2-digit" (01 à 31)
 * - weekday : "long" (Monday,...), "short" (Mon,...), "narrow" (M,...)
 * - era : "long", "short", "narrow". cette propriété précise si la date doit être formatée avec ube ère telles que CE ou BCE. Utile quand l'on formatte
 *          des dates très anciennes.
 * - hour, minute, second : "numeric", "2-digit". ces propriétés précides le formattage des champs éponymes.
 * - timeZone : précise le timezone désiré. Par défaut ce sera le timezone local. Exemple : "UTC", "America/Los_Angeles"
 * - timeZoneName : "long", "short". précise comment le timeZone doit s'afficher.
 * - hour12 : boolean qui indique si la valeur max pour les heures est 12. Par défaut, on s'appuie sur le système local.
 * - hourCycle : elle est subordonnée à hour12. "h11" (minuit est 0 et l'heure avant est 11pm), "h12" (minuit est 12), 
 *                                              "h23" (minuit est 0 et l'heure avant est 23), "h24" (minuit est 24)
*/
const date3 = new Date("2024-03-18T11:28:00Z");
Intl.DateTimeFormat("Fr").format(); // => 18/03/2024. affichage par défaut au format local de la date
const dateOptions = {weekday: "long", year: "numeric", month: "2-digit", day: "numeric"}
Intl.DateTimeFormat("es-ES", dateOptions).format(date3); // => lunes, 18/03/2024

const dateOptions2 = {weekday: "long", year: "numeric", month: "2-digit", day: "numeric", era: "short"}
Intl.DateTimeFormat("fr-FR", dateOptions2).format(date3); // => lundi 18 03 2024 ap. J.-C.

/** Compareing string
 * Il n'est pas toujours suffisant de s'appuyer sur l'ordre alphabétique "latin" pour comparer les string. 
 * Chez les gallois par exemple le CH et DD sont considérés comme une seule lettre. Chez les lituaniens, le Y est avant le J...
 * Intl.Collator et sa méthode compare() permet de résoudre ces problèmes alphabétiques. 
 * Le Fonctionnement est assez similaire aux deux classes suivantes. L'objet en option du contructeur a les propriétés suivantes :
 * - usage : "sort" (le plus de différenciation possible entre les lettres en vue d'avoir l'ordonnancement le plus juste), 
 *           "search" (comparaison moins stricte qui peut ignorer les accents)
 * - sensitivity : "base" (ignore généralement les accents et la casse), "accent" (accent sans la casse), 
 *                  variant (accent et casse), "case"  (casse sans accent)
 * - ignorePunctuation : boolean. Si true par exemple "anyone" === "any one".
 * - numeric : boolean qui indique siles strings contiennent des numbers. si true "version 9" < "versio 10"
 * 
 */
const collator = Intl.Collator("fr-FR", {usage: "sort", sensitivity: "base", numeric: true});
collator.compare("vérité", "verite"); // 0
collator.compare("vérité 9", "verite 10"); // -1
["verite 10", "verite 9", "vérité"].sort(); // => [ 'verite 10', 'verite 9', 'vérité' ]
["verite 10", "verite 9", "vérité"].sort(collator.compare); // => [ 'vérité', 'verite 9', 'verite 10' ]

// Find all strings that loosely match a target string
const fuzzyMatcher = new Intl.Collator(undefined, { sensitivity: "base",
ignorePunctuation: true
}).compare;
let strings = ["food", "fool", "Føø Bar"];
strings.findIndex(s => fuzzyMatcher(s, "foobar") === 0)// => 2


/** The Console API :  https://console.spec.whatwg.org
 * Cette API a plusisueurs méthodes commençant par console. :
 * 
 * log() : converti ses arguments en string, les sépare par un espace et les affiche dans la console. Retourne à la ligne après
 * debug(), info(), warn(), error() : ces méthodes sont identiques à log(). Dans Node, error() envoie son résultat dans le 
 *                                    flux des erreurs plutôt que dans le flux standard. 
 *                                    Dans le navigateur, des icônes (indiquant la sévérité du message) peuvent précèder 
 *                                    les message pour chaque méthode
 * alert() : prend deux arguments. Si le premier est évalué à truthy, aucun affichage. Sinon le second argument précédé de 
 *             "Assertion failed:" est affiché avec la méthode error(). Pas d'exception lancée comme pour assert().
 * clear() : efface la console si possible. Dans le navigateur ou sur NOde quand la sortie se fait dans le terminal. Si en
 *             Node la sortie est redirigée (fichier ou pipe), clear() n'aura pas d'effet.
 * table() : permet d'afficher les données sous forme de tableau si possible. Sinon affiche comme log(). Elle marche bien quand
 *           le premier argument est un tableau d'objets qui ont une structure similaire. Dans ce cas, chaque objet est une
 *           ligne du tableau affiché et les propriétés sont les colonnes. Il est possible de préciser en deuxième argument 
 *           un tableau des propriétés que l'on souhaite afficher.
 * trace() : affiche les argument suivis de leur stack trace. En node la sortie va dans le flux des erreurs au lieu du standard
 * count() : prend un argument string et affiche le nombre de fois qu'il a été loggé. Utile pour debugger
 * countReset() : prend un argument string et reset son comptage.
 * group() : affiche l'argument passé comme log(). Les autres log() qui suivent sont indentés.
 * groupCollapsed() : fonctionne comme group(). Dans les navigateurs le groupe est compacté (les messages qu'il contient
 *                    son masqués par défaut). Dans node groupCollapsed() march exactelment comme group()
 * groupEnd() : sans argument; n'affiche rien; termine group() ou groupCollapsed()
 * time() : prend un string; n'affiche rien mais enrigistre le moment du l'appel avec ce string.
 * timeLog() : prend un string comme premier argument. si ce string a été précédemment appelé avec time(), l'affiche suivi
 *             du temps écoulé depuis lors. Les arguments additionnels sont affichés comme log()
 * timeEnd() : fait comme timeLog() mais termine time(). Il faudra refaire time() avant tout appel à timeLog()
 * 
*/
console.time("testConsole")
console.count("message")
console.log(data,date3)
console.assert(0, "Bonjour")
//console.clear()
class MaClass {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const monObjet1 = new MaClass(1, 2, 3);
const monObjet2 = new MaClass(2, 3, 4);
const monObjet3 = new MaClass(5, 6, 7);

console.table([monObjet1, monObjet2, monObjet3], ["a", "c"]);
console.table(new MaClass(monObjet1, 2, monObjet3));
console.trace(monObjet1);
// console.clear
console.count("message")
console.count("message")

console.group("Phase 1");
console.log("BOnjour");
console.log("Dedy");
console.log("BOSSIA");
console.groupEnd();
console.timeLog("testConsole");
console.timeEnd("testConsole", "merci pour tout")

/** Formatted Output with console
 * Pour les méthode de Console qui affichent comme log(), si le premier argument contient : 
 * %s (string), %i (entier), %d (entier), %f (number), %o (objet), %O (objet), ou %c (css), alors il est traité comme un 
 * string et ces % sont remplacées par les autres arguments
 * 
 */
const nom = "BOSSIA"
console.log("l'enfant %s a %i ans", nom, 12)


/** URL API :  https://url.spec.whatwg.org.
 * 
 * Le constructeur URL() peut prendre comme argument une url absolue ou une utl relative comme 1er argument et l'url
 * absolue y relative.
 */
let url = new URL("path/name?q=term#fragment", "https://example.com:8080");
url.href // => https://example.com:8080/path/name?q=term#fragment
url.protocol // => https
url.origin// => https://example.com:8080
url.host // => example.com:8080
url.hostname // => example.com
url.port // => 8080
url.pathname // => /path/name
url.search // => ?q=term
url.hash // => #fragment

/* les URL peuvent inclure des username et password */
let url2 = new URL("ftp://admin:1337!@ftp.example.com/");
url2.username // => admin
url2.password // => 1337!

/** Hormi la propriété origin qui est read-only, les autres propriétés sont en read-write.
 * modifier href revient à faire un nouvel appel au constructeur
 * Une fonctionnalité intéressante de la class URL est l'ajout de la ponctuation et des caractères spéciaux quand cela
 * est nécessaire.
 * Pour les url avec des query multiple, utiliser la propriété searchParams
*/
url2.pathname = "un path de test";
url2.toString() // ftp://admin:1337!@ftp.example.com/un%20path%20de%20test

url2.searchParams.append("a", 10);
url2.searchParams.append("b", "toto");
url2.search; // => ?a=10&b=toto
url2.searchParams.append("a", 20);
url2.searchParams.get("a"); // => 10
url2.searchParams.getAll("a"); // => [ '10', '20' ]
url2.searchParams.set("b", "tata"); 
url2.searchParams.sort(); // => trie les params par ordre alphabétique
// searchParams est iterable
[...url2.searchParams]; // => [ [ 'a', '10' ], [ 'a', '20' ], [ 'b', 'tata' ] ]

// manipulation de searchParams
let url3 = new URL("http://example.com"); 
let params = new URLSearchParams(); 
params.append("q", "term"); 
params.append("opts", "exact"); 
params.toString()
url3.search = params; 
url3.href; // => http://example.com/?q=term&opts=exact

/** encodeURI() et decodeURI() */
const maString = "test avec $/ qui marche";
encodeURI(maString); // => test%20avec%20$/%20qui%20marche
decodeURI("test%20avec%20$"); // => test avec $

/** encodeURIComponent et  decodeURIComponent 
 * marche comme les deux précédentes mais encode en plus les /, # et cie
*/
encodeURIComponent(maString); // => test%20avec%20%24%2F%20qui%20marche
decodeURIComponent("test%20avec%20%24%2F%20qui%20marche"); // => test avec $/ qui marche

// ces méthodes ont parfois quelques insuffisances dans l'encodage. privilégier donc la classe URL


/** Timers
 * setTimeout() et setInterval()
 * 
 * setTimeout() : le premier argument est une fonction. le deuxième (par defaut 0) précise le nombre de milliseconds
 * après lequel la fonction sera exécutée. setRimeout() renvoie une valeur qui peut petre utilisée par la fonction
 * clearTimeout()
 * 
 * setInterval() : comme setTimeout() mais avec une exécution qui répète à l'interval défini. le résultat de la fonction
 * peut être passé à clearinterval()
 */
// Once a second: clear the console and print the current time
let clock = setInterval(() => {
    console.clear();
console.log(new Date().toLocaleTimeString()); }, 1000);
// After 10 seconds: stop the repeating code above.
setTimeout(() => { clearInterval(clock); }, 10000);

