Ext.namespace("GEOR.Addons.Photos_obliques.search");

GEOR.Addons.Photos_obliques.onSearchByAttributes = function() {

    if (GEOR.Addons.Photos_obliques.search.AttributesWindow == null ||
        GEOR.Addons.Photos_obliques.search.AttributesWindow.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.InitAttributesSearchWindow();
    } else if (GEOR.Addons.Photos_obliques.search.AttributesWindow.isVisible()) {
        GEOR.Addons.Photos_obliques.search.AttributesWindow.hide();
        this.toggle(false); //this : button
    } else {
        GEOR.Addons.Photos_obliques.search.AttributesWindow.show()
    }

};


GEOR.Addons.Photos_obliques.search.FormFieldSet = function() {
    var resultPanel = GEOR.Addons.Photos_obliques.result.gridPanel();
    
    var comCbStore = new Ext.data.JsonStore({

    });

    var minYearStore = new Ext.data.JsonStore({});

    var maxYearStore = new Ext.data.JsonStore({});

    var ownerCbStore = new Ext.data.JsonStore({});      

    return new Ext.form.FormPanel({
        id: "phob_form_main_sba",
        title: "Paramètres",
        autoHeight: true,
        cls:"form-sba-panel",
        items: [{
            xtype: "fieldset",
            border:false,
            id: "phob_fst_mainSba",
            items: [{
                xtype: "combo",
                id: "phob_cb_comSba",
                anchor: "99%",
                fieldLabel: "Communes ",
                mode: "local"
            }, {
                xtype: "compositefield",
                id: "phob_cpf_fstSba",
                fieldLabel: "Période ",
                anchor: "99%",
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: "spinnerfield",
                    id: "phob_spinf_minSba",
                    anchor: "50%"

                }, {
                    xtype: "spinnerfield",
                    id: "phob_spinf_maxSba",
                    anchor: "50%"
                }]
            }, {
                xtype: "combo",
                id: "phob_cb_ownerSba",
                anchor: "99%",
                fieldLabel: "Propriétaire ",
                mode: "local"
            }]
        },resultPanel],
    })
};

GEOR.Addons.Photos_obliques.InitAttributesSearchWindow = function() {
    /*
     * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
     * name's function) ex: [phob_win_main_sba] is the id of the main window to
     * search by attribute in oblique photo addon
     */
    var sbaFielSet = GEOR.Addons.Photos_obliques.search.FormFieldSet();    

    GEOR.Addons.Photos_obliques.search.AttributesWindow = new Ext.Window({
        layout:'fit',
        title: "Recherche attributaire",
        id: "phob_win_mainSba",
        autoScroll: true,
        widht: 500,
        height: 200,
        minWidth: 280,
        closeAction: "hide",
        listerners: {
            "hide": function() {
                Ext.getCmp("phob_btn_attribut").toggle(false);
            }
        },
        items: [sbaFielSet],
        buttons: [{
            labelAlign: "center",
            id: "phob_btn_fireSba",
            text: "Rechercher",
            handler: function() {
            }
        }, {
            labelAlign: "center",
            id: "phob_btn_cancelSba",
            text: "Annuler",
            allowDepress: false,
            pressed: false,
            enableToggle: true,
            toggleGroup: "menuBtn",
            handler: function() {
                GEOR.Addons.Photos_obliques.search.AttributesWindow.hide();
            }
        }]
    });
    GEOR.Addons.Photos_obliques.search.AttributesWindow.show();
};