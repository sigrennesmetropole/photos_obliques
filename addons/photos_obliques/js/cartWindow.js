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

GEOR.Addons.Photos_obliques.updateCartTitle = function(dataViewId, cartId) {
    var view = Ext.getCmp(dataViewId) ? Ext.getCmp(dataViewId) : null;
    if(view != null){
        var nbItems = view.getStore().data.length;
        var cart =  Ext.getCmp(cartId);
        cart.setTitle("Panier" + " (" +nbItems + (nbItems > 1 ? " Photos" : " Photo") + ")");
    }
};


/**
 * Create toolbar to be insert in cart window
 */

GEOR.Addons.Photos_obliques.cartToolbar = function(dataView) {
    var tbar = [];
    
    var unitClearBtn = new Ext.Button({
        id: "phob_bnt_unitCl",
        
        iconCls: "phob-clean-selection-icon",
        tooltip: "Supprimer la sélection",
        handler: function(){
            
            var view = Ext.getCmp("phob_dataView") ? Ext.getCmp("phob_dataView") : null;
            if(view != null){
                var records = view.getSelectedRecords();
                for(var i=0;i<records.length;i++){
                    view.store.remove(records[i]); 
                }
            GEOR.Addons.Photos_obliques.updateCartTitle("phob_dataView","phob_win_cart");

            }

        }
    });

    var unitDownloadBtn = new Ext.Button({
        id: "phob_bnt_unitGet",
        iconCls: "phob-download-selection-icon",
        tooltip: "Télécharger la sélection",
        handler: function() {
                            
        }
    });
    
    var cleanCartBtn = new Ext.Button({
        id: "phob_bnt_emptyCartA",
        iconCls: "phob-clean-icon",
        tooltip: "Vider le panier",
        handler: function() {
            if(Ext.getCmp("phob_dataView")){
                Ext.getCmp("phob_dataView").getStore().removeAll();
                GEOR.Addons.Photos_obliques.updateCartTitle("phob_dataView","phob_win_cart");             
                
            }
        }
    });
    var exportCsvBtn = new Ext.Button({
        id: "phob_bnt_csvCartB",
        tooltip: "Exporter en CSV",
        iconCls: "phob-csv-icon",
        handler: function() {
            alert("clic");
        }
    });
    var downloadBtn = new Ext.Button({
        id: "phob_bnt_dwnlCartC",
        tooltip: "Télécharger le panier",
        iconCls: "phob-download-icon",
        handler: function() {
            alert("clic");
        }
    });


    tbar.push(unitClearBtn);
    tbar.push(unitDownloadBtn);
    tbar.push("->");
    tbar.push(cleanCartBtn);
    tbar.push("-");
    tbar.push(exportCsvBtn);
    tbar.push(downloadBtn);
    
    var tbar =  new Ext.Toolbar({
        id: "phob_tbar_winCart",
        anchor: "30%",
        buttonAlign:"center",
        items: [tbar]
    });

    return tbar;
};


GEOR.Addons.Photos_obliques.initCart = function() {
    var photoStore = new Ext.data.JsonStore({
        url: 'http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-thumb.json',
        id: "phob_store_dataView",
        root: 'images',
        fields: ['name', 'url','id','date', {
            name: 'size',
            type: 'float'
        }, {
            name: 'tooltip',
            convert:function(val,rec){
                var textTip = "id: "+rec.id+"\n"+"date: "+rec.date; 
                return textTip;
            }            
        }],
        listeners: {
            "datachanged": function(){
                GEOR.Addons.Photos_obliques.updateCartTitle("phob_dataView","phob_win_cart");
            }
        }
    });
    
    photoStore.load();

    var tplArr = [];
    
    var tplMax = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
            '<div class="thumbMax"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{name}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
        
    var tplMidlMax = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
            '<div class="thumbMidlMax"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{name}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    var tplMidlMin = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
            '<div class="thumbMidlMin"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{name}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    var tplMin = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
            '<div class="thumbMin"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{name}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    tplArr.push(tplMin);
    tplArr.push(tplMidlMin);
    tplArr.push(tplMidlMax);
    tplArr.push(tplMax);
    
    var dataView = new Ext.DataView({
        id:"phob_dataView",
        store: photoStore,
        width:535,
        //autoHeight:true,
        tpl: tplMax,
        multiSelect: true,
        simpleSelect:true,
        overClass:'x-view-over',
        itemSelector:'div.thumb-wrap',
        emptyText: "Aucune image à afficher",
        plugins: [
            new Ext.DataView.DragSelector(),
            new Ext.DataView.LabelEditor({dataIndex: 'name'})
        ],
        listeners:{
            "dblclick": function(val, index, node,e ){                
                console.log(index);
                var rowIndex = index;
                var url = dataView.getStore().getAt(rowIndex) ? dataView.getStore().getAt(rowIndex).data.url : null;
                var htmlImg = (url !== null) ?'<img src="' + url + '" borer="2" />' : "";
                GEOR.Addons.Photos_obliques.manageResulttWindow(htmlImg);
            }
        }
    });
    

    
    var dataViewPanel = new Ext.Panel({
        id:"phob_pan_dataView",
        autoHeight:true,
        layout:"fit",
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
        bbar:[
            {xtype:"tbtext",text:"Vue Min"},
            {xtype:"tbspacer"},
            {
            xtype:"sliderfield",
            id:"phob_slid_cart",
            width: 100,
            useTips:false, // to display tips for the value 
            minValue: 0,
            maxValue: 3,
            increment:1,            
            listeners:{
                "valid":function(){
                    dataView.tpl = tplArr[this.getValue()];
                    dataView.refresh();                
                }
            }
        },{xtype:"tbtext",text:"Max"},],        
        buttons: [{
            labelAlign: "center",
            id: "phob_btn_cartClose",
            text: "Fermer",
            handler: function(){
                if(GEOR.Addons.Photos_obliques.cart.createCart){
                    GEOR.Addons.Photos_obliques.cart.createCart.hide();
                }
            }
        }]
    });
    
    GEOR.Addons.Photos_obliques.cart.createCart.show();   
};