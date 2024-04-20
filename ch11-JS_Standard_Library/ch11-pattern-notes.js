/** Une expression régulière un un objet qyu décrit un modèle textuel. Une expression régulière peut se créer avec
 * le constructeur RegExp() mais le plus souvent, on utilise une syntaxe littéral. Cette syntaxe est définit à l'intérieur
 * de deux "/"
 */
let pattern1 = /s$/; // matche tout string qui contient un "s" à sa fin
let pattern2 = new RegExp("s$"); // c'est l'équivalent de pattern1

// Un pattern peut contenir un ou plusieurs flag.s, placé.s après le dernier "/" et pouvant affecter son comportement
let pattern3 = /s$/i // comme le pattern1 mais insensible à la casse

/** Tous les caractères alphanumériques se matchent eux-mêmes dans un pattern
 * Certains caratères ont une signification particulière, ce sont : ^ $ . * + ? = ! : | \ / ( ) [ ] { }
 */

/** Classe de caractères
 * Des caractères individuels peuvent être combinés dans une classe de caratères en les plaçant dans []
*/
let pattern4 = /[abc]/; // => match n'importe quelle lettre a, b ou c
let pattern5 = /^[abc]/; // le contraire de pattern4; matche n'importe quelle lettre autre que a, b et c
let pattern6 = /[a-z]/; // matche n'importe quelle lettre miniscule de l'alphabet latin
let pattern7 = /[a-zA-Z0-9]/; // matche n'importe quelle caractère alphanumérique. Si le match du tiret est nécessaire, le mettre à la fin

/**Puisque certaines classes de caratères sont couramment utilisées, la syntaxe des regExp inclut des caractères spéciaux
 * et des séquences d'échappement pour représenter ces classes
 * [...] : n'importe quel caratère à l'intérieur des crochets
 * [^...] : tout autre caractère qui n'est pas dans les crochets
 * . : tout caractère sauf saut de ligne. /./.test("tooo") === true mais /./.test("\n") === false
 * \w : tout caractère ASCII équivalent à [a-zA-Z0-9_]
 * \W : tout caractère qui n'est pas ASCII
 * \s : caractère d'espace Unicode
 * \S : caractère unicode qui n'est pas un espace
 * \d : n'importe quelle digit ASCII. Equivalent à [0-9]
 * \D : contraire de \d
 * [\b] : caractère supprimer
 * 
 * Les échappement spéciaux de classes de caractères peuvent s'utiliser à l'intérieur des crochets
 * 
 */
/[\s\d]/.test("t oo"); // => true

/** Répétition
 * Les caractères qui indiquent la répétition suivent toujours le motif/modèle à qui ils s'appliquent
 * {n, m} : se répète au moins n fois et au plus m fois
 * {n,} : se répète n fois ou plus
 * {n} : se répète exactement n fois
 * ? : O ou une occurence. equivalent à {0,1}
 * + : 1 ou plusieurs; équivalent à {1,}
 * * : 0 ou plusieurs occurences; équivalent à {0,}
 */

let pattern8 = /\d{2,4}/; // matche une séquence de 2 à 4 chiffres
let pattern9 = /\w{5}\d?/; // matche une séquence de 5 caractères suivis optionnellemnt d'un chiffre

/**Dans les exemples qui précèdent, le multiplicateur s'applique au caratère qu'il suit. Il est possible de
 * faire des réptitions plus compliquées en utilisant des paranthèses.
 */

/** Alternation, groupig and references
 * | : matche avec la sous-expression de gauche ou celle de droite. L'alternative est prise en compte de gauche à droite 
 *      jusqu'à trouver un match. Auquel cas celle de droite est ignorée. Ainsi a|ab revient en gros à chercher un match de a
 * (...) : groupe les items dans une seule unité de sorte à appliquer une répétition par exemple et se rappeler des caractères.
 *      Les paranthèses permettent de définir un sous-motif dans un motif. Ainsi il est possible de s'appuyer sur ce sous-motif
 *      pour extraire des portions dans un string.
 * (?...) : groupe dans une seule unité mais sans se rappeler des caratères qui matchent ce groupe. Ces sous-expressions
 *          ne produisent pas de référence (voir plus bas)
 * \n : match les mêmes caractères qui ont été matché quand le groupe n a été matché pour la première fois. (voir plus bas)
 * 
 */

