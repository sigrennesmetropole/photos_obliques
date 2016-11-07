Ext.namespace("GEOR.Addons.Photos_obliques.result");

GEOR.Addons.Photos_obliques.result.gridPanel = function() {
    var gridStore = new Ext.data.ArrayStore({});
    
    return new Ext.grid.GridPanel({
        id: "phob_grid_resultPan",
        store: gridStore,
        autoScoll:true,
        title:"Résultat",
        collapsible:true,
        autoHeight:true,
        resizable:true,
        columns: [{
            xtype: "actioncolumn",
            id: "phob_col_photoRes",
            width:80,
            header: "Photo"
        },{
            xtype: "actioncolumn",
            id: "phob_col_zoomRes",
            header: "Zoom",
            sortable: true,
            width: 80
        },{
            id: "phob_col_dateRes",
            header: "Date",
            width: 80,
            sortable: true,        
        },{
            id: "phob_col_IdRes",
            header: "ID",
            width: 80            
        },{
            id: "phob_col_ownerRes",            
            header: "Propriétaire",
            width: 80
        },{
            id: "phob_col_prestRes",
            header: "Prestataire",
            width: 80
        },{
            xtype: "actioncolumn",
            id: "phob_col_panierRes",
            header: "Panier",
            width: 80
        }],
        viewConfig:{forceFit:true},
        cls: "grid-result-panel"
    });
};