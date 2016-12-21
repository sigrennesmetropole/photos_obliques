Ext.namespace("GEOR.Addons.Photos_obliques.search");

/**
 *  Create store and owner combo for graph tool
 *  Params: store receive array from a first selection
 */

GEOR.Addons.Photos_obliques.search.cbGraphOwner = new Ext.form.ComboBox({
    id: "phob_cb_ownerSbg",
    triggerAction: 'all',
    mode:"local",
    editable: true,
    store:new Ext.data.ArrayStore({
        id:"phob_store_ownerSbg",
        sortInfo: {
            field: "owner",
            direction: "ASC"
        },
        fields: [{
            name:"owner",                
            convert : function(val,rec){
                return rec;
            }
        }]
    }),
    anchor: "99%",
    displayField: "owner",
    fieldLabel:"Propriétaire ",
    hiddenName:"owner",
    emptyText:"propriétaire"        
});

/**
 *  Create store and start period combo for graph tool
 *  Params: store receive array from a first selection
 */

GEOR.Addons.Photos_obliques.search.cbGraphStartPeriod = new Ext.form.ComboBox({
    id: "phob_cb_startSbg",
    triggerAction: 'all',
    mode:"local",
    editable: true,
    store:new Ext.data.ArrayStore({
        id:"phob_store_startSbg",
        sortInfo: {
            field: "annee",
            direction: "ASC"
        },
        fields: [{
            name:"annee",                
            convert : function(val,rec){
                return rec;
            }
        }]
    }),
    anchor: "50%",
    displayField: "annee",
    hiddenName:"startPeriod",
    maskRe:/[0-9]/,
    maxLength:4,
    emptyText:"Début de période...",
    listeners:{
        "select": function(combo, record) {
            // control value for end period
            var val = combo.getValue();
            var endCb = GEOR.Addons.Photos_obliques.search.cbGraphEndPeriod;
            var cbTo = endCb ? endCb : null;
            if (cbTo !== null) {
                if (cbTo.getValue() !== 0 && (val > cbTo.getValue())) {
                    cbTo.setValue(val);
                }
            }
        }
    }
});




/**
 *  Create store and end period combo for graph tool
 *  Params: store array from a first selection
 */

GEOR.Addons.Photos_obliques.search.cbGraphEndPeriod = new Ext.form.ComboBox({
    id: "phob_cb_endSbg",
    triggerAction: 'all',
    mode:"local",
    editable: true,
    store:new Ext.data.ArrayStore({
        id:"phob_store_endSbg",
        sortInfo: {
            field: "annee",
            direction: "ASC"
        },
        fields: [{
            name:"annee",                
            convert : function(val,rec){
                return rec;
            }
        }]
    }),
    anchor: "50%",
    displayField: "annee",
    hiddenName:"endPeriod",
    maskRe:/[0-9]/,
    maxLength:4,
    emptyText:"Début de période...",
    listeners:{
        "select": function(combo, record) {
            // control value for end period
            var val = combo.getValue();
            var endCb = GEOR.Addons.Photos_obliques.search.cbGraphStartPeriod;
            var cbTo = endCb ? endCb : null;
            if (cbTo !== null) {
                if (cbTo.getValue() !== 0 && (val < cbTo.getValue())) {
                    cbTo.setValue(val);
                }
            }
        }
    }    
});


/**
 * Create end period combo store to search by attributes filter
 * Param : store receive json from services
 */

