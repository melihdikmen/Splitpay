<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class ExpenseController extends CI_Controller {

	public function __construct()
	{
			parent::__construct();
			
			
			$this->load->model("ExpenseModel");
			
		
		
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function getExpenses()
	{	$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
	
		
		$where=array(
			'groupId'=>$obj['groupId']
		);

		$result=$this->ExpenseModel->getAll($where);
		
		if($result)
		{
			
			echo json_encode($result,JSON_UNESCAPED_UNICODE	);
		}


		else{
			
			echo  json_encode("");

		}
		
		
	}

	public function AddExpense()
	{
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		$data=array(
			'groupId'=>$obj['groupId'],
			'expenseTitle'=>$obj['expenseTitle'],
			'paid'=>(double)$obj['paid'],
			'fullname'=>$obj['fullname'],
			'date'=>$obj['date'],
			'users'=>implode(",",$obj['users'])

		);

		$result=$this->ExpenseModel->AddExpense($data,$obj['userId']);
		$all=0;
		foreach ($obj['payable'] as  $value) {
		
			$all=$all+$value["ratio"];
		}

		$single=$obj["paid"]/$all;
		
		foreach ($obj['payable'] as  $value) {
			$where=array(
				'groupId'=>$obj["groupId"],
				'userId'=>$value["userId"],
			);

			

			$end=$this->ExpenseModel->MemberSum($where,$value["ratio"]*$single);
		};

		
		
		
		$sum=json_encode($this->ExpenseModel->UpdateSum($obj["groupId"]));
		
		
		


		if($data)
		{
			echo json_encode($data);

		
		
		}

		else {
			echo json_encode("");
		}


	

	}


	public function deleteExpense()
	{
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		
		$where=array(
			'expenseId'=>$obj["expenseId"],
			
		);

		$result=$this->ExpenseModel->deleteExpense($where);
		$sum=json_encode($this->ExpenseModel->UpdateSum($obj["groupId"]));
		
		if($result)
		{
			echo json_encode($result);
		}

		else
		{
			echo json_encode("");
		}

		
		



	

	}


	public function getMembers(){

			
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);


		
		$result=$this->ExpenseModel->getMembers($obj["groupId"]);

		if($result){

			echo json_encode($result);
		}
		
		}

		public function SearchMember(){

			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

			$where=array(
				'username'=>$obj['username'],
			);

			$result=$this->ExpenseModel->searchMember($where);

			if($result)
			{
				echo json_encode($result);
			}

			else {
				echo json_encode("");
			}
			
		}


		public function addMember(){

			

			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

		
	
			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);
	
	
			

			$data=array(
				'userId'=>$obj['userId'],
				'groupId'=>$obj['groupId']
			);

			$result=$this->ExpenseModel->addMember($data);
			$count=$this->ExpenseModel->UpdateCount($obj['groupId']);

			if($result)
			{
				
				

				echo json_encode($result);
			}

			else {

				echo json_encode("");
			}
			
		}

		public function deleteMember()
		{
			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

			$where=array(
				'userId'=>$obj['userId'],
				'groupId'=>$obj['groupId']
			);

			$where2=array(
				'founder'=>$obj['userId'],
				'groupId'=>$obj['groupId']
			);

			$result=$this->ExpenseModel->deleteMember($where,$where2);
			$count=$this->ExpenseModel->UpdateCount($obj['groupId']);

			if($result)
			{
				echo json_encode($result);
			}

			else {
				echo json_encode("");
			}
		}


		public function UpdateGroupInfo(){

			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

			$data=array(
				'groupName'=>$obj['groupName'],
				'groupInfo'=>$obj['groupInfo'],
			);

			$where=array(
				'groupId'=>$obj['groupId']
			);

			$result=$this->ExpenseModel->UpdateGroups($data,$where);
			

			if($result)
			{
				echo json_encode($result);
			}

			else {
				echo json_encode("");
			}
			
		}


		public function getGroupInfo(){

			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

			

			$where=array(
				'groupId'=>$obj['groupId']
			);

			$result=$this->ExpenseModel->getGroupInfo($where);
			

			if($result)
			{
				echo json_encode($result);
			}

			else {
				echo json_encode("");
			}
			
		}


		public function getSummary(){

			$json = file_get_contents('php://input');
			$obj = json_decode($json,true);

			

			$where=array(
				'groupId'=>$obj['groupId']
			);

			$result=$this->ExpenseModel->getSummary($where);
			

			if($result)
			{
				echo json_encode($result);
			}

			else {
				echo json_encode("");
			}
			
		}

		public function upload(){
				
				$this->load->helper(array('form', 'url'));

				$config['upload_path']          = './uploads/group';
                $config['allowed_types']        = 'gif|jpg|png';
                $config['max_size']             = 10000;
                $config['max_width']            = 3000;
                $config['max_height']           = 3000;

                $this->load->library('upload', $config);

				if(file_exists("./uploads/group/".$_POST["groupId"].".jpg"))
				{
					unlink("./uploads/group/".$_POST["groupId"].".jpg");
					
				}

   

				
				if ( ! $this->upload->do_upload('photo'))
                {
                       echo json_encode("");

                       
                }
                else
                {
                    $upload = array('upload_data' => $this->upload->data());
				
					
					
					$result=$this->ExpenseModel->UploadPhoto($_POST["groupId"]);

					echo json_encode($result);
					
                       
                }
		
			
		}
	




}

