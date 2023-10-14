
## Notes concernant l'utilisation d'une paire de clefs publique/privée sur la signature du JWT  
L'algorithme HS256 nécessite une clé secrète partagée, tandis que les algorithmes asymétriques comme RS256 utilisent une paire de clés publique/privée.    

Par défaut la méthode sign du module jesonwebtoken utilise HS256, il faut donc spécifier dans les options qu'il s'agit d'un algorithme RS256. 

## Notes concernant un ko que j'ai rencontré lors de l'exécution de mes tests de route API
**Description du problème**: 
- environ 9/10 j'ai un ou plusieurs de mes test http qui sont ko uniquement en faisant des test avec jest
lors de mes tests en local sur swagger je n'ai pas de ko
- les ko sont divers et variés par moment j'ai un 500 par moment un 401 par moment
- ce qui m'a permis de comprendre l'origine du problème c'est une erreur de connexion à la BDD

**Solution du problème**:
j'ai modifier le comportement de l'accès au données de la BDD
initialement sur chaque requête bdd:
    - j'ouvrai une connexion bdd
    - je lançai ma requête
    - sur le retour je fermais ma conexion à la BDD
à présent la connexion est ouverte au lancement de l'appli puis fermer lors de l'arrêt de l'application
tous les tests sont fonctionnels puisque jest lance plusieurs requêtes en même temps ce qui ouvre et ferme la connexion à la bdd en paralelle et perturbe le bon fonctionnement de l'application