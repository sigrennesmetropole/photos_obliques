Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.onSearch = function (id) {    

    if (GEOR.Addons.Photos_obliques.search.mainWindow == null || GEOR.Addons.Photos_obliques.search.mainWindow.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.InitSearchWindow(id);

    } else if (GEOR.Addons.Photos_obliques.search.mainWindow.isVisible()) {
        GEOR.Addons.Photos_obliques.search.mainWindow.hide();
    } else {
        GEOR.Addons.Photos_obliques.search.mainWindow.show()
    }
};

GEOR.Addons.Photos_obliques.panelSearchWindow = function() {
    return new Ext.form.Formpanel({
        id: "phob_panel_winSearch",
        items: []
    });    
};

GEOR.Addons.Photos_obliques.InitSearchWindow = function(id) {
    var formItems = [];
    var winTitle = "Outil de recherche";
    formItems.push(GEOR.Addons.Photos_obliques.search.sbgPanel());
    formItems.push(GEOR.Addons.Photos_obliques.search.searchByAttributes());
    formItems.push(GEOR.Addons.Photos_obliques.result.gridPanel());
    
    if(id === "phob_btn_graph"){
        Ext.getCmp("phob_form_mainSbg").hidden=false;
        winTitle = "Recherche graphique";
    } else if (id === "phob_btn_attribut"){
        winTitle = "Recherche attributaire";        
    }
       
    var formPanel = new Ext.form.FormPanel({
        items: formItems
    });
    
    GEOR.Addons.Photos_obliques.search.mainWindow = new Ext.Window({
        title : winTitle,
        id : "phob_win_search",
        autoScroll : true,
        widht: 500,
        height: 200,
        minWidth : 280,
        closeAction : "hide",
        items : [ formPanel ],
        buttons : [ {
            labelAlign : "center",
            id : "phob_btn_fire",
            text : "Rechercher",
            handler : function () {
            }
        }, {
            labelAlign : "center",
            id : "phob_btn_cancel",
            text : "Annuler",
            handler : function () {
                GEOR.Addons.Photos_obliques.search.mainWindow.hide();
            }
        } ]
    });
    console.log(Ext.getCmp("phob_fst_mainSba"));

    GEOR.Addons.Photos_obliques.search.mainWindow.show();
};