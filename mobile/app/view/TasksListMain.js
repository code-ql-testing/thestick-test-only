Ext.define('Karen.view.TasksListMain', {
    extend: 'Ext.List',
	xtype: 'taskslistmain',

	config: {
		store: 'Tasks',
		layout: 'fit',
		plugins: [
	        {	xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to load more tasks!',
	            fetchLatest: function(plugin) {
	            	this.parent.fireEvent('loadtasks', user.get('userid'), false, 0);
                	this.parent.getScrollable().getScroller().scrollTo(0, 0);
                },
	        }
	    ],
		itemTpl: '<div class="checkbox-container" id="todo_check_{id}"></div><div class="priority priority-{task_priority}"></div><div class="task-title"><p>{task_title}</p></div>'
	},

    constructor : function(config) {
		this.callParent([config]);
	}
});