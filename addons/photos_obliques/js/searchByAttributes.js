Ext.namespace("GEOR.Addons.Photos_obliques.search");

/**
 * Store and ComboBox to select town
 * Could change if town selected is not included in the period selected  
 * 
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.comStore = function () {   
    
    var comStore = new Ext.data.JsonStore({
        id: "phob_store_com",
        root: "features",
        fields: [/*{ TODO : change name and path to field value
            name:"code_com",
            convert: function(v,rec){
                return rec.properties.codeCOm;
            }
        },*/{
            name:"commune",
            convert: function(v,rec){
                return rec.properties.commune;
            }
        }],
        sortInfo:{
            field: "commune",
            direction: "ASC"
        },
        url:"http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-result.php"
    });
    
    comStore.load();
    
    return comStore;
};

/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboAttributesCom = function(id){
    var store;
    /*if(id === "phob_cb_comSba"){
        var store = GEOR.Addons.Photos_obliques.search.storePeriodFrom();
    } else {
        if()
    }*/
    return new Ext.ux.form.LovCombo({
        store:GEOR.Addons.Photos_obliques.search.comStore(),
        // avoir un store de la sorte avec un champ numérique comme id de ligne, le code commune donc
        /*store : [
             [22300, 'Personnel []']
            ,[22700, 'Finance (33)']
        ],*/
        id: id,
        displayField:"commune",
        triggerAction:'all',
        mode:"local",
        anchor:"99%",
        editable:true,
        fieldLabel: "Communes",
        selectOnFocus: true,
        hideOnSelect:false,
        hiddenName:"commune"
    });
};


/**
 * Store and comboBox to select included start period
 *    
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.storePeriodFrom = function(){
    var storePeriodFrom = new Ext.data.JsonStore({
        id: "phob_store_from",
        root: "features",
        fields: [{
            name:"annee",
            convert: function(v,rec){
                return rec.properties.annee;
            }
        }],
        sortInfo:{
            field:"annee",
            direction: "ASC"
        },
        url:"http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-result.php"
    });
    
    storePeriodFrom.load();
    
    return storePeriodFrom;
    
};


/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboPeriodFrom = function(id){
    var store;
    if(id === "phob_cb_fromSba"){
        var store = GEOR.Addons.Photos_obliques.search.storePeriodFrom();
    }
    return  new Ext.form.ComboBox({
        id: id,
        editable: true,
        store: store,
        anchor: "50%",
        mode: "local",
        selectOnFocus: true,
        displayField: "annee",
        hiddenName:"periodFrom",
        listeners: {
            scope: this,
            "select": function(combo, record) {
                // control value for end period
                var val = combo.getValue();
                var cbTo = Ext.getCmp("phob_cb_toSba") ? Ext.getCmp("phob_cb_toSba") : null;
                if (cbTo !== null) {
                    if (cbTo.getValue() != 0 && (val > cbTo.getValue())) {
                        cbTo.setValue(val);
                    }
                }
            }
        }
    });
};


/**
 * Store and comboBox to select end period 
 * 
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.storePeriodTo = function() {
    var storePeriodTo = new Ext.data.JsonStore({
        id: "phob_store_to",
        root: "features",
        fields: [{
            name:"annee",
            convert: function(v,rec){
                return rec.properties.annee;
            }
        }],
        sortInfo:{
            field:"annee",
            direction: "ASC"
        },
        url:"http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-result.php"
    });
    
    storePeriodTo.load();
    
    return storePeriodTo;
};

/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboPeriodTo = function(id){
    var store;
    if(id === "phob_cb_toSba"){
        var store = GEOR.Addons.Photos_obliques.search.storePeriodTo();
    }
    return  new Ext.form.ComboBox({
        id: id,
        hiddenName:"periodTo",
        store: store,
        anchor: "50%",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: "annee",
        listeners: {
            scope: this,
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
            }
        }
    });
};


/**
 * store and comboBox to select photos owner 
 */

/* Create store*/

GEOR.Addons.Photos_obliques.search.storeOwner = function() {    
    var storeOwner = new Ext.data.JsonStore({
        id: "phob_store_owner",
        root: "features",
        fields: [{
            name:"proprio",
            convert: function(v,rec){
                return rec.properties.proprio;
            }
        }],
        sortInfo:{
            field:"proprio",
            direction: "ASC"
        },
        url:"http://172.16.52.84:8080/mapfishapp/ws/addons/photos_obliques/get-result.php"
    });

    storeOwner.load();
    
    return storeOwner;
};

/* Create combo*/

GEOR.Addons.Photos_obliques.search.comboOwner = function(id){
    var store;
    if(id === "phob_cb_ownerSba"){
        var store = GEOR.Addons.Photos_obliques.search.storeOwner();
    }
    return  new Ext.form.ComboBox({    
        id: id,
        hiddenName:"proprio",
        store: GEOR.Addons.Photos_obliques.search.storeOwner(),
        anchor: "99%",
        fieldLabel: "Propriétaire ",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: "proprio",        
    });
};

/**
 *  Create fieldset to include in the main search window
 */

GEOR.Addons.Photos_obliques.search.cpField = function(id) {
    var nameSpace = GEOR.Addons.Photos_obliques.search;
    var items;
    
    var attributesItems = [
        {
            xtype: "compositefield",
            id: "phob_cpf_fstSba",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {
                flex: 1
            },
            items: [
                nameSpace.comboPeriodFrom("phob_cb_fromSba"),
                nameSpace.comboPeriodTo("phob_cb_toSba")]
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
            items: [
                nameSpace.comboPeriodFrom("phob_cb_fromSbg"), 
                nameSpace.comboPeriodTo("phob_cb_toSbg")]
        },
        nameSpace.comboAttributesCom("phob_cb_comSbg"),
        nameSpace.comboOwner("phob_cb_ownerSbg")
    ];
        
    var cpField = [{
        xtype: "fieldset",
        border: false,
        id: id,
        anchor: "100%",
        items: id === "phob_fst_mainSbg" ? graphItems : attributesItems
    }];

    return cpField;
};