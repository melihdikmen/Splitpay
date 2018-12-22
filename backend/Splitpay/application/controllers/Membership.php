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
		require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

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
			$result=$this->LoginModel->register($data);


			if($result["isRegister"])
		{
			
			$chatkit->createUser([
				'id' => (string)$result["last_id"],
				'name' => $obj["username"]
			  ]);

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
