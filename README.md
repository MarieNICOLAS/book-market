# Book Market — lab Pleine Page

Application Angular 21 correspondant aux étapes 1 à 7 du lab : catalogue de huit livres, filtre par auteur avec compteur, fiches, bouton d'ajout et quatre suggestions. Le nom personnalisé « Book Market Page » est conservé.

## Lancer et vérifier

```powershell
npm ci
npm start -- --port 4310
npm test -- --watch=false
npm run build
```

Ouvrir http://localhost:4310. Le filtre `ferrand` ou `FERRAND` affiche deux livres. Sur `/livre/1000`, ajouter le livre : le bouton devient gris, inactif et affiche « Ajouté ». Ouvrir une suggestion : son bouton reste actif. Revenir au premier livre par les suggestions : il reste ajouté. `/livre/9999` affiche un message.

Le panier est partagé entre toutes les pages via un service Angular. Le bouton Panier de l'en-tête affiche le nombre de livres et ouvre la page `/panier`, avec le contenu, le total et la possibilité de retirer un livre. Un livre ne peut être ajouté qu'une fois. Le panier reste disponible après un retour au catalogue, mais se réinitialise au rechargement de la page.

## Étape 8 — préparer GitHub Pages

```powershell
npm run build:pages
```

Cette commande construit le site avec la base `/book-market/`, puis crée `404.html` et `.nojekyll` dans `dist/pleine-page/browser` pour l'accès direct aux fiches sur GitHub Pages. Si le dépôt porte un autre nom, adapter la valeur `--base-href` dans `package.json` avant de construire.

La publication nécessite votre compte et un dépôt GitHub public. Depuis PowerShell, après avoir créé un dépôt vide nommé `book-market` :

```powershell
git init -b main
git add -A
git commit -m "Terminer le lab Pleine Page"
git remote add origin https://github.com/VOTRE-COMPTE/book-market.git
git push -u origin main
npx angular-cli-ghpages --dir=dist/pleine-page/browser
```

Remplacer `VOTRE-COMPTE`. Dans les réglages GitHub Pages du dépôt, choisir « Deploy from a branch », puis `gh-pages` et `/ (root)` comme dans le support. Vérifier le catalogue et un accès direct à `https://VOTRE-COMPTE.github.io/book-market/livre/1003` après publication. Le serveur Pages peut renvoyer un statut HTTP 404 pour cette fiche tout en affichant correctement l'application grâce au fichier `404.html`.

La publication distante n'est pas effectuée par la commande `build:pages`. Le rendu pédagogique demande aussi vos réponses Q1 à Q13 dans `reponses.md`.

