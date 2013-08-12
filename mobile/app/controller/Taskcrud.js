Ext.define('Karen.controller.Taskcrud', {
    extend: 'Ext.app.Controller',

	config: {
        refs: {
            tasktitle: '#tasktitleinfo',
        },

        control: {
        	tasktitle: {
                tapped: 'editTaskTitleDialog'
            },
        }
    },

    init: function() {
		var me = this;
		this.app = this.getApplication();	//	short ref to our app

	},

    editTaskTitleDialog: function(title){

    	var that = this;

    	if( tasksStore.getById(currentTask).get('task_createdby') != user.get('userid') ) {
    		Ext.Msg.alert('Forbidden', 'You are not allowed to edit the task title. Please ask the assistance from the task creator.');
    		return false;
    	}

    	var editTaskTitleModal = Ext.Viewport.add({
		    xtype: 'panel',
		    layout: 'vbox',
		    hideOnMaskTap: true,
		    modal: true,
		    width: '80%',
		    id: 'editTaskTitleDialog',
		    items:[
		    	{
					xtype: 'fieldset',
					name: 'editTaskTitleFieldset',
					id: 'edit-task-title-fieldset',
					cls: 'fieldset',
					defaults: {
						labelAlign: 'top',
					},
	            	items: [
				        {
				            xtype: 'textfield',
				            name : 'edit-task-title',
				            id : 'edit-task-title',
				            label: 'Edit Task Title',
				            value: title.getHtml()
				        },
				    ],
		    	},
		    	{
		    		xtype: 'panel',
		    		layout: 'hbox',
		    		items:[
		    			{
				            xtype: 'button',
				            name : 'canceledittasktitlebutton',
				            text: 'Cancel',
				            id: 'canceledittasktitlebutton',
				            cls: 'fieldset-cancel',
				            flex: 1,
				            listeners: {
				                tap: function() {

				                	this.parent.parent.destroy();
				                
				                }
				            },
				        },
		    			{
				            xtype: 'button',
				            name : 'edittasktitlebutton',
				            text: 'Edit Title',
				            id: 'edittasktitlebutton',
				            ui: 'confirm',
				            cls: 'fieldset-submit',
				            flex: 2,
				            listeners: {
				                tap: function() {

				                	that.submitTaskData( 'Task Title', 'task_title', Ext.getCmp("edit-task-title").getValue(), currentTask );
				                	this.parent.parent.destroy();
				                
				                }
				            },
				        }
			        ]
	        	},
		    ],
		    centered: true,
		    listeners: {
		    	hide: function(){
		    		this.destroy();
		    	}
		    }
		});

    },

    submitTaskData: function( fieldfriendlyname, fieldname, fieldvalue, taskid ){
    	
    	var that = this;
    	var baseUrl = Karen.util.Config.getBaseUrl();

    	var loadingSubmitTaskDataModal = Ext.Viewport.add({
		    xtype: 'panel',
		    modal: true,
		    html: '<div class="loading">Changing ' + fieldfriendlyname + '</div>',
		    centered: true
		});

		var params = {};
		params[fieldname] = fieldvalue;

		Ext.Ajax.request({
		    url: baseUrl + '/api/tasks/' + taskid,

		    params: params,

		    callback: function(optionsubmitdata, successsubmitdata, responsesubmitdata) {

		        var responsesubmitdataJSON = Ext.JSON.decode( responsesubmitdata.responseText );

		        if( responsesubmitdataJSON.code == '10' ){
		        	//that.loadAllTasks( user.get('userid'), true, responseaddtaskJSON.id )
		        	that.getApplication().getController('Viewport').loadAllTasks( user.get('userid'), true, taskid );
		        }
		        else {
		        }

		        loadingSubmitTaskDataModal.destroy();
		    }
		});
		
    },
});