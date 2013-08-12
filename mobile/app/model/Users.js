Ext.define('Karen.model.Users', {
    extend: 'Ext.data.Model',
    config: {
    	id: 'UsersModel',
    	name: 'UsersModel',
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