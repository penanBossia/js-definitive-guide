// Remarque : l'heure locale du PC semble être de l'UTC

new Date(); // => 1970-01-01T00:00:01.000Z : renvoie la date courante UTC
new Date(1000); // renvoie la date en UTC 1000 ms après le 01/01/1970
/*A partir de deux arguments, le premier représente les années, le 2nd le mois (commence à 0), le 3rd le jour....jusqu'au milliseconds.
La date ainsi construite est en local. Par defaut le 3rd (jour) vaut 1 et les autres 0
 */
new Date(2024, 0); // => le 1er janvier 2024 minuit 2023-12-31T23:00:00.000 en UTC (heure d'hiver)

// si d'emblée il est envisagé de créer la date en UTC, il faut utiliser la méthode static Date.UTC dans le constructeur
new Date(Date.UTC(2024, 0)); // => 2024-01-01T00:00:00.000Z
// les methodes toUTCString() et toISOString permettent de forcer l'affichage en UTC

/* la méthode constructeur Date() peut prendre en argument un string qu'elle essaiera de parser comme une datetime.
Tout string au format renvoyé par les méthode toString(), toISOString(), toUTCString() sont valides*/
new Date("2023-12-31T23:00:00.000"); // => 2023-12-31T22:00:00.000Z
new Date("Fri, 15 Mar 2024 09:44:05 GMT"); // => 2024-03-15T09:44:05.000Z
new Date("2024-01-01T00:00:00.000Z"); // => 2024-03-15T09:44:05.000Z
new Date("Fri Mar 15 2024 10:42:17 GMT+0100 (heure normale d’Europe centrale)"); // => 2024-03-15T09:42:17.000Z
new Date("Fri Mar 15 2024 10:42:17 GMT+0100"); // => 2024-03-15T09:42:17.000Z

/** Getters et setter sur un objet Date
 * Les accesseurs ont deux formes : ceux qui s'appuie sur l'heure locale et ceux qui s'appuient sur l"heure UTC. 
 * [get|set][UTC][FullYear|Month|Date|Hours|Minutes|Seconds|Milliseconds].
 * La méthode set[UTC]FullYear() permet de modifier simultanément le mois et le jour-du-mois; set[UTC]Hours() permet
 * de modifier simultanément les minutes, les secondes et les millisecondes
 * 
 * Les méthodes get[UTC]Day() retournent le jour de la semaine : 0 pour dimanche jusqu'à 6 pour samedi
 *
 */
const midnight = new Date("Fri Mar 15 2024 00:00:00 GMT+0100"); // 2024-03-14T23:00:00.000Z
midnight.getDate(); // => 15
midnight.getUTCDate(); // => 14
midnight.setFullYear(2025, 4, midnight.getDate() + 1); // => 1747346400000 la date en timestamp
midnight.toString(); // Fri May 16 2025 00:00:00 GMT+0200 (heure d’été d’Europe centrale)
midnight.getDay() // => 5. nous sommes donc un vendredi jour de prière. lol

/** Timestamps
 * Les date sont représentées en intrerne sous forme de millsecondes avant ou après le 01/10/1970 UTC. La représentation des
 * nombres rend possible le stockage des millesonds correspondant à l'an 270.000.
 * 
 * Les methodes get[set]Time() permettent de manipuler ce timestamp.
 * La méthodse static Date.now() renvoie la date courante en millesecondes
*/
new Date(Date.now()); // => 1710500180236 : le temps en timestamp (au moment du test)
midnight.getTime(); // => 1747346400000

/** Oprération arithmétique avec Date
 * Les opérations arithétiques (comparaison, soustractions) sont possible avec les objets Date car il implémentent
 * la méthode valueOf qui renvoie le timestamp. 
 * Attention à l'opération d'addition (elle est perverse lol) elle concatène les objets
 */
midnight.valueOf(); // => 1747346400000; Fri May 16 2025 00:00:00 GMT+0200 (heure d’été d’Europe centrale)
const date = new Date("2023-12-31T23:00:00.000");
const datesSum = midnight - date;
new Date(datesSum); // 1971-05-17T00:00:00.000Z

/** Les méthodes setMonth(), setDay()...sont intelligentes. Par exemple, quand le résultat une opération sur un mois dépasse
 * 11 (décembre), l'année est incrémentée en conséquence. Idem pour les jours...
*/

/** Formattage et parsing des date */
const date2 = new Date("Fri Mar 15 2024 00:00:00 GMT+0100");
date2.toString(); // => // Fri Mar 15 2024 00:00:00 GMT+0100 (heure normale d’Europe centrale). S'appuie sur le 
                            // timeZone local mais n'adpate pas l'affichage à l'utilisateur local
date2.toUTCString(); // => Thu, 14 Mar 2024 23:00:00 GMT. Affiche la date en UTC sans l'adapter à l'utilsiateur local
date2.toISOString(); // => 2024-03-14T23:00:00.000Z.  affichage en UTC et au format ISO
date2.toLocaleString(); // => 15/03/2024 00:00:00. S'appuie du le timezone local pour afficher la 
                            // date appropriée à l'utilisateur
date2.toDateString(); // => Fri Mar 15 2024. Affiche comme toString() mais sans l'heure
date2.toLocaleDateString(); // => 15/03/2024. Affiche comme toLocaleString() mais sans l'heure
                            // date appropriée à l'utilisateur
date2.toTimeString(); // => 00:00:00 GMT+0100 (heure normale d’Europe centrale). Affiche comme toString() 
                            // mais sans la date
date2.toLocaleTimeString(); // => 00:00:00. Affiche comme toLocaleString() mais sans la date

/* En plus de ces méthodes de conversion des dates en string, la méthode statique Date.parse() permet de 
convertir un strign en Date. Tout string valide pour le constructeur est valide pour cette méthode */