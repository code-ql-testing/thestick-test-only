<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Alltasks extends REST_Controller
{
    
    function tasks_get()
    {
        $this->load->model('Tasks');
        $tasks = $this->Tasks->get_all_entries();
        
        if($tasks)
        {
            $this->response($tasks, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
        }
    }

    function task_get()
    {
        $this->load->model('Tasks');
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {
            $task = $this->Tasks->get_task_byid($id);
            if(!$task)
            {
                $this->response(array('error' => 'Couldn\'t find any task by id:' . $id . '!' ), 404);
            }
            else
            {
                $this->response($task, 400);
            }
        }
    }

    function tasks_post()
    {
        $this->load->model('Tasks');

        $task = array(
            'task_title'         => $this->post('task_title'),
            'task_details'       => $this->post('task_details'),
            'task_priority'      => $this->post('task_priority'),
            'task_duedate'       => $this->post('task_duedate'),
            'task_projectname'   => $this->post('task_projectname'),
            'task_status'        => $this->post('task_status'),
            'task_assigned'      => $this->post('task_assigned'),
            'task_createdby'     => $this->post('task_createdby'),
            'task_promisedate'   => $this->post('task_promisedate'),
            'task_isarchive'     => $this->post('task_isarchive'),
        );

        $message = $this->Tasks->add_task($task);
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function task_post()
    {
        $this->load->model('Tasks');
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {
            $task = array(
                'task_title'         => $this->post('task_title'),
                'task_details'       => $this->post('task_details'),
                'task_priority'      => $this->post('task_priority'),
                'task_duedate'       => $this->post('task_duedate'),
                'task_projectname'   => $this->post('task_projectname'),
                'task_status'        => $this->post('task_status'),
                'task_assigned'      => $this->post('task_assigned'),
                'task_createdby'     => $this->post('task_createdby'),
                'task_promisedate'   => $this->post('task_promisedate'),
                'task_isarchive'     => $this->post('task_isarchive'),
            );

            $message = $this->Tasks->update_task($task, $id);
            $this->response($message, 200); // 200 being the HTTP response code
        }
    }

    function task_delete()
    {
        $this->load->model('Tasks');
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else {
            $message = $this->Tasks->delete_task($id);
            
            $this->response($message, 200); // 200 being the HTTP response code
        }
    }

}