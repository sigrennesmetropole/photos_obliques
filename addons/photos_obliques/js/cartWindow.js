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


/**
 * Method to download zip or export in csv
 */
GEOR.Addons.Photos_obliques.result.getDocument = function(dataArray,fieldId,serviceName,paramRequest) {
    var paramUrl = "";
    var addonOptions = GEOR.Addons.Photos_obliques.globalOptions;    
    var getService = "/"+serviceName+"?";
    // Set params with ID from data array
    if(dataArray && dataArray.length > 0){
        
        for (var t=0 ; t<dataArray.length ; t++){
            if (t !== 0){                    
                paramUrl += "&"+fieldId+"="+dataArray[t].data.photoId;
            } else {
                paramUrl = fieldId+"="+dataArray[t].data.photoId;
            }
        }
        
    } else {
        if (Array.isArray(paramRequest) && fieldId == "id"){
            paramUrl += paramRequest;
        }
        var valCities = (paramRequest.cities !== "" && paramRequest.cities !== undefined )  ? paramRequest.cities : "";
        var valOwner = paramRequest.owner ?  paramRequest.owner : "";
        var valStartPeriod = paramRequest.startPeriod ? paramRequest.startPeriod : "";
        var valEndPeriod = paramRequest.endPeriod ? paramRequest.endPeriod : "" ;
        paramUrl = 
            "&owner="+valOwner+
            "&startPeriod="+valStartPeriod+
            "&endPeriod"+"="+valEndPeriod;
        
        if(valCities !== ""){
            var arrCities = valCities;
            // control if it's array to split or not
            if(!Array.isArray(valCities)){
                arrCities = valCities.split(/[,]/);
            }            
            for (var r=0; r < arrCities.length; r++){
                paramUrl += "&cities="+arrCities[r];
            }
        }        
    }
    // create window to accept mention
    // TODO : change type window to just click on Ok and not on yes / no
    if(serviceName == "createZip"){
        var triggerDl = function(){
            return document.location=addonOptions.servicesUrl+getService+paramUrl
        };
        
        Ext.MessageBox.show({
            title : OpenLayers.i18n("photooblique.panier.titre.messagemention"),
            msg : addonOptions.downloadMsg,
            maxWidth : 500,
            buttons : Ext.MessageBox.OK,
            fn : triggerDl,
            icon : Ext.MessageBox.INFO
        });
    } else {
        document.location=addonOptions.servicesUrl+getService+paramUrl;
    }    
};

/**
 * Create toolbar to be insert in cart window
 */

GEOR.Addons.Photos_obliques.cartToolbar = function(dataView) {
    var tbarArr = [];
    
    var unitClearBtn = new Ext.Button({
        id: "phob_bnt_unitCl",
        
        iconCls: "phob-clean-selection-icon",
        tooltip: OpenLayers.i18n("photooblique.panier.bouton.retirerselection"),
        handler: function(){            
            var view = Ext.getCmp("phob_dataView") ? Ext.getCmp("phob_dataView") : null;
            if(view != null){
                var records = view.getSelectedRecords();
                for(var y=0;y<records.length;y++){
                    view.store.remove(records[y]); 
                }
            }

        }
    });

    var unitDownloadBtn = new Ext.Button({
        id: "phob_bnt_unitGet",
        iconCls: "phob-download-selection-icon",
        tooltip: OpenLayers.i18n("photooblique.panier.bouton.telechargementunitaire"),
        handler: function() {
            var arrayItems  = dataView.getSelectedRecords();
            var fieldId = "photoId";
            var service = "createZip";
            GEOR.Addons.Photos_obliques.result.getDocument(arrayItems, fieldId, service);                            
        }
    });
    
    var cleanCartBtn = new Ext.Button({
        id: "phob_bnt_emptyCartA",
        iconCls: "phob-clean-icon",
        tooltip: OpenLayers.i18n("photooblique.panier.bouton.retirerselection"),
        handler: function() {
            if(Ext.getCmp("phob_dataView")){
                Ext.getCmp("phob_dataView").getStore().removeAll();                
            }
        }
    });
    var exportCsvBtn = new Ext.Button({
        id: "phob_bnt_csvCartB",
        tooltip: OpenLayers.i18n("photooblique.panier.bouton.exportercsv"),
        iconCls: "phob-csv-icon",
        handler: function() {
            var arrayItems  = dataView.getStore().data.items;
            var fieldId = "photoId";
            var service = "createCSVById";
            GEOR.Addons.Photos_obliques.result.getDocument(arrayItems, fieldId, service);          
        }            
    });
    var downloadBtn = new Ext.Button({
        id: "phob_bnt_dwnlCartC",
        tooltip: OpenLayers.i18n("photooblique.panier.bouton.telechargerpanier"),
        iconCls: "phob-download-icon",
        handler: function() {
            var arrayItems  = dataView.getStore().data.items;
            var fieldId = "photoId";
            var service = "createZip";
            GEOR.Addons.Photos_obliques.result.getDocument(arrayItems, fieldId, service);
        }
    });


    tbarArr.push(unitClearBtn);
    tbarArr.push(unitDownloadBtn);
    tbarArr.push("->");
    tbarArr.push(cleanCartBtn);
    tbarArr.push("-");
    tbarArr.push(exportCsvBtn);
    tbarArr.push(downloadBtn);
    
    var tbar =  new Ext.Toolbar({
        id: "phob_tbar_winCart",
        anchor: "30%",
        buttonAlign:"center",
        items: [tbarArr]
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
        emptyText: OpenLayers.i18n("photooblique.dataview.textevide"),
        plugins: [
            new Ext.DataView.DragSelector(),
            new Ext.DataView.LabelEditor({dataIndex: 'name'})
        ],
        listeners:{
            "dblclick": function(val, index, node,e ){                
                var rowIndex = index;
                var url = dataView.getStore().getAt(rowIndex) ? dataView.getStore().getAt(rowIndex).data.url : null;
                var name = dataView.getStore().getAt(rowIndex) ? dataView.getStore().getAt(rowIndex).data.photoId : "";
                var htmlImg = (url !== null) ?'<img src="' + url + '" borer="2" />' : "";
                GEOR.Addons.Photos_obliques.manageResultWindow(htmlImg,name);
            }
        }
    });
    
    dataView.store.on("add", function(){
        if(dataView.store.data.length == 1){
            if(Ext.getCmp("phob_slid_cart")){
                Ext.getCmp("phob_slid_cart").setValue(1);
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
        title: OpenLayers.i18n("photooblique.panier.titre"),
        id: "phob_win_cart",
        autoScroll: true,
        width: 300,
        minHeigth:300,
        constrainHeader:true,
        closeAction: "hide",
        //autoHeigth: true,
        tbar: GEOR.Addons.Photos_obliques.cartToolbar(dataView),
        items: [dataViewPanel],
        bbar:[
            {xtype:"tbtext", text:OpenLayers.i18n("photooblique.panier.slidertext")},
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
                    if(dataView.isVisible()){
                        dataView.tpl = tplArr[this.getValue()];
                        dataView.refresh();
                    }
                }
            }
        },{xtype:"tbtext",text:"+"},],        
        buttons: [{
            labelAlign: "center",
            id: "phob_btn_cartClose",
            text: OpenLayers.i18n("photooblique.panier.boutonfermer"),
            handler: function(){
                if(GEOR.Addons.Photos_obliques.cart.createCart){
                    GEOR.Addons.Photos_obliques.cart.createCart.hide();
                }
            }
        }]
    });
    
    return GEOR.Addons.Photos_obliques.cart.createCart;   
};