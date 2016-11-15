Ext.namespace("GEOR.Addons.Photos_obliques.result");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.resultToolbar = function() {
    var tbar = [];

    var cleanResultBtn = new Ext.Button({
        id: "phob_bnt_cleanResult",
        iconCls: "action-basket-icon",
        handler: function() {
            alert("clic");
        }
    });

    var exportResultBtn = new Ext.Button({
        id: "phob_bnt_csvResult",
        iconCls: "action-basket-icon",
        handler: function() {
            alert("clic");
        }
    });

    tbar.push("127 photos");
    tbar.push("->");
    tbar.push(cleanResultBtn);
    tbar.push(exportResultBtn);

    return new Ext.Toolbar({
        id: "phob_tbar_winResult",
        anchor: "100%",
        items: [tbar]
    });
};

GEOR.Addons.Photos_obliques.updateShadow = function() {
    if (Ext.getCmp("phob_win_search")) {
        return Ext.getCmp("phob_win_search").syncShadow();
    }
};

GEOR.Addons.Photos_obliques.result.gridPanel = function() {
    var gridStore = new Ext.data.ArrayStore({});

    function updateShadow() {
        if (Ext.getCmp("phob_win_search")) {
            return Ext.getCmp("phob_win_search").syncShadow();
        } else {
            return
        }
    }

    var gridPanel = new Ext.grid.GridPanel({
        id: "phob_grid_resultPan",
        store: gridStore,
        autoScoll: true,
        collapsible: true,
        title: "Résultat",
        autoHeight: true,
        collapsed: true,
        tbar: GEOR.Addons.Photos_obliques.resultToolbar(),
        columns: [{
            xtype: "actioncolumn",
            id: "phob_col_photoRes",
            header: "Photo"
        }, {
            xtype: "actioncolumn",
            id: "phob_col_zoomRes",
            header: "Zoom",
            sortable: true,
        }, {
            id: "phob_col_dateRes",
            header: "Date",
            sortable: true,
        }, {
            id: "phob_col_IdRes",
            header: "ID",
        }, {
            id: "phob_col_ownerRes",
            header: "Propriétaire",
        }, {
            id: "phob_col_prestRes",
            header: "Prestataire",
        }, {
            xtype: "actioncolumn",
            id: "phob_col_panierRes",
            header: "Panier",
        }],
        viewConfig: {
            forceFit: true
        },
        cls: "grid-result-panel",
        listeners: {
            "expand": updateShadow,
            "collapse": updateShadow,
            scope: this
        }
    });
    return gridPanel;
};