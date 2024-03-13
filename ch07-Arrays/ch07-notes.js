/**
 * Les arrays en JS ne sont pas typés i.e on peut avoir des tableaux de n'importe quoi.
 * La taille maximum pour un tableau est 2**32 - 1 => 4,294,967,295
 */
let array1 = [1, {x: "toto", y: "tata"}, [3, 6], function(){return 5}]; // vraiment n'importe quoi !!
array1[3]; // => [Function (anonymous)]

/** Les Arrays sont des objets spécialisés en JS et dont les indexes sont plus que des noms de propriétés. L'accès aux
 * éléments d'un tableau est plus optimisé (plus rapide) que l'accès à une propriété d'un objet.
 * Arrays hérite de Array.prototype qui définit plusieurs méthodes, souvent génériques i.e s'appliquent à aux objets qui
 * ont des comportement de tableau (string par exemple).
 * 
 * ES6 a introduit des classes de tableau appelées typed arrays. Contrairement au tableau standar en JS, ces typed arrays 
 * ont une taille et un type d'élément fixé. Ces typed arrays offrent notamment de meilleurs performances.
 */

/** 
 * La création d'un tableau se fait de plusieurs façons :
 * - arrays literals : []
 * - ... spread operaror sur un objet iterable
 * - new Array() : idem que []. new Array(1, 2, 4) idem que [1, 2, 4]. Mais new Array(5) ne fait que préallouer une taille
 *      de tableau sans remplir ce dernier
 * - méthodes Array.of() et Array.from()
 */
let array2 = [1, array1[3](), true]; // les élements de tableau dans array literal peuvent être des expressions
array2 = new Array();
let array3 = [10, ...array2]; // a partir de ES6. 
let array4 = [..."Hello"] // => [ 'H', 'e', 'l', 'l', 'o' ]. L'operateur spread marche sur tout objet iterable

/**
 * Il n'est pas possible d'utiliser le constructeur Array() pour créer un tableau contenant un seul élement. Car cet élément
 * est considéré comme sa taille préallouée.
 * C'est pour résoudre ce problème qu'il y a Array.of() depuis ES6
 * Avec ES6, il y a eu aussi Array.from(obj_iterable) qui fonctionne comme [...obj_iterable]
 * 
 */
let array5 = Array.of(10); // [10]
let array6 = Array.from("world"); // => [ 'w', 'o', 'r', 'l', 'd' ]

/**
 * Un array-like objet est tout objet JS dont les noms des propriétés sont des number-like et qui défini
 * une propriété length.
 * A partir d'un objet de ce type, on peut créer un tableau avec Array.from()
 */
let obj1 = {"0": 1, 1: 2, length: 4}
let array7 = Array.from(obj1); // => [ 1, 2, undefined, undefined ]

/**
 * Array.from() accepte un deuxième paramètree optionnel qui est une fonction.
 * Elle applique une transformation à l'élément du array (ou array-like) source avant de l'insérer dans le tableau resultat
 * 
 * Array.from(source, function) est comme le array.map() mais il est plus efficace de faire la transformation au départ
 * plutôt qu'après. Cette fonction passée en paramètre peut avoir un ou deux arguments : le 1er est la valeur et le 2eme l'index.
 * L'index est facultatif.
 */

let translate1 = function(x) {
    return x ? x + 2 : 0;
};

Array.from(obj1, translate1); // =>  [3, 4, 0, 0 ]

let translate2 = function(x, index) {
    return x ? x + 2 + index : 0 + index;
};

let array8 = Array.from(obj1, translate2); // =>  [3, 5, 2, 3 ]


/**
 * Les array sont des objets partculiers dont les noms des propriété sont les index "stringifié".
 * let o = {}; si o[1] = "one"; alors o["1"] vaut aussi "one".
 * 
 * Quand on indexe un tableau avec un nombre négatif, ce nombre est converti en string et devient le nom d'une propriété
 * ordinaire de l'objet tableau.
 * Par contre quand on utilise un string ou un nombre flottant convertible en entier, ce nom se comporte comme un index 
 * associé à une valeur du tableau.
 * 
 * Si le nom de la propriété quo'on ajoute est finalement un index, l'objet tableau augmente sa taille
 */
