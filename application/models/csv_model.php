<?php
	class csv_model extends CI_model{
		function csv_to_table($data){ // $data must be array
			foreach($data as $v){
				$this->db->insert('tasks',$v);
			}
		}
	}