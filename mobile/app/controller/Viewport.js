var user;
var tasksStore;
var usersStore;
var currentTask;

Ext.define('Karen.controller.Viewport', {
    extend: 'Ext.app.Controller',

	config: {
        refs: {
            loginButton: '#login-button',
            LoginForm: '#login-view',
            LoginMessage: '#login-message',
            SignInHomeLinks: '#signinhome-links',
            RegisterHomeLinks: '#registerhome-links',
            main : 'main',
			navBtn : 'button[name="nav_btn"]',
			addBtn : 'button[name="add_btn"]',
			TasksListMain : '#tasksListMain',
			task: 'taskslistmain'
        },

        control: {
        	loginButton: {
                tap: 'doLogin'
            },
            SignInHomeLinks: {
            	tapRegister: 'showRegister',
            	tapAbout: 'showAbout',
            },
            RegisterHomeLinks: {
            	tapSignIn: 'showSignIn',
            },
            navBtn : {
				tap : 'toggleNav'
			},
			addBtn : {
				tap: 'addTaskDialog'
			},			
			task: {
				//itemtap: 'showTask'
				itemtap: 'checkTask',
                loadtasks: 'loadAllTasks'
			}
        }
    },

    init: function() {
		var me = this;
		this.app = this.getApplication();	//	short ref to our app
		this.app.vp = Ext.Viewport;			//	set app level ref to our viewport
		tasksStore = Ext.create('Karen.store.Tasks');
		usersStore = Ext.create('Karen.store.Users');

	},

	toggleNav : function(){
		//var me = this,
		var mainView = this.getMain().element;
		//mainEl = me.getMain().element;
		
		if (mainView.hasCls('out')) {
			mainView.removeCls('out').addCls('in'); 
		} else {
			mainView.removeCls('in').addCls('out');
		}
	},

	showSignIn: function() {
		var viewport = Ext.getCmp('viewport');
		var loginView = Ext.getCmp('login-view');
        viewport.animateActiveItem(loginView, {type:'slide', direction: 'right'});
	},

	showRegister: function() {
		var viewport = Ext.getCmp('viewport');
		var registerView = Ext.getCmp('register-view');
        viewport.animateActiveItem(registerView, {type:'slide', direction: 'left'});
	},

	showAbout: function() {
		console.log('shet2');
	},

	doLogin: function() {
		
		var jump = false;

		Ext.getCmp('taskinfo').hide();

		if( jump ) {
			this.configureAccount('2');
		}
		else {
			this.checkLogin();
		}
			
    },

    checkLogin: function(){

    	var that = this;

    	var baseUrl = Karen.util.Config.getBaseUrl();
    	var loginForm = this.getLoginForm();
		var loginInfo = loginForm.getValues();
		var loginMessage = Ext.getCmp('login-message');

		if( loginInfo.email == '' && loginInfo.password == '' ) {
			loginMessage.setHtml('Please type in with your email and your password');
			loginMessage.setCls('warning');
		} else {

			var loadingLoginModal = Ext.Viewport.add({
			    xtype: 'panel',
			    modal: true,
			    html: '<div class="loading">Validating Credentials</div>',
			    centered: true
			});

	    	Ext.Ajax.request({
			    url: baseUrl + '/auth/login',

			    params: {
			        identity: loginInfo.email,
			        password: loginInfo.password,
			        ajax: 1
			    },

			    callback: function(optionslogin, successlogin, responselogin) {

			        var responseloginJSON = Ext.JSON.decode( responselogin.responseText );
			        console.log(responseloginJSON.login)

			        if( responseloginJSON.login == 'true' ){
			        	that.configureAccount( responseloginJSON.id );
			        }
			        else {
			        	loginMessage.setHtml('Wrong email or password');
						loginMessage.setCls('warning');
			        }

			        loadingLoginModal.destroy();
			    }
			});

		}
    },

    configureAccount: function( id ){

    	var that = this;

    	var baseUrl = Karen.util.Config.getBaseUrl();

    	var loadingLoginModal = Ext.Viewport.add({
		    xtype: 'panel',
		    modal: true,
		    html: '<div class="loading">Configuring Account</div>',
		    centered: true
		});

		Ext.Ajax.request({

			url: baseUrl + '/api/users/' + id,

			callback: function(optionsuser, successuser, responseuser) {
				loadingLoginModal.hide();
				var responseuserJSON = Ext.JSON.decode( responseuser.responseText );

				user = Ext.create('Karen.model.User', {
				    userid : responseuserJSON[0].id,
				    username : responseuserJSON[0].username,
				    email : responseuserJSON[0].email,
				    first_name : responseuserJSON[0].first_name,
				    last_name : responseuserJSON[0].last_name,
				    company : responseuserJSON[0].company,
				    phone: responseuserJSON[0].phone,
				});

				loadingLoginModal.destroy();

				that.getUsers();
			},
		});
    },

    getUsers: function(){
    	
		this.showHomeView();

    },

    showHomeView: function(){

    	var viewport = Ext.getCmp('viewport');
		var homeView = Ext.getCmp('tasklist-view');
		var taskListHeader = Ext.getCmp('title-header');
    	viewport.animateActiveItem(homeView, {type:'cover', direction: 'up'});

    	taskListHeader.setHtml( 'Hello ' + user.get('first_name') );
    	this.loadAllTasks( user.get('userid'), false, 0 )


    },

    loadAllTasks: function( id, addednewtask, taskid ){
    	
    	var that = this;

    	var baseUrl = Karen.util.Config.getBaseUrl();
    	var tasksListMain = this.getTasksListMain();

    	var loadingLoginModal = Ext.Viewport.add({
		    xtype: 'panel',
		    modal: true,
		    html: '<div class="loading">Loading Tasks</div>',
		    centered: true
		});

    	Ext.Ajax.request({

    		url: baseUrl + '/api/tasksby/' + id,

			callback: function(optionstasks, successtasks, responsetasks) {
				var responsetasksJSON = Ext.JSON.decode( responsetasks.responseText );

				if( responsetasksJSON.length )
				{
					for(var i=0 ; i < responsetasksJSON.length ; i++ ){
				        var task = responsetasksJSON[i];

				        var taskModel = Ext.create('Karen.model.Task', {
				        	id: 					task['id'],	
				            task_title: 			task['task_title'],		
				            task_type: 				task['task_type'],		
				            task_details: 			task['task_details'],	
				            task_priority: 			task['task_priority'],	
				            date_created: 			task['date_created'],	
				            task_datecreated: 		task['task_datecreated'],		
				            task_duedate: 			task['task_duedate'],	
				            task_promisedate: 		task['task_promisedate'],	
				            task_projectname: 		task['task_projectname'],	
				            task_status: 			task['task_status'],	
				            task_initialtimebudget: task['task_initialtimebudget'],	
				            task_currenttimebudget: task['task_currenttimebudget'],	
				            task_datecompleted: 	task['task_datecompleted'],	
				            task_assigned: 			task['task_assigned'],	
				            task_createdby: 		task['task_createdby'],	
				            task_requestedby: 		task['task_requestedby'],	
				            task_lastnote: 			task['task_lastnote'],	
				            task_lastnotedate: 		task['task_lastnotedate'],	
				            task_feedbackcomment: 	task['task_feedbackcomment'],	
				            task_feedbackrating: 	task['task_feedbackrating'],	
				            task_isarchive: 		task['task_isarchive'],
						});
						
						tasksStore.add(taskModel);

				    }

				    tasksListMain.setStore(tasksStore);
				    Ext.getCmp('tasksListMain').refresh();
				    
				    if( addednewtask ) {
				    	that.showTask('view', 'index', taskid)
				    }

				    loadingLoginModal.destroy();

				}
				
			},
		});
    },

    addTaskDialog: function(){

    	var that = this;

    	var addTaskModal = Ext.Viewport.add({
		    xtype: 'panel',
		    layout: 'vbox',
		    hideOnMaskTap: true,
		    modal: true,
		    width: '80%',
		    id: 'addTaskDialog',
		    items:[
		    	{
					xtype: 'fieldset',
					name: 'addTaskFieldset',
					id: 'add-task-fieldset',
					cls: 'fieldset',
					defaults: {
						labelAlign: 'top',
					},
	            	items: [
				        {
				            xtype: 'textfield',
				            name : 'new-task-name',
				            id : 'new-task-name',
				            label: 'Task Title'
				        },
				    ],
		    	},
		    	{
		            xtype: 'button',
		            name : 'addnewtaskbutton',
		            cls: 'fieldset-submit',
		            text: 'Add',
		            id: 'addnewtaskbutton',
		            ui: 'confirm',
		            listeners: {
		                tap: function() {

		                	that.addTask( Ext.getCmp("new-task-name").getValue() );
		                	this.parent.destroy();
		                
		                }
		            },
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

    addTask: function( taskname ){

    	var that = this;
    	var baseUrl = Karen.util.Config.getBaseUrl();

    	var loadingAddNewTaskModal = Ext.Viewport.add({
		    xtype: 'panel',
		    modal: true,
		    html: '<div class="loading">Adding New Task</div>',
		    centered: true
		});

		Ext.Ajax.request({
		    url: baseUrl + '/api/tasks',

		    params: {
		        task_title: taskname,
		    },

		    callback: function(optionsaddtask, successaddtask, responseaddtask) {

		        var responseaddtaskJSON = Ext.JSON.decode( responseaddtask.responseText );

		        if( responseaddtaskJSON.code == '10' ){
		        	that.loadAllTasks( user.get('userid'), true, responseaddtaskJSON.id )
		        }
		        else {
		        }

		        loadingAddNewTaskModal.destroy();
		    }
		});

    },

    checkTask: function(view, index, target, record, e, eOpts){
	    var elm = Ext.get(e.target);
	    
	    //console.log(elm, Ext.getCmp(elm.dom.id));

	    if( elm.dom.className == 'checkbox-container' ) {
	    	console.log('checkbox');
	    }
	    else {
	    	this.showTask(view, index, false);
	    }

	},

    showTask: function(view, index, newtask){

		var taskInfo = Ext.getCmp('taskinfo');
		var baseUrl = Karen.util.Config.getBaseUrl();
		var task;

		taskInfo.show();
		taskInfo.getScrollable().getScroller().scrollTo(0, 0);

		if( newtask ) {
			task = tasksStore.getById(newtask);
			currentTask = newtask;
		} else {
			task = tasksStore.getAt(index);
			currentTask = task.getId();
		}
		
		var createdby = usersStore.getById( task.get('task_createdby') );
		var assigned = usersStore.getById( task.get('task_assigned') );

		if( task.get('task_title') ){
			taskInfo.down('#tasktitleinfo').setHtml( task.get('task_title') );
		} else {
			taskInfo.down('#tasktitleinfo').setHtml( task.get('task_title') );
		}

		if( task.get('task_priority') ){
			taskInfo.down('#taskpriority').setCls( 'priority-' + task.get('task_priority') );

			switch( task.get('task_priority') ){
				case 1:
					taskInfo.down('#taskpriority').setHtml( '<b>Priority</b>: High' );
					break;
				case 2:
					taskInfo.down('#taskpriority').setHtml( '<b>Priority</b>: Medium' );
					break;
				case 3:
					taskInfo.down('#taskpriority').setHtml( '<b>Priority</b>: Low' );
					break;
			}
			
		} else {
			taskInfo.down('#taskpriority').setHtml( '<div class="empty">Set Task Priority</div>' );
		}

		if( task.get('task_status') != 0 ){
			taskInfo.down('#taskstatus').setCls( 'status-' + task.get('task_status') );

			switch( task.get('task_status') ){
				case 1:
					taskInfo.down('#taskstatus').setHtml( '<b>Status</b>: Not Released' );
					break;
				case 2:
					taskInfo.down('#taskstatus').setHtml( '<b>Status</b>: Not Started' );
					break;
				case 3:
					taskInfo.down('#taskstatus').setHtml( '<b>Status</b>: In Progress' );
					break;
				case 4:
					taskInfo.down('#taskstatus').setHtml( '<b>Status</b>: Complete' );
					break;
				case 5:
					taskInfo.down('#taskstatus').setHtml( '<b>Status</b>: Cancelled' );
					break;
			}
			
		} else {
			taskInfo.down('#taskstatus').setHtml( '<div class="empty">Set Task Status</div>' );
		}

		if( task.get('task_type') != 0 ){
			taskInfo.down('#tasktype').setHtml( task.get('task_type') );
		} else {
			taskInfo.down('#tasktype').setHtml( '<div class="empty">Add Task Type</div>' );
		}

		taskInfo.down('#taskcreatedby').setHtml( '<div class="taskinfousers"><img class="" src="' + baseUrl + '/assets/userimages/anon.png">' + '<div class="name">' + createdby.get('first_name') + ' ' + createdby.get('last_name') + '</div><div class="createddate">' + task.get('task_datecreated') + '</div><div class="duedate">' + task.get('task_duedate') + '</div></div>');
		
		if( assigned ){
			taskInfo.down('#taskassigned').setHtml( '<div class="taskinfousers"><img class="" src="' + baseUrl + '/assets/userimages/anon.png">' + '<div class="name">' + assigned.get('first_name') + ' ' + assigned.get('last_name') + '</div><div class="promisedate">' + task.get('task_promisedate') + '</div></div>');
		} else {
			taskInfo.down('#taskassigned').setHtml( '<div class="empty">Add task assigned</div>' );
		}

		if( task.get('task_details') != 0 ){
			taskInfo.down('#taskdetailsinfo').setHtml( task.get('task_details') );
		} else {
			taskInfo.down('#taskdetailsinfo').setHtml( '<div class="empty">Add task details info</div>' );
		}

		if( task.get('task_projectname') != 0 ){
			taskInfo.down('#taskprojectname').setHtml( '<b>Project Name:</b><br> ' + task.get('task_projectname') );
		} else {
			taskInfo.down('#taskprojectname').setHtml( '<div class="empty">Add task project name</div>' );
		}

		taskInfo.down('#taskinitialtimebudget').setHtml( '<b>Initial Time Budget:</b> ' + task.get( 'task_initialtimebudget') + ' Hrs.' );
		
		taskInfo.down('#taskcurrenttimebudget').setHtml( '<b>Current Time Budget:</b> ' + task.get( 'task_currenttimebudget') + ' Hrs.' );		

	},

	launch: function(){
		console.log("Launched Viewport");
	}
});