let array9 = [];
array9[-1.2] = true; // crée dans l'objet array9 une propriété avec le nom "-1.2". La taille de array9 ne change pas.
array9["10"] = 0; //  insère la valeur 0 à la 10eme position dans array9. la taille de array9 devient 11
array9[1.000] = "toto"; // met à jour la valeur à la position 1 de array9
array9; // [ <1 empty item>, 'toto', <8 empty items>, 0, '-1.2': true ]

/**
 * Les sparse arrays (tableau  clairsemés) sont des tableau dont la taille est plus grande que le nombre d'éléments
 * qu'il contient. Par exemple quand on fait new Array(6) | a = [] et a[100] = 0 | [1,,3,] (dernière virgule inutile).
 * 
 * Il sont plus implémentés plus efficacement en terme de mémoire et l'accès aux élements se font coute autant que
 * l'accès à une propriété d'un objet ordinaire
 */

/**
 * La propriété length est LA propriété qui rend différent array des autre objet ordinaires JS.
 * La taille d'un array peut évoluer lors de l'ajout de valeurs.
 * Aussi, les valeurs d'un array peuvent évoluer avec la modification de sa taille.
 */
array10 = [1,2,3,4,5]; // Start with a 5-element array.
array10.length = 3; // a is now [1,2,3].
array10.length = 0; // Delete all elements.  a is [].
array10.length = 5; // Length is 5, but no elements, like new Array(5)

/**
 * Ajout / suppression dans un tableau
 * - push(val) : permet d'ajouter val à la dernière position du tableau. Equivaut à monArray[monArray.length] = val.
 *      push peut prendre plusieurs valeurs. monArray.push(val1, val2) rajoute les deux valeurs à la fin de monArray
 * - unshift() : permet d'insérer des valeurs en tête du tableau en décallant les autres vers la droite. met à jour length
 * - pop() : supprime le dernier élément du tableau et renvoie sa valeur. réduit length de 1
 * - shift() : supprime le premier élément du tableau. décalle les autres d'une position vers la droite. réduit length de 1
 * 
 * Il est possible de supprimer un élément de array comme on le fait avec les propriété des objets :
 * delete monArray[position]. La suppression laisse un vide à la position. la taille ne change pas. monArray devient sparse
 * L'accès à une position supprilmée renvoie undefined comme l'accès à une propriété non définie d'un objet.
 */
let array11 = [3,4,5]
array11.unshift(10, 11);
array11; // => [ 10, 11, 3, 4, 5 ]

/**
 * iteration dans les arrays.
 * La boucle for/of s'applique à des objets iterables : for(let letter of "Hello");
 * Avec la boucle forEach, l'exemple précédent donnerait : "Hello".forEach(letter => {});
 * Si on veut itérer en ayant besoin des index, on peut faire utiliser la methode entries() et le destructuring comme suit :
 */
let lettersArray = [..."Hello"];
for(let [index, letter] of lettersArray.entries()) {
    /** */
}
// son équivalent avec la boucle forEach() est comme suit
array11.forEach((value, index) => { // l'index est le second argument passé à la fonction
    index; value;
});

// la méthode passée au forEach admet un troisième argument qui est le tableau sur lequel on itère.
array11.forEach((value, index, arr) => { // arr c'est array11
    value; index; arr;
});

/**
 * Note : Les deux boucles ne sont pas équivalentes. La boucle for/of itère sur les propriété vides d'un array sparse 
 * alors que la boucle forEach() les ignore.
 */

