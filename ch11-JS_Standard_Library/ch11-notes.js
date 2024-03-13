/** Sets et Maps
 * En JS, un type objet est une structure de données qui parmet de mapper des strings à des valeurs arbitraires.
 * Quand ces strings sont mappées avec des valeurs fixes comme true, ce objet est un set de strings.
 */

/** La class Set
 * Un set est une collection de valeurs comme les arrays. Contrirement a array, les valeur de set ne sont pas indexées
 * et set n'admet pas de duplication.
 * Le constructeur Set() admet comme paramètre tout objet iterable.
 * la propriété size de set indique le nombre d'éléments
 * add(), delete() et clear() permettent respectivement d'ajouter, supprimer et vider un set.
 * 
 * La méthode add prend un seul argument. pour plusieurs ajouts : mon-set.add(elt1).add(elt2)...
 */
let set1 =  new Set();
let set2 = new Set([1, set1]); // un set contenant deux éléments
let set3 = new Set(set2); // copie de set2
let set4 = new Set("Chipolo"); // set de 6 éléments = "C", "h", "i" "p", "o", "l" 
set4.size // => 5
set4.add([1, 2, 4]); // ajoute le tableau comme le 6eme élément du set et renvoie le set4
set4.delete([1, 2, 4]); // => false ce n'est pas le même objet qui a été ajouté
set3.clear(); // set4 est vidé et devient undefined
set5 = new Set([3, 6, 9, 12])

/** Dans la pratique l'utilisation de Set est pour le test d'appartenance de valeurs, pas pour l'ajout/suppression
 * Indendamment du nombre d'éléments du set, la methide has() sera très rapide comparativement à la méthode includes()
 * de array.
 * Set est enumérable, donc on peut l'utiliser dans une boucle for/of, le convertir en tableau et en liste d'arguments.
 * Set est présenté à tord comme une collection non ordonnée. Or il garde l'ordre d'insertion des éléments (modulo suppression)
 * même s'il n'est pas possible de lui demander l'élément à une position donnée.
 * Set implémente la méthode forEach() mais sans possibilité de passer le deuxième argument qui est l'indexe
*/
set4.has(1); // => true
[...set5].reduce((x, y) => x + y); // => sumSet5 = 30
Math.max(...set5); // => 12

/** La classe Map
 * Une Map représente un set de valeurs appelées clés, où chasue clé a une autre valeur associée.
 * D'une certaine manière Map est comme un array, mais au lieu d'utiliser une séquence d'entier comme clé, map permet
 * d'utiliser n'importe quelle valeur comme indexe. Comme array, map est rapide. Chercher une valeur associée à une clé
 * sera rapide indépendament de la taille de map
 * L'argument optionnel du constructeur Map() doit être un objet iterable qui renvoie un tableau de deux éléments [key, value]
 * En pratique, l'initialisation d'un map à sa création revient à passer en argument un tableau de tableau - deux éléments
 * 
 */
let map1 = new Map();
let map2 = new Map([["one", 1], ["two", 2]]); // { 'one' => 1, 'two' => 2 }
let map3 = new Map(map2); // copie de map2
let obj1 = {"x": 1, "y": 2};
let map4 = new Map(Object.entries(obj1)); //  { 'x' => 1, 'y' => 2 }

/** Une fois la map créée, les methodes :
 * - get(key) : pour récupérer la valeur associée à key
 * - set(key, valeur) : pour ajouter (ou mettre à jour) un couple key/valeur. cette methode peut être chainée comme add de Set
 * - comme set, map a les méthodes has(), delete() et clear()
 */
map4.get("x"); // => 1
map4.set("a", 0); // { 'x' => 1, 'y' => 2, 'a' => 0 }
map4.size // 3
map4.has("y"); // => true

/**
 * Map est un objet iterable dont chaque iteration renvoie un tableau de deux éléments. L'utilisation du spread operateur 
 * enverra un tableau de tableau. Il est idiomatique d'utiliser la destructuration quand on utilise une boucle for/of
 * sur une map. 
 * map.keys() et map.values() renvoient des objets iterables contenant repect. les clés et les valeurs dans leur ordre d'insertion
 * Map peut être itéré en utilisant une boucle forEach : map.forEach((value, key) => {...});
 *
 */
[...map4] // => [["x", 1], ["y", 2], ["a", 0]]
for(let [key, value] of map4) {/* empty loop */}

