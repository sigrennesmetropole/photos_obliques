Ext.namespace("GEOR.Addons.Photos_obliques.cart");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.onCart = function(){
    if (GEOR.Addons.Photos_obliques.cart.createCart == null || GEOR.Addons.Photos_obliques.cart.createCart.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.initCart();

    } else if (GEOR.Addons.Photos_obliques.cart.createCart.isVisible()) {
        GEOR.Addons.Photos_obliques.cart.createCart.hide();
    } else {
        GEOR.Addons.Photos_obliques.cart.createCart.show()
    }
};

GEOR.Addons.Photos_obliques.CreateDataView = function (){
    
    var store = new Ext.data.JsonStore({
        id: "storeDataView",
        proxy:new Ext.data.HttpProxy({
            url:"http://cdn.sencha.com/ext/gpl/3.4.1.1/examples/view/get-images.php",
            method:"GET"
        }),
        root: "images",
        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
    });
        
    var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="thumb-wrap" id="{name}">',
                '<div class="thumb"><img src="{url}" title="{name}"></div>',
                '<span class="x-editable">{shortName}</span></div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        );
    
    var dataViewer = new Ext.DataView({
        store: store,
        autoheight: true,
        multiSelect: true,
        overClass: "x-view-over",
        itemSelector: "div-thumb-wrab",
        emptyText: "No images to display",
        plugins: [
            new Ext.DataView.DragSelector(),
            new Ext.DataView.LabelEditor({dataIndex: 'name'})
        ],
        prepareData: function(data){
            data.shortName = Ext.util.Format.ellipsis(data.name, 15);
            data.sizeString = Ext.util.Format.fileSize(data.size);
            data.dateString = data.lastmod.format("m/d/Y g:i a");
            return data;
        },
        listeners: {
            selectionchange: {
                fn: function(dv,nodes){
                    var l = nodes.length;
                    var s = l != 1 ? 's' : '';
                    panel.setTitle('Simple DataView ('+l+' item'+s+' selected)');
                }
            }
        }
    });
    
    var dataViewPanel = new Ext.Panel({
        height: 615,
        anchor: "99%",
        items:[dataViewer]
    });
    
    return dataViewPanel;

};

GEOR.Addons.Photos_obliques.cartToolbar = function (){
    var tbar = [];
    var cleanCartBtn = new Ext.Button({
        id: "phob_bnt_cleanCartA",
        iconCls:"action-basket-icon",
        handler: function(){
            alert("clic");
        }
    });
    var exportCsvBtn = new Ext.Button({
        id: "phob_bnt_csvCartB",
        iconCls:"action-basket-icon",
        handler: function(){
            alert("clic");
        }
    });
    var downloadBtn = new Ext.Button({
        id: "phob_bnt_dwnlCartC",
        iconCls:"action-basket-icon",
        handler: function(){
            alert("clic");
        }
    });
    
    
    tbar.push(cleanCartBtn);
    tbar.push(exportCsvBtn);
    tbar.push(downloadBtn);
    tbar.push("->");
    tbar.push("127 photos");
    
    return new Ext.Toolbar({
        id: "phob_tbar_winCart",
        anchor:"100%",
        items:[tbar]
    });
};


GEOR.Addons.Photos_obliques.initCart = function(){
    GEOR.Addons.Photos_obliques.cart.createCart= new Ext.Window({
        title: "Panier",
        id: "phob_win_cart",
        autoScroll : true,
        width: 500,
        closeAction: "hide",
        autoHeigth: true,
        tbar:GEOR.Addons.Photos_obliques.cartToolbar(),
        items: [GEOR.Addons.Photos_obliques.CreateDataView()],
        buttons: [{
            labelAlign : "center",
            id : "phob_btn_cartClose",
            text : "Annuler",
            handler: function(){
                GEOR.Addons.Photos_obliques.onCart();
            }
        }]
    });
    GEOR.Addons.Photos_obliques.cart.createCart.show();    
};