/**
 * Array Iterator methods
 * Ce sont des methdes qui permettent d'itérer, de manière ordonnée sur les éléments d'un array en leur appliquant
 * une fonction. Elles fournissent des moyens d'itérer, de mapper, de filtrer, de tester et de réduire des array.
 * Dans des sparses arrays, ces fonctions ignorent les éléments inexistants.
 * 
 * La plupart des méthodes d'itération acceptent un deuxième argument. exemple bête : arr.forEach(function, arg).
 * Si ce 2eme argument est précisé, la fonction est exécutée comme une méthode de cet objet i.e le this qu'on utilisera dans
 * cette fonction fera référence au 2eme argument.
 * 
 * Aucune des méthodes d'itération ne modifie le array...quoique la fonction qu'on passe à la méthode 
 * d'itération le peut. Démoniaque. Lol
 */

/** forEach() 
 * Note : cette methode d'itération ne permet pas de terminé l'itération avant que tous les éléments n'aient été passé
 * à la fonction en argument. Il n'y a pas d"équivalent de break qu'on a dans une boucle for
 */
let array12 = [1, 2, 3], sum = 0;
array12.forEach(elt => sum += elt); // sum = 6
// si on veut modifier le tableau
array12.forEach((elt, index, arr) => {arr[index] = elt + 1}); // array12 = [2, 3, 4]

/** map()
 * Cette fonction est appelé comme forEach sauf qu'elle doit retourner une valeur. Cette valeur est ajoutée dans un
 * nouveau tableau qui est renvoyé comme résultat; le tableau initial n'est pas modifié.
 * Sur une fonction sparse, même si les éléments inexistants sont ignorés, le résulat de map() est un tableau sparse
 * autant que l'est le tableau initial. Méchant méchant lol.
 */
let array13 = [1, , 3, 4]
array13.map(elt => elt * 2); // => [ 2, <1 empty item>, 6, 8 ]

/** filter()
 * Elle retourne un nouveau tableau qui est un sous-ensemble du tableau initial. Elle prend en argument un prédicat : une
 * fonction qui retourne true ou false (plus généralement truthy ou falsy). Selon la valeur du prédicat, l'élément est 
 * ajouté ou non au tableau qui sera renvoyé.
 * 
 * filter() ignore certes les éléments inexistant dans un tableau sparse, mais le résultat est toujours un tableau 
 * dense. filter au moins; merci. lol
 */

let array14 = [2, 3, 6, 7, 9];
array14.filter((elt, i) => i%2); // =>  [ 3, 7 ]. éléments aux positions impair. Tordu. lol.

// pour convertire un tarray sparse en array dense
let array15 = [1,,,,,,, 3, 5, 8,,,,2]; // length = 14
array15.filter(() => true); // => [ 1, 3, 5, 8, 2 ]

/** find() et findIndex()
 * Elle fonctionnent avec un prédicat comme filter.
 * 
 * find() s'arrête au premier élément du tableau pour lequel le prédicat est true (truthy) et renvoie cet élément; ou
 * renvoie undefined si pas de matching true.
 * 
 * findIndex() s'arrête au premier élément du tableau pour lequel le prédicat est true (truthy) et renvoie l'index de 
 * cet élément; ou renvoie -1 si pas de matching à true.
 * 
 */

[ 1, 3, 5, 8, 2 ].find(elt => elt > 4); // => 5
[ 1, 3, 5, 8, 2 ].findIndex(elt => elt > 4); // => 2

/** every() et some()
 * Elles prennent en argument un prédicat.
 * 
 * every() renvoie true si le prédicat est vrai pour tous les éléments du array
 * 
 * some() renvoie true s'il existe au moins un élément du array pour lequel le prédicat est vrai.
 * 
 * Ces deux fonction n'itèrent pas forcément sur tous les éléments du array. Elles s'arrêtent dès qu'elle savent quelle
 * valeur renvoyer. every() s'arrête au premier false du predicat et some() au premier true.
 */
[ 1, 3, 5, 8, 2 ].every(elt => elt > 4); // => false
[ 1, 3, 5, 8, 2 ].some(elt => elt > 4); // => true

