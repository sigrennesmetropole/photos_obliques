Ext.namespace("GEOR.Addons.Photos_obliques.search");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.search.sbgPanel = function() {
    var actionSbg = [];
    var deleteDraw = new Ext.Button({
        iconCls: "action-attribut-icon",
        text: "Effacer",
        allowDepress: false,
        pressed: false,
        enableToggle: true,
        toggleGroup: "menuSbg",
        iconAlign: "top",
        checked: false
    });

    var drawPolygon = new Ext.Button({
        iconCls: "action-attribut-icon",
        text: "Polygon",
        allowDepress: false,
        pressed: false,
        enableToggle: true,
        toggleGroup: "menuSbg",
        iconAlign: "top",
        checked: false
    });

    actionSbg.push(deleteDraw);
    actionSbg.push(drawPolygon);

    return new Ext.Container({
        id: "phob_form_mainSbg",
        hidden:true,
        border:true,
        autoHeight: true,
        anchor: "100%",
        items: [{
            xtype: 'toolbar',
            anchor:"95%",
            id: "phob_tbar_menuSbg",
            border: false,
            buttonAlign: 'center',
            items: [actionSbg]
        }]
    });
};