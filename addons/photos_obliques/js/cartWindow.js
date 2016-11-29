Ext.namespace("GEOR.Addons.Photos_obliques.cart");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.onCart = function() {
    if (GEOR.Addons.Photos_obliques.cart.createCart == null || GEOR.Addons.Photos_obliques.cart.createCart.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.initCart();

    } else if (GEOR.Addons.Photos_obliques.cart.createCart.isVisible()) {
        GEOR.Addons.Photos_obliques.cart.createCart.hide();
    } else {
        GEOR.Addons.Photos_obliques.cart.createCart.show()
    }
};

GEOR.Addons.Photos_obliques.cartToolbar = function(dataView) {
    var tbar = [];
    var nbItems;
    var tbText;

    if (dataView) {
        nbItems = dataView.getNodes().length;
        tbText = {
            xtype: "tbtext",
            text: nbItems > 0 ? ((nbResult < 2) ? nbItems + " Photo " : nbItems + " Photos") : "-",
            id: "phob_txt_cart"
        };
        tbar.push(tbText);
    }   
    
    tbar.push("->");
    
    var cleanCartBtn = new Ext.Button({
        id: "phob_bnt_emptyCartA",
        iconCls: "phob-erase-icon",
        tooltip: "Delete all items",
        handler: function() {
            if(Ext.getCmp("phob_dataView")){
                Ext.getCmp("phob_dataView").getStore().removeAll();
                Ext.getCmp("phob_txt_cart").setText("0 Photo");
                
            }
        }
    });
    var exportCsvBtn = new Ext.Button({
        id: "phob_bnt_csvCartB",
        tooltip: "Export to CSV file",
        iconCls: "phob-csv-icon",
        handler: function() {
            alert("clic");
        }
    });
    var downloadBtn = new Ext.Button({
        id: "phob_bnt_dwnlCartC",
        tooltip: "Donwload selection",
        iconCls: "phob-download-icon",
        handler: function() {
            alert("clic");
        }
    });


    tbar.push(cleanCartBtn);
    tbar.push(exportCsvBtn);
    tbar.push(downloadBtn);

    return new Ext.Toolbar({
        id: "phob_tbar_winCart",
        anchor: "100%",
        items: [tbar]
    });
};


GEOR.Addons.Photos_obliques.initCart = function() {
    var photoStore = new Ext.data.JsonStore({
        url: 'http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-thumb.json',
        id: "phob_store_dataView",
        root: 'images',
        fields: ['name', 'url', {
            name: 'size',
            type: 'float'
        }, {
            name: 'lastmod',
            type: 'date',
            dateFormat: 'timestamp'
        }],
        listeners: {
            "datachanged": function(){
                nbItems = this.data.length;
                Ext.getCmp("phob_txt_cart").setText( nbItems + (nbItems > 1 ? " Photos" : " Photo"));
            }
        }
    });
    
    photoStore.load();

    var tpl = new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="thumb-wrap" id="{name}">',
        '<div class="thumb"><img src="{url}" title="{name}"></div>',
        '<span class="x-editable">{shortName}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    );
    
    var dataView = new Ext.DataView({
        id:"phob_dataView",
        store: photoStore,
        width:535,
        height:600,
        tpl: tpl,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.thumb-wrap',
        emptyText: 'No images to display',
        plugins: [
            new Ext.DataView.DragSelector(),
            new Ext.DataView.LabelEditor({dataIndex: 'name'})
        ],          
        listeners: {            
            selectionchange: {
                fn: function(dv,nodes){
                    var l = nodes.length;
                    var s = l > 1 ? 's' : '';
                    dataViewPanel.setTitle( +l+' photo'+s+' sélectionnée'+s);
                }
            }
        }
    });
    

    var dataViewPanel = new Ext.Panel({
        id:"phob_pan_dataView",
        frame:true,
        title: '0 photo sélectionnée',
        layout:'fit',        
        items: [dataView]
    });
    
    GEOR.Addons.Photos_obliques.cart.createCart = new Ext.Window({
        title: "Panier",
        id: "phob_win_cart",
        autoScroll: true,
        width: 300,
        heigth:300,
        constrainHeader:true,
        closeAction: "hide",
        autoHeigth: true,
        tbar: GEOR.Addons.Photos_obliques.cartToolbar(dataView),
        items: [dataViewPanel],
        buttons: [{
            labelAlign:"center",
            text: "Retirer",
            tooltip: "Remove only selected items",
            handler: function(){
                var view = Ext.getCmp("phob_dataView") ? Ext.getCmp("phob_dataView") : null;
                if(view != null){
                    var records = view.getSelectedRecords();
                    for(var i=0;i<records.length;i++){
                        view.store.remove(records[i]); 
                    }
                    var nbItems = view.getStore().data.length;
                    Ext.getCmp("phob_txt_cart").setText( nbItems + (nbItems > 1 ? " Photos" : " Photo"));
                }

            }
        },{
            labelAlign: "center",
            id: "phob_btn_cartClose",
            text: "Annuler",
            handler: function(){
                if(GEOR.Addons.Photos_obliques.cart.createCart){
                    GEOR.Addons.Photos_obliques.cart.createCart.hide();
                }
            }
        }]
    });
    
    GEOR.Addons.Photos_obliques.cart.createCart.show();   
};