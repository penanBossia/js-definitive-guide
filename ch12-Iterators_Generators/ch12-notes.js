/** Il y a trois types à comprendre pour appréhender les itérations : 
 * - l'objet iterable (Array, Set, Map) : objet avec une méthode spéciale qui retourne un objet iterator
 * - l'iterator (qui exécute les itération) : c'est un objet avec une méthode next() qui retourne un résultat d'iteration
 * - le résultat de l'itération (contient le résultat de chaque itération) : c'est un objet avec des propriétés 
 *      value et/ou done
 * 
 * Pour itérer sur un objet iterable, on appelle sa methode iterator pour avoir son objet iterator, puis la méthode next()
 * de cet objet est appeléé jusqu'a ce que l'objet renvoyé par cette méthode a sa propriété done valorisée à true.
 * 
 * La méthode iterator d'un objet iterable se nomme Symbol.iterator.
 * L'objet iterator retourné par cette méthode est lui-même iterable i.e il a une méthode nommée
 * Symbol.iterator qui renvoie l"objet lui-même.
 * 
*/

let iterable = [100, 230];
let iterator = iterable[Symbol.iterator]();
let next;
for (next = iterator.next(); !next.done; next = iterator.next()) {
    next; // => { value: 100, done: false } et { value: 230, done: false }
}
next; // => { value: undefined, done: true }

/** Implementing iterable objects
 * Pour rendre une classe iterable, il faut qu'elle implémente une méthode nommée : Symbol.iterator
 * cette méthode doit retourner un objet qui a une méthode next(). Et cette méthode next() doit
 * retourner un objet qui a une propriété value et/ou une propriété done de type boolean
 */

class ArithSequence {
    constructor(first, gap, last) {
        this.first = first;
        this.gap = gap;
        this.last = last;
    }

    isMember(value) {
        return value <= this.last && (value - this.first) % this.gap == 0;
    }

    toString() {
        return `Arithmetique sequence with first member ${this.first} and gap ${this.gap}`;
    }

    [Symbol.iterator]() {
        let next = this.first;
        let gap = this.gap;
        let last = this.last;
        return {
            next() {
                let current = next;
                next += gap;
                return current <= last ? {value: current} : {done: true};
            },
            [Symbol.iterator]() {return this;}
        };
    }
}

let arithSequence = new ArithSequence(1, 3, 21);
arithSequence.toString(); // => Arithmetique sequence with first member 1 and gap 3
arithSequence.isMember(16); // => true
arithSequence[Symbol.iterator]().next(); // 1
for(let item of arithSequence) {
    item; // => 4, 7, 10, 13, 16, 19
}

function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {return this;},
        next() {
            for(;;) {
                let current = iterator.next();
                if (current.done || predicate(current.value)) {
                    return current;
                }
            } 
        }
    };
}

[...filter(arithSequence, x => x%2 == 1)]; // => [ 1, 7, 13, 19 ]

/** Une des caractéristiques des objets iterables et des iterators est qu'il sont intrinsèquement
 * paresseux. C'est à dire que si un calcul est nécessaire pour retourner la prochaine valeur,
 * ce calcul est différé jusqu'à ce que cette prochaine valeur soit demandée.
 * Par exemple, plutôt que de split() un long texte pour itérer sur ses mots, nous pourrions 
 * procéder comme dans le fichier words.js
 * 
 * Quand on itère sur les mots d'un fichier par exemple, il se peut que l'itération ne se fasse 
 * pas jusqu'au bout i.e l'iterator ne renvoie pas comme dernière valeur un objet dont la 
 * propriété done est true. Pourtant il est nécessaire de mettre fin à l'iterator et de libérer
 * par conséquent la mémoire allouée. C'est pour cela qu'il faut associée à la méthode next() de 
 * l'itérator une methode retrun() qui sera appelée par l'interpréteur à cette fin.
 */

/** Generators
 * C'est un type d'iterator définit avec la nouvelle syntaxe ES6. Il est particulièrement utile 
 * quand les valeurs à itérer sont les résultats d'un calcul.
 * Pour créer un générator, il faut définir une fonction avec la syntaxe function*
 * L'invcation de la fonction générator n'exécute pas le corps de la fonction mais renvoie un objet
 * generator...qui est un iterator.
 * L'appel à la méthode next() de cet iterator / generator exécute le corps de la fonction 
 * générator (depuis sa position courante) jusqu'à trouver l'instruction yield. La valeur de 
 * cette instruction yield devient la valeur retournée par next()
 * 
 * Dans les classes et objets, il y a un raccourci : function* g() {...} <=> *g() {...}
 */

function* generator(first, gap, last) {
    for (let i=first; i<=last; i+=gap) yield i;
}
[...generator(1, 3, 21)]; // => [1,  4,  7, 10, 13, 16, 19]

/** Les générators simplifient la définition de classes iterables. 
 * Exemple avec la classe ArithSequence 
 */

class ArithSequence2 {
    constructor(first, gap, last) {
        this.first = first;
        this.gap = gap;
        this.last = last;
    }

    isMember(value) {
        return value <= this.last && (value - this.first) % this.gap == 0;
    }

    toString() {
        return `Arithmetique sequence with first member ${this.first} and gap ${this.gap}`;
    }

    *[Symbol.iterator]() {
        for(let i=this.first; i<=this.last; i+=this.gap) yield i;
    }
}

[...new ArithSequence2(0, 4, 20)]; // => [ 0, 4, 8, 12, 16, 20 ]