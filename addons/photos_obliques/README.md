Photos obliques
===============  

Cet add-on est fait pour être intégré dans le visualiseur Mapfishapp de [geOrchestra](https://github.com/georchestra/georchestra). Il appelle des services de la webapp photos_obliques.

Visiter la [page des addons geOrchestra](https://github.com/GFI-Informatique/georchestra/tree/master/mapfishapp/src/main/webapp/app/addons/) pour aller plus loin.


## Configuration des options

Les valeurs des options par défaut sont dans le fichier ```manifest.json```.

Pour modifier une option par défaut, il est conseiller de copier d'insérer l'option dans le fichier ```config.json```. La nouvelle valeur remplacera la valeur par défaut sans la supprimer.



## Déploiement de l'addon

### Version geOrchestra < = 15.06

* Pour activer l'addon photos obliques avec geOrchestra < = 15.06, il faut modifier le fichier de configuration de mapfishapp (GEOR_custom.js) et ajouter dans la partie ADDONS le contenu du fichier ```config.json``` fourni avec l'addon.

* Pour charger l'addon automatiquement dès l'ouverture de Mapfishapp, modifer dans ```GEOR_custom```  la valeur:
	 ```preloaded: false```

### Version geOrchestra > 15.06
A partir de la version 15.06 de geOrchestra, les addons sont dynamiquement ajoutés à Mapfishapp à l'aide d'un service coté-serveur. Pour cela : 

* placer l'addon dans le répertoire ```Addons``` de Mapfishapp. 

* ou lier le répertoire de l'addon Photos obliques au répertoire ```Addons``̀  de Mapfishapp.

* Pour activer l'addon avec le chargement de Mapfishapp, modifier ```config.json``` la valeur:
	```preloaded: false```



## Options par défaut
* "servicesUrl": Définir l'URL des services de la webapp,
* "photoUrl": Définir un URL pour afficher les aperçus  des photos dans la liste de résultat,
* "thumbUrl": Définir un URL pour afficher les vignettes des photos,
* "cartSize": Définir la taille maximale du panier en mégaoctet (Mo),
* "cartNb" : Définir le nombre la capacité maximale du panier en nombre de photos,
* "limitReturns": Définir un nombre de résultat retourné maximum,
* "limitByPage": Définir un nombre de résultat à afficher par page,
* "adminMsgTooltip": Définir une information au survol de l'icône de télécharghement si la photo n'est pas disponible,
* "adminMsgAlert": Définir un message donnant les coordonnées du service à contacter pour télécharger la photo,
* "adminLimitAlert": Définir une alerte pour indiquer à l'utilisateur que la limite du panier est atteinte,
* "target": Laisser vide pour ne pas insérer de bouton dans la toolbar à l'ouvertur de l'addon (exemple de valeur : "tbar_12"),
* "downloadMsg": Définir un message pour prévenir l'utilisateur de la présence de mentions légales obligatoires,
* "adminLimitMsg": Définir un message pour alerter l'utilisateur que le nombre de résultat est trop important,
* "styleMapOptions": Définition du style [OpenLayers] (http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html) des emprises affichés au passage de la souris sur un résultat,           
* "imgExtension": Définition de l'extension des vignettes et des aperçus,
* "styleGraphLayer": Définition du style [OpenLayers] (http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html) du polygone dessiné par l'utilisateur pour réaliser une recherche graphique,
* "WFSLayerName": Nom de la couche WFS,
* "WFSLayerUrl": URL d'appel du WFS,
* "WFSLayerId": Nom de l'attribut d'identitifaction (ID) des objets dans la couche WFS,
* "WFSLayerSetting": Paramètres d'appel de la couche WFS

### Remarque : Le SRC de la couche WFS est en EPSG:3948. 
Une reprojection permet d'afficher les données vers le SRC configuré dans Mapfishapp.


## Modification des icônes et images
L'image ```img/thumbnail.png```  affichées dans le menu "Outils" est remplaçable. Conserver seulement le nom et le format de fichier / taille (48 x 48 pixels) .

Toutes les autres icônes sont dans le répertoire ```img/icons``` de l'addon.

Pour modifier une icône, il faut conserver le nom des icônes ainsi que leur emplacement. Sinon, il est nécessaire de réaliser des modifications dans le fichier  ```css/photos_obliques.css``` de l'addon.

Les icônes sont au format ```.png```  en 16 x 16 pixels. 

### Licence Open Source
Les icônes par défaut sont soumis à [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) conformément à la source [material.io](https://material.io/icons/).  


### Icônes disponibles
* phob-tool.png : Icône dans la liste des outils ajoutés
* phob-tbar.png : Icône ajoutée dans la toolbar (voir option "target")
* phob-att.png : Boouton "Attributaire" lors de l'ouverture de l'addon
* phob-graph.png : Bouton "Graphique" lors de l'ouverture de l'addon
* phob-cart.png : Bouton "Panier" lors de l'ouverture de l'addon
* phob-csv.png :  Bouton d'export en CSV
* phob-clean.png : Bouton pour vider le panier ou la liste de résultat
* phob-zoom.png : Bouton de zoom sur l'extension d'un objet de la liste de résultat
* phob-add.png : Icône d'ajout au panier si une photo n'est pas disponible
* phob-call.png : Icône affichée si une photo est disponible
* phob-draw.png : Bouton pour activer le dessin d'un polygon dans l'outil graphique
* phob-erase.png : Bouton pour effacer un polygon dessiné 
* phob-download.png : Bouton pour télécharger depuis le panier
* phob-clean-selection-icon.png : Bouton pour supprimer les photos sélectionnées du panier
* phob-download-selection-icon.png : Bouton pour Télécharger seulement les photos du panier sélectionnées



Ce projet à été financé par :

<table>
    <tbody>
         <tr>
             <td>Rennes métropole</td>
            <td align="center"><img src="https://cloud.githubusercontent.com/assets/6370443/13951133/407ee162-f02f-11e5-8c70-a7b6cff7ba43.jpg" width="200" alt = "Rennes Métropole"></td>
        </tr>        
    </tbody>
</table>
