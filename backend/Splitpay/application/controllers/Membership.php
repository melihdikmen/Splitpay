<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Membership extends CI_Controller {

	public function __construct()
	{
			parent::__construct();
			
			$this->load->model("LoginModel");
			$this->load->model("GroupsModel");
			
		
		
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function login()
	{	
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
		
		
		$where =array(
			'username'=>$obj['username'],
			'password'=>md5($obj['password'])
		);

		$data=$this->LoginModel->login($where);


		if($data)
		{
			echo json_encode($data);
		}

		else{
			echo json_encode("");
		}
		
	}


	public function register()
	{	
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
		
		
		$data =array(
			'username'=>$obj['username'],
			'password'=>md5($obj['password']),
			'fullname'=>$obj['fullname']
		);

		$where=array('username'=>$obj['username']);

		$userControl=$this->LoginModel->login($where);
		
		if(!$userControl)
		{
			$data=$this->LoginModel->register($data);


			if($data)
		{
			echo json_encode("true");
		}

		else{
			echo json_encode("false");
		}
		}


		else
		{
			echo json_encode("isUse");
		}
		


		
		
		
		
	}


	



}
