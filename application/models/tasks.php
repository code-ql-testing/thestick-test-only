<?php

class Tasks extends CI_Model {

    var $task_tablename     = 'tasks';

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

    function check_taskownership_byid($taskid, $userid)
    {
        $where = "(task_createdby = " . $userid . " OR task_requestedby = " . $userid . ") AND id =" . $taskid  ;
        $query = $this->db->get_where($this->task_tablename, $where);

        if( $query->num_rows == 1 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function has_taskuser_byid($taskid, $userid)
    {
        $where = "(task_assigned = " . $userid . " OR task_createdby = " . $userid . " OR task_requestedby = " . $userid . ") AND id =" . $taskid  ;
        $query = $this->db->get_where($this->task_tablename, $where);

        if( $query->num_rows == 1 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function get_taskuser_byid($userid)
    {
        $where = "task_assigned = " . $userid . " OR task_createdby = " . $userid . " OR task_requestedby = " . $userid ;
        $this->db->distinct();
        $query = $this->db->get_where($this->task_tablename, $where);

        return $query->result_array();
    }

    function add_task($task)
    {
        $this->db->insert($this->task_tablename, $task); 
        $rows =  $this->db->affected_rows();

        if ($rows){ return $this->db->insert_id(); } else { return false; } 
    }

    function update_task($task, $id)
    {
        $this->db->where('id', $id);
        $this->db->update($this->task_tablename, $task);
        $rows =  $this->db->affected_rows();

        if ($rows){ return true; } else { return false; } 
    }

    function updateasignee_task($task, $id)
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