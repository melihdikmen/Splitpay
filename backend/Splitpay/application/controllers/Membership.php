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
				'name' => $obj["username"],
				'avatar_url' => 'http://splitpay.ml/Splitpay/uploads/null.jpg',
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


	public function UpdateUser()
	{

		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
		

		$where=array(
			"userId"=>$obj["userId"]
		);


		$result=$this->LoginModel->UpdateUser($obj,$where);

		if($result)
		{
			 echo json_encode($result);
		}

		else{

				 echo json_encode(false);

		}
			


	}



	public function getUser()
	{

		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
		

		$where=array(
			"userId"=>$obj["userId"]
		);


		$result=$this->LoginModel->getUser($where);

		if($result)
		{
			 echo json_encode($result);
		}

		else{

				 echo json_encode(false);

		}
			


	}


	public function UserPhoto(){
				
		$this->load->helper(array('form', 'url'));

		$config['upload_path']          = './uploads/';
		$config['allowed_types']        = 'gif|jpg|png';
		$config['max_size']             = 10000;
		$config['max_width']            = 3000;
		$config['max_height']           = 3000;

		$this->load->library('upload', $config);

		if(file_exists("./uploads/".$_POST["userId"].".jpg"))
		{
			unlink("./uploads/".$_POST["userId"].".jpg");
			
		}



		
		if ( ! $this->upload->do_upload('photo'))
		{
			   echo json_encode("");

			   
		}
		else
		{
			$upload = array('upload_data' => $this->upload->data());
		
			require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

		  $chatkit->updateUser([
			'id' => (string)$_POST["userId"],
			
			'avatar_url' => 'http://splitpay.ml/Splitpay/uploads/'.$_POST["userId"].'.jpg',
			
		  ]);
			
			
			$result=$this->LoginModel->UploadPhoto($_POST["userId"]);

			echo json_encode($result);
			
			   
		}

	
}


public function ChangePassword()
{

		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		
		$where=array(
		"userId"=>$obj["userId"],

		);

		$data=array(
			"password"=>md5($obj["password"])
		);

		$result=$this->LoginModel->ChangePassword($where,$data);

		if($result)
		{

			echo json_encode($result);
		}


		else{

			echo json_encode(false);
		}

		
		
		

}


		

	


	



}
