Ext.namespace("GEOR.Addons.Photos_obliques.cart");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

GEOR.Addons.Photos_obliques.onCart = function(){
    if (GEOR.Addons.Photos_obliques.cart.createCart == null || GEOR.Addons.Photos_obliques.cart.createCart.isDestroyed == true) {
        GEOR.Addons.Photos_obliques.InitCart();

    } else if (GEOR.Addons.Photos_obliques.cart.createCart.isVisible()) {
        GEOR.Addons.Photos_obliques.cart.createCart.hide();
    } else {
        GEOR.Addons.Photos_obliques.cart.createCart.show()
    }
};

GEOR.Addons.Photos_obliques.CreateDataView = function (){
    
    var store = new Ext.data.ArrayStore({});
    
    var dataview = new Ext.DataView({});
    
    var dataViewPanel = new Ext.Panel({
        items : dataview,
        height: 615,
        anchor: "99%",
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


GEOR.Addons.Photos_obliques.InitCart = function(){
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