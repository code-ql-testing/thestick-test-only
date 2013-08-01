<?php

class Tasks extends CI_Model {

    var $task_tablename     = 'tasks';

    // Task Attributes

    var $task_title         = '';
    var $task_details       = '';
    var $task_priority      = '';
    var $date_created       = '';
    var $task_duedate       = '';
    var $task_projectname   = '';
    var $task_status        = '';
    var $task_assigned      = '';
    var $task_createdby     = '';
    var $task_promisedate   = '';
    var $task_isarchive     = '';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_all_entries()
    {
        $query = $this->db->get($this->task_tablename);
        return $query->result_array();
    }

    function get_task_byid($id)
    {
        $query = $this->db->get_where($this->task_tablename, array('id' => $id));
        return $query->result_array();
    }

    function add_task($task)
    {
        $this->db->insert($this->task_tablename, $task); 
        $rows =  $this->db->affected_rows();

        if ($rows){ return true; } else { return false; } 
    }

    function update_task($task, $id)
    {
        $this->db->where('id', $id);
        $this->db->update($this->task_tablename, $task);
        $rows =  $this->db->affected_rows();

        if ($rows){ return true; } else { return false; } 
    }

    function delete_task($id)
    {
        $this->db->delete($this->task_tablename, array('id' => $id));
        $rows =  $this->db->affected_rows();

        if ($rows){ return true; } else { return false; } 
    }

}