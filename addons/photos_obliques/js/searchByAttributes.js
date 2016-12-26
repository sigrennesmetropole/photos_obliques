Ext.namespace("GEOR.Addons.Photos_obliques.search");

GEOR.Addons.Photos_obliques.initUtils = function() {
    /**
     * Methode to control if end period is not inferior than start period
     */
    GEOR.Addons.Photos_obliques.search.controlEndPeriod = function(startCb, val) {
        var cbFrom = startCb ? startCb : null;
        if (cbFrom !== null) {
            if (cbFrom.getValue() !== 0 && (val < cbFrom.getValue())) {
                cbFrom.setValue(val);
            }
        }
    };

    /**
     * Methode to control if start period is not inferior than end period
     */

    GEOR.Addons.Photos_obliques.search.controlStartPeriod = function(endCb, val) {
        var cbTo = endCb ? endCb : null;
        if (cbTo !== null) {
            if (cbTo.getValue() !== 0 && (val > cbTo.getValue())) {
                cbTo.setValue(val);
            }
        }
    };

    /**
     *  Create store and owner combo for graph tool
     *  Params: store receive array from a first selection
     */

    GEOR.Addons.Photos_obliques.search.cbGraphOwner = new Ext.form.ComboBox({
        id: "phob_cb_ownerSbg",
        triggerAction: 'all',
        mode: "local",
        editable: true,
        store: new Ext.data.ArrayStore({
            id: "phob_store_ownerSbg",
            sortInfo: {
                field: "owner",
                direction: "ASC"
            },
            fields: [{
                name: "owner",
                convert: function(val, rec) {
                    return rec;
                }
            }]
        }),
        anchor: "99%",
        displayField: "owner",
        fieldLabel: OpenLayers.i18n("photooblique.combo.labelproprietaire"),
        hiddenName: "owner",
        emptyText: OpenLayers.i18n("photooblique.combo.proprietairevide")
    });

    /**
     *  Create store and start period combo for graph tool
     *  Params: store receive array from a first selection
     */

    GEOR.Addons.Photos_obliques.search.cbGraphStartPeriod = new Ext.form.ComboBox({
        id: "phob_cb_startSbg",
        triggerAction: 'all',
        mode: "local",
        editable: true,
        store: new Ext.data.ArrayStore({
            id: "phob_store_startSbg",
            sortInfo: {
                field: "annee",
                direction: "ASC"
            },
            fields: [{
                name: "annee",
                convert: function(val, rec) {
                    return rec;
                }
            }]
        }),
        anchor: "50%",
        displayField: "annee",
        hiddenName: "startPeriod",
        maskRe: /[0-9]/,
        maxLength: 4,
        emptyText: OpenLayers.i18n("photooblique.combo.debutperiodevide"),
        listeners: {
            "select": function(combo, record) {
                GEOR.Addons.Photos_obliques.params.startPeriod = combo.value;
                // control value for end period
                var endCb = GEOR.Addons.Photos_obliques.search.cbGraphEndPeriod;
                GEOR.Addons.Photos_obliques.search.controlStartPeriod(endCb, combo.getValue());
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
        mode: "local",
        editable: true,
        store: new Ext.data.ArrayStore({
            id: "phob_store_endSbg",
            sortInfo: {
                field: "annee",
                direction: "ASC"
            },
            fields: [{
                name: "annee",
                convert: function(val, rec) {
                    return rec;
                }
            }]
        }),
        anchor: "50%",
        displayField: "annee",
        hiddenName: "endPeriod",
        maskRe: /[0-9]/,
        maxLength: 4,
        emptyText: OpenLayers.i18n("photooblique.combo.finperiodevide"),
        listeners: {
            "select": function(combo, record) {
                GEOR.Addons.Photos_obliques.params.endPeriod = combo.value;
                // control value for end period
                var startCb = GEOR.Addons.Photos_obliques.search.cbGraphStartPeriod;
                GEOR.Addons.Photos_obliques.search.controlEndPeriod(startCb, combo.getValue());
            }
        }
    });


    /**
     * Create end period combo store to search by attributes filter
     * Param : store receive json from services
     */

    GEOR.Addons.Photos_obliques.search.comStore = function(id) {
        var comStore = new Ext.data.JsonStore({
            id: id,
            root: "communes",
            fields: [{
                name: "code",
                convert: function(v, rec) {
                    var intValue = parseInt(rec.key, 10);
                    return intValue
                }
            }, {
                name: "communes",
                convert: function(v, rec) {
                    var name = rec.value;
                    var code = rec.key;
                    var display = name + " (" + code + ")";
                    return display;
                }
            }],
            proxy: new Ext.data.HttpProxy({
                url: GEOR.Addons.Photos_obliques.globalOptions.servicesUrl + "/getCommunes",
                method: 'GET',
                autoLoad: true
            })
        });

        return comStore;
    };

    /**
     * Create combo for set attributes filters
     */

    GEOR.Addons.Photos_obliques.search.comboComSba = new Ext.ux.form.LovCombo({
        store: GEOR.Addons.Photos_obliques.search.comStore("phob_cb_comSbaStore"),
        id: "phob_cb_comSba",
        displayField: "communes",
        triggerAction: 'all',
        emptyText: OpenLayers.i18n("photooblique.combo.communevide"),
        anchor: "99%",
        fieldLabel: OpenLayers.i18n("photooblique.combo.labelcommune"),
        valueField: "code",
        selectOnFocus: false,
        hideOnSelect: false,
        hiddenName: "cities",
        assertValue: Ext.emptyFn,
        listeners: {
            "beforequery": function() {
                var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
                var searchParams = searchForm.getValues();
                if (searchParams.endPeriod !== "") {
                    this.store.baseParams.endPeriod = searchParams.endPeriod;
                }
                if (searchParams.startPeriod !== "") {
                    this.store.baseParams.startPeriod = searchParams.startPeriod;
                }

            },
            "select": function() {
                GEOR.Addons.Photos_obliques.params.cities = this.value.split(/[,]/);
                var citiesValues = this.value.split(/[,]/);
                Ext.getCmp("phob_cb_fromSba").getStore().load({
                    params: {
                        cities: citiesValues
                    }
                });
                Ext.getCmp("phob_cb_toSba").getStore().load({
                    params: {
                        cities: citiesValues
                    }
                });
            }
        }
    });

    /**
     * Create combo for set attributes filters
     */

    GEOR.Addons.Photos_obliques.search.comboComSbg = new Ext.ux.form.LovCombo({
        store: GEOR.Addons.Photos_obliques.search.comStore("phob_cb_comSbgStore"),
        id: "phob_cb_comSbg",
        displayField: "communes",
        triggerAction: 'all',
        emptyText: OpenLayers.i18n("photooblique.combo.communevide"),
        anchor: "99%",
        fieldLabel: OpenLayers.i18n("photooblique.combo.labelcommune"),
        valueField: "code",
        selectOnFocus: false,
        hideOnSelect: false,
        hiddenName: "cities",
        assertValue: Ext.emptyFn,
        listeners: {
            "select": function() {
                GEOR.Addons.Photos_obliques.params.cities = this.value.split(/[,]/);
            },
            "beforequery": function() {
                var windowTitle = GEOR.Addons.Photos_obliques.search.mainWindow.title;
                // TODO: i18n trad
                var attributeWinTitle = OpenLayers.i18n("photooblique.fenetre.titre.recherchegraphique");
                if (windowTitle == attributeWinTitle && GEOR.Addons.Photos_obliques.search.citiesFromJson[1].length > 0) {
                    this.getStore().baseParams.id = GEOR.Addons.Photos_obliques.search.citiesFromJson[1];
                }
            }
        }
    });

    /**
     * Store and comboBox to select included start period
     * Param : store receive json    
     */

    /* Create store*/

    GEOR.Addons.Photos_obliques.search.storePeriodFrom = new Ext.data.JsonStore({
        id: "phob_cb_fromSbaStore",
        root: "annees",
        proxy: new Ext.data.HttpProxy({
            url: GEOR.Addons.Photos_obliques.globalOptions.servicesUrl + "/getYearsList",
            method: 'GET',
            autoLoad: true
        }),
        fields: [{
            name: "annee",
            convert: function(value, rec) {
                return rec;
            }
        }]
    });

    /* Create combo*/

    GEOR.Addons.Photos_obliques.search.comboPeriodFrom = new Ext.form.ComboBox({
        id: "phob_cb_fromSba",
        editable: true,
        store: GEOR.Addons.Photos_obliques.search.storePeriodFrom,
        anchor: "50%",
        displayField: "annee",
        hiddenName: "startPeriod",
        maskRe: /[0-9]/,
        maxLength: 4,
        emptyText: OpenLayers.i18n("photooblique.combo.debutperiodevide"),
        triggerAction: 'all',
        minchar: 4,
        listeners: {
            scope: this,
            "select": function(combo) {
                GEOR.Addons.Photos_obliques.params.startPeriod = combo.getValue();
                if (combo.id == "phob_cb_fromSba") {
                    var cbTo = Ext.getCmp("phob_cb_toSba") ? Ext.getCmp("phob_cb_toSba") : null;
                    GEOR.Addons.Photos_obliques.search.controlStartPeriod(cbTo, combo.getValue());
                    Ext.getCmp("phob_cb_comSba").getStore().load({
                        params: {
                            startPeriod: combo.getValue()
                        }
                    });
                }

            },
            "beforequery": function(combo) {
                if (combo.id == "phob_cb_fromSba") {
                    var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
                    var searchParams = searchForm.getValues();
                    if (searchParams.cities !== "") {
                        searchParams.cities = searchParams.cities.split(/[,]/);
                    }
                }
            },
        }
    });


    /**
     * Store and comboBox to select end period 
     * 
     */

    /* Create store*/

    GEOR.Addons.Photos_obliques.search.storePeriodTo = new Ext.data.JsonStore({
        id: "phob_cb_toSbaStore",
        root: "annees",
        fields: [{
            name: "annee",
            convert: function(value, record) {
                return record;
            }
        }],
        proxy: new Ext.data.HttpProxy({
            url: GEOR.Addons.Photos_obliques.globalOptions.servicesUrl + "/getYearsList",
            method: 'GET',
            autoLoad: true
        })
    });


    /* Create combo*/

    GEOR.Addons.Photos_obliques.search.comboPeriodTo = new Ext.form.ComboBox({
        id: "phob_cb_toSba",
        editable: true,
        hiddenName: "endPeriod",
        store: GEOR.Addons.Photos_obliques.search.storePeriodTo,
        anchor: "50%",
        triggerAction: 'all',
        selectOnFocus: true,
        displayField: "annee",
        emptyText: OpenLayers.i18n("photooblique.combo.finperiodevide"),
        maskRe: /[0-9]/,
        maxLength: 4,
        minchar: 4,
        listeners: {
            "select": function(combo, record) {
                GEOR.Addons.Photos_obliques.params.endPeriod = combo.getValue();
                if (combo.id == "phob_cb_toSba") {
                    // control value for start period
                    var cbFrom = Ext.getCmp("phob_cb_fromSba") ? Ext.getCmp("phob_cb_fromSba") : null;
                    GEOR.Addons.Photos_obliques.search.controlEndPeriod(cbFrom, combo.getValue());
                    Ext.getCmp("phob_cb_comSba").getStore().load({
                        params: {
                            endPeriod: combo.getValue()
                        }
                    });
                }
            },
            "beforequery": function(combo) {
                if (combo.id == "phob_cb_toSba") {
                    var searchForm = GEOR.Addons.Photos_obliques.search.mainWindow.items.items[0].getForm();
                    var searchParams = searchForm.getValues();
                    if (searchParams.cities !== "") {
                        searchParams.cities = searchParams.cities.split(/[,]/);
                    }
                }
            },
            scope: this,
        }
    });


    /**
     * store and comboBox to select photos owner 
     */

    /* Create store */

    GEOR.Addons.Photos_obliques.search.storeOwner = function(id, url) {
        return new Ext.data.JsonStore({
            id: id,
            root: "owners",
            proxy: new Ext.data.HttpProxy({
                url: url + "/getOwnersList",
                method: 'GET',
                autoLoad: true
            }),
            fields: [{
                name: "owner",
                convert: function(value, record) {
                    return record;
                }
            }]
        });
    };

    /* Create combo */

    GEOR.Addons.Photos_obliques.search.comboOwner = function(id) {
        var storeId = id + "Store"
        var storeUrl = GEOR.Addons.Photos_obliques.globalOptions.servicesUrl;
        var store = GEOR.Addons.Photos_obliques.search.storeOwner(storeId, storeUrl);
        return new Ext.form.ComboBox({
            name: "proprietaire",
            id: id,
            hiddenName: "owner",
            store: store,
            triggerAction: "all",
            anchor: "99%",
            fieldLabel: OpenLayers.i18n("photooblique.combo.labelproprietaire"),
            emptyText: OpenLayers.i18n("photooblique.combo.proprietairevide"),
            editable: true,
            selectOnFocus: true,
            displayField: "owner",
            minChars: 5,
            listeners: {
                "select": function() {
                    GEOR.Addons.Photos_obliques.params.owner = this.value;
                }
            }
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
        var attributesItems = [{
                xtype: "compositefield",
                id: "phob_cpf_fstSba",
                fieldLabel: OpenLayers.i18n("photooblique.combo.labelperiod"),
                anchor: "99%",
                defaults: {
                    flex: 1
                },
                items: [nameSpace.comboPeriodFrom, nameSpace.comboPeriodTo]
            },
            nameSpace.comboComSba,
            nameSpace.comboOwner("phob_cb_ownerSba")
        ];

        var graphItems = [{
                xtype: "compositefield",
                id: "phob_cpf_fstSbg",
                fieldLabel: OpenLayers.i18n("photooblique.combo.labelperiod"),
                anchor: "99%",
                defaults: {
                    flex: 1
                },
                items: [nameSpace.cbGraphStartPeriod, nameSpace.cbGraphEndPeriod]
            },
            nameSpace.comboComSbg,
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
}