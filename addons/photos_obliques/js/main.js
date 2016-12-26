Ext.namespace("GEOR.Addons.Photos_obliques");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container or
 * name"s function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques = Ext.extend(GEOR.Addons.Base, {

    window: null,
    actions: null,

    /**
     * Method: init
     * 
     * @param: record - {Ext.data.record} a record with the addon parameters
     */
    init: function(record) {
        var tr = OpenLayers.i18n();
        // Set map object or create it
        if (this.map instanceof GeoExt.MapPanel) {
            this.map = this.map.map;
        }

        if (!this.map) {
            this.map = GeoExt.MapPanel.guess().map;
        }
        
        GEOR.Addons.Photos_obliques.globalOptions = this.options;
        GEOR.Addons.Photos_obliques.initResultUtils();
        GEOR.Addons.Photos_obliques.initUtils();
        GEOR.Addons.Photos_obliques.initMainWindow();
        GEOR.Addons.Photos_obliques.createResultLayers(this.map);
        GEOR.Addons.Photos_obliques.search.createGraphlayer(this.map);
        GEOR.Addons.Photos_obliques.initCart();
        GEOR.Addons.Photos_obliques.params = {};

        // Call non visible airphotos WFS 

        // Create main addon menu with actions
        var actionItems = [];

        var attributesAction = new Ext.Button({
            id: "phob_btn_attribut",
            enableToggle: true,
            pressed: false,
            checked: false,
            toggleGroup: "phob_menuBtn",
            iconCls: "phob-att-icon",
            text: OpenLayers.i18n("photooblique.menu.bouton.attributaire"),
            iconAlign: "top",
            handler: function() {
                if (Ext.getCmp("phob_win_search")) {
                    Ext.getCmp("phob_win_search").setTitle(
                            OpenLayers.i18n("photooblique.fenetre.titre.rechercheattributaire")
                            );
                }
                if (Ext.getCmp("phob_form_mainSbg") && !Ext.getCmp("phob_form_mainSbg").hidden) {
                    Ext.getCmp("phob_form_mainSbg").hide();
                }
                if (this.pressed) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
                return GEOR.Addons.Photos_obliques.onSearch(this,this.id, this.checked); //false to not show graphic search tools
            }
        });

        var graphAction = new Ext.Button({
            id: "phob_btn_graph",
            enableToggle: true,
            pressed: false,
            toggleGroup: "phob_menuBtn",
            iconCls: "phob-graph-icon",
            text: OpenLayers.i18n("photooblique.menu.bouton.graphique"),
            iconAlign: "top",
            handler: function() {
                if (Ext.getCmp("phob_win_search")) {
                    Ext.getCmp("phob_win_search").setTitle(
                            OpenLayers.i18n("photooblique.fenetre.titre.recherchegraphique")
                            );
                }
                if (Ext.getCmp("phob_form_mainSbg") && Ext.getCmp("phob_form_mainSbg").hidden) {
                    Ext.getCmp("phob_form_mainSbg").show();

                }
                if (this.pressed) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
                return GEOR.Addons.Photos_obliques.onSearch(this);
            }
        });

        var basketAction = new Ext.Button({
            id: "phob_btn_basket",
            iconCls: "phob-cart-icon",
            text: OpenLayers.i18n("photooblique.menu.bouton.panier"),
            iconAlign: "top",
            handler: GEOR.Addons.Photos_obliques.onCart
        });

        actionItems.push(attributesAction);
        actionItems.push("-");
        actionItems.push(graphAction);
        actionItems.push("-");
        actionItems.push(basketAction);

        this.window = new Ext.Window({
            title: OpenLayers.i18n("photooblique.fenetre.titre.principal"),
            id: "phob_win_menu",
            closable: true,
            autoWidth: true,
            autoHeight: true,
            maxWidth: 200,
            closeAction: "hide",
            border: false,
            constrainHeader: true,
            tbar: actionItems,
            listeners:{
                "hide":function(){
                if(Ext.getCmp("phob_win_cart")){
                    Ext.getCmp("phob_win_cart").hide();
                }
                if(Ext.getCmp("phob_win_search")){
                    Ext.getCmp("phob_win_search").hide();
                }
                }
            }
        });

        if (this.target) {

            // create a button to be inserted in toolbar:

            this.components = this.target.insertButton(this.position, {
                xtype: "button",
                id: "phob_btn_tbar",
                tooltip: this.getTooltip(record),
                pressed: false,
                iconCls: "phob-tbar-icon",
                handler: this._onCheckchange,
                scope: this
            });

            this.target.doLayout();

        } else {
            // create a menu item for the "tools" menu
            this.item = new Ext.menu.CheckItem({
                id: "phot_chck_toolsMenu",
                text: this.getText(record),
                qtip: this.getQtip(record),
                iconCls: "phob-tool-menu-icon",
                handler: this._onCheckchange,
                scope:this
            });
        }
    },

    /**
     * Method: _onCheckchange Callback on checkbox state changed
     */
    _onCheckchange: function(item, checked) {
        if (checked && !this.window.isVisible()) {
            this.window.show();
        } else {
            this.window.hide();
            if(Ext.getCmp("phob_win_cart")){
                Ext.getCmp("phob_win_cart").hide();
            }
            if(Ext.getCmp("phob_win_search")){
                Ext.getCmp("phob_win_search").hide();
            }
        }
    },

    /**
     * Method: destroy Called by GEOR_tools when deselecting this addon
     */
    destroy: function() {
        if (this.window) {
            this.window.destroy();
            
            // remove all window
            if(Ext.getCmp("phob_win_cart")){
                Ext.getCmp("phob_win_cart").close();
            }
            if(Ext.getCmp("phob_win_search")){
                Ext.getCmp("phob_win_search").close();
            }
        }
        GEOR.Addons.Base.prototype.destroy.call(this);
    }

});