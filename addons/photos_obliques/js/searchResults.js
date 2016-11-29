Ext.namespace("GEOR.Addons.Photos_obliques.result");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.result.createResultLayerExtend = function(map){
    if(map){
                
        // if layer already exit, remove it
        if(map.getLayersByName("phob_extendResultLayer").length == 0){
         // create layer and add to map
            var styleMap = new OpenLayers.StyleMap(GEOR.Addons.Photos_obliques.globalOptions.styleMapOptions);
            var layerOptions = OpenLayers.Util.applyDefaults(
                    this.layerOptions, {
                        displayInLayerSwitcher: false,                                    
                        projection: map.getProjectionObject(),
                        styleMap: styleMap
                    }
            );
            
            var extendLayer = new OpenLayers.Layer.Vector("phob_extendResultLayer", layerOptions);
            return map.addLayer(extendLayer);
        }
    }
};


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

GEOR.Addons.Photos_obliques.result.createResultLayer = function(map) {
    var tempLayer;

    if(map){
                
        // if layer already exit, remove it
        if(map.getLayersByName("phob_tempResultLayer").length == 0){
         // create layer and add to map
            var styleMap = new OpenLayers.StyleMap(GEOR.Addons.Photos_obliques.globalOptions.styleMapOptions);
            var layerOptions = OpenLayers.Util.applyDefaults(
                    this.layerOptions, {
                        displayInLayerSwitcher: false,                                    
                        projection: map.getProjectionObject(),
                        styleMap: styleMap
                    }
            );
            
            tempLayer = new OpenLayers.Layer.Vector("phob_tempResultLayer", layerOptions);
            return map.addLayer(tempLayer);
        }
    }
    
};

