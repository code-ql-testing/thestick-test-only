Ext.define('Karen.view.Login', {
	extend: 'Ext.form.Panel',
	xtype: 'loginView',
	
	config: {
		fullscreen: true,
		layout: 'vbox',

		items: [
			{
				flex: 1
			},
			{
				name: 'header',
				id: 'header',
				xtype: 'panel',
				html: '<div id="karen-header"></div>',
			},
			{
				html: '',
				name: 'loginMessage',
				id: 'login-message',
				cls: 'empty',
				xtype: 'panel'
			},
			{
				xtype: 'fieldset',
				name: 'loginFieldset',
				id: 'login-fieldset',
            	items: [
			        {
			            xtype: 'emailfield',
			            name : 'email',
			            label: 'Email'
			        },
			        {
			            xtype: 'passwordfield',
			            name : 'password',
			            label: 'Password'
			        }
			    ],
        	},
        	{
	            xtype: 'button',
	            name : 'login',
	            label: 'Login',
	            text: 'Login',
	            id: 'login-button',
	            ui: 'confirm'
        	},
        	{
	            xtype: 'panel',
	            name: 'signinhome-links',
	            id: 'signinhome-links',
	            cls: 'home-links',
	            html: '<a id="register-link">Register as new user</a> | <a id="about-link">About Karen</a>',
	            listeners: {
		            tap: {
		                element: 'element',
		                delegate: 'a',
		                fn: function(e) {
		                	if( e.getTarget('#register-link') ){
		                		this.fireEvent('tapRegister');
		                	} else {
		                		this.fireEvent('tapAbout');
		                	}
		                }
		            },
		        },
        	},
        	{
        		flex: 2
        	},
		]
		
	}
});
