<?php
class Task_scaffold extends CI_Controller {

        function Scaffold_test() {
                parent::Controller();
        }

        function index() {
                $this->load->library('sparkPlug', array('table'=>'tasks'));
                $this->sparkplug->scaffold();
        }
}