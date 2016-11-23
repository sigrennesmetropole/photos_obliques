Ext.namespace("GEOR.Addons.Photos_obliques.result");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.resultToolbar = function(gridStore) {
    var tbar = [];

    var nbResult;

    if (gridStore) {
        nbResult = gridStore.data.length;
        tbar.push({
            xtype: "tbtext",
            text: nbResult > 0 ? ((nbResult < 2) ? nbResult + " Résultat " : nbResult + " Résultats") : "Aucun résultat",
            id: "phob_txt_tbResult"
        });
    }

    var cleanResultBtn = new Ext.Button({
        id: "phob_bnt_emptyResult",
        iconCls: "phob-erase-icon",
        handler: function() {
            gridStore.removeAll();
            Ext.getCmp("phob_grid_resultPan").collapse();
        },
        listeners: {
            "click": function() {
                Ext.getCmp("phob_txt_tbResult").setText("Aucun résultat");
            }
        }
    });

    var exportResultBtn = new Ext.Button({
        id: "phob_bnt_csvResult",
        iconCls: "phob-csv-icon",
        handler: function() {
            alert("clic");
        }
    });

    tbar.push("->");
    tbar.push(cleanResultBtn);
    tbar.push(exportResultBtn);

    return new Ext.Toolbar({
        id: "phob_tbar_winResult",
        cls: "grid-result-tbar",
        anchor: "100%",
        items: [tbar]
    });
};

GEOR.Addons.Photos_obliques.result.gridPanel = function() {
    var gridStore, gridPanel;


    GEOR.Addons.Photos_obliques.result.resultStore = new Ext.data.JsonStore({
        id: "phob_store_result",
        url:"get-result.php",
        root: "features",
        fields: [
            {name:"id",
                convert: function(v,rec){
                    return rec.properties.fichier;
                }
            },
            {name:"date_",
                convert: function(v,rec){
                    return rec.properties.fichier;
                }
            },
            {name:"proprio",
                convert: function(v,rec){
                    return rec.properties.proprio;
                }
            },
            {name:"presta",
                convert: function(v,rec){
                    return rec.properties.presta;
                }
            },
            {name:"telecharg",
                convert: function(v,rec){
                    return rec.properties.telecharg;
                }
            }
        ],
        listeners: {
            "datachanged" : function(){
                if(gridPanel != undefined){
                    gridPanel.expand();
                }                
            }
        }
    });
    
    gridStore = GEOR.Addons.Photos_obliques.result.resultStore;

    function updateShadow() {
        if (Ext.getCmp("phob_win_search")) {
            return Ext.getCmp("phob_win_search").syncShadow();
        }
    }

    gridPanel = new Ext.grid.GridPanel({
        id: "phob_grid_resultPan",
        store: gridStore,
        collapsible: true,
        title: "Résultat",
        stripeRows: true,
        maxHeigth: 400,
        autoHeigth:true,
        stripeRows: true,
        collapsed: true,
        tbar: GEOR.Addons.Photos_obliques.resultToolbar(gridStore, gridPanel),
        colModel: new Ext.grid.ColumnModel({
            defaults: {
                align: "center"
            },
            columns: [{
                xtype: "actioncolumn",
                id: "phob_col_photoRes",
                header: "Photo",
                dataIndex: "photo"
            }, {
                xtype: "actioncolumn",
                id: "phob_col_zoomRes",
                header: "Zoom",
                items: [{
                    tooltip: "Aggrandir",
                    getClass: function(val, meta, rec) {
                        return "phob-zoom-icon";
                    },
                    handler: function() {}
                }]
            }, {
                id: "phob_col_dateRes",
                header: "Date",
                sortable: true,
                dataIndex: "date"
            }, {
                id: "phob_col_IdRes",
                header: "ID",
                dataIndex: "id"
            }, {
                id: "phob_col_ownerRes",
                header: "Propriétaire",
                sortable: true,
                dataIndex: "proprio"
            }, {
                id: "phob_col_prestRes",
                header: "Prestataire",
                dataIndex: "presta"
            }, {
                xtype: "actioncolumn",
                id: "phob_col_cartRes",
                tooltip: "Donwload", // TODO : Créer une variable de conf dans le config.json
                header: "Panier",
                getClass: function(val, meta, rec) {
                    if (rec.get("telecharg") < 1) {
                        this.tooltip = "Photo indisponible";
                        this.handler = function() {
                            alert("Photo indisponible");
                        }
                        return "phob-call-icon";
                    } else {
                        this.tooltip = "Télécharger";
                        this.handler = function() {
                            // TODO : Appeler service de téléchargement unitaire
                            alert("Lancement du téléchargement");
                        }
                        return "phob-add-icon";
                    }
                }
            }]
        }),
        viewConfig: {
            forceFit: true
        },
        cls: "grid-result-panel",
        listeners: {
            "reconfigure": function() {
                alert("reconf");
            },
            "expand": updateShadow,
            "collapse": updateShadow,
            scope: this
        }
    });
    return gridPanel;
};