/** reduce() et reduceRight()
 * Ces deux méthodes combinent deux éléments du tableau pour en produire une seule valeur en utilsant la fonction passée
 * en argument. L'index et le tableau initial sont optionnelement passés en toisième et quatrière argument de la fonction.
 * 
 * reduce() prend un deuxième paramètre optionnel qui est la valeur de départ. Si ce deuxième argument est précisé, il
 * est utilisé comme le premier argument de la fonction de reduction, son second paramètre étant le premier élément du tableau.
 * S'il n'est pas peécisé, les arguments de la fonction de réduction sont les deux premiers éléments du tableau.
 * 
 * reduceRight() fait la même chose que reduce mais en commençant par la droite du tableau.
 * 
 * Ces deux méthodes d'itération n'accepte pas le deuxièle argument qui précise le this à utiliser dans 
 * la fonction de réduction. Ce deuxième argument est remplacé par la valeur initiale d'accumulation.
 * 
 * Note : la fonction de réduction peut très bien s'appliquer pour la combinaison de deux objets qui renvoient un objet du 
 * même type.
 */

[ 1, 3, 5, 4, 2 ].reduce((x, y) => x + y); // => 15. equivalent à [ 1, 3, 5, 4, 2 ].reduce((x, y) => x + y, 0)
[ 1, 3, 5, 4, 2 ].reduce((x, y) => x * y); // => 120. equivalent à [ 1, 3, 5, 4, 2 ].reduce((x, y) => x * y, 1)
[ 1, 3, 5, 4, 2 ].reduce((x, y) => (x > y) ? x : y); // => 5 le plus grand élément du tableau

/** flat() et flatMap()
 * En option, flat() prend en paramètre le niveau d'imbrication que nous voulons applatir
 * flat() permet d'applatir un tableau i.e tous les éléments du tableau initial qui sont des tableaux sont applatis 
 * une fois.
 * 
 * flatMap() fonctionne comme map() à la seule différence que le résultat retourné par le map() et applati avec flat().
 * array.flatMap(maFunction) <=> array.map(maFuntion).flat()
 */
[1, [2, [3]]].flat(); // => [1, 2, [3]]
[1, [2, [3]]].flat(2); // => [1, 2, 3]

let phrases = ["hello world", "the definitive guide"];
let words = phrases.map(phrase => phrase.split(" "));
words; // =>  [ 'hello', 'world' ], [ 'the', 'definitive', 'guide' ] ]
words.flat(); // => [ 'hello', 'world', 'the', 'definitive', 'guide' ]
phrases.flatMap(phrase => phrase.split(" ")); // => [ 'hello', 'world', 'the', 'definitive', 'guide' ]

[-2, -1, 1, 2].flatMap(x => x < 0 ? [] : Math.sqrt(x)); // => [1, 2**0.5]

/** concat()
 * Permet d'agréger les éléments de tableaux dans un nouveau tableau
*/
let array16 = [];
array16.concat(4, [5,[6,7]]) // => [1,2,3,4,5,[6,7]]; but not nested arrays

/** Stacks et Queues avec push(), pop(), shift() et unshift
 * les méthodes push() et pop() permettent de travailler avec des tableau comme s'ils étaient des piles.
 * 
 * push() rajoute un élément en fin du tableau, incrémente la taille du tableau et la renvoie. Contrairement à concat()
 * push() modifie le tableau et ne flat pas les élément ajoutés. on peut utiliser le spread operator pour flatter les 
 * élément à rajouter push(...valeurs)
 * 
 * pop() est l'inverse de push(), seulement que la valeur du retour est l'élément supprimé.
 * 
 * unshift() et shift() fonctionnent respectivement comme push() et pop() à la différence qu'elle vise le début du tableau.
 * Elle procèdent au déclallage des éléments restants
 */
let array17 = [];
array17.push(15); // => 1, array17 = [15]
array17.unshift(1, 2); // => 3, array17 = [1, 2, 15]
array17.shift() // => 1, array17 = [2, 15]
array17.push(3, 7, 9, 11); // array17 = [ 2, 15, 3, 7, 9, 11 ]