/ab|bc|ef/.test("dtgyr"); // => false. matche ab ou bc ou ef
/\d{3}|[a-z]{4}/; // => matche une séquence de trois chiffres ou une séquence de quatre lettres miniscules
/bossia\s(dedy)?/.test("bossia"); // => false
/bossia\s(dedy)?/.test("bossia "); // => true
/bossia\s(dedy)?/.test("bossia dedy"); // => true

/** la plus-value des parenthèses. supposons les deux patterns suivants qui permettent de matcher
 *  une séquence d'une ou plusieurs lettres miniscules suivies d'un ou +sieurs chiffres. Si d'aventure l'on s'intéresse
 * aux digit dans chaquue match, les parenthèses dans le second pattern permettent de résoudre la question
 */ 
let pattern10 = /[a-z]+\d+/;
let pattern11 = /[a-z]+(\d)+/; // utilisation de parenthèse sur les digit du pattern en vue de leur probable extraction

/**
 * L'utilisation de parenthèses permet de se référer à un sous-motif à l'interieur d'un pattern. Le sous-motif est 
 * référencé par sa position à l'intérieur du pattern : \1 référencera le sous-motif à la position 1....
 * Etant donné que des sous-motifs peuvent s'imbriquer, c'est la position de la parenthèse ouvrante qui détermine en 
 * réalité la position d'un sous-motif.
 * Dans /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/ la sous-expression ([Ss]cript) est référencée comme \2
 * 
 * La référence à un sous-motif ne référence pas le motif en lui-même mais plutôt au texte qui matche avec ce sous-motif.
 * Exemple avec ce pattern qui match une séquence de 0 ou plusieurs caratères contenus entre deux ' ou deux "
 */
