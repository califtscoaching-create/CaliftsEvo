CALIFTS EVO - DEPLOIEMENT NETLIFY
===================================

METHODE : Connecte ton repo GitHub a Netlify (build automatique)

ETAPE 1 - GitHub :
1. Va sur github.com, connecte-toi (ou cree un compte gratuit)
2. Clic "New repository", nomme-le "califts-evo", laisse en Public, clic "Create"
3. Sur la page du repo, clic "uploading an existing file"
4. Glisse-depose TOUS les fichiers de ce dossier (pas le dossier lui-meme, les fichiers dedans)
5. Clic "Commit changes"

ETAPE 2 - Netlify :
1. Va sur netlify.com > "Add new site" > "Import an existing project"
2. Choisis "Deploy with GitHub"
3. Selectionne ton repo "califts-evo"
4. Build command : npm run build
5. Publish directory : dist
6. Clic "Deploy site"

Netlify va automatiquement installer les dependances et compiler l'app.
Ca prend 1-2 minutes. Tu recevras une URL du type xyz.netlify.app.

MISES A JOUR FUTURES :
Quand Claude modifie App.jsx, remplace juste le fichier sur GitHub
et Netlify redeploie automatiquement en 1 minute.
