Ext.define('Karen.controller.Autocomplete', {
    extend: 'Ext.app.Controller',

	config: {

        control: {
			'#halo': {
				activate: 'onActivate'
			},

			'#halo textfield[itemId=searchBox]' : {
				//clear the input text box
				clearicontap : 'onClearSearch',
				//on every key stroke
				keyup: 'onSearchKeyUp'
			},
			'#halo': {
				//select the country
				itemtap: 'onSelectRow'
			}
	  	}  
    },

	onSearchKeyUp: function(searchField) {

		console.log( searchField.getValue() )

		queryString = searchField.getValue().toLowerCase();
		//console.log(this,'Please search by: ' + queryString);

		Ext.getCmp('halo').setHeight('50%');

		//load data into the list store based on the query
		var store = usersStore;
		
		Ext.getCmp('tasksListMain').refresh();

		store.clearFilter();
		store.filter([
		   {filterFn: function(item) { var pat = new RegExp(queryString); return pat.test( item.get('username').toLowerCase() ) }}
		]);

	},
 
	onClearSearch: function() {
		//console.log('Clear icon is tapped');

		//remove all data from the store
		var store = usersStore;
		store.clearFilter();

		//hide out floating list
		//var myList = Ext.getCmp('#halo');
		//myList.setHidden(true);

	},
  
	onSelectRow: function(view, index, target, record, event) {
		//console.log('Clicked on a Row');
		//get reference to the panel
		var textfield = Ext.getCmp('inputText');
		//set the text field value 
		textfield.setValue(record.get('username'));
		//clear the drop down list
		this.onClearSearch();
	},

    init: function() {

	},

});