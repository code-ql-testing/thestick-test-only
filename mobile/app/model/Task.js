Ext.define('Karen.model.Task', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',                    type: 'int'},
            {name: 'task_title',            type: 'string'},
            {name: 'task_type',             type: 'string'},
            {name: 'task_details',          type: 'string'},
            {name: 'task_priority',         type: 'int'},
            {name: 'date_created',          type: 'string'},
            {name: 'task_datecreated',      type: 'string'},
            {name: 'task_duedate',          type: 'string'},
            {name: 'task_promisedate',      type: 'string'},
            {name: 'task_projectname',      type: 'string'},
            {name: 'task_status',           type: 'int'},
            {name: 'task_initialtimebudget',type: 'string'},
            {name: 'task_currenttimebudget',type: 'string'},
            {name: 'task_datecompleted',    type: 'string'},
            {name: 'task_assigned',         type: 'string'},
            {name: 'task_createdby',        type: 'string'},
            {name: 'task_requestedby',      type: 'string'},
            {name: 'task_lastnote',         type: 'string'},
            {name: 'task_lastnotedate',     type: 'string'},
            {name: 'task_feedbackcomment',  type: 'string'},
            {name: 'task_feedbackrating',   type: 'int'},
            {name: 'task_isarchive',        type: 'bool'},
        ]
    }
});
