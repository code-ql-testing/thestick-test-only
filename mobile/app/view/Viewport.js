Ext.define('Karen.view.Viewport', {
	extend: 'Ext.Container',
	
	config: {
		fullscreen: true,
		xtype: 'appviewport',
		layout: 'card',
		name: 'viewport',
		id: 'viewport',
		
		items: [
			{
            	// login view
		        xtype: 'loginView',
		        name: 'login-view',
		        id: 'login-view'
        	},
        	{
            	// register view
		        xtype: 'registerView',
		        name: 'register-view',
		        id: 'register-view'
        	},
        	{
            	// about view
		        xtype: 'panel',
		        name: 'about-view',
		        id: 'about-view'
        	},
        	{
            	// home view
		        xtype: 'taskListView',
		        name: 'tasklist-view',
		        id: 'tasklist-view',
        	},
		]
		
	}
});
