Ext.define('Karen.util.Config', { 
	singleton : true,
    alias : 'widget.appConfigUtil',
    config : {
        baseUrl : 'http://localhost/thestick',
    },
    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    }
    ,
}) 