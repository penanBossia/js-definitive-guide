/**Fondamentalement, la prog asynchrone en JS se fait avec deqs callBacks. Un callback est une
 * fonction qui est passée à une autre fonction. Cette derière invoque le callback quand certaines
 * conditions sont réunies ou quand des événements (asynchrones) se produisent.
 * 
 * Il est peu usuel qu'une fonction qui fait des appels asynchrones ne retourne des résultats 
 * de manière synchrone. Dans ces cas il est courant que ces fonctions prennent comme argument
 * un callback, lequel sera associé à un état de l'appel asyncrhone.
 */

const fs = require("fs");
let options = {};

fs.readFile("test-read.config", (err, text) => {
    if(err) {
        console.error("Error reading file", err);
    } else {
        Object.assign(options, JSON.parse(text));
    }
    console.log(options.path)
});

/** Un promise est un objet qui représente le résultat d'un traitement asynchrone. Ce résultat
 * peut être ou ne pas être dispo (aucun moyen de savoir). Il n'est possible que d'appeler un 
 * callback quand la valeur est dispo.
 * 
 * On peut voir la methode then() d'un promise comme la méthode addEventListener() utilsiée
 * pour enregistrer un callback.
 * 
 */

/** fulfilled, resolved et rejected
 * Quand un callback c est passé à la méthode then(), celle-ci retourne une Promise p et s'arrange 
 * pour invoquer c de manière asynchrone plus tard. c exécute des traitements et renvoie
 * une valuer v. L'on dira que p est resolved avec la valeur v.
 * Quand une promise p est resolved avec une valeur v qui n'est pas elle-même une promise, alors 
 * cette promise p est immédiatement fulfilled avec cette valeur v.
 * Ainsi if c retourne une non-promise v, v est la valeur de p et p est fulfilled avec v.
 * Mais si v est elle-même une promise, l'on dira que p est resolved avec v mais pas encore
 * fulfilled.
 * resolved = la promise est associée ou "veroullée sur" une autre promsesse. Nous ne savons pas
 * quand la promise sera fulfilled ou rejected mais le callback n'a plus de contrôle sur p
 * 
 * fulfilled = promesse tenue
 * rejected = promesse frejetée
 * settles = fulfilled or rejected
 * resolved = fulfilled with another promsie
 */

/** Dans une chaine de promise, la valeur return ou thrown à une étape devient l'input
 * à l'étape suivante. Ne pas oublier le return. Cet oubli arrive souvent avec les fonctions
 * fléchées. Dans cette syntaxe, mettre le corps de la fonction entre deux "{" "}" supprime 
 * le return automatique qui se fait quand il n'y a pas les "{" "}"
 */

/** Proimises in parallel
 * Promise.all() : prend un array de promises et retourne une promise. La promise retournée 
 *               est rejected quand une promise en input est rejected. Dans le cas contraire
 *               elle est fulfilled avec une array des fulfillement de chaque primise input.
 * 
 *               Si l'un des input n'est pas une promise, elle est traitée comme étant une valeur
 *               d'une promesse déjà fulfilled et est simplement copiée dans le array resultat.
 * 
 * Promise.allSettled : prend un array de promise et renvoie une promise comme Promise.all().
 *                      Ne reject la promise renvoyée et ne la fulfilled pas tant que toutes les
 *                      promises input ne sont pas settled.
 *                      Cette promise se resolved par un array d'ojets dont chacun a une propriété 
 *                      status (fulfilled ou rejected) 
 *                      Et en cas de fulfilled, une propriété value qui donne la valeur
 *                      du fulfillement.
 *                      En cas de rejected, une propriété reason qui donne l'erreur
 * */

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(
    result => {
        result[0]; // => { status: 'fulfilled', value: 1 }
        result[1]; // => { status: 'rejected', reason: 2 }
        result[2]; // => { status: 'fulfilled', value: 3 }
    }
)

/** Les erreurs avec les promises
 * En réalité, la méthode then() d'une Promise prend deuc fonctions en arguments.
 * La première est celle qui est exécutée quand tout se passe bien, et la seconde est celle exécutée
 * en cas d'erreur.
 * Comme il peut être contraignant d'utiliser la syntaxe de then avec les deux arguments, il est 
 * préférable d'utiliser le catch() à la suite du then. Ce catch prend en entrée l'erreur
 * et exécute un traitement.
 * Dans une chaine de then() l'erreur est propagée jusqu'au premier catch() de la chaine.
 * Un then() peut se trouver à la suite d'un catch() si le traitement de celui-ci renvoie une Promise.
 */

/** Contructeur Promise()
 * Pour créer une promise from scratch(), il y a le constructeur Promise().
 * Celui-ci prend comme unique argument une fonction. Cette fonction a deux paramètres qui sont eux-mêmes
 * des fonctions et qui sont nommées par convention resolve et reject.
 * Le constructeur appelle de manière synchrone la fonction à lui passée et retourne une promise
 * qui dépend de cette fonction. voir l'exemple de la fonction wait.
 */


/** Expressions await
 * await p => retourne le fulfillement value de p ou la rejected value de p.
 * De manière usuelle await est utilisée devant une fonction qui renvoie une promise
 */
let response = await fetch("localhost:8080");
let profile = await response.json();
// les deux instructions ci dessus reste asynchronesf
// await ne peut être utilsé qu'a l'intérieur de fonction asynchrone 

async function getScor() {
    let response = await fetch("localhost:8080");
    let profile = await response.json();
    return profile.score;
}