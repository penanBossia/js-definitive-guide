/**
 * En JS, les objets sont dynamiques i.e il est possible de d'ajouter/supprimer des propriétés (après sa création)
 * Toute valeur qui n'est pas un string, number, un symbol, true, false, null ou undefined est considéré comme un objet.
 * 
 * Un objet héritant des propriété de son prototype, JS utilise le terme own property pour distinguer les propriétés
 * propre à un objet de celles héritées de son prototype.
 * 
 * En plus de son nom et de sa valeur, chaque propriété d'un objet à trois attributs (qui sont à oui par défaut) :
 * - writable : indique si la propriété peut être modifiée
 * - enumerable : indique si le nom de la propriété peut apparaître dans une boucle for/in
 * - configurable : indique si la propriété peut être supprimée et si ses attributs peuvent être altérés
 * 
 */
let obj1 = {};
// le nom d'une propriété peut être une chaine vide, un identifiant ou un string
let obj2 = {"": "toto", 
            lastname: "BOSS", 
            "surname": {
                origin: "Port-Bouet 2",
                value: "poulet"
            }
}; 
obj2[""]; // => toto. 
let obj3 = new Object() // equivalent de {}, new Array() -> []

/**
 * La plupart de tous les objets JS ont un second objet qui lui est associé : c'est son prototype.
 * Presque tous les objets ont un prototype. Mais seules quelques uns on la propriété prototype. Ce sont ces derniers
 * qui définissent les prototype de tous les autres objets.
 */
let obj4 = new Date;

/**
 * Object.create(mon_prototype) crée un nouvel objet en utilisant le premier argument de la méthode comme prototype
 * Créer un objet avec ne revient à faire Object.create(Object.prototype)
 */
let obj5 = Object.create({x: 1, y: 2}); // obj5 hérite des propriétés x et y
obj5 // => {}
Object.getPrototypeOf(obj5); // => {x: 1, y: 2}
Object.getPrototypeOf({x:1, y:1}); // => {}. La chaine de prototype de obj5 est 
Object.getPrototypeOf({}); // => [Object: null prototype] {}. La chaine de prototype de obj5 est : 
                            // {x: 1, y: 2}, {}

/**
 * Si l'on passe null à la methode Object.create(), l'objet créé n'aura pas de prototype et ne pourra hériter de rien.
 * Même pas d'une méthode comme toString() (sera pas possible de lui appliquer l'opérateur +).
 * Si on veut utiliser create pour retourner un objet comme avec le litéral {} ou new Object, 
 * il faudra alors faire create(Object.prototype)
 * 
 * La méthode create prend un paramètre optionnel qui décrit les propriétés du nouvel objet.
 * 
 * Si on veut se prémunir de modifications non voulues d'un objet qu'on passe à une fonction tierce, il faut passer
 * plutôt lui passer comme argument 
 */

let obj6 = {x: "toto"}

const maFunction = function(obj) {
    if(obj.x) {
        obj.x = "tata";
    }
    return obj;
}
console.log(maFunction(Object.create(obj6)), obj6) // { x: 'tata' } { x: 'toto' }. Sans si appel avec obj6 direct -> modif

/**
 * Pour accéder (ou modifier) à la valeur d'une propriété, on utilise l'objet suivi de "." ou [].
 * Le point après l'objet est suivi de l'identifiant de la propriété.
 * à l'intérieur de [], on peut mettre une expression dont la valeur (convertible en string ou en symbol) 
 * est le nom de la propriété
 * 
 * Le fait de pouvoir accéder aux propriétés d'un objet via [] fait dire que les objets sont des associatives arrays.
 * (dont les indexes sont des strings et npm des nombres).
 * C'est une fonctionnalité puissante de JS qui permet notamment de créer dynamiquement des objets dont les noms des
 * propriétés ne sont pas connues d'avance. Mais bien souvent les Map sont une meilleure option
 */

/**
 * le delete d'une propriété d'un objet ne s'applique que sur les propriété qu'il a en propre et jamais celles héritée.
 * Pour supprimer une propriéré héritée, il faut la supprimer dans le prototype et cela affecte tous ses heritoers
*/
let classSymbol = Symbol.for("classSymbol");

class MaClasse {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        // let classSymbol = Symbol("classSymbol");
        this.classSymbol = z;
    }
}

let monObjet1 = new MaClasse(1, 2, 4);
delete monObjet1.x
let monObjet2 = new MaClasse(3, 4)
console.log(Object.getPrototypeOf(monObjet1), monObjet1, monObjet2); // monObjet2 a toujours son x

