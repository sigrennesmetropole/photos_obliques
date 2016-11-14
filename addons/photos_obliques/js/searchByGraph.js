Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

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
        iconCls: "action-del-icon",
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
        iconCls: "action-graph-icon",
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