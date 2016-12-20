Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

/**
 * Function to parse json data and return all features id
 */
GEOR.Addons.Photos_obliques.getIdFromJson = function(jsonDecode, options) {    
    var nbReturns = jsonDecode.totalFeatures;
    if (nbReturns > 0){
        var idArray =  [];
        for (i=0; i < nbReturns; i++ ){
            idArray.push(jsonDecode.features[i].properties.id);
        }
        return idArray;
    } else {
        return Ext.Msg.alert("Résultat vide", options.adminNoResult);
    }
};

GEOR.Addons.Photos_obliques.cleanResultParams = function(store) {
   var bp = store.baseParams; 
   if(bp.endPeriod || bp.endPeriod == ""){
       delete bp["endPeriod"];
   }
   if(bp.startPeriod || bp.startPeriod == ""){
       delete bp["startPeriod"];
   }
   if(bp.cities || bp.cities == ""){
       delete bp["cities"];
   }
   if(bp.owner || bp.owner == ""){
       delete bp["owner"];
   }
};

GEOR.Addons.Photos_obliques.getPeriodFromJson = function(jsonDecode, options) {    
    var nbReturns = jsonDecode.totalFeatures;
    if (nbReturns > 0){
        var idArray =  [];
        for (i=0; i < nbReturns; i++ ){
            idArray.push(jsonDecode.features[i].properties.id);
        }
        return idArray;
    } else {
        return Ext.Msg.alert("Résultat vide", options.adminNoResult);
    }
};

GEOR.Addons.Photos_obliques.onSearch = function(button) {
    // Creation de la la fenetre si non existante
    if (GEOR.Addons.Photos_obliques.search.mainWindow == null || GEOR.Addons.Photos_obliques.search.mainWindow.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.initSearchWindow(button.id);
    // si l'outil demandé est déjà ouvert, le fermer
    } else if (GEOR.Addons.Photos_obliques.search.mainWindow.isVisible() && !button.checked) {
        GEOR.Addons.Photos_obliques.search.mainWindow.hide();
        button.toggle(false);
    // sinon, ouverture de l'autre outil de recherche
    } else {
        if (button.id === "phob_btn_graph") {
            Ext.getCmp("phob_fst_mainSba").hide();
            Ext.getCmp("phob_fst_mainSbg").show();
            Ext.getCmp("phob_btn_fire").disable();
            Ext.getCmp("phob_fst_mainSbg").disable();

        } else if (button.id === "phob_btn_attribut") {
            // on efface le dessin et on désactive le composite field
            var delBtn = Ext.getCmp("phob_btn_delSbg");
            delBtn.fireEvent("click", delBtn);
            Ext.getCmp("phob_fst_mainSbg").hide();
            Ext.getCmp("phob_fst_mainSba").show();
            Ext.getCmp("phob_btn_fire").enable();           
            
        }
        GEOR.Addons.Photos_obliques.search.mainWindow.show();        
    }
    // dans tous les cas, nettoyer la liste de résultat
    if(GEOR.Addons.Photos_obliques.result.gridPanel){
        GEOR.Addons.Photos_obliques.result.gridPanel.getStore().removeAll();
        GEOR.Addons.Photos_obliques.result.gridPanel.collapse();
    }
};

