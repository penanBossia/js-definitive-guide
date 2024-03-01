let book = {
    topic: "Javascript",
    edition: 7
};
// ajout d'une nouvelle propriété
book.reader = "BOSSIA";

console.log(book["edition"]);
console.log(book.topic);
console.log(book.reader);

// assignation de variables
let x = 3, y = 4;

// definition d'une fonction classique : bloc de code réugtilisable
function plus1(x) {
    return x + 1;
}

// definition d'une fonction comme variable
let square = function(x) {
    return x * x;
}

console.log(plus1(x));
console.log(square(y));

// defintion d'un tableau
let points = [
    {x: 0, y: 0},
    {x: 1, y: 5}
];
// En javascript, une methode est une fonction associée à une propriété d'un objet
points.dist = function() {
    let p1 = this[0];
    let p2 = this[1];
    let a = p2.x - p1.x;
    let b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
}
console.log(points.dist());

// definition d'un tableau
let tableau = [2, 4, 6];
// inverser les éléments d'un tableau
console.log(tableau.reverse());

// boucle dans un tabldeau
let sumTableau = function(tableau) {
    let sum = 0;
    for (let x of tableau) {
        sum += x;
    }
    return sum;
};

console.log(sumTableau(tableau));

// aperçu de la POO en javascript
class Point {
    // definition d'un constructeur pour créer une instance de l'objet
    constructor(x, y) {
        this.x = x; // les paramètres de la fonction constructeur sont utilisées
        // pour définir les propriétés de l'objet
        this.y = y;
    }

    distance() { // definition d'une distance à l'origine 
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

let point1 = new Point(1, 0);
console.log("point1 est : ", point1);
console.log(point1.distance());