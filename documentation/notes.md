
## Notes concernant l'utilisation d'une paire de clefs publique/privée sur la signature du JWT  
L'algorithme HS256 nécessite une clé secrète partagée, tandis que les algorithmes asymétriques comme RS256 utilisent une paire de clés publique/privée.    

Par défaut la méthode sign du module jesonwebtoken utilise HS256, il faut donc spécifier dans les options qu'il s'agit d'un algorithme RS256.  