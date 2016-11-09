Ext.namespace("GEOR.Addons.Photos_obliques.result");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.result.gridPanel = function() {
    var gridStore = new Ext.data.ArrayStore({});
    var gridPanel = new Ext.grid.GridPanel({
        id: "phob_grid_resultPan",
        store: gridStore,
        autoScoll:true,
        collapsible:true,
        title: "Résultat",
        autoHeight:true,
        columns: [{
            xtype: "actioncolumn",
            id: "phob_col_photoRes",
            header: "Photo"
        },{
            xtype: "actioncolumn",
            id: "phob_col_zoomRes",
            header: "Zoom",
            sortable: true,
        },{
            id: "phob_col_dateRes",
            header: "Date",
            sortable: true,        
        },{
            id: "phob_col_IdRes",
            header: "ID",
        },{
            id: "phob_col_ownerRes",            
            header: "Propriétaire",
        },{
            id: "phob_col_prestRes",
            header: "Prestataire",
        },{
            xtype: "actioncolumn",
            id: "phob_col_panierRes",
            header: "Panier",
        }],
        viewConfig:{forceFit:true},
        cls: "grid-result-panel"
    });
    return gridPanel;    
};