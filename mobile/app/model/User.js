Ext.define('Karen.model.User', {
    extend: 'Ext.data.Model',
    config: {
    	id: 'UserModel',
    	name: 'UserModel',
        fields: [
            { name: 'userid', type: 'string' },
            { name: 'username', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'first_name', type: 'string' },
            { name: 'last_name', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'phone', type: 'string' },
        ]
    }
});