/** Sous-tableaux avec slice(), splice(), fill() et copyWithin()
 * 
 * slice(n, m) : renvoie un sous-tableau contenant les éléments au positions n (inclu) à m (exclu). Si le deuxième
 * argument n'est pas passé, on va à la fin. -1 represente la dernière position, -2 l'avant-dernière...
 * slice() ne modifie pas le array initial
 * splice() : c'est une méthode générale d'insertion et de suppression des éléments dans un tableau. C'est un peu le boss
 * commun de push(), pop(), shift() et unshift(). splice() peut ajouter et supprimer en même temps. BOSS!! lol
 */ 

array17.slice(0, -2); // => [ 2, 15, 3, 7 ], array17 = [ 2, 15, 3, 7, 9, 11 ]

/** splice() 
 * modifie donc le tableau qui l'invoque contrairement à slice : genre on est presque homo mais différents. Loool
 * les éléments du tableau qui viennent après les éléments supprimés ou ajoutés voient leurs position maj conséquemment,
 * de sorte à rester contigus au reste du tableau.
 * splice(start, nbrToSplice) : coupe nbrToSplice élements du tableau à partir de start. si nbrToSplice n'est pas précisé,
 * on coupe jusqu'à la fin. Le resultat est un tableau des éléments coupés. le tableau initial est emputé de ces éléments
 * coupés.
 * les deux arguments de splice() peuvent être suivis par d'autres arguments qui seront à ajouter en commeçant à la 
 * position spécifiée par le premier argument (le premier élément inséré se retrouvera à la position spécifiée par le 
 * 1er argument)
 */ 
array17.splice(1, 2); // => [ 15, 3 ], array17 = [ 2, 7, 9, 11 ]
array17.splice(1, 0, "toto", "tata"); // => [], array17 = [ 2, 'toto', 'tata' 7, 9, 11 ]
array17.splice(4, -1, "tutu"); // => [], array17 = [ 2, 'toto', 'tata' 7, 'tutu', 9, 11 ]
array17.splice(1, 3, ["titi", "tyty"]); // ['toto', 'tata' 7], array17 = [ 2, ['titi', 'tyty'], 'tutu', 9, 11 ]

/** fill() 
 * remplit un tableau ou une sous-ensemble d'un tableau avec une valeur. Le premier argument est la valeur de
 * remplissage, le deuxième et la position de début et la dernière est la position de fin. fill() modifie le tableau 
 * initial et le renvoie
 */
let array18 = new Array(5);
array18.fill(0); // => [0, 0, 0, 0, 0], a = [0, 0, 0, 0, 0]
array18.fill(9, 1) // => [0, 9, 9, 9, 9] starting at index 1 
array18.fill(8, 2, -1) // => [0, 9, 8, 8, 9]

/** copyWithin()
 * copie une sous partie d'un tableau dans ce même tableau. elle renvoie le tableau modifié. toutefois sa taille ne change
 * pas (les valeurs sont éventuellement écrasée lors de la copie)
 * Le 1er argument est l'index à partir duquel se fera la copie. copyWithin(1), la copie se fera à partir de la pos 1
 * Le 2eme spécifie l'index du premier élément à copier; 0 si non précisié
 * Le 3eme argument spécifie la fin de la portion à copier (exclu); taille du tableau si non précisé
 * Exemple avec monArray.copyWithin(1) :
 * - élément à copier sont les éléments de 0 (2eme arg absent) à la fin du tableau (3eme arg absent) : 1, 2, 3, 4, 5
 * - Ces éléments sont à copier à partir de la premier position...sans augmenter la taille du tableau (écrasement) 
*/
let array19 = [1,2,3,4,5];
array19.copyWithin(1); // => [1,1,2,3,4]
array19.copyWithin(2, 3, 5) // => [1,1,3,4,4]: copie de 3, 4 à partir de l'index 2
array19.copyWithin(0, -2) // => [4,4,3,4,4]: negative offsets work, too

