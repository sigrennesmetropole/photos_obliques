Ext.namespace("GEOR.Addons.Cadastre");

GEOR.Addons.Photos_obliques = Ext.extend(GEOR.Addons.Base, {

    window: null,

    /**
     * Method: init
     * 
     * @param: record - {Ext.data.record} a record with the addon parameters
     */
    init: function(record) {
    	
    	if (this.target) {
            // create a button to be inserted in toolbar:
    		this.components = this.target.insertButton(this.position, {
                xtype: 'button',
                tooltip: this.getTooltip(record),
                iconCls: "addon-photo-icon",
                handler: this._onCheckchange,
                scope: this
            });
            this.target.doLayout();
        } else {
        	// create a menu item for the "tools" menu:
            this.item =  new Ext.menu.CheckItem({
                text: this.getText(record),
                qtip: this.getQtip(record),
                iconCls: "addon-photo-icon",
                checked: false,
                listeners: {
                    "checkchange": this._onCheckchange,
                    scope: this
                }
            });
        }               
    },

    /**
     * Method: _onCheckchange
     * Callback on checkbox state changed
     */
    _onCheckchange: function(item, checked) {

    },

    /**
     * Method: destroy Called by GEOR_tools when deselecting this addon
     */
    destroy: function() {
        GEOR.Addons.Base.prototype.destroy.call(this);
    }

});