Photos obliques
===============  

Cet add-on est fait pour être intégré dans le visualiseur Mapfishapp de [geOrchestra](https://github.com/georchestra/georchestra). Il appelle des services de la webapp photos_obliques.


## Configuration des options

Les valeurs des options par défaut sont dans ```manifest.json```.

Pour modifier une option par défaut, il est conseiller de copier d'insérer l'option dans le fichier ```config.json```. La nouvelle valeur remplacera la valeur par défaut sans la supprimer.



## Déploiement de l'addon

Version geOrchestra < = 15.06 :

Pour activer l'add-on photos obliques avec geOrchestra < = 15.06, il faut modifier le fichier de configuration de mapfishapp (GEOR_custom.js)et ajouter dans la partie ADDONS le contenu du fichier ```config.json``` fourni avec l'addon.

A partir de la version 15.06 de geOrchestra, les addon sont dynamiquement ajoutés à Mapfishapp à l'aide d'un service coté-serveur. Pour cela, il faut placer l'addon dans le répertoire ```Addons`` de Mapfishapp. Il est également possible de réaliser un lien entre l'emplacement de votre addon et le répertoire ```Addons`` de Mapfishapp.



## Options par défaut
"servicesUrl": Définir l'URL des services de la webapp,
"photoUrl": Définir un URL pour afficher les aperçus  des photos dans la liste de résultat,
"thumbUrl": Définir un URL pour afficher les vignettes des photos,
"cartSize": Définir la taille maximale du panier en mégaoctet (Mo),
"cartNb" : Définir le nombre la capacité maximale du panier en nombre de photos,
"limitReturns": Définir un nombre de résultat retourné maximum,
"limitByPage": Définir un nombre de résultat à afficher par page,
"adminMsgTooltip": Définir une information au survol de l'icône de télécharghement si la photo n'est pas disponible,
"adminMsgAlert": Définir un message donnant les coordonnées du service à contacter pour télécharger la photo,
"adminLimitAlert": Définir une alerte pour indiquer à l'utilisateur que la limite du panier est atteinte,
"target": Laisser vide pour ne pas insérer de bouton dans la toolbar à l'ouvertur de l'addon (exemple de valeur : "tbar_12"),
"downloadMsg": Définir un message pour prévenir l'utilisateur de la présence de mentions légales obligatoires,
"adminLimitMsg": Définir un message pour alerter l'utilisateur que le nombre de résultat est trop important,
"styleMapOptions": Définition du style [OpenLayers] (http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html) des emprises affichés au passage de la souris sur un résultat,           
"imgExtension": Définition de l'extension des vignettes et des aperçus,
"styleGraphLayer": Définition du style [OpenLayers] (http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html) du polygone dessiné par l'utilisateur pour réaliser une recherche graphique,
"WFSLayerName": Nom de la couche WFS,
"WFSLayerUrl": URL d'appel du WFS,
"WFSLayerId": Nom de l'attribut d'identitifaction (ID) des objets dans la couche WFS,
"WFSLayerSetting": Paramètres d'appel de la couche WFS


## Modification des icônes
Toutes les icônes sont localisées dans le répertoire ```img/icons``` de l'addon.

Pour modifier une icône, il faut conserver le nom des icônes ainsi que leur emplacement. Sinon, il est nécessaire de réaliser des modifications dans le fichier  ```css/photos_obliques.css``` de l'addon.

Les icônes sont au format 16 x 16 pixels en ```.png``` 

### Licence Open Source
Les icônes par défaut sont soumis à [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) conformément à la source [material.io](https://material.io/icons/).  


Visiter la [page geOrchestra](https://github.com/GFI-Informatique/georchestra/tree/master/mapfishapp/src/main/webapp/app/addons/) sur les Addons pour plus d'informations.


Ce projet à été financé par :

<table>
    <tbody>
         <tr>
             <td>Rennes métropole</td>
            <td align="center"><img src="https://cloud.githubusercontent.com/assets/6370443/13951133/407ee162-f02f-11e5-8c70-a7b6cff7ba43.jpg" width="200" alt = "Rennes Métropole"></td>
        </tr>        
    </tbody>
</table>