GEOR.Addons.Photos_obliques.initSearchWindow = function(id) {
    var epsg3948 = new OpenLayers.Projection("EPSG:3948");
    var formItems = [];
    var searchBtn = false;
    var cancelBtn;
    
    var winTitle = "Recherche attributaire";

    /**
     * Add panels to search window
     */
    var idGraph = "phob_fst_mainSbg";
    var idAtt = "phob_fst_mainSba";
    formItems.push(GEOR.Addons.Photos_obliques.search.sbgPanel());
    formItems.push(GEOR.Addons.Photos_obliques.search.cpField(idGraph));
    formItems.push(GEOR.Addons.Photos_obliques.search.cpField(idAtt));
    formItems.push(GEOR.Addons.Photos_obliques.result.gridPanel());
    
    var formPanel = new Ext.form.FormPanel({
        items: formItems,
        id: "phob_form_winSearch"
    });
        
    cancelBtn = new Ext.Button({
        labelAlign: "center",
        id: "phob_btn_cancel",
        text: "Annuler",
        handler: function() {
            GEOR.Addons.Photos_obliques.search.mainWindow.hide();
        }
    });

    /**
     * Manage items for the first display
     */

    if (id === "phob_btn_graph") {
        Ext.getCmp(idGraph).disable()
        Ext.getCmp("phob_form_mainSbg").hidden = false;        
        Ext.getCmp(idAtt).hide();        
        winTitle = "Recherche graphique";
        searchBtn = true;
    } else {
        Ext.getCmp(idGraph).hide();
    }    

    GEOR.Addons.Photos_obliques.search.mainWindow = new Ext.Window({
        title: winTitle,
        id: "phob_win_search",
        resizable: true,
        constrainHeader: true,
        autoScroll: true,
        width: 500,
        autoHeight: true,
        minWidth: 280,
        maxHeigth:500,
        closeAction: "hide",
        closable: true,
        items: [formPanel],
        listeners: {
            "hide": function() {
                // unpressed all button and deactive all search by graphic content
                Ext.getCmp("phob_btn_graph").toggle(false);
                Ext.getCmp("phob_btn_attribut").toggle(false);
                var delBtn = Ext.getCmp("phob_btn_delSbg");
                delBtn.fireEvent("click", delBtn);
            },
            scope: this
        },
        buttons: [{
            labelAlign: "center",
            id: "phob_btn_fire",
            text: "Rechercher",
            disabled: searchBtn,
            listeners: {
                "click": function() {
                    if(GEOR.Addons.Photos_obliques.search.mainWindow.title === "Recherche attributaire"){
                        var getTitle = GEOR.Addons.Photos_obliques.search.mainWindow.title;
                        if (getTitle == "Recherche attributaire"){
                            var params;
                            var nbResultMax = 100;
                            var store;
                            var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
                            var searchParams = searchForm.getValues();                            
                            var resultStore = GEOR.Addons.Photos_obliques.result.resultStore;                            
                            resultStore.baseParams = searchParams;
                            searchParams.start = 0;
                            searchParams.limit = 5
                            var citiesParams = searchParams.cities;
                            searchParams.cities = citiesParams.split(/[,]/);
                        
                            GEOR.Addons.Photos_obliques.result.resultStore.load({
                                params:searchParams
                            });
                            GEOR.Addons.Photos_obliques.search.mainWindow.doLayout();                                                                     
                        }
                    } else {
                        if(GeoExt.MapPanel.guess().map.getLayersByName("phob_layer_sbg").length > 0){
                            var geom = GEOR.Addons.Photos_obliques.drawnGeom ? GEOR.Addons.Photos_obliques.drawnGeom : null;
                            if (geom !== null){
                                // control if geometry if not already drawn to not transform geom already transform, 
                                // else just search wkt and fire request
                                if(!GEOR.Addons.Photos_obliques.lastGeom || GEOR.Addons.Photos_obliques.lastGeom.id !== geom.id ){
                                    GEOR.Addons.Photos_obliques.lastGeom = geom;
                                    var reprojGeom = geom.transform(new OpenLayers.Projection("EPSG:3857"),epsg3948);
                                    var vec = new OpenLayers.Feature.Vector(reprojGeom);                                     
                                } else if(GEOR.Addons.Photos_obliques.lastGeom.id == geom.id){
                                    var vec = new OpenLayers.Feature.Vector(GEOR.Addons.Photos_obliques.lastGeom);
                                }
                                var geomInWkt = new OpenLayers.Format.WKT().write(vec);
                                var globalOptions = GEOR.Addons.Photos_obliques.globalOptions;
                                
                                // set request options
                                var settings  = globalOptions.WFSLayerSetting;                                
                                settings.maxfeatures = globalOptions.limitReturns;
                                settings.cql_filter = "CONTAINS(" + settings.geometryField +","+geomInWkt+")";

                                // create requests
                                var request = new OpenLayers.Request.GET({
                                    url: globalOptions.WFSLayerUrl,
                                    params: settings,
                                    async: false,
                                    callback: function(request) {
                                        
                                        // read json in request callback
                                        if (request.responseText) {
                                            var rep = request.responseText;                                            
                                            var jsonData = Ext.util.JSON.decode(rep);
                                            
                                            // control limit of result
                                            if (jsonData.totalFeatures > globalOptions.limitReturns){
                                                Ext.Msg.alert("Echec de la requête", globalOptions.adminLimitAlert);
                                            } else {
                                                
                                                // clean params
                                                GEOR.Addons.Photos_obliques.cleanResultParams(GEOR.Addons.Photos_obliques.result.resultStore);
                                                // get all features id and load them to result store param to get data with good format
                                                var arrayId = GEOR.Addons.Photos_obliques.getIdFromJson(jsonData, globalOptions);
                                                GEOR.Addons.Photos_obliques.result.resultStore.load({
                                                    params:{
                                                        id:arrayId
                                                    }
                                                });                                                
                                            }                                           
                                        } else {
                                            console.log("Error ", request.responseText);
                                        }
                                    }
                                });                                                               
                            }                            
                        }                        
                    } 
                }
            }
        }, cancelBtn]
    });

    GEOR.Addons.Photos_obliques.search.mainWindow.show();
};