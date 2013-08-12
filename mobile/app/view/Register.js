Ext.define('Karen.view.Register', {
	extend: 'Ext.form.Panel',
	xtype: 'registerView',
	
	config: {
		fullscreen: true,
		layout: 'vbox',
		
		items: [
			{
				flex: 1
			},
			{
				html: '<div id="karen-header"></div>',
			},
			{
				html: '<h1>Register as new User</h1>',
				name: 'registerHeading',
				id: 'register-heading',
				xtype: 'panel'
			},
			{
				xtype: 'fieldset',
				name: 'registerFieldset',
				id: 'register-fieldset',
            	items: [
            		{
			            xtype: 'textfield',
			            name : 'name',
			            label: 'Name'
			        },
			        {
			            xtype: 'emailfield',
			            name : 'email',
			            label: 'Email'
			        },
			        {
			            xtype: 'passwordfield',
			            name : 'password',
			            label: 'Password'
			        },
			        {
			            xtype: 'passwordfield',
			            name : 'repassword',
			            label: 'Password Again'
			        }
			    ],
        	},
        	{
	            xtype: 'button',
	            name : 'register',
	            label: 'Register',
	            text: 'Register',
	            id: 'register-button',
	            ui: 'confirm'
        	},
        	{
	            xtype: 'panel',
	            name: 'registerhome-links',
	            id: 'registerhome-links',
	            cls: 'home-links',
	            html: '<a id="signin-link">Back to Sign In</a> | <a id="about-link">About Karen</a>',
	            listeners: {
		            tap: {
		                element: 'element',
		                delegate: 'a',
		                fn: function(e) {
		                	if( e.getTarget('#signin-link') ){
		                		this.fireEvent('tapSignIn');
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
