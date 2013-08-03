<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class AllUsers extends REST_Controller
{
    
    function users_get()
    {
        $this->load->model('Users');
        $tasks = $this->Users->get_all_users();
        
        if($tasks)
        {
            $this->response($tasks, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
        }
    }

    function user_get()
    {
        $this->load->model('Users');
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {
            $task = $this->Users->get_user_byid($id);
            if(!$task)
            {
                $this->response(array('error' => 'Couldn\'t find any user by id:' . $id . '!' ), 404);
            }
            else
            {
                $this->response($task, 400);
            }
        }
    }

}