GEOR.Addons.Photos_obliques.result.gridPanel = function() {
    var gridStore, gridPanel;


    GEOR.Addons.Photos_obliques.result.resultStore = new Ext.data.JsonStore({
        id: "phob_store_result",
        // TODO : erase this url beacause of automatic load when search is fire
        url:"http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/gridData.php",
        root: "features",
        sortInfo:{
            field: "date_",
            direction: "ASC"
        },
        fields: [
            {name:"id",
                convert: function(v,rec){
                    return rec.properties.id;
                }
            },
            {name:"date_",
                convert: function(v,rec){
                    return rec.properties.date_;
                },
                type:"date",
                dateFormat:'timestamp'
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
            },{name:"geom",
                convert: function(v,rec){                    
                    return rec.geometry;
                }
            },{name:"url",
                convert: function(v,rec){
                    return rec.properties.url;
                }
            }                
        ],
        listeners: {
            "datachanged" : function(){
                if(gridPanel != undefined){
                    gridPanel.expand();
                }
                /*if(GEOR.Addons.Photos_obliques.search.comboStore){
                    var resultData = GEOR.Addons.Photos_obliques.result.resultStore.reader.jsonData;
                    
                    var gridData = Ext.encode(resultData);
                    
                    GEOR.Addons.Photos_obliques.search.comboStore.loadData(Ext.util.JSON.decode(gridData));
                    
                }*/
            }
        }
    });
    
    // voir reproj
    gridStore = GEOR.Addons.Photos_obliques.result.resultStore;
    gridStore.on("load",function(){
        if (gridStore.data.items.length > 0){
            for(b=0;b<gridStore.data.items.length;b++){
                var layer = GeoExt.MapPanel.guess().map.getLayersByName("phob_extendResultLayer")[0];
                var rec = gridStore.data.items[b].data.geom;
                var geomCoord = rec ? rec.coordinates[0] : null;
                
                if(geomCoord != null){
                    var vertices = [];
                    for(i=0 ; i < geomCoord.length ; i++){
                        var point = new OpenLayers.Geometry.Point(geomCoord[i][0],geomCoord[i][1]).transform(new OpenLayers.Projection("EPSG:3948"),new OpenLayers.Projection("EPSG:3857"));
                        vertices.push(point);
                    }
                    var ring = new OpenLayers.Geometry.LinearRing(vertices);
                    var createPolygon = new OpenLayers.Geometry.Polygon([ring]);
                    var feature = new OpenLayers.Feature.Vector(createPolygon);
                    console.log(feature);
                    layer.addFeatures(feature);
                }
            }
        }
    });    
    gridStore.load();

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
        collapsed: true,
        tbar: GEOR.Addons.Photos_obliques.resultToolbar(gridStore, gridPanel),
        colModel: new Ext.grid.ColumnModel({
            defaults: {
                align: "center"
            },
            columns: [{
                xtype: "actioncolumn",
                id: "phob_col_photoRes",
                header: 'Photo',
                dataIndex: 'url',
                renderer: function(value){
                    return '<img src="' + value + '" width="50" height="40" borer="0" />';
                },
            }, {
                xtype: "actioncolumn",
                id: "phob_col_zoomRes",
                header: "Zoom",
                dataIndex:'url',
                items: [{
                    tooltip: "Aggrandir",
                    getClass: function(val, meta, rec) {
                        return "phob-zoom-icon";
                    },
                    handler: function(val,meta,rec) {
                        var rowIndex = meta;
                        var rec = gridPanel.getStore().getAt(rowIndex);
                        var url = rec ? rec.data.url : null;
                        var win = new Ext.Window({
                            id:"phob_win_display",
                            html:'<img src="' + url + '" borer="2" />',
                            autoHeight: true,
                            autoWidth:true,
                            autoScroll:true,
                            closable:true
                        });                        
                        win.show();
                    }
                }]
            }, {
                id: "phob_col_dateRes",
                header: "Date",
                sortable: true,
                dataIndex: "date_",
                renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                sortable: true,
                dataIndex: "presta"
            }, {
                xtype: "actioncolumn",
                id: "phob_col_cartRes",
                tooltip: "Donwload", // TODO : Créer une variable de conf dans le config.json
                header: "Panier",
                getClass: function(val, meta, rec) {
                    if (rec.get("telecharg") < 1) {
                        this.tooltip = GEOR.Addons.Photos_obliques.globalOptions.adminMsgTooltip;
                        this.handler = function() {
                            Ext.MessageBox.alert("Contact",GEOR.Addons.Photos_obliques.globalOptions.adminMsgAlert );
                        };
                        return "phob-call-icon";
                    } else {
                        this.tooltip = "Télécharger";
                        this.handler = function() {
                        };
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
            "expand": updateShadow,
            "collapse": updateShadow,
            "mouseover": function(e,t){
                if (GeoExt.MapPanel.guess().map.getLayersByName("phob_tempResultLayer").length !== 0){
                    var layer = GeoExt.MapPanel.guess().map.getLayersByName("phob_tempResultLayer")[0];
                    
                 // get number of row and search this index in store data. Note that number change in store to if user sort column
                    var rowIndex = gridPanel.getView().findRowIndex(t);
                    var rec = gridPanel.getStore().getAt(rowIndex);
                    var geomCoord = rec ? rec.data.geom.coordinates[0] : null;
                    var vertices = [];
                    // if value exist create polygon from reproject coordinates and add to layer 
                    if(geomCoord != null){
                        for(i=0 ; i < geomCoord.length ; i++){
                            var point = new OpenLayers.Geometry.Point(geomCoord[i][0],geomCoord[i][1]).transform(new OpenLayers.Projection("EPSG:3948"),new OpenLayers.Projection("EPSG:3857"));
                            vertices.push(point);
                        }
                        var ring = new OpenLayers.Geometry.LinearRing(vertices);
                        var createPolygon = new OpenLayers.Geometry.Polygon([ring]);
                        var feature = new OpenLayers.Feature.Vector(createPolygon);
                        layer.addFeatures(feature);
                    }
                }              
            },
            "mouseout": function(){
                // destroy features if row is not over by mouse
                GeoExt.MapPanel.guess().map.getLayersByName("phob_tempResultLayer")[0].destroyFeatures();
                
            },
            scope: this
        }
    });
    
    var gridView = gridPanel.getView();
    gridView.on("");

    return gridPanel;
};