let pattern12 = /['"][^'"]*['"]/; // \1 fait référence à la classe ['"], qu'il est possible d'exploiter en utilsiant les parenthèses
let pattern13 = /(['"])[^\1]*\1/; // pattern13 et pattern12 sont équivalents
pattern12.test("'Bonjour à tous'"); // => true
pattern13.test("'Bonjour à tous'"); // => true

/** Avec ES2018, il est possible de nommer les sous-expression d'un pattern. Pour ce faire, la définition d'une sous-expression
 * se fait ainsi : (?<mon_sous_motif>[...]). Il est possible de se référer à ce sous-motif par son nom
 */
let pattern14 = /(?<s_d_quote>['"])[^"']*\k<s_d_quote>/
pattern14.test("'Bonjour à tous'"); // true. Equivalent à pattern12 et pattern13

/** Specifying match position
 * Il y a plusieurs élements d'une regExp qui match un caractère dans un string comme par exemple \s qui matche un
 * caractère d'espace. Il y a d'autres qui matchent les positions entre caractères.
 * Par exemple \b marqsue une limite entre un mot ASCII \w (i.e [a-zA-Z_]), un "non-mot ASCII" \W, et le début ou
 * la fin d'un string. \b est ce qu'on appelle un délimiteur de mots.
 * Des élements comme \b sont appelés anchor; les plus célèbres sont ^ et $ qui traduisent resp. les positions début et fin.
 * Le contraire de \b est \B
 */
/\sJava\s/.test("j'apprends Java"); // => false. Java n'est pas entouré d'un espace à gauche et à droite.
/\bJava\b/.test("j'apprends Java."); // true. Ce pattern cherche le mot Java quelque soit sa position
/\bJava\b/.test("j'apprends Javascript."); // false. le pattern recherche Java et non Javascript
/\Bscript\B/.test("Le scripting est bien"); // => false à cause de l'espace (délimiteur) avant scripting
/\Bscript\B/.test("Javascripting is fun"); // true

/** Il est possible d'utiliser une regExp arbitraire comme anchor. Pour cela il faut mettre l'epression entre
 * (?= et ). Pour faire l'inverse de cet anchor, on met l'expression entre (?! et )
*/
/[Jj]ava([Ss]cript)?(?=\:)/.test("Java"); // => false. Il n'y a pas le délimiteur : après Java
/[Jj]ava([Ss]cript)?(?=\:)/.test("Java: The definitive guide"); // => true. matche Java qui est placé avant les :
/[Jj]ava(?![Ss]cript)/.test("JavaScript: The definitive guide"); // => false. Java ne doit pas être délimité par script
/[Jj]ava(?![Ss]cript)/.test("Java: The definitive guide"); // => true

/** Petit résumé des anchors
 * ^ matche le début du string or avec le flag m, le début de la ligne
 * $ matche la fin de la ligne ou avec le flag m la fin de la ligne
 * \b matche un délimiteur de mot. Attention [\b] matche le backspace
 * \B matche une position qui n'est pas un délimiteur de mot
 * (?=p) expression d'anchor positive de type lookahead i.e se place après la chaine de caractère à matcher
 * (?!p) expression d'anchor négative de type lookahead
 * 
 * (?<=p) expression d'anchor positive de type lookbehind i.e se place avant la chaine de caractère à matcher
 * (?<!p) expression d'anchor négative de type lookbehind
 */
/^[Jj]ava/.test("\nJava est génial"); // => false. Il y a une ligne avant Java
/^[Jj]ava/m.test("\nJava est génial"); // => true. Le flag m annule le saut de ligne.

// match AB 12345 et non pas AB toto 12345
/(?<=Mr\.)\s\w+/.test("Mr. Smith"); // true matche Smith qui est placé apres l'anchor "Mr. "
/(?<=[A-B]{2}\s\d{5})/.test("AB 12345"); // true. Matche 12345 qui suivent "AB " 

/** Les flags modifie le comportement des regExp. Ils sont représentés par des lettres placées après le second / dans
 * l'epression littérale de la regExp ou comme second argument dans le constructeur. Il y en a 6 en tout qui sont :
 * g : global permet de trouver tous les match d'une regExp dans un texte et pas seulement le premier
 * i : case-insensitive
 * m : pour le mode multiligne. La regExp era utilisée sur un texte multilignes. les anchor ^ et $ matheront alors le début
 *      et la fin du texte en lui-même mais également le début et la fin des lignes qui le composent.
 * s : s'utlise comme le m en mode multilignes. Avec ce flag, le caractère . dans une regExp matche tout caractère y compris
 *      le caractère de fin de ligne (. ne matche pas le caratère de fin de ligne autrement).
 * u : pour Unicode. permet de matcher en plus des caractères codés sur 16 bits, les caractères codés sur 32 bits (emojis 
 *      et caractères chinois par exemple). Sans ce flag, le . dans une regExp matche que des 16 bits values. L'usage du flag
 *      permet aussi d'utiliser les séquences \u{...} pour les caractères Unicode et \p{...} pour les classes de caractères Unicode
 * y : indique que la regExp est "sticky" (collant) et donc doit matcher au debut d'un string ou au premier caractère qui suit le 
 *      précédent match.
*/

/** String methods for pattern matching
 * Il y a quatre methodes de String qui supportent les regExp :
 * - search() : retourne la position du caractère de début du premier match ou -1. Si l'argument passé n'est une regExp, il
 *              converti en utilisant le constructeur. Search() est inopérant avec le flag g
 */

"Hello World".search(/\w{2}\s\w{2}/); // => 3. Position du premier match : "lo Wo"

/** Replace()
 * remplace la première occurence d'un match, les remplace toutes avec le flag g. Le remplacement se fait par 
 * itération, match après match
 */
/* Pour rappel dans une regExp, l'usage des paranthèses permet de mémoriser le text qui matche le sous motif.
Dans replace, ce texte qui matche un sous-groupe est référencé par $ suivi du numéro du sous-groupe. Il peut être utilisé 
dans le deuxième argument de replace */
let quote = /"([^"]*)"/g; // ici le sous-groupe dans cette regExp est une séquence qui matche [^"]* 
                            // i.e tout texte compris entre deux "
let text = 'Il a dit "stop" et "continue"';
text.match(quote); // => "stop", "continue" avec comme sous-groupe stop et "continue" avec comme sous-groupe continue
let textMaj = text.replace(quote, "«$1»"); // revient à remplacer tout ce qui matche la regExp par « suivi du contenu du 
                                            // texte qui matche la sous-expression 1 de la regExp
textMaj; // Il a dit «stop» et «continue»

// si la regExp utilise des nommage de sous-groupe, ces noms peuvent être utiliser dans replace
let quote2 = /"(?<quotedText>[^"]*)"/g;
text.replace(quote2, '«$<quotedText>»'); // => // Il a dit «stop» et «continue»

