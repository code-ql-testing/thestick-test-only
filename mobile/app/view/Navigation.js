Ext.define('Karen.view.Navigation', {
	extend: 'Ext.Panel',
		xtype: 'navigation',
		
		config: {
			layout: 'fit',
			scrollable: 'vertical',
			cls : 'nav-list',
			items : [
	            {
	                title : 'Home',
	                xtype : 'panel',
	                styleHtmlContent : true,
	                autoScroll:true,
	            },
	            
            ]
	}
});