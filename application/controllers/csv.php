<?php
 class Csv extends CI_Controller{
 	var $path;
 	function csv(){
 		parent::__construct();
 		$this->load->model('csv_model');
 		$this->path = realpath(APPPATH . '../attachments/');
	
 	}
 	function index(){
 		
 		if($this->form_validation->run() == FALSE){
 			$this->load->view('csv');
 		}
 		if(isset($_POST['submit'])){
 			#print_r($_FILES);
 			$this->upload();
 		}
 	}
 	function MY_csv($file){
 		$csv = new parseCSV($file);
 		$this->csv_model->csv_to_table($csv->data);
 	}
 	function upload(){
 		$config = array(
 				'allowed_types' => 'csv|application/vnd.ms-excel|text/anytext|text/plain|text/x-comma-separated-values|text/comma-separated-values|application/octet-stream|application/vnd.ms-excel|application/x-csv|text/x-csv|text/csv|application/csv|application/excel|application/vnd.msexcel',
 				'upload_path' => $this->path,
 				'max_size' => 1048,
 				'remove_spaces' => TRUE,
 				'encrypt_name' => TRUE
 		);
 		$this->load->library('upload',$config);
 		if($this->upload->do_upload()){
 				
 			$img_uploaded = $this->upload->data();
 			$this->MY_csv($this->path.'/'.$img_uploaded['file_name']);
 			echo 'Successfully create sql table';
 		}else{
 			echo $this->upload->display_errors();die();
 		}
 	}
 }