/* replace() peut prendre comme deuxième argument une fonction qui calcule la valeur de remplacement.
Le premier argument est le texte qui matche la RegExp, ensuite viennent (optionnel) les sous-string qui matchent les sous-expressions
, ensuite vient la position du match à l'intérieur du string. elle est suvi du string initial et enfin d'un objet
dont les noms des propriétés sont les noms des sous-expressions et leurs valeurs, les textes qui matche ces sous-expressions */

// L'exemple précédent donnerait 
function replaceQuote(match, groupeValue) {
    return `«${groupeValue}»`;
}
text.replace(quote, replaceQuote); // => Il a dit «stop» et «continue»
text.replace(quote, (match, groupeValue) => `«${groupeValue}»`); // => même chose avec une fonction fléchée

const str = `Le prix est de 123 euros. Taux=1.5 dollar.
Le prix est de 240 livres. Taux=2.5 euros`;
const priceExp = /(?<price>\d+)\s(?<currency1>\w+)\. Taux=(?<rate>\d+\.\d+) (?<currency2>\w+)$/;
const priceExp2 = /(\d+)\s(\w+)\. Taux=(\d+\.\d+) (\w+)$/;
// console.log(str.match(priceExp2));
function convertPrice(match, groupeValue1, groupeValue2, groupeValue3, groupeValue4, matchIndex, inputString, groups) {
    let convertedPrice = groups.price * groups.rate;
    let convertedRate = 1 / groups.rate;
    return `${convertedPrice} ${groups.currency2}. Taux=${convertedRate} ${groups.currency1}`;
}

str.replace(priceExp, convertPrice); // => Le prix est de 184.5 dollar. Taux=0.6666666666666666 euros
                                                  //    Le prix est de 600 euros. Taux=0.4 livres      

/** Match()
 * match() attend un seul qui est une regexp (ou cet argument est converti en regexp en utilsiant le constructeur RegExp())
 * match() renvoi le resultat du matching dans un tableau dont les valeurs sont les paramètres de la fonction de remplacement
 * décrite ci-dessus.
 * Si la regExp contient un flag g, alors match() renvoie simplement un tableau qui contient les valeurs qui matchent.
 * Si pas de matching, match() renvoie null
 * 
 * Note : exécuter la méthode match() avec un regExp non global revient à exécuter la méthode exec() de ce regExp en 
 * lui passant le texte
 */

let texte = " 123 eur et 120 cent";
let priceExp3 = /\d+/g;
texte.match(/\d+/); // renvoie le premier match sous la forme => [ '123', index: 1, input: ' 123 eur et 120 cent', groups: undefined ]
texte.match(priceExp3); // => ['123', '120']

/* Une regExp flaggé y (sticky ou collant) indique que le matching doit commencer en début de texte. Quand il est utilisé
avec g, il renvoie tous les match qui se suivent*/
let priceExp4 = /\d+\s/yg;
let texte2 = "12 123 euros 23";
(" " + texte2).match(priceExp4); // => null à cause du y : le début du texte ne matche pas la regExp
texte2.match(priceExp4); // => ['12 ', '123 ']. à cause du y le match s'arrête à '123 ' car ce qui suit (euros) ne matche pas

// quand le flag y est défini dans le flag g, son la lise à jour de sa propriété lastIndex. matchAll s'en gaba de lastIndex. lol
let priceExp5 = /\d+/y;
priceExp5.lastIndex = 14;
(" " + texte2).match(priceExp5); //=> [ '23', index: 14, input: ' 12 123 euros 23', groups: undefined ]
priceExp5.lastIndex = 0;
priceExp5.exec(texte2); // => [ '12', index: 0, input: '12 123 euros 23', groups: undefined ]

/** MatchAll() introduit dans ES2020. 
 * Elle attend une regExp global (flag g) et renvoie un iterateur de tous les matchs
 */
const pattern15 = /\b\p{Alphabetic}+\b/gu; // utilisation de la classe de caractère unicode \p{...} permise par le flag u
const texte3 = "Faire un test pour looper sur tous les mots";
for (let match of texte3.matchAll(pattern15)) {
   // console.log(`${match[0]} => position ${match.index}`);
}

/** Split()
 * permet de séparer un texte suivant un pattern.
 * Curieusement, quand split est appelée avec une regExp qui contient des groupes ou des anchors, le texte qui match
 * la sous expression figure dans le résultat de split()
 */
