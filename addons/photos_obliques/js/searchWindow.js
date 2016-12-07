Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.onSearch = function(button) {
    if (GEOR.Addons.Photos_obliques.search.mainWindow == null || GEOR.Addons.Photos_obliques.search.mainWindow.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.initSearchWindow(button.id);

    } else if (GEOR.Addons.Photos_obliques.search.mainWindow.isVisible() && !button.checked) {
        GEOR.Addons.Photos_obliques.search.mainWindow.hide();
        button.toggle(false);
    } else {
        // TODO : manage attributes fieldSet if last search was not null
        if (button.id === "phob_btn_graph") {
            Ext.getCmp("phob_fst_mainSba").hide();
            Ext.getCmp("phob_fst_mainSbg").show();
            Ext.getCmp("phob_btn_fire").disable();
            Ext.getCmp("phob_fst_mainSbg").disable();

        } else if (button.id === "phob_btn_attribut") {
            // on efface le dessin et on désactive le cpf
            var delBtn = Ext.getCmp("phob_btn_delSbg");
            delBtn.fireEvent("click", delBtn);
            Ext.getCmp("phob_fst_mainSbg").hide();
            Ext.getCmp("phob_fst_mainSba").show();
            Ext.getCmp("phob_btn_fire").enable();           
            
        }
        GEOR.Addons.Photos_obliques.search.mainWindow.show();
    }
};

GEOR.Addons.Photos_obliques.initSearchWindow = function(id) {
    var formItems = [];
    var searchBtn = false;
    var cancelBtn;
    
    var winTitle = "Outils de recherche attributaire";

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
     * Manage items if window should display graphic research tools first
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
                    var params;
                    var nbResultMax = 100;
                    var store;
                    var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
                    var searchParams = searchForm.getValues();
                    var getTitle = GEOR.Addons.Photos_obliques.search.mainWindow.title;
                    var resultStore = GEOR.Addons.Photos_obliques.result.resultStore;
                    console.log(resultStore);
                    
                    if (getTitle === "Outils de recherche attributaire"){
                        delete searchParams["cities"];
                        //searchParams.start= 0;
                        //searchParams.limit= GEOR.Addons.Photos_obliques.globalOptions ? GEOR.Addons.Photos_obliques.globalOptions.limitResults : nbResultMax;
                        Ext.Ajax.request({
                            method: "GET",
                            params:searchParams,
                            url: "http://172.16.52.84:8080/photooblique/services/getPhotoByAttribute",
                            success: function(response) {
                                resultStore.loadData(Ext.util.JSON.decode(response.responseText));
                            },
                            failure: function(result) {
                                Ext.MessageBox.alert("Alert","Echec de la requête");
                            }
                        });
                                                  
                    } 
                    
                    
                    /*if (getTitle == "Recherche attributaire"){
                    } else if (getTitle == "Recherche graphique"){
                        if(Ext.getCmp("phob_fst_mainSbg").disabled){
                            // requete à partir du dessin
                            Ext.Ajax.request({
                                method: "GET",
                                //params:searchParams,
                                url: "http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/graphResult.php",
                                success: function(response) {
                                    // on ajoute la réponse au resultGrid
                                    var result = Ext.util.JSON.decode(response.responseText);
                                    var records = new resultStore.recordType(result);
                                    resultStore.insert(resultStore.data.length, records);
                                    console.log(resultStore);
                                    // TODO : si plusieurs résultats
                                    Ext.getCmp("phob_fst_mainSbg").enable();
                                },
                                failure: function(result) {
                                    Ext.MessageBox.alert("Alert","Echec de la requête");
                                }
                            });
                        }                        
                    }*/
                }
            }
        }, cancelBtn]
    });

    GEOR.Addons.Photos_obliques.search.mainWindow.show();
};