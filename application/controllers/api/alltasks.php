<?php defined('BASEPATH') OR exit('No direct script access allowed');

/*
 *      Return Codes
 *      1 - Not Logged In
 *      2 - Not Allowed to View Task
 *      3 - Empty Task
 *      4 - Task Not Exists
 *      5 - Task Not Allowed Update
 *      10 - OK
 *
 */

require APPPATH.'/libraries/REST_Controller.php';

class Alltasks extends REST_Controller
{

    function __construct()
    {
        parent::__construct();

        $this->load->model('Tasks');
        $this->load->library('ion_auth');

        if (!$this->ion_auth->logged_in()) // All tasks need authentication
        {
            $this->response(array('code' => '1', 'message' => 'You are not logged in!'), 404);
        }
    }
    
    function tasks_get()
    {
        if( $this->ion_auth->get_user_id() == 1 )
        {
            $tasks = $this->Tasks->get_all_entries();
            
            if($tasks)
            {
                $this->response($tasks, 200); // 200 being the HTTP response code
            }

            else
            {
                $this->response(array('code' => '4', 'message' => 'Couldn\'t find any tasks!'), 404);
            }
        }
        else 
        {
            $this->response(array('code' => '2', 'message' => 'You are not allowed to view all tasks!'), 404);
        }
    }

    function taskuser_get()
    {

        $userid = $this->get('id');

        if(!$userid)
        {
            $this->response(NULL, 400);
        }
        else
        {
            if( (int) $this->ion_auth->get_user_id() == (int) $userid )
            {
                $tasks = $this->Tasks->get_taskuser_byid($userid);
                
                if($tasks)
                {
                    sleep(2);
                    $this->response($tasks, 200); // 200 being the HTTP response code
                }

                else
                {
                    $this->response(array('code' => '4', 'message' => 'Couldn\'t find any tasks!'), 404);
                }
            }
            else
            {
                $this->response(array('code' => '2', 'message' => 'You are not allowed to view tasks by user: ' . $userid . '!'), 404);
            }

        }
    }

    function task_get()
    {
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {

            if( (int) $this->ion_auth->get_user_id() == 1 || $this->Tasks->has_taskuser_byid($id, $this->ion_auth->get_user_id()) ) // is admin(1) or the task has current user_id
            {
                $task = $this->Tasks->get_task_byid($id);
                if(!$task)
                {
                    $this->response(array('code' => '4', 'message' => 'Couldn\'t find any task by id:' . $id . '!' ), 404);
                }
                else
                {
                    $this->response($task, 400);
                }
            }
            else
            {
                $this->response(array('code' => '2', 'message' => 'You are not allowed to view this task!'), 404);
            }
        }
    }

    function tasks_post()
    {
        $task = array(
            'task_title'                    => $this->post('task_title'),
            'task_type'                     => $this->post('task_type'),
            'task_details'                  => $this->post('task_details'),
            'task_priority'                 => $this->post('task_priority'),
            //'date_created'                => $this->post('date_created'),        // timestamp by DB
            'task_datecreated'              => $this->post('task_datecreated'),
            'task_duedate'                  => $this->post('task_duedate'),
            'task_promisedate'              => $this->post('task_promisedate'),
            'task_projectname'              => $this->post('task_projectname'),
            'task_status'                   => $this->post('task_status'),
            'task_initialtimebudget'        => $this->post('task_initialtimebudget'),
            'task_currenttimebudget'        => $this->post('task_currenttimebudget'),
            'task_datecompleted'            => $this->post('task_datecompleted'),
            'task_assigned'                 => $this->post('task_assigned'),
            'task_createdby'                => $this->ion_auth->get_user_id(), //$this->post('task_createdby'),
            'task_requestedby'              => $this->ion_auth->get_user_id(), //$this->post('task_requestedby'),
            'task_lastnote'                 => $this->post('task_lastnote'),
            'task_lastnotedate'             => $this->post('task_lastnotedate'),
            'task_isarchive'                => $this->post('task_isarchive'),
        );

        $message = $this->Tasks->add_task($task);
        $this->response(array('code' => '10', 'id' => $message), 200); // 200 being the HTTP response code
    }

    function task_post()
    {
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {
            if( $this->Tasks->check_taskownership_byid($id, $this->ion_auth->get_user_id()) ) 
            {
                /*
                $task = array(
                    'task_title'                    => $this->post('task_title'),
                    'task_type'                     => $this->post('task_type'),
                    'task_details'                  => $this->post('task_details'),
                    'task_priority'                 => $this->post('task_priority'),
                    //'date_created'                => $this->post('date_created'),        // timestamp by DB
                    'task_datecreated'              => $this->post('task_datecreated'),
                    'task_duedate'                  => $this->post('task_duedate'),
                    'task_promisedate'              => $this->post('task_promisedate'),
                    'task_projectname'              => $this->post('task_projectname'),
                    'task_status'                   => $this->post('task_status'),
                    'task_initialtimebudget'        => $this->post('task_initialtimebudget'),
                    'task_currenttimebudget'        => $this->post('task_currenttimebudget'),
                    'task_datecompleted'            => $this->post('task_datecompleted'),
                    'task_assigned'                 => $this->post('task_assigned'),
                    'task_createdby'                => $this->post('task_createdby'),
                    'task_requestedby'              => $this->post('task_requestedby'),
                    'task_lastnote'                 => $this->post('task_lastnote'),
                    'task_lastnotedate'             => $this->post('task_lastnotedate'),
                    'task_isarchive'                => $this->post('task_isarchive'),
                );
                */

                $message = $this->Tasks->update_task($this->input->post(), $id);
                $this->response(array('code' => '10', 'message' => $message), 200); // 200 being the HTTP response code
            }
            else
            {
                $this->response(array('code' => '5', 'message' => 'You are not allowed to update this task!'), 404);
            }
        }
    }

    function taskassigned_post()
    {
        $id = $this->get('id');

        if(!$id)
        {
            $this->response(NULL, 400);
        }
        else
        {
            if( $this->Tasks->has_taskuser_byid($id, $this->ion_auth->get_user_id()) ) 
            {
                $task = array(
                    'task_promisedate'              => $this->post('task_promisedate'),
                );

                $message = $this->Tasks->updateasignee_task($task, $id);
                $this->response($message, 200); // 200 being the HTTP response code
            }
            else
            {
                $this->response(array('code' => '5', 'message' => 'You are not allowed to update this task!'), 404);
            }
        }
    }

    function task_delete()
    {
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