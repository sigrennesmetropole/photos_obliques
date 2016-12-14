Ext.namespace("GEOR.Addons.Photos_obliques.cart");

/*
 * ID SPECIFICATION : (addon)_(type)_(label or text or name if exist)_(container
 * or name's function) ex: [phob_win_main_sba] is the id of the main window to
 * search by attribute in oblique photo addon
 */

/**
 * Method to managing the display of the dataviewer
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
            //document.location=GEOR.Addons.Photos_obliques.globalOptions.servicesUrls+"/createCSV"
            
            //TODO: replace by first
            document.location=GEOR.Addons.Photos_obliques.globalOptions.servicesUrl+"/createCSV?photoId=00_5021"
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

/**
 * Method to init dataview and parent window
 */

GEOR.Addons.Photos_obliques.initCart = function() {
    
    var maxCartNb = GEOR.Addons.Photos_obliques.globalOptions.cartNb;
    var maxCartSize = GEOR.Addons.Photos_obliques.globalOptions.cartSize;        
    
    var photoStore = new Ext.data.JsonStore({
        id: "phob_store_dataView",
        fields: ["photoId","size","url","tooltip",           
            {
                name:"date",
                type:"timestamp",
                dateFormat: ('Y-m-d')               
            }            
        ],
        listeners: {
            "clear":function(){
                GEOR.Addons.Photos_obliques.result.updateBar(0,0,maxCartNb,maxCartSize);
            },
            "remove": function(){
                //update progress bar
                var newSize = function(){
                    var dtItems = Ext.getCmp("phob_dataView").getStore().data.items;
                    var size = 0;
                    for( i = 0 ; i < dtItems.length ; i++){
                        size = size + dtItems[i].data.size;
                    }
                    return size;
                };
                GEOR.Addons.Photos_obliques.result.updateBar(this.getCount(),newSize(),maxCartNb,maxCartSize);
            },
            "datachanged": function(){
                GEOR.Addons.Photos_obliques.updateCartTitle("phob_dataView","phob_win_cart");
                console.log("data change");
            }
        }
    });
    
 
    var tplArr = [];
    
    var tplMax = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{photoId}">',
            '<div class="thumbMax"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{photoId}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
        
    var tplMidlMax = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{photoId}">',
            '<div class="thumbMidlMax"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{photoId}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    var tplMidlMin = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{photoId}">',
            '<div class="thumbMidlMin"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{photoId}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    var tplMin = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{photoId}">',
            '<div class="thumbMin"><img src="{url}" title="{tooltip}"></div>', // Pour modifier l'infobulle
            '<span class="x-editable">{photoId}</span></div>', // Pour modifier le titre sous les photos
            '</tpl>',
            '<div class="x-clear"></div>'
    );
    
    tplArr.push(tplMin);
    tplArr.push(tplMidlMin);
    tplArr.push(tplMidlMax);
    tplArr.push(tplMax);
    
    // create dataviewer to display air photos
    var dataView = new Ext.DataView({
        id:"phob_dataView",
        store: photoStore,
        width:535,
        autoHeight:true,
        tpl: tplMidlMin,
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
                GEOR.Addons.Photos_obliques.manageResultWindow(htmlImg);
            }
        }
    });
    

    // create Panel to welcome dataview
    var dataViewPanel = new Ext.Panel({
        id:"phob_pan_dataView",
        autoHeight:true,
        layout:"fit",
        items: [dataView]
    });
    
    // create global window to welcome dataview panel and others items
    GEOR.Addons.Photos_obliques.cart.createCart = new Ext.Window({
        title: "Panier",
        id: "phob_win_cart",
        autoScroll: true,
        width: 300,
        //heigth:300,
        constrainHeader:true,
        closeAction: "hide",
        autoHeigth: true,
        tbar: GEOR.Addons.Photos_obliques.cartToolbar(dataView),
        items: [dataViewPanel],
        bbar:[
            {xtype:"tbtext", text:"Vue Min"},
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
                    dataView.doLayout();
                    GEOR.Addons.Photos_obliques.cart.createCart.doLayout();
                    GEOR.Addons.Photos_obliques.cart.createCart.update();
                    GEOR.Addons.Photos_obliques.cart.createCart.syncSize();
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
    
    return GEOR.Addons.Photos_obliques.cart.createCart;   
};