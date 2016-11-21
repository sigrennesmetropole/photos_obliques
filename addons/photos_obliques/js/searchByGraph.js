Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

/**
 *  create combo period for search by graph tool
 */
GEOR.Addons.Photos_obliques.search.cbGraphFrom = function (){
    var store;
    return  new Ext.form.ComboBox({    
        id: "phob_cb_FromSbg",
        store: store,
        anchor: "50%",
        fieldLabel: "Période ",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'annee'
    }); 
};
GEOR.Addons.Photos_obliques.search.cbGraphTo = function (){
    var store;
    return  new Ext.form.ComboBox({    
        id: "phob_cb_ToSbg",
        store: store,
        anchor: "50%",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'annee'
    }); 
};
GEOR.Addons.Photos_obliques.search.cbGraphOwner = function (){
    var store;
    return  new Ext.form.ComboBox({    
        id: "phob_cb_ToSbg",
        store: store,
        anchor: "99%",
        fieldLabel: "Propriétaire ",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'proprio'
    }); 
};
GEOR.Addons.Photos_obliques.search.cbGraphCom = function (){
    var store;
    return  new Ext.form.ComboBox({    
        id: "phob_cb_ownerSbg",
        store: store,
        anchor: "99%",
        fieldLabel: "Communes ",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'commune'
    }); 
};

/**
 *  Create combos container
 */

GEOR.Addons.Photos_obliques.search.searchBygraph = function() {
    var nameSpace = GEOR.Addons.Photos_obliques.search;
    var cpField = [{
        xtype: "fieldset",
        border: false,
        id: "phob_fst_mainSbg",
        anchor: "100%",
        items: [{
            xtype: "compositefield",
            id: "phob_cpf_fstSbg",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {
                flex: 1
            },
            items: [nameSpace.cbGraphFrom(), nameSpace.cbGraphTo()]
        },nameSpace.cbGraphCom(), nameSpace.cbGraphOwner()]
    }];

    return cpField;
};

/**
 *  replace attributes combo stores by resultPanel store  or defaults store
 */
/*GEOR.Addons.Photos_obliques.search.changeAttributesStore = function(graph){
    if (graph){
        //var resultStore = Ext.getCmp("phob_grid_resultPan") ? Ext.getCmp("phob_grid_resultPan").getStore() : null;
        
        var resultStore = new Ext.data.JsonStore({
            id: "phob_store_graph",
            root: "result.resultArray",
            fields: ["annee", "commune", "proprio", "id"]
        });
        if (Ext.getCmp("phob_fst_mainSba")) {
            Ext.getCmp("phob_cb_ownerSba").store = resultStore;
            Ext.getCmp("phob_cb_comSba").store = resultStore;
            Ext.getCmp("phob_cb_toSba").store = resultStore;
            Ext.getCmp("phob_cb_fromSba").store = resultStore;
        }
        resultStore.data = Ext.getCmp("phob_grid_resultPan").getStore().data;          

    } else {
        var nameSpace = GEOR.Addons.Photos_obliques.search;
        if (Ext.getCmp("phob_fst_mainSba")) {
            Ext.getCmp("phob_cb_ownerSba").store = nameSpace.storeOwner();
            Ext.getCmp("phob_cb_comSba").reset();
            Ext.getCmp("phob_cb_toSba").store = nameSpace.storePeriodTo();
            Ext.getCmp("phob_cb_fromSba").store = nameSpace.storePeriodFrom();
        }
    }
};*/



GEOR.Addons.Photos_obliques.search.sbgPanel = function() {
    var layer, polygonControl, polygonControlOptions, map, layerOptions;
    var drawPolygon, deleteDraw;
    var buttonSbg = [];

    if (GeoExt.MapPanel.guess().map) {
        map = GeoExt.MapPanel.guess().map;
    }

    /**
     *  Create layer
     */
    var layerOptions = OpenLayers.Util.applyDefaults(
        this.layerOptions, {
            displayInLayerSwitcher: false,
            projection: map.getProjectionObject()
        }
    );
    layer = new OpenLayers.Layer.Vector("phob_layer_sbg", layerOptions);

    /**
     *  Create draw control
     */ 
    polygonControlOptions = OpenLayers.Util.applyDefaults(
        this.polygonControlOptions, {
            id: "phob_ctrl_sbg"
        }
    );
    polygonControl = new OpenLayers.Control.DrawFeature(layer, OpenLayers.Handler.Polygon);

    polygonControl.handler.callbacks.point = function(data) {
        if (layer.features.length > 0) {
            layer.removeAllFeatures();
        }
    };
    
    polygonControl.events.on({
        "featureadded": function(){
            polygonControl.deactivate();
            drawPolygon.toggle(false);
            Ext.getCmp("phob_btn_fire").enable();
        },
        scope: this
    });
    
    
    /**
     *  Create buttons
     */
    var deleteDraw = new Ext.Button({
        iconCls: "phob-clean-icon",
        id: "phob_btn_delSbg",
        text: "Effacer",
        iconAlign: "top",
        listeners:{ 
            "click":function() {
                if (layer && layer.features.length > 0) {
                    layer.removeAllFeatures();
                }
                if(!Ext.getCmp("phob_fst_mainSba").disabled){
                    Ext.getCmp("phob_fst_mainSba").disable();
                }
                polygonControl.deactivate();
                drawPolygon.toggle(false);
                Ext.getCmp("phob_btn_fire").disable();        
            }, scope:this
        }
    });

    var drawPolygon = new Ext.Button({
        iconCls: "phob-draw-icon",
        id: "phob_btn_drawSbg",
        text: "Polygon",
        enableToggle:true,
        pressed: false,
        checked:false,
        iconAlign: "top",
        listeners: {
            "click": function() {
                if (!polygonControl.active) {
                    map.addControl(polygonControl);
                    polygonControl.activate();
                } else {
                    polygonControl.deactivate();
                    this.toggle(false);
                }
            }, scope:this
        }
    });
    buttonSbg.push(drawPolygon);
    buttonSbg.push("-");
    buttonSbg.push(deleteDraw);
    
    /**
     *  Create container return by function
     */ 

    return new Ext.Container({
        id: "phob_form_mainSbg",
        hidden: true,
        border: true,
        autoHeight: true,
        anchor: "100%",
        items: [{
            xtype: "toolbar",
            anchor: "95%",
            id: "phob_tbar_menuSbg",
            border: false,
            buttonAlign: "left",
            items: [buttonSbg]
        }],
        listeners: {
            "added": function() {
                if (map) {
                    map.addLayer(layer);
                }
            },
            "show": function() {
                if (map) {
                    map.addLayer(layer);
                }
            },
            "beforehide": function() {
                if (map) {
                    map.removeLayer(layer);
                    if(polygonControl.active){
                        polygonControl.deactivate()
                        drawPolygon.toggle(false);
                    }
                }
            },
            scope: this
        }
    });
};