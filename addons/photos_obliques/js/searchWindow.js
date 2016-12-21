Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

/**
 * Function to parse json data and load all features params in associates comboBox
 */
GEOR.Addons.Photos_obliques.loadInfosFromJson = function(jsonDecode, options) {    
    var nbReturns = jsonDecode.totalFeatures;
    if (nbReturns > 0){
        var getInfos =  [ ["id",[]], ["annee",[]], ["proprio",[]] ];
        
        for (var idx=0; idx < nbReturns; idx++ ){
            var featureProp = jsonDecode.features[idx].properties;
            db(featureProp, getInfos);
        }

        function db (properties,array){
            for (var i = 0; i<array.length; i++){
                var field = array[i][0];
                var list = array[i][1];
                var val = properties[field];                
                if(list.indexOf(val)<0){
                    list.push(val);
                }
            }
        }      
        
        GEOR.Addons.Photos_obliques.result.resultStore.load({
            params:{
                id:getInfos[1][1]
            }
        });
        
        GEOR.Addons.Photos_obliques.search.cbGraphStartPeriod.getStore().loadData(getInfos[1][1]);
        GEOR.Addons.Photos_obliques.search.cbGraphEndPeriod.getStore().loadData(getInfos[1][1]);
        GEOR.Addons.Photos_obliques.search.cbGraphOwner.getStore().loadData(getInfos[2][1]);
        GEOR.Addons.Photos_obliques.search.idFromJson = getInfos[0];
        return  Ext.getCmp("phob_fst_mainSbg").enable();
        
    } else {
        return Ext.Msg.alert("Résultat vide", options.adminNoResult);
    }
};

GEOR.Addons.Photos_obliques.searchFromGeom = function(epsg3948){
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
                            GEOR.Addons.Photos_obliques.cleanParams(GEOR.Addons.Photos_obliques.result.resultStore.baseParams,false);
                            // get all features id and load them to result store param to get data with good format
                            GEOR.Addons.Photos_obliques.loadInfosFromJson(jsonData, globalOptions);                                                
                        }                                           
                    } else {
                        console.log("Error ", request.responseText);
                    }
                }
            });                                                               
        }                            
    }    
};

/**
 * Method to clean base param or other container whith combo values in params
 * Param bp : array like combo baseParam
 * Param bol : true or false to erase limit and start params if already present
 */
GEOR.Addons.Photos_obliques.cleanParams = function(bp,bol) {
    
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
   if(bol){
       if(bp.start || bp.start == ""){
           delete bp["start"];
       }   
       if(bp.limit || bp.limit == ""){
           delete bp["limit"];
       }
   }
};

GEOR.Addons.Photos_obliques.cleanCombo = function (isAttributesTool){
    if(isAttributesTool){
        Ext.getCmp("phob_cb_endSbg").reset();
        Ext.getCmp("phob_cb_startSbg").reset();
        Ext.getCmp("phob_cb_ownerSbg").reset();
        Ext.getCmp("phob_cb_comSbg").reset();
    } else {
        Ext.getCmp("phob_cb_fromSba").reset();
        Ext.getCmp("phob_cb_toSba").reset();
        Ext.getCmp("phob_cb_ownerSba").reset();
        Ext.getCmp("phob_cb_comSba").reset();
    }    
};

/**
*Methode to get result to load in the list
*/

GEOR.Addons.Photos_obliques.searchListResult= function(isResultList, isGraphTool){
    var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
    var searchParams = searchForm.getValues();                            
    var resultStore = GEOR.Addons.Photos_obliques.result.resultStore;
    resultStore.baseParams = searchParams;

    // control if add pagging params
    if(isResultList){
        searchParams.start = 0;
        searchParams.limit = 5
    }
    // change format of cities values
    var citiesParams = searchParams.cities;
    searchParams.cities = citiesParams.split(/[,]/);
    
    // if request is fire from search by graph tool we add array of id of list in param
    if(isGraphTool){
        if(GEOR.Addons.Photos_obliques.search.idFromJson){
            var listOfId = GEOR.Addons.Photos_obliques.search.idFromJson[1];            
            searchParams.id=listOfId;
        }
    }
    GEOR.Addons.Photos_obliques.result.resultStore.load({
        params:searchParams
    });

    GEOR.Addons.Photos_obliques.search.mainWindow.doLayout();
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


/**
 * Methode to manage main window item if user change of tool
 */

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
            GEOR.Addons.Photos_obliques.cleanCombo(false);
            Ext.getCmp("phob_fst_mainSba").hide();
            Ext.getCmp("phob_fst_mainSbg").show();
            Ext.getCmp("phob_btn_fire").disable();
            Ext.getCmp("phob_fst_mainSbg").disable();

        } else if (button.id === "phob_btn_attribut") {
            GEOR.Addons.Photos_obliques.cleanCombo(true);
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

/**
* Methode to create main search window and load first tool elements
*/
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
                    var windowTitle = GEOR.Addons.Photos_obliques.search.mainWindow.title;
                    // TODO: i18n trad
                    var attributeWinTitle = "Recherche attributaire";
                    if(windowTitle !== attributeWinTitle && Ext.getCmp("phob_fst_mainSbg").disabled){
                        // load stores of comboBox and get list of id from json
                        GEOR.Addons.Photos_obliques.searchFromGeom(epsg3948);                        
                        
                    }else{
                        if(windowTitle == attributeWinTitle){
                            GEOR.Addons.Photos_obliques.searchListResult(true,false);
                        }else{
                            GEOR.Addons.Photos_obliques.searchListResult(true,true);
                        }
                        
                    }                                                 
                }
            }
        }, cancelBtn]
    });

    GEOR.Addons.Photos_obliques.search.mainWindow.show();
};