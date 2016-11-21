Ext.namespace("GEOR.Addons.Photos_obliques.search");

/**
 * Store and ComboBox to select town
 * Could change if town selected is not included in the period selected  
 * 
 */
GEOR.Addons.Photos_obliques.search.comStore = function () {
    var comData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee": 2010,
                "telecharg": 1,
                "commune": "35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune": "35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }]
        }
    };
    
    var comStore = new Ext.data.JsonStore({
        id: "phob_store_com",
        root: "result.resultArray",
        fields: ["annee", "commune", "proprio", "id"]
    });
    
    comStore.loadData(comData);
    
    return comStore;
};


GEOR.Addons.Photos_obliques.search.comboAttributesCom = function(){    
    return  new Ext.form.ComboBox({
        id: "phob_cb_comSba",
        anchor: "99%",
        fieldLabel: "Communes ",
        editable: true,
        mode: "local",
        store: GEOR.Addons.Photos_obliques.search.comStore(),
        selectOnFocus: true,
        displayField: 'commune'
    });
};
/**
 * Store and comboBox to select included start period
 *    
 */

GEOR.Addons.Photos_obliques.search.storePeriodFrom = function(){
    var fromData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee": 2010,
                "telecharg": 1,
                "commune": "35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune": "35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }]
        }
    };
    var storePeriodFrom = new Ext.data.JsonStore({
        id: "phob_store_from",
        root: "result.resultArray",
        fields: ["annee", "commune", "proprio", "id"]
    });
    
    storePeriodFrom.loadData(fromData);
    
    return storePeriodFrom;
    
};

GEOR.Addons.Photos_obliques.search.comboPeriodFrom = function(){
    return  new Ext.form.ComboBox({
        id: "phob_cb_fromSba",
        editable: true,
        store: GEOR.Addons.Photos_obliques.search.storePeriodFrom(),
        anchor: "50%",
        mode: "local",
        selectOnFocus: true,
        displayField: 'annee',
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
GEOR.Addons.Photos_obliques.search.storePeriodTo = function() {
    var toData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee": 2010,
                "telecharg": 1,
                "commune": "35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune": "35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }]
        }
    };
    
    var storePeriodTo = new Ext.data.JsonStore({
        id: "phob_store_to",
        root: "result.resultArray",
        fields: ["annee", "commune", "proprio", "id"]
    });
    
    storePeriodTo.loadData(toData);
    
    return storePeriodTo;
};

GEOR.Addons.Photos_obliques.search.comboPeriodTo = function(){
    return  new Ext.form.ComboBox({
        id: "phob_cb_toSba",
        store: GEOR.Addons.Photos_obliques.search.storePeriodTo(),
        anchor: "50%",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'annee',
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

GEOR.Addons.Photos_obliques.search.storeOwner = function() {
    var ownerData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee": 2010,
                "telecharg": 1,
                "commune": "35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune": "35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune": "35238"
            }]
        }
    };
    var storeOwner = new Ext.data.JsonStore({
        id: "phob_store_owner",
        root: "result.resultArray",
        fields: ["annee", "commune", "proprio", "id"]
    });

    storeOwner.loadData(ownerData);
    
    return storeOwner;
};
GEOR.Addons.Photos_obliques.search.comboOwner = function(){
    return  new Ext.form.ComboBox({    
        id: "phob_cb_ownerSba",
        store: GEOR.Addons.Photos_obliques.search.storeOwner(),
        anchor: "99%",
        fieldLabel: "Propriétaire ",
        mode: "local",
        editable: true,
        selectOnFocus: true,
        displayField: 'proprio'
    });
};
/**
 *  Create fieldset to include in the window's research
 */

GEOR.Addons.Photos_obliques.search.searchByAttributes = function() {
    var nameSpace = GEOR.Addons.Photos_obliques.search;
    var cpField = [{
        xtype: "fieldset",
        border: false,
        id: "phob_fst_mainSba",
        anchor: "100%",
        items: [{
            xtype: "compositefield",
            id: "phob_cpf_fstSba",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {
                flex: 1
            },
            items: [nameSpace.comboPeriodFrom(), nameSpace.comboPeriodTo()]
        },nameSpace.comboAttributesCom(), nameSpace.comboOwner()]
    }];

    return cpField;
};