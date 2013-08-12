Ext.define('Karen.store.Users', {
    extend: 'Ext.data.Store',

	config: {
		name: 'Users',
		storeId: 'Userss',	//	ref to bind inside views
		autoLoad: true,
		fields: [
            { name: 'userid', type: 'string' },
            { name: 'username', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'first_name', type: 'string' },
            { name: 'last_name', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'phone', type: 'string' },
        ],
		proxy:
			{
		        type: "ajax",
		        url : Karen.util.Config.getBaseUrl() + '/api/users',
		        reader: {
		            type: "json",
	        	}
	    	},
	}
});


