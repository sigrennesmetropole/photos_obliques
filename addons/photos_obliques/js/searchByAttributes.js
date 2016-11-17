Ext.namespace("GEOR.Addons.Photos_obliques.search");

GEOR.Addons.Photos_obliques.search.comboAttributesCom = function() {
    var comData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee":2010,
                "telecharg": 1,
                "commune":"35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune":"35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }]
        }
    };
    var storeCom = new Ext.data.JsonStore({
        id: "phob_store_com",
        root:"result.resultArray",
        fields:["annee","commune","proprio","id"]
    });
    
    storeCom.loadData(comData);
    
    return new Ext.form.ComboBox({
        id: "phob_cb_comSba",
        anchor: "99%",
        fieldLabel: "Communes ",
        editable:true,
        mode: "local",
        store:storeCom,
        selectOnFocus : true,
        displayField : 'commune'
    });

};

GEOR.Addons.Photos_obliques.search.comboPeriodFrom = function() {
    var fromData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee":2010,
                "telecharg": 1,
                "commune":"35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune":"35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }]
        }
    };
    var storePeriodFrom = new Ext.data.JsonStore({
        id: "phob_store_from",
        root:"result.resultArray",
        fields:["annee","commune","proprio","id"]
    });
    
    storePeriodFrom.loadData(fromData);
    
    return new Ext.form.ComboBox({
        id: "phob_cb_fromSba",
        editable:true,
        store: storePeriodFrom,
        anchor: "50%",
        mode:"local",
        selectOnFocus : true,
        displayField : 'annee'
    });
};

GEOR.Addons.Photos_obliques.search.comboPeriodTo = function() {
    var toData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee":2010,
                "telecharg": 1,
                "commune":"35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune":"35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }]
        }
    };
    var storePeriodTo = new Ext.data.JsonStore({
        id: "phob_store_to",
        root:"result.resultArray",
        fields:["annee","commune","proprio","id"]
    });
    storePeriodTo.loadData(toData);
    return new Ext.form.ComboBox({
        id: "phob_cb_toSba",
        store:storePeriodTo,
        anchor: "50%",
        mode: "local",
        editable:true,
        selectOnFocus : true,
        displayField : 'annee'
    });
};

GEOR.Addons.Photos_obliques.search.comboOwner = function() {
    var ownerData = {
        "result": {
            "resultArray": [{
                "photo": "16_0010.jpg",
                "id": "16_0010",
                "date": "2016-08-13 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "annee":2010,
                "telecharg": 1,
                "commune":"35210"
            }, {
                "photo": "16_0033.jpg",
                "id": "16_0033",
                "annee": 2016,
                "date": "2016-07-07 00:00:00",
                "proprio": "Ville de Rennes",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 0,
                "commune":"35275"
            }, {
                "photo": "RM16_0002.jpg",
                "id": "RM16_0002",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }, {
                "photo": "RM16_0007.jpg",
                "id": "RM16_0039",
                "annee": 2015,
                "date": "2016-07-05 00:00:00",
                "proprio": "Rennes Métropole",
                "presta": "MRW Zeppeline Bretagne",
                "telecharg": 1,
                "commune":"35238"
            }]
        }
    };
    var storeOwner = new Ext.data.JsonStore({
        id: "phob_store_owner",
        root:"result.resultArray",
        fields:["annee","commune","proprio","id"]
    });
    
    storeOwner.loadData(ownerData);
    
    return new Ext.form.ComboBox({
        id: "phob_cb_ownerSba",
        store:storeOwner,
        anchor: "99%",
        fieldLabel: "Propriétaire ",
        mode: "local",
        editable:true,
        selectOnFocus : true,
        displayField : 'proprio'
    });
    
};

GEOR.Addons.Photos_obliques.search.searchByAttributes = function() {
    var nameSpace = GEOR.Addons.Photos_obliques.search;
    var cpField = [{
        xtype: "fieldset",
        border: false,
        id: "phob_fst_mainSba",
        anchor: "100%",
        items: [nameSpace.comboAttributesCom(),
        {
            xtype: "compositefield",
            id: "phob_cpf_fstSba",
            fieldLabel: "Période ",
            anchor: "99%",
            defaults: {flex: 1},
            items: [nameSpace.comboPeriodFrom(), nameSpace.comboPeriodTo()]
        }, nameSpace.comboOwner()]
    }];

    return cpField;
};