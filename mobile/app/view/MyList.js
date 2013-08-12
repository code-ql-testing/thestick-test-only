//displays a list of countries in a floating panel
Ext.define('Karen.view.MyList', {
    extend: 'Ext.dataview.List',
    xtype : 'myList',
     
    config: {
     store : 'Users',
     left: 0,
        top: 0,
        hideOnMaskTap: true,
        width: 300,
        height: "50%",
        cls: 'myClass',
         
     itemTpl:  '<div class="myContent">'+ 
         '<div>haha<b>{user_name}</b> ({code})</div>' +
         '</div>',
     
     emptyText: '<div class="myContent">No Matching Users</div>',
     
    } 
});