GEOR.Addons.Photos_obliques.search.comStore = function (id,url) {   
    var comStore = new Ext.data.JsonStore({
        id: id,
        root: "communes",
        fields: [{
            name:"code",
            convert: function(v,rec){
                var intValue = parseInt(rec.key,10);
                return intValue
            }
        },{
            name:"communes",
            convert: function(v,rec){
                var name = rec.value;
                var code = rec.key;
                var display = name+" ("+code+")";
                return display;
            }
        }],
        proxy: new Ext.data.HttpProxy({
            url:url + "/getCommunes",
            method: 'GET',
            autoLoad:true
        }),
        listeners:{
            "beforeload": function(){
                var searchWinForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm(); 
                var searchParams = searchWinForm.getValues();
                if (searchParams.endPeriod != ""){
                    this.baseParams.endPeriod = searchParams.endPeriod;                    
                }
                if (searchParams.startPeriod !=""){
                    this.baseParams.startPeriod= searchParams.endPeriod;
                }
            },
            "select":function(){
                if(Ext.getCmp("phob_store_toSba").getValues() != ""){
                    Ext.getCmp("phob_store_fromSba").load();
                }
                if(Ext.getCmp("phob_store_fromSba").getValues() != ""){
                    Ext.getCmp("phob_store_toSba").load();
                }
            }
        }
    });
        
    return comStore;
};

/**
 * Create combo for set attributes filters
 */

GEOR.Addons.Photos_obliques.search.comboAttributesCom = function(id){
    var storeId = id+"Store"
    var storeUrl= GEOR.Addons.Photos_obliques.globalOptions.servicesUrl; 
    var store = GEOR.Addons.Photos_obliques.search.comStore(storeId,storeUrl);

    return new Ext.ux.form.LovCombo({
        store:store,
        id: id,
        displayField:"communes",
        triggerAction:'all',
        emptyText: "Code ou nom de commune...",
        anchor:"99%",
        fieldLabel: "Communes",
        valueField:"code",
        selectOnFocus: false,
        hideOnSelect:false,
        hiddenName:"cities",
        assertValue : Ext.emptyFn,
        listeners:{
            "beforequery": function(){
                var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm(); 
                var searchParams = searchForm.getValues();                
                if (searchParams.endPeriod != ""){
                    store.baseParams.endPeriod = searchParams.endPeriod;                    
                }
                if (searchParams.startPeriod !=""){
                    store.baseParams.startPeriod= searchParams.startPeriod;
                }
            }
        }
    });
};


/**
 * Store and comboBox to select included start period
 * Param : store receive json    
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.storePeriodFrom = function(id, url){ 
    return new Ext.data.JsonStore({
        id: "phob_store_fromSba",
        root: "annees",
        proxy: new Ext.data.HttpProxy({
            url: url + "/getYearsList",
            method: 'GET',
            autoLoad:true
        }),
        fields:[
            {
                name:"annee",
                convert: function(value,rec){
                    return rec;
                }
            }
        ]
    });
};

/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboPeriodFrom = function(id){
    var storeId = id+"Store"
    var storeUrl= GEOR.Addons.Photos_obliques.globalOptions.servicesUrl; 
    var store = GEOR.Addons.Photos_obliques.search.storePeriodFrom(storeId,storeUrl);
    return  new Ext.form.ComboBox({
        id: id,        
        editable: true,
        store: store,
        anchor: "50%",
        displayField: "annee",
        hiddenName:"startPeriod",
        maskRe:/[0-9]/,
        maxLength:4,
        emptyText:"Début de période...",
        triggerAction: 'all',
        minchar:4,
        listeners: {            
            scope: this,
            "select": function(combo, record) {
                // control value for end period
                var val = combo.getValue();
                var cbTo = Ext.getCmp("phob_cb_toSba") ? Ext.getCmp("phob_cb_toSba") : null;
                if (cbTo !== null) {
                    if (cbTo.getValue() !== 0 && (val > cbTo.getValue())) {
                        cbTo.setValue(val);
                    }
                }
            },
            "beforequery": function(){
                var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm(); 
                var searchParams = searchForm.getValues();                
                if (searchParams.cities !== ""){
                    store.baseParams.cities = searchParams.cities;                    
                }
            },
        }
    });
};


/**
 * Store and comboBox to select end period 
 * 
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.storePeriodTo = function(id,url){
    return new Ext.data.JsonStore({
        id: id,
        root: "annees",
        fields:[
            {
                name:"annee",
                convert: function(value,record){
                    return record;
                }
            }
        ],    
        proxy: new Ext.data.HttpProxy({
            url: url + "/getYearsList",
            method: 'GET',
            autoLoad:true
        })
    });
};


/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboPeriodTo = function(id){
    var storeId = id+"Store";
    var storeUrl= GEOR.Addons.Photos_obliques.globalOptions.servicesUrl;
    var store = GEOR.Addons.Photos_obliques.search.storePeriodTo(storeId,storeUrl);        
    return  new Ext.form.ComboBox({
        id: id,
        editable: true,
        hiddenName:"endPeriod",
        store: store,
        anchor: "50%",
        triggerAction: 'all',
        selectOnFocus: true,
        displayField: "annee",
        emptyText:"Fin de période...",
        maskRe:/[0-9]/,
        maxLength:4,
        minchar:4,
        listeners: {
            "select": function(combo, record) {
                // control value for start period
                var val = combo.getValue();
                var cbFrom = Ext.getCmp("phob_cb_fromSba") ? Ext.getCmp("phob_cb_fromSba") : null;
                if (cbFrom !== null) {
                    if (cbFrom.getValue() != 0 && (val < cbFrom.getValue())) {
                        cbFrom.setValue(val);
                    }
                }
                
                // control town selected and change it if not include in period
                if(Ext.getCmp("phob_cb_comSba")){
                    var cb = Ext.getCmp("phob_cb_comSba");                    
                }
            },scope: this,
        }
    });
};


/**
 * store and comboBox to select photos owner 
 */