const pattern16 = /\s*,\s*/;
const texte4 = "1, 2, \n4, 8";
texte4.split(pattern16); // => [ '1', '2', '4', '8' ]

const pattern17 = /\b(\d+)\W\s\b/;
const texte5 = "123$ dollar 60£ livres";
texte5.split(pattern17); // => [ '', '123', 'dollar ', '60', 'livres' ]
                            // il était logique d'espérer comme résultat [ '', 'dollar ', 'livres' ] 
                            // mais le split met les parties du texte qui matchent les sous-expressions. Attention !!


/** La classe RegExp()
 * Le constructeur prend en deux argument : le corps de la regExp (ce qui se place entre les deux / dans l'expression littérale)
 * et optionnellement les flags. g,i,m,s,u,y ou une combinaison de ces flags.
 * 
 * Le constructeur est utile quand il est besoin de créer dynamiquement une regExp. Par exemple pour chercher dans un texte
 * un string entrée par l'utilisateur.
 * 
 * Les objets RegExp ont des propriétés read-only qui ont des valeurs boolean font référence aux flags, sauf source et flags :
 * source : le corps de la regExp : le contenu à l'intérieur des deux /
 * flags : renvoie les flags de la regExp
 * global : boolean qui fait référence au tag g
 * ignoreCase : boolean qui fait référence au tag i
 * multiligne : boolean qui fait référence au tag m
 * dotAll : boolean qui fait référence au tag s
 * unidoce : boolean qui fait référence au tag u
 * sticky : boolean qui fait référence au tag y
 * 
 * Il y a auss la propriété lastIndex en read-write. pour les regExp avec y ou g, elle indique le début de la recherche de match.
 * 
*/      
let pattern18 = new RegExp("\\d{5}", "g"); // regExp pour matcher tous les nombre de cinq chiffres
"12 12345 76 56789".match(pattern18); // => [ '12345', '56789' ] 

let pattern19 = /Java/i;
let pattern20 = new RegExp(pattern19, "gi"); // => /Java/g. le flag g ne s'ajoute pas au précédent
pattern20.flags; // => gi

/** Les objets regExp ont deux méthodes :
 * - test() prend en paramètre un texte et renvoie true si celui-ci matche la regExp. Il s'appuie sur la méthode exec()
 * - exec() prend en paramètre un texte et se comporte presque comme match() de String à une différence. avec ou sans flag
 * g ou y, exec() renvoie le même tableau contenant (match, ...groupeValue, index, inputText, groups) car elle renvoie toujours
 * le prochain match se trouvant à partir de lastIndex
 */

const texte6 = "Java > JavaScript et vlan !";
const pattern21 = /JavaScript|Java/g;
pattern21.exec(texte6); // => [ 'Java', index: 0, input: 'Java > JavaScript', groups: undefined ]
pattern21.lastIndex; // => 4
pattern21.exec(texte6); // => [ 'JavaScript', index: 7, input: 'Java > JavaScript', groups: undefined ]
pattern21.lastIndex; // => 17
pattern21.exec(texte6); // => null. Il n'y a plus de match à partir de la position 17
pattern21.lastIndex; // => 0. réinitialisation de lastIndex)

/** Attention à la réutilisation de lastIndex 
 * let match, positions = [];
    while((match = /<p>/g.exec(html)) !== null) { // POSSIBLE INFINITE LOOP si html contient au moins une balise <p>
        positions.push(match.index);
    }
    Dans le code précédent, à chaque itération, une nouvelle regExp est créée avec son lastIndex à O...d'où le risque de
    boucle infinie. Solution = définir la regExp une seule fois à l'extérieur de la boucle.

    let dictionary = [ "apple", "book", "coffee" ]; let doubleLetterWords = [];
    let doubleLetter = /(\w)\1/g;
    for(let word of dictionary) {
        if (doubleLetter.test(word)) {
            doubleLetterWords.push(word);
        }
    }
    doubleLetterWords // => ["apple", "coffee"]: "book" is missing!

    Dans l'exemple qui précède, book n'apparait pas car le lastIndex est setté à 3 après le match de pp dans apple.
    La recherche commence à partir de la position 3 dans book. or le match dans ce mot est à la position 1. puisque pas de
    match le lastIndex est remis à 0 pour la recherche suivante.
    Solution : enlever le flag g ou définir le pattern à l'intérieur de la boucle.
*/