/** Recherche et tri dans un tableau
 * 
 * indexOf() et lastIndexOf recherchent une valeur dans un tableau et renvoient son index; -1 si absent.
 * indexOf commence la recherche au début du tableau quand lastIndexOf commence par la fin.
 * Ces deux méthodes utilsent l'égalité stricte ===. donc si le array contient des objets au lieu de valeurs primitives
 * il faudra utiliser la méthode find() en lui donnant un prédicat personnalisé.
 * indexOf() et lastIndexOf() admette un deuxième argument qui est la position de début de la recherche; 0 par défaut.
 * ce deuxième argument peut être -1 (dernier index)...Mais appliquées au string, la valeur négative est remplacée par 0.
 * 
 * includes(), depuis ES2016 permet de déterminer si oui ou non un élément est présent dans un tableau 
 * (sans donner sa position). Elle prend un argument unique. Elle ressemble à indexOF mais ces deux méthodes ont une 
 * différence fondamentale. Pour indexOf et lastInxexOf, NaN est différent de tout autre valeur, même de lui. Includes
 * ne considère pas le Nan différent de NaN
 */

let array20 = [1,true,3,NaN]; 
array20.includes(true); // => true
array20.includes(2);  // => false
array20.includes(NaN); // => true
array20.indexOf(NaN); // =>  -1

/** sort()
 * permet de trier un tableau (modifie donc le tableau).
 * Si appel avec auncun argument, c'est le tri alphabétique avec éventielle convertion en string pour la conparaison.
 * sort() peut prendre une fonction en argument :
 * - si le résultat de la fonction est négatif, le premier argument de la fonction est en premier. si O, alors 
 * on s'en fout que l'un soit avant l'autre. si positif, le second vient avant le premier
 */
let array21 = [33, 4, 1111, 222];
array21.sort(); // a == [1111, 222, 33, 4];
array21.sort((a, b) => a - b); // => [ 4, 33, 222, 1111 ]

/** reverse()
 * modifie et renvoie le tableau avec l'ordre de ses éléments inversés
 */

/** conversion de tableaux en string
 * Si le but est de convertir pour une utilisation future, alos prévilégier la sérialization avec JSON.stringify()
 * 
 * join() : convertit les éléments d'un tableau en string et les concatène. elle admet un argument qui est le
 * séparateur. Par défaut, il est ",". join() s'en fout des imbrications de tableaux (comme toString() aussi).
 * 
 * L'inverse de la méthode join() est la méthode split()
 * Le toString() sur les Array marche comme le join() sans argument.
 */
[1, 2, 3].join(); // => '1,2,3'
console.log([1, 2, [3, [9]]].join()); // => '1,2,3',9
"hello".split(""); // => ['h', 'e', 'l', 'l', 'o']

/** Methodes staiques de Array
 * En plus des methodes factory Array.of() et Array.from(), il y a la méthode
 * Array.isArray(monArray) : permet de tester si un objet est un tableau
 * Array.isArray([]) => true. Array.isArray({}) => false
 */

/** Array-like objets
 * Ce sont des objets qui ont les caractéristiques suivantes :
 * - il ont une propriété length qui a une valeur numérique
 * - il ont des propriétés dont les noms sont des positve number-like : 2, "2".
 * On peut leur appliquer la plupart des traitement appliquables aux arrays normaux (iteration par exemple);
 *  surtout vrai quand ces traitement ne modifient pas le tableau ou s'il ne modifie pas la taille du tableau
 * 
 * Puisque les array-like objets n'héritent pas de Array.prototype on ne peut pas directemnt appeler les méthodes
 * de array sur eux. On peut cependant le faire en utilisant la méthode Function.call
 */
let a = {"0": "a", "1": "b", "2": "c", length: 3}; // An array-like object
Array.prototype.join.call(a, "+") // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase()) // => ["A","B","C"]
Array.prototype.slice.call(a, 0) // => ["a","b","c"]: true array copy. Mais la deuxième manière qui suit est préférable
Array.from(a) // => ["a","b","c"]: easier array copy

/**
 * Note : les string sont des objets immuables. Donc quand ils sont traités comme des array, il sont read-only.
 * Les méthdoes de array qui modifie le tableau telles que push()/unshift(), pop()/shift(), sort(), reverse(), splice()...
 * ne marcheront pas avec un string. ça finira en erreur sans bruit. lol.
 */