/* Create store */

GEOR.Addons.Photos_obliques.search.storeOwner = function(id,url){
    return new Ext.data.JsonStore({
        id: id,
        root: "owners",
        proxy: new Ext.data.HttpProxy({
            url: url + "/getOwnersList",
            method: 'GET',
            autoLoad:true
        }),
        fields:[
            {
                name:"owner",
                convert: function(value,record){
                    return record;
                }
            }
        ]
    });
};

/* Create combo */

GEOR.Addons.Photos_obliques.search.comboOwner = function(id){
    var storeId = id+"Store"              
    var storeUrl= GEOR.Addons.Photos_obliques.globalOptions.servicesUrl;
    var store = GEOR.Addons.Photos_obliques.search.storeOwner(storeId,storeUrl);        
    return  new Ext.form.ComboBox({        
        name:"proprietaire",
        id: id,
        hiddenName:"owner",
        store: store,
        anchor: "99%",
        fieldLabel: "Propriétaire ",
        emptyText:"Nom du propriétaire...",
        editable: true,
        selectOnFocus: true,
        displayField: "owner",
        minChars:5,
    });
};

/**
 *  Create fieldset to be include in the main search window
 */

GEOR.Addons.Photos_obliques.search.cpField = function(id) {
    var nameSpace = GEOR.Addons.Photos_obliques.search;
    var items;
    
    
    // create items to be insert in panel
    // TODO : could be better with simple array
    var attributesItems = [
        {
            xtype: "compositefield",
            id: "phob_cpf_fstSba",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {
                flex: 1
            },
            items: [nameSpace.comboPeriodFrom("phob_cb_fromSba"), nameSpace.comboPeriodTo("phob_cb_toSba")]
        },
        nameSpace.comboAttributesCom("phob_cb_comSba"),
        nameSpace.comboOwner("phob_cb_ownerSba")
    ];
        
    var graphItems = [
        {
            xtype: "compositefield",
            id: "phob_cpf_fstSbg",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {
                flex: 1
            },
            items: [nameSpace.cbGraphStartPeriod, nameSpace.cbGraphEndPeriod]
        },
        nameSpace.comboAttributesCom("phob_cb_comSbg"),
        nameSpace.cbGraphOwner
    ];
    
    
    // create compositfe field wich contains all tools to search items by attributes
    var cpField = [{
        xtype: "fieldset",
        border: false,
        id: id,
        anchor: "100%",
        items: id === "phob_fst_mainSbg" ? graphItems : attributesItems
    }];

    return cpField;
};