Ext.define('Karen.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    config: {
        layout: 'vbox',
        items : [
            {
                    name: 'taskslistmain',
                    xtype: 'taskslistmain',
                    id: 'tasksListMain',
                    flex: 1,
                },
            {
                xtype : 'titlebar',
                docked : 'top',
                items :[
                {
                    align : 'left',
                    name : 'nav_btn',
                    iconCls : 'list',
                    ui : 'plain'
                },
                {
                    align : 'left',
                    name : 'title',
                    id: 'title-header',
                    html: 'Karen',
                    xtype: 'panel'
                },
                {
                    align : 'right',
                    name : 'refresh_btn',
                    iconCls : 'refresh',
                    ui : 'plain'
                },
                {
                    align : 'right',
                    name : 'add_btn',
                    iconCls : 'add',
                    ui : 'plain'
                }],
            }]
        }
});
