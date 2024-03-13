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
console.log(/(?<=Mr\.)\s\w+/.test("Mr. Smith")); // true matche Smith qui est placé apres l'anchor "Mr. "
console.log(/(?<=[A-B]{2}\s\d{5})/.test("AB 12345")); // true. Matche 12345 qui suivent "AB " 
