### GitHub Pages

Lien : https://ihbzk.github.io/hackathon-2024/

### Map sur WorkAdventure

Lien : https://play.workadventu.re/@/radio-map/radio-map---hackathon/radio-map

### Vidéo de présentation

Lien : 

### Vidéo bonus (pour Adrien MORIN)

Liens :
- https://youtu.be/Ra2tkW7zwl0
- https://youtu.be/GrR39NtivZo

### **Idée du projet**
Développer une carte dédiée aux radios où chaque station type France Info, 
Skyrock etc… puissent avoir son endroit pour accueillir et faire des lives 
sur des plateformes comme YouTube, Twitch etc… ou émettre le flux de la 
carte dans leur fréquence radio.

### **Description du projet**


Créez une carte interactive sur WorkAdventure pour les radios. 
Chaque station a son espace pour diffuser en direct et accueillir 
des invités dans des salles dédiées. Intégrez des décors personnalisés 
et des fonctionnalités multimédia pour des interactions enrichissantes.

### L'équipe ###

- Ilyesse Hamcherif (chef d'équipe) | Git : ihbzk
- Jules Rabus | Git : Jules-Rabus
- Damien Boillot-Henault | Git : Dambh45
- Justin Katasi | Git : justinDev91

### **Fonctionnalités développées**

- Rédaction de la documentation et des spécifications fonctionnelles et techniques (Justin)
- Création de la carte (Ilyesse)
- Création de l'interface de sélection des radios (Damien)
- Implémentation de la fonctionnalité "Radio Owner Player" (Justin)
- Ajout de la radio Portable "Radio Every Where" (Jules)
- Changement des tiles lors de la sélection d'une radio (Jules)
- Tableaux récapitulatif du temps d'écoute par radio et par joueur (Jules et Ilyesse)
- Affichage du temps d'écoute d'un joueur lors du click sur un Hoka (Ilyesse)
- Refactoring du code (Jules, Ilyesse, Justin)
- Ajout automatique des eventslisteners lors de l'ajout d'un area radio sur la map. Pour éviter d'avoir du code à rajouter (Jules)

Fonctionnalité "Radio Owner Player" :
La fonctionnalité "Radio Owner Player" permet au premier joueur à entrer dans une salle de radio d'être désigné comme le propriétaire de la salle, lui conférant ainsi un contrôle total sur les interactions de la station radio jusqu'à sa sortie de la salle. Lorsque le propriétaire actuel quitte la salle et qu'il y a un autre joueur présent dans la salle, ce dernier est automatiquement désigné comme le nouveau propriétaire de la radio.

Cette fonctionnalité garantit une expérience fluide et organisée pour les utilisateurs de la plateforme de radio, en assurant une gestion efficace de la propriété de la salle et en permettant une transition transparente entre les propriétaires lorsqu'ils quittent la salle.

Fonctionnalité "Radio Every Where" :

La fonctionnalité "Radio Every Where" permet à un joueur de pouvoir écouter la radio sur l'entièreté de la carte sans la partager à un autre joueur. Si un joueur entre dans une salle radio, cela se coupe automatiquement.

### Stack Technique

Javascript, Typescript, HTML, CSS, 
Tiled et Visual Studio Code
Notion et Discord

### Procédure d’installation et de lancement de votre solution

Installation classique de WorkAdventure. Utiliser Github pages ou la version local avec npm install et npm run dev.