/**
 * hasOwnProperty() et propertyIsEnumerable() sont deux methodes des objets qui permettent de savoir si
 * l'objet a une proprtité en propre et si la propriété est enumerable (son attribut enumerable à true).
 * Ces deyx prennent en paramètre le nom de la propriété à tester qui peut être un string ou un symbol.
 * 
 * La boucle for/in permet d'itérer sur les propriétés enumrables d'un objet (propres ou héritées)
 */

for (let prop in monObjet2) {
    console.log(prop); // x, y, classSymbol
}

/**
 * on peut aussi remplacer la boucle for/in par un for/of en récupérant la liste des propriétés de 
 * l'objet :
 * - Object.keys(obj) : retourne la liste de noms des propriétés enumerables (en propre) de obj - symbols exclus
 * - Object.getOwnPropertyNames(obj) : fait comme Object.keys() mais met en plus les propriéts non enumerables dont 
 * les noms sont de type string (pas les symbols)
 * - Object.getOwnPropertySymbols(obj) : même chose que la précédente mais pour les propriétés dont les nom sont des
 * symbols
 * Reflect.ownKeys(obj) : retourne les noms de toutes les propriétés de type symbol ou string, enumerable ou pas.
 */
 
/**
 * Extension des objets
 * Certains framework JS ont implémenté la méthode extends (copie des propriétés d'un objet source dans un 
 * objet destination).
 * ES6 a ajouter cette fonctionnalité  via la metbode Object.assign(target, source1, ?source2...)
 * Object.assign() modifie et renvoie son premier argument (ne modifie pas les autres). Elle copie toutes les propriétés
 * enumerables des sources (y compris celles dont les noms sont des symbols) dans l'objet de destination. assign() ne
 * copie/remplace pas les methodes getter et setter des objets source et target
 */

obj5 = Object.assign({}, monObjet1, obj5); // copie de monOBjet1 dans un nouvel objet puis de obj5 dans le resultat.
// On affecte tout ça à obj5 -> comme pour copier les propriété de monObjet1 qui n'existent pas dans obj5
obj5 = {...monObjet1, ...obj5};
obj5; // => { y: 2, classSymbol: 4 }

/**
 * La sérialisation est le process de conversion d'un objet en une chaine de caratère à partir de laquelle il pourra être
 * restauré.  Cela se fait grâce aux fonction JSON.stringify(obj) et JSON.parse(obj).
 * Les objets, arrays, strings, nombres finis, true, false, null peuvent être sérialisé et déséréalisé correctement.
 * par contre : +/-Infinity, NaN -> null
 * Date -> string au format ISO mais la déséréalisation donne toujours un string
 * La séréalisation d'un objet ne porte que sur ses propriétés en propre.
 */

let obj7 = Object.create({x: 1, y: 2})
obj7.z = "seriablize"
JSON.stringify(obj7); // => {"z":"seriablize"}


/**
 * methode toString() / toLocaleString() de la classe Object
 * Tous les objets en JS héritent de propriétés de Object.prototype dont toString().
 * Cette methode ne prend pas de paramètre et renvoie un string qui represente l'objet. Elle est utilisée à chaque
 * fois que JS attend un string et qu'on lui passe un objet à la place.
 */

