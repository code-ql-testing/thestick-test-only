Ext.define('Karen.view.Tasklist', {
	extend: 'Ext.Container',
	xtype: 'taskListView',
	
	config: {
		fullscreen: true,
		layout: 'hbox',

		items: [
			{
				xtype : 'main',
				cls: 'slide',
				name: 'main',
				id: 'main',
				// Needed to fit the whole content
				width: '100%'												
			},
			{
				xtype : 'taskinfo',
				name: 'taskinfo',
				id: 'taskinfo'
			},
			{
				xtype : 'navigation',
				id : 'navigation',
				width : 250
			},
		]
		
	}
});
