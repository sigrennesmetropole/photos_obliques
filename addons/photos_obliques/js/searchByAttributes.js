Ext.namespace("GEOR.Addons.Photos_obliques.search");


GEOR.Addons.Photos_obliques.search.searchByAttributes = function(){
    var cpField = [{
            xtype: "fieldset",
            border: false,
            id: "phob_fst_mainSba",
            anchor: "100%",
            items: [{
                xtype: "combo",
                id: "phob_cb_comSba",
                anchor: "99%",
                fieldLabel: "Communes ",
                mode: "local"
            }, {
                xtype: "compositefield",
                id: "phob_cpf_fstSba",
                fieldLabel: "Période ",
                anchor: "99%",
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: "spinnerfield",
                    id: "phob_spinf_minSba",
                    anchor: "50%"
    
                }, {
                    xtype: "spinnerfield",
                    id: "phob_spinf_maxSba",
                    anchor: "50%"
                }]
            }, {
                xtype: "combo",
                id: "phob_cb_ownerSba",
                anchor: "99%",
                fieldLabel: "Propriétaire ",
                mode: "local"
            }]
    }];
    
    return cpField
};