let s = { x: 1, y: 1 }.toString(); // s == "[object Object]". Pas très utile
let point1 = { 
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }, 
    toLocaleString: function() { return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`; } 

};
point1.toString(); // => (1, 2)
console.log(point1.toLocaleString());

/**
 * la methode valueOf() est utilisée par JS quand il a besoin d'avoir la valeur d'un objet dans un type primitif autre que string.
 * Génréralement en number.
 */

/**
 * la methode toJSON() n'est pas encore définit dans Object.prototype mais JSON.stringify() est utilisée pour sérialiser
 * les objet. Si un objet définit une méthode toJSON, la valeur de cette dernière est utilisée pour appeler 
 * JSON.stringify au moment de la serialization de l'objet
 */

let point2 = { 
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }, 
    toJSON: function() {return this.toString()}
};
JSON.stringify([point2]); // => ["(1, 2)"]

/**
 * Syntaxe étendue des objets
 */
// raccourci sur la déclaration des propriété lors de la création d'un objet
let x = 1, y = 2;
// pour créer un objet à partir de x et y, plutot que :
let obj8 = {
    x: x,
    y: y
};
// nous pouvons écrire :
obj8 = {x, y}

// raccourci pour les noms de propriétés calculés
const PROPERTY_NAME = "p1";
function computedProName() {return "p" + 2}
// si nous voulons créer un objet qui a les noms de propriétés ci-dessus dont certaines dynamiques, plutot que :
let obj9 = {};
obj9[PROPERTY_NAME] = 2;
obj9[computedProName()] = 4;
// nous pouvons écrire
obj9 = {
    [PROPERTY_NAME]: 2,
    [computedProName()]: 4 // la valeur de retour de la fonction est convertie en string si nécessaire
}
console.log(obj9);

/**
 * Symbol est un type primitif de JS. let monSymbol = Symbol()
 * Les symbols sont utilisés comme noms de propriétés pour définir des noms uniques, utilse lorsque le code est partagé
 * et qu'on veur avoir l'assurance que nos propriétés ainsi définies ne seront pas overridés et n'entrent pas en collision 
 * avec d'autres noms de propriétés.
 * Les symbol n'adressent pas des problématique de sécurité car le code toers peut y accéder - Objetc.getOwnPropertySymbols()
 * et les supprimer.
 *  
 */ 

/**
 * spread operator : ...
 * Il permet de copier les propriétés d'un objet ou plusieurs dans un autre. Si les certains propriétés copiées ont
 * le même nom, priorité au dernier objet.
 * L'opérateur spread ne copie pas les propriétés héritées.
 */

// raccourci pour la définition de methode. Plutôt que :
let square = {
    area: function() { 
        return this.side * this.side; 
    }, 
    side: 10
};
// on pourra écrire (un peu comme en JAVA)
square = {
    area () { 
        return this.side * this.side; 
    }, 
    side: 10
};
// il est possible d'utiliser des symbols, des valeurs calculées comme nom de méthode
const METHOD_NAME = "m"; 
const symbol = Symbol(); 

let weirdMethods = {
    "method With Spaces"(x) {
         return x + 1; 
    }, 

    [METHOD_NAME](x) {
         return x + 2; 
    }, 

    [symbol](x) { 
        return x + 3; 
    }
};
// les appels au méthodes sont similaires au accès des propriétés (normal, les méthodes sont des propriétés lol)/
// d'ailleurs pour rendre un objet iterable, il faut lui définir une methode de nom symbolique Symbol.iterator.
weirdMethods["method With Spaces"](1) // => 2 
weirdMethods[METHOD_NAME](1) // => 3 
weirdMethods[symbol](1) // => 4

/** accesseurs
 * En plus des propriétés de type nom : valeur, JS supporte des propriétés appelées accesseurs qui peuvent avoir jusque'à
 * deux méthodes d'accès : getter et/ou setter.
 * Quand un programme demande la valeur d'une propriété accessor, JS appelle la methode getter (setter en cas de modif).
 * Ces deux méthodes définissent les attributs read/write de la propriété. Si read-only, la lecture renverra undefined.
 * 
 * Les accessors properties sont définies comme une ou deux méthodes, précédées de get/set et qui ont le même nom 
 * que la propriété.
 */

let o = {
    // An ordinary data property dataProp: value,
    // An accessor property defined as a pair of functions.
    get accessorProp() { return this.dataProp; }, 
    set accessorProp(value) { this.dataProp = value; } 
};
// les accesseurs défiis ci-dessus sont unitiles car ne fait rien d'intéressant compaarativement à o.x
// par contre ils ont un sens ici :
let p = {
    // x and y are regular read-write data properties. 
    x: 1.0,
    y: 1.0,
    // r is a read-write accessor property with getter and setter.
    // Don't forget to put a comma after accessor methods.
    get r() { 
        return Math.hypot(this.x, this.y); 
    }, 
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y); 
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta is a read-only accessor property with getter only.
    get theta() { 
        return Math.atan2(this.y, this.x); 
    } 
};
p.r; // => Math.SQRT 2 
p.theta; // => Math.PI / 4

/** Notes
 * - les propriétés accesseurs sont héritées comme. le this qui est utilisée dans ces méthodes fait référence
 *  à l'objet qui les appelle.
 * - quand le nom d'un propriété de base est précédé de underscore (_), cela traduit un usage uniquement en interne de
 * la propriété.
 */
let q = Object.create(p); // q hérité des accesseurs r, et theta
q.x = 3, q.y = 4; // q défnit ses propres valeurs x et y (ne modifie pas celles de son parent)
q.r; // l'accesseur est évalué avec les valeurs x et y propres à q (3 et 4)
