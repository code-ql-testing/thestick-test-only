Ext.define('Karen.view.MyPanel', {
    extend: 'Ext.dataview.List',
    xtype: 'myPanel',

    config: {
        fullscreen: true,
        layout: 'fit',
        //Just a input text field for out autocomplete
        items: [{
            xtype: 'textfield',
            name: 'inputText',
            labelWidth: 150,
            width: 450,
            label: 'Select a Country',
            itemId: 'searchBox'
        }]   

    } 

});