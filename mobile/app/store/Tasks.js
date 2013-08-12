Ext.define('Karen.store.Tasks', {
    extend: 'Ext.data.Store',

	config: {
		name: 'Tasks',
		storeId: 'Taskss',	//	ref to bind inside views
		model: 'Karen.model.Task',
	}
});


