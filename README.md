# React business application starter

Starter React personnel pour lancer rapidement des applications web métier. Le projet fournit une base fonctionnelle et opinionated : composants communs, thème, état, authentification, internationalisation, tests, Storybook et déploiement conteneurisé.

## Principe

Ce dépôt est une plateforme de démarrage, pas une bibliothèque multi-framework et pas un produit autonome. Il est volontairement centré sur React afin de réduire le temps de configuration et de conserver des choix techniques cohérents d’un projet à l’autre.

Chaque élément conservé doit justifier le temps qu’il fera économiser sur les prochains projets. Une dépendance ou un module rarement utilisé doit être retiré ou rendu optionnel.

## Ce qui est prêt à l’emploi

- React, TypeScript et Vite ;
- composants communs dans `src/components/common` : recherche, saisie, carte, modale, chargement, état vide et badge ;
- composants d’interface existants dans `src/components/atoms`, `src/components/molecules` et `src/components/organisms` ;
- thème sémantique dans `src/shared/theme` avec couleurs claires/sombres, typographie, espacements, rayons, ombres, responsive et niveaux d’empilement ;
- Storybook avec décorateurs de thème, internationalisation et router ;
- Redux Toolkit et RTK Query pour l’état et les appels API ;
- authentification OIDC public-client dans `src/shared/hooks`, `src/shared/utils/auth` et `src/app/services` ;
- internationalisation dans `src/shared/utils/translations` ;
- Vitest, Testing Library et MSW pour les tests ;
- Docker et manifests Kubernetes.

## Architecture contractuelle

Le projet suit une composition unique et explicite :

1. `src/main.tsx` est l’unique point de montage. Il installe Redux, puis `Wrapper`.
2. `src/components/Wrapper.tsx` installe les providers transverses actuellement actifs : thème, internationalisation et OIDC.
3. `src/App.tsx` compose le router et les routes de l’application d’exemple.
4. `src/app` contient l’infrastructure applicative : store Redux, RTK Query et services d’API.

Les responsabilités sont séparées ainsi :

- `src/components/common` contient les primitives visuelles réutilisables. Ces composants ne connaissent ni Redux, ni OIDC, ni les endpoints métier.
- `src/components/atoms`, `src/components/molecules` et `src/components/organisms` contiennent le shell d’interface et ses compositions. Le shell actuel est un exemple métier réutilisable, mais reste connecté à l’état du menu et à l’authentification.
- `src/components/pages` contient les pages de démonstration. `Home`, `Login`, `Profile` et `Error` sont les premières pages à remplacer dans une nouvelle application.
- `src/shared` contient les contrats transverses : thème, hooks DOM, schémas, configuration OIDC, traductions et utilitaires responsive.
- `src/__tests__` contient uniquement les outils de test partagés. Les tests de composants restent proches du composant testé.

Il n’existe pas de couche Web Components, de micro-frontend ou de module métier générique dans ce starter. Un futur domaine fonctionnel doit être ajouté explicitement, avec son propre modèle, ses données, ses services et ses composants.

### Profil de démarrage actuel

Le profil livré est une application React métier avec Redux, RTK Query, internationalisation et OIDC activés. OIDC est configuré comme client public Authorization Code + PKCE : aucun secret ne doit être placé dans une variable `VITE_*`. Ces capacités sont des points d’extension, mais elles ne sont pas optionnelles au runtime actuel : les retirer implique de modifier `main.tsx`, `Wrapper.tsx`, `App.tsx` et `app/store.ts` ensemble.

## Démarrer une nouvelle application

1. Cloner le dépôt depuis un tag ou une branche stable.
2. Remplacer le nom, le titre, les variables d’environnement et les informations de déploiement.
3. Conserver le profil de démarrage ou retirer explicitement OIDC, Redux/RTK Query et l’internationalisation dans les quatre points d’assemblage documentés ci-dessus.
4. Remplacer les pages d’exemple et les routes qui ne servent pas au nouveau produit.
5. Conserver `src/components/common` et le thème comme socle d’interface.
6. Ajouter les composants spécifiques au domaine dans un dossier de fonctionnalité clairement nommé.
7. Ajouter ou modifier les stories avant de généraliser un composant.

## Faire évoluer le style

Le contrat visuel se trouve dans `src/shared/theme`. Les composants communs doivent utiliser les tokens sémantiques plutôt que des couleurs, espacements ou ombres codés localement.

Pour changer l’identité d’une application, commencer par :

- `colors` pour la palette ;
- `typography` pour les tailles et graisses ;
- `radii` pour le niveau d’arrondi ;
- `shadows` pour la profondeur ;
- `layout` et `breakpoints` pour la structure responsive.

Les composants doivent conserver une API fonctionnelle stable lorsque leur apparence change. Les variantes visuelles doivent être ajoutées au composant ou au thème, pas dupliquées dans chaque page.

## Organisation recommandée

### Socle permanent

Composants communs, thème, outillage, tests, Storybook et utilitaires partagés.

### Infrastructure active

Redux/RTK Query, internationalisation, OIDC et router sont installés par le profil de démarrage actuel. Ils peuvent être retirés, mais uniquement comme une modification d’architecture volontaire et documentée.

### Exemple d’application

Les pages de démonstration et le layout de navigation servent de référence de démarrage. Ils doivent être remplacés ou supprimés lorsqu’une application réelle commence.

## Qualité et maintenance

Avant de créer une nouvelle application ou de publier une évolution du starter :

- lancer la vérification TypeScript ;
- lancer le build de production ;
- lancer les tests ;
- construire Storybook ;
- vérifier les états loading, erreur, vide, désactivé et responsive dans les stories.

Mettre à jour les dépendances par groupe cohérent et vérifier qu’une mise à jour n’ajoute pas une obligation dont les futurs projets n’ont pas besoin.

## Choix volontaire

Les Web Components ne font pas partie du socle actuel. Ils ne sont utiles que si un besoin concret de consommation hors React apparaît. Tant que les applications cibles restent React, des composants React thémables, testés et documentés offrent un meilleur rapport simplicité/réutilisation.
