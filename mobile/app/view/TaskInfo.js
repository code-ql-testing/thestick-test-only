Ext.define('Karen.view.TaskInfo', {
    extend: 'Ext.Panel',
	xtype: 'taskinfo',

	config: {
    	top: 0,
    	right: 0,
    	modal: true,
    	scrollable: 'vertical',
    	items: [
    		{
    			xtype: 'titlebar',
    			name: 'tasktitle',
    			id: 'tasktitle',
    			docked: 'top',
                items: [
                    {
                        align : 'left',
                        xtype: 'panel',
                        name: 'tasktitleinfo',
                        id: 'tasktitleinfo',
                        width: '250px',
                        listeners: {
                            tap: {
                                element: 'element',
                                fn: function(e) {
                                    this.fireEvent('tapped', this);
                                }
                            },
                        },
                    },
                ]
    		},
    		{
    			xtype: 'panel',
                name: 'taskkeypersons',
                id: 'taskkeypersons',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'panel',
                        name: 'taskcreatedby',
                        id: 'taskcreatedby',
                        html: '',
                        flex: 1,
                        listeners: {
                            tap: {
                                element: 'element',
                                fn: function(e) {
                                    this.fireEvent('tapped', this);
                                }
                            },
                        },
                    },
                    {
                        xtype: 'panel',
                        name: 'taskassigned',
                        id: 'taskassigned',
                        html: '',
                        flex: 1,
                        listeners: {
                            tap: {
                                element: 'element',
                                fn: function(e) {
                                    this.fireEvent('tapped', this);
                                }
                            },
                        },
                    }
                ]
    			
    		},
    		{
    			xtype: 'panel',
    			name: 'tasktype',
    			id: 'tasktype',
    			html: 'Task type'
    		},
            {
                xtype: 'panel',
                name: 'taskpriority',
                id: 'taskpriority',
                html: 'Task priority'
            },
            {
                xtype: 'panel',
                name: 'taskstatus',
                id: 'taskstatus',
                html: 'Task status'
            },
    		{
    			xtype: 'panel',
    			name: 'taskdetails',
    			id: 'taskdetails',
    			items: [
    				{
    					xtype: 'panel',
		    			name: 'taskdetailsheader',
		    			id: 'taskdetailsheader',
		    			html: 'Task Details'
    				},
    				{
    					xtype: 'panel',
		    			name: 'taskdetailsinfo',
		    			id: 'taskdetailsinfo',
		    			html: 'Task details Info'
    				}
    			]
    		},
            {
                xtype: 'panel',
                name: 'taskprojectname',
                id: 'taskprojectname',
                html: 'Task Project Name'
            },
            {
                xtype: 'panel',
                name: 'taskinitialtimebudget',
                id: 'taskinitialtimebudget',
                html: 'Task Initial Time Budget'
            },
            {
                xtype: 'panel',
                name: 'taskcurrenttimebudget',
                id: 'taskcurrenttimebudget',
                html: 'Task Current Time Budget'
            },
    	],
    	layout: 'vbox',
    	width: '85%',
    	height: '100%',
    	hideOnMaskTap: true,
    	showAnimation: {
            type: 'slide',
            duration: 150,
            direction:'left'
        },
        hideAnimation: {
            type: 'slideOut',
            duration: 150,
            direction:'right'
        },
	},

});