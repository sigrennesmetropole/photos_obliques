Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.search.createGraphlayer = function() {
    var layerGraph;
    var map = GeoExt.MapPanel.guess().map;
    if (map.getLayersByName("phob_layer_sbg").length > 0) {
        map.getLayersByName("phob_layer_sbg")[0].destroy();
    }
    // get options
    var o = GEOR.Addons.Photos_obliques.globalOptions;
    // get default layer style option
    var styleLayer = new OpenLayers.StyleMap(o.styleGraphLayer);
    if (map) {
        var layerOptions = OpenLayers.Util.applyDefaults(
            this.layerOptions, {
                displayInLayerSwitcher: o.displayGraph,
                projection: map.getProjectionObject(),
                styleMap: styleLayer,
            }
        );
        layerGraph = new OpenLayers.Layer.Vector("phob_layer_sbg", layerOptions);
        map.addLayer(layerGraph);
        return layerGraph;
    }
};
GEOR.Addons.Photos_obliques.search.sbgPanel = function() {
    var epsg3948 = new OpenLayers.Projection("EPSG:3948");
    var layer, polygonControl, polygonControlOptions, map, layerOptions;
    var drawPolygon, deleteDraw;
    var buttonSbg = [];

    if (GeoExt.MapPanel.guess().map) {
        map = GeoExt.MapPanel.guess().map;
    }
    if (map.getLayersByName("phob_layer_sbg").length < 1) {
        layer = GEOR.Addons.Photos_obliques.search.createGraphlayer();
    } else {
        layer = GeoExt.MapPanel.guess().map.getLayersByName("phob_layer_sbg")[0]
    }

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
        "featureadded": function() {
            polygonControl.deactivate();
            drawPolygon.toggle(false);
            GEOR.Addons.Photos_obliques.drawnGeom = layer.features[0].geometry;
            var formParams = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm().getValues();
            GEOR.Addons.Photos_obliques.cleanParams(formParams, false);
            // fire research
            GEOR.Addons.Photos_obliques.searchFromGeom(epsg3948);
            Ext.getCmp("phob_btn_fire").enable();
        },
        scope: this
    });


    /**
     *  Create buttons
     */
    deleteDraw = new Ext.Button({
        iconCls: "phob-erase-icon",
        id: "phob_btn_delSbg",
        text: OpenLayers.i18n("photooblique.graphique.boutton.texteffacer"),
        iconAlign: "top",
        listeners: {
            "click": function() {

                // remove all layer features
                if (layer && layer.features.length > 0) {
                    layer.removeAllFeatures();
                }

                // disable form
                if (!Ext.getCmp("phob_fst_mainSbg").disabled) {
                    Ext.getCmp("phob_fst_mainSbg").disable();
                }
                polygonControl.deactivate();
                drawPolygon.toggle(false);

                // clean result list
                Ext.getCmp("phob_btn_fire").disable();
                var clBtn = Ext.getCmp("phob_btn_clRes");
                clBtn.fireEvent("click", clBtn);

                // clean form params
                var formParams = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm().getValues();
                GEOR.Addons.Photos_obliques.cleanParams(formParams, false);
            },
            scope: this
        }
    });

    drawPolygon = new Ext.Button({
        iconCls: "phob-draw-icon",
        id: "phob_btn_drawSbg",
        text: OpenLayers.i18n("photooblique.graphique.boutton.textdessiner"),
        enableToggle: true,
        pressed: false,
        checked: false,
        iconAlign: "top",
        listeners: {
            "click": function() {
                if (!Ext.getCmp("phob_fst_mainSbg").disabled) {
                    Ext.getCmp("phob_fst_mainSbg").disable();
                }
                if (!polygonControl.active) {
                    var clBtn = Ext.getCmp("phob_btn_clRes");
                    clBtn.fireEvent("click", clBtn)
                    map.addControl(polygonControl);
                    polygonControl.activate();
                } else {
                    polygonControl.deactivate();
                }
            },
            scope: this
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
                    if (polygonControl.active) {
                        polygonControl.deactivate()
                        drawPolygon.toggle(false);
                    }
                }
            },
            scope: this
        }
    });
};