/** WeakMap et WeakSet
 * WeakMap est une variante de Map qui n'empêche pas les valeurs des clés d'être garbage-collectée si l'interpreteur
 * a besoin de mémoire. Le constructeur WeakMap() fonctionne comme le constructeur Map()
 * Une map classique maintient une référence forte sur les valeurs de ses clés et reste accessibles via la map.
 * - Les clés d'une WeakMap doivent être des objets ou des array. Les valeurs primitives n'étant pas sujets au garbage-collector.
 * - Les WeakMap n'implémentent que les méthodes get(), set(), has(), delete() et la propriété size
 * - Les WeakMap ne sont pas itérables et ne définissent pas les méthodes keys(), values() ou forEach()
 * 
 * La raison d'être des WeakMap est de pouvoir associer des valeurs à des objets sans pour autant causer de fuite mémoire.
 * Supposons par exemple que nous écrivons une fonction qui prend un objet en paramètre et a besoin de faire de long calculs
 * pour cet objet. S'il est besoin de réutiliser la valeur de ce calcul pour plus tard, il peut être intéressant de "cacher"
 * cette valeur dans une WeakMap. La même chose peut être obtenue en "cachant" la valeur calculée directement dan une propriété
 * Symbol dans l'objet lui-même.
 * 
 * WeakSet impélmente une collecion d'objets qui ne sont pas immunisés contre le garbage-collector. Le constructeur WeakSet()
 * fonctionne comme le constructeur Set(). Mais :
 * - WeakSet n'adment pas de valeurs primitives comme membres
 * - WeakSet n'impélente que les méthodes add(), has(), delete et n'est pas itérable.
 * - WeakSet n'a pas la propriété size
 * 
 * Un cas d'utilisation de WeakSet de de vouloir marquer des objets ayant une particularité. Auquel cas tous les objets d'un 
 * certain type seront mis dans un même WeakSet
 */

/** Typed Arrays et Binary Data
 * Les arrays ordinaires JS peuvent contenir tous type d'objets à la fois, grossir et diminuer dynamiquement.
 * Les implémentations de JS réalisent des optimisations qui rendent ces arrays rapides. Neanmoins, ces arrays sont assez
 * différents de ceux dans d'autres langages tels que C ou Java. Les Typed arrays, qui ont été introduits dans ES6 se 
 * rapprochent des tableaux en C ou Java. Techniquement ce ne sont pas des arrays car Array.isArray(typed-array) envoie 
 * false mais ils implément toutes les méthodes des arrays en plus de quelques unes qui leur sont propres.
 * Les Typed Arrays se distinguent des arrays ordinaires car :
 * - Les élements d'un Typed Array sont tous des nombres : signés ou pas; avec une taille préciser pour chaque nombre (8 à 64 bits)
 * - La taille du Typed Array doit être précisée à la création et ne pourra plus changer
 * - Les éléments sont initialisés à 0 à la création
 * 
 * JS ne définit pas une nouvelle classe TypedArray. Il y a 11 typed arrays avec pour chacun un constructeur : Int8Array(),
 * Uint8Array(), Uint8ClampedArray(), Int[16, 32]Array(), Uint[16, 32]Array(), Big[I, Ui]nt64Array(), Float[32, 64]Array()
 * 
 * Chacun de ces types à une propriété BYTES_PER_ELEMENT qui vaut 1, 2, 3, 4 ou 8
 */

let int8Array = new Int8Array(2);
let uInt8Array = new Uint8Array(2);
uInt8Array[0] = -1, uInt8Array[1] = 259;// uInt8Array[0] vaut [ 255, 3 ] : (-1 + 256) et (259 - 256)
int8Array[0] = -257, int8Array[1] = 257; // int8Array vaut [ -1, 1 ] : -257 + 256, 257 - 256
/* C'est pour éviter les conversions avec int8Array et uInt8Array qu'a été introduit Uint8ClampedArray, fort utile
pour la manipulation des couleurs en pixels (valeurs de 0 à 255)*/
let uInt8ClampedArray = new Uint8ClampedArray(2);
uInt8ClampedArray[0] = -1, uInt8ClampedArray[1] = 260; // uInt8ClampedArray vaut [0, 255]
int8Array.BYTES_PER_ELEMENT; // => 1

/**
 * Le moyen le plus simple de créer des Typed array est d'utiliser u constructeur avec la taille souhaitée. Mais chacun
 * de ces types a les méthodes from() et of() comme Array.from() et Array.of()
 */
let int8Array2 = [...int8Array];
let uInt8Array2 = Uint8Array.from(uInt8Array, (x => x + 10));
let colorArray = Uint8ClampedArray.of(200, 212, 124, 0);
let colorArray2 = new Uint8ClampedArray(colorArray);

