## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Groupe : Lux VEGBA, Corentin CLERO, Melly LUCAS

Ce que le projet fait :

    - S'inscrire : vérification du format email/mot de passe et si l'utilisateur possède déjà un compte
    - Se connecter : génère un token et création d'un cookie contenant le token
    - Mot de passe oublié : une fois l'adresse mail inscrite (vérification si l'email existe), l'utilisateur reçoit un mail avec un nouveau token dans l'url. Cliquer sur le lien "Réinitialiser le mot de passe"
    - Modification du mot de passe : le token est vérifier sinon redirection et l'utilisateur peut entrer son nouveau mot de passe (format mot de passe obligatoire)
    - Home : vérification du token dans les cookies sinon redirection et affichage de la page d'accueil du site
    - Service : vérification du token dans les cookies sinon redirection et affiche des services présent dans la base de données
    - Bouton déconnexion : suppression du cookie
    - Gestion des messages de réussite et d'erreur
    - Responsive

Prise en main pour les utilisateurs : il est nécessaire de se créer un compte pour accèder au site internet Alain Terrieur
