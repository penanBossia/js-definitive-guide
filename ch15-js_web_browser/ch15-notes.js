/**
 * Les attributs defer et async du tag script renseigne le navigateur sur le fait que le
 * script n'inclut pas d'instruction document.write() pour générer du HTML et donc qu'il
 * peut parser et restituer le document pendant qu'il charge le script.
 * - defer : le navigateur charge et restitue totalement la page
 * - async : le navigateur charge le script dès que possible dans bloquer le chargement
 *           et la restitution de la page.
 * 
 * Si la balise script contient les deux attributs, async prend le pas.
 * L'attribut type="module" est traité comme defer. 
 * 
 * Une alternative simple à defer et async pour les scripts inclus directement dans le HTML
 * est de les placer à la fin du body.
 * 
 */

/** Document Object Model
 * Côté client, l'objet le plus important est le Document. Il représente le document HTML 
 * affiché dans la page ou l'onglet. L'API JS pour travailler avec les documents HTML est le
 * DOM (Document Object Model)
 * 
 * Le DOM est le mirroir de la structure d'un document HTML. Ansi à chaque tag dans le HTML
 * est associé un objet JS et à chaque texte du HTML est associé un objet Text. Tous ces objets
 * ainsi que le Document sont des sous-classe de la classe Node.
 * le tag body => l'objet HTMLBodyElement
 * le tag table => l'objet HTMLTableElement
 * ....
 */

/**L'objet Global
 * Dans le navigateur, en plus de définir les types et fonctions pré-intégrés, l'objet global
 * represente la fenêtre de navigation et définit des propriétés telles que history, innerWidth..
 * Une des propriétés de l'objet global est window et sa valeur est l'ojet global lui-même.
 * 
 * L'objet global est unique et partagé par tous les scripts (sauf ceux des workers) qui tournent 
 * dans la fenêtre de navigation.
 */

/**Scripts share a namespace
 * Dans les modules, les constants, variables, fonctions et classes définies de manière globale i.e
 * à l'extérieur de fonctions ou de classes sont privées jusqu'à ce qu'elles soient exportées
 * par le module.
 * 
 * Dans les scripts qui ne sont pas des modules, une fonction f() défini dans un script sera visible par
 * tous les script du document. Ainsi, en n'utilisant pas les modules, tous les scripts indépendant du document
 * partagent le même namspace et se comportent comme si elles sont des partie d'un script plus large.
 * Dans ES6, les déclaration const, let, class au top niveau ne créent pas de propriéts dans l'objet global mais
 * sont tout de même définies dans un namespace partagé. Une classe MaClass ainsi défini dans un script x pourra être 
 * utilisée dans un autre script y en faisant new MaClass(). Mais new window.MaClass() ne marcherait pas.
 * Les déclarations var et fonctions créent des propriétés dans l'objet global.
 */

/**Execution of JS Programs 
 * Il n'y a pas de définition formelle d'un programme JS mais on peut dire qu'il se compose de l'ensemble des scripts
 * d'un même document.
 * On peut supposer que l'exécution d'un programme JS se déroule en deux phase :
 * - phase 1 : le chargement du document et l'exécution des scripts inline ou ou externes. Certains scripts ne font
 * généralement rien durant cette phase sinon que de définir les classes et fonctions à utiliser dans la seconde phase.
 * D'autres scipts peuvent faire le contraire.
 * 
 * - phase 2 : cette phase est asynchrone et pilotée par les events. Un script susceptible de participer à cette
 * phase définira lors de la première phase, un gestionnaire d'event ou un callback qui sera invoqué de façon asynchrone.
 * Deux de ces events qui se passe durant la seconde phase est le "DOMContentLoad" et "load". Le premier est déclenché
 * quand le document HTML est chargé et parsé. Le second est déclenché quand le document et les ressources externes
 * (images et cie) sont chargés
*/

/**Client-side JS threading model 
 * JS est un langage mono-thread donc pas de concurrence.
 * Ce qui veut dire que le navigateur ne répond pas à l'utlisateur quand un script
 * s'exécute.
 * La plateforme web définit une sorte de parallélisme appelée web worker. Un web worker est un thread qui exécute
 * des calculs lours dans bloquée l'interface utilisateur.
 * Le code qui s'exécute dans un web worker n'a pas accès au document, ne partage aucun état avec le thread principal
 * ou avec les autres web workers. Il ne peut communiquer avec ces derniers que via des events
*/

/**Client-side JS timeline
 * 1 - le navigateur crée le Document Objet et commence à parser la page, ajoutant les noeuds et leurs contenus
 * au document. La propriété document.readyState vaut "loading" à ce stade.
 * 
 * 2 - quand le parser HTML rencontre la balise <script> qui n'a pas l'attribut defer, async ou type="module", il 
 * ajoute ce tag au document et exécute le script.
 * Un tel script a accès à lui-mmême et au contunu du document déclaré avant lui. 
 * 
 * 3 - quand le parser rencontre la balise script avec un attribut async, il charge le texte du script (et si ce script
 * est un module, il charge également toutes ses dépendances) et continue le parsing du document. Le script sera exécuté
 * dès que possibe après le chargement. Il peut ou ne peut pas avoir accès au contenu du document qui vient après lui.
 * 
 * 4 - quand le document est complètement parsé, document.readyState vaut "interactive".
 * 
 * 5 - tout script avec l'attribut defer (ainsi que type="module" mais sans l'attribut async) sont exécutés dans leur
 * ordre d'apparition. Les "deferred" scripts ont accès à tous le document.
 * 
 * 6 - le navigateur propage un event "DOMContentLoaded" sur le Document objet. Ceci marque la transistion de la phase
 * synchrone à la phase asynchrone. Mais à ce stade, il peut encore rester des scripts async non exécutés.
 * 
 * 7 - à ce stade, le document est complètement parsé mais le navigateur peut attendre du contenu suppélmentaire, 
 * tel que des images, à charger.
 * Quand tous ces contenus sont chargés et tous les scripts async exécutés, le document.readyState vaut "complete" 
 * et le navigateur propage l'event "load" sur l'objet window.
 * 
 * 8 - à cette étape, les events sont invoqués de manière asynchrone en réponse aux actions utilisateur, aux évents
 * réseau, aux expiration de timer ou autres.
 * 
 */