/** Il est possible de créer des typed array à partir d'un arrayBuffer - référene opaque à un bout de mémoire.
 * En soit le arrayBuffer ne permet pas de lire ou d'écrire dans un byte que qu'il alloue. Mais il est possible d'utiliser
 * un typed array pour cela en passant au constructeur de ce dernier le arrayBuffer comme 1er argument. Les 2eme
 * et 3eme arguments sont optionnels et son le offset à l'intéreiur du buffer et le nombre d'éléments du typed array.
 * L'offset doit être un multiple de la propriété BYTES_PER_ELEMENT du typedArray
*/
let buffer = new ArrayBuffer(1024*1024); // buffer de taille 1024*1024 bytes (1Mo)
let bufferAsBytes = new Int8Array(buffer); // tout le buffer est converti en tableau de bytes
let bufferAsInts = new Int32Array(buffer); // tout le buffer est converti en tableau de int signés
let lastBufferKiloAsBytes = new Int8Array(buffer, 1023*1025); // le dernier kiloBytes du buffer est utilisé comme tableau de bytes (1024 elts)
let secondBytesAsInts = new Int32Array(buffer, 1024, 256); // 256 entiers de 32 ytes sont placés à partir du deuxième kilobytes

/** Methodes et propriétés de typedArray
 * - set(array|typedArray, ?offset) : copie le 1er à partir de l'offset. offset est 0 par défaut - non précisé
 * - subarray(index_start, index_end) : elle renvoie une sous-vue du buffer sur lequel s'appuie le TypedArray. En cela cette
 * methode est différente de slice() car cette dernière renvoie un tableau indépendant du typedArray d'origine
 */
let uInt8Array3 = new Uint8Array(1024);
let pattern = new Uint8Array([0, 1, 2, 3])
uInt8Array3.set(pattern) // copie du pattern à la position 0 de uInt8Array
uInt8Array3.set(pattern, 4) // copie du pattern à la position 4 de uInt8Array
uInt8Array3.slice(0, 8); // => [0, 1, 2, 3, 0, 1, 2, 3]
let uInt8Array2To4 = uInt8Array3.subarray(2, 4); // => [ 2, 3 ]
uInt8Array2To4.byteOffset; // 2
uInt8Array2To4.byteLength; // 2. La taille du sous-tableau en bytes

/** Les arrayBuffer sont des bouts de mémoire accessibles via des typedArray. Il est possible d'utiliser les index
 * avec les arrayBuffer comme pour tout objet JS, donnant ainsi acces au bytes de cet arrayBuffer. Mais prudence !
 */
let uint8Array4 = new Uint8Array(8);
uint8Array4[0] = 1; // je maj le premier elt de mon tableau
uint8Array4.buffer[0] // udefined car buffer n'a pas d'index 0
uint8Array4.buffer[1] = 200 // tentative icorrecte de maj de l'index 1 du typedArray
uint8Array4.buffer[1] // => renvoie 200 comme si précédemment la propriété d'un objet JS avait été modifiée
uint8Array4[1] // => 0, la maj précédente n'a pas affectée le tableau


/** DataView et Endianness 
 * L'Endianness définit l'ordre dans lequel les bytes sont arrangés dans les mots (nombres) longs. Pour des questions
 * d'efficacité, les typedArray utilisent l'endianness de l'OS sous-jacent :
 * - little-endian : le byte le moins important sera à l'adresse la plus basse. 1234 sera rangé comme 4321, 0001 => 1000
 * - big-endian : le byte le plus important sera rangé à l'adresse la plus basse.
 * 
 * Aujourd'hui la plupart des architecture CPU sont en little-endian
*/
// trouver l'endianness de l'OS
console.log(new Int32Array([1]).buffer);
let littleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1 // true

/** En général, il est possible d'utiliser des [Ui, I]nt8Array pour lire des données extérieurs comme tableau de bytes.
 * Mais il n'est possible de le faire avec les autres typedArray car nous ne savons pas l'endianness du système qui envoie
 * la data. Il faut plutôt utiliser la class DataView qui permet de spécfifier l'endianness lors de la lecture.
 * - Cette classe a 10 méthode get associée au typedArray(sauf pour UintClampedArray) : getInt8(), getInt16(), ... qui prenent 
 * en paramètre l'offset de début de la valeur à retourner. En option (sauf avec getInt8()), un deuxième paramètre boolean
 * qui dit si big-endian (false) ou little-endian (true). false par défaut
 * - aux methodes get sont associées des set (setInt8(), setInt16...) qui permettent de modifier la valeur se trouvant à
 * un offset donné. Ld 1er param est l'offset, le deuxième est la valeur et le dernier le boolean qui indique l'endianness
*/

let int32Array = new Int32Array(3);
int32Array[0] = 1, int32Array[1] = 2, int32Array[2] = 3;
let dataView = new DataView(int32Array.buffer); // en option il est possible de préciser l'offset et la taille
let firstInt = dataView.getInt32(0);
dataView.setInt32(1, 20, true);



