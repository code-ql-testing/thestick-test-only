<?php

class Users extends CI_Model {

    var $users_tablename     = 'users';

    // Task Attributes

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_all_users()
    {
        $this->db->select('id, username, email, first_name, last_name, company, phone');
        $query = $this->db->get($this->users_tablename);
        return $query->result_array();
    }

    function get_user_byid($id)
    {
        $this->db->select('id, username, email, first_name, last_name, company, phone');
        $query = $this->db->get_where($this->users_tablename, array('id' => $id));
        return $query->result_array();
    }

}