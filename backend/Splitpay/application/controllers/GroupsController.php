
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class GroupsController extends CI_Controller {

	public function __construct()
	{
			parent::__construct();
			
			
			$this->load->model("GroupsModel");

		
		
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}

	


	public function getGroups()
	{	$json = file_get_contents('php://input');
		$obj = json_decode($json,true);
	
		$data=$this->GroupsModel->getAll($obj["userId"]);
		
	
		

		if($data)
		{
			echo json_encode($data);
		
		}

		else 
		{

			echo json_encode("");
		}
		
	}


	public function createGroup()
	{
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		$data =array(
			'groupName'=>$obj['groupName'],
			'groupInfo'=>$obj['groupInfo'],
			'groupPay'=>0,
			'count'=>1,
			'founder'=>$obj['userId'],
		);

		$result=$this->GroupsModel->addGroup($data);
		
		$data=array(
			'groupId'=>$result['last_id'],
			'userId'=>$obj['userId']
		);

		$result["member"]=$this->GroupsModel->addMember($data);


		if($result["add"]&&$result['member'])
		{
			echo json_encode($result);
		}

		else{
			echo json_encode(false);
		}
		
    }
    
    public function deleteGroup()
    {

        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);
        
        $where=array(
            'founder'=>$obj['userId'],
            'groupId'=>$obj['groupId']
        );
        
        $where2=array(
            
            'groupId'=>$obj['groupId'],
            'userId'=>$obj['userId'],
		);
		
		$where3=array(
			'groupId'=>$obj["groupId"]
		);
		

		
        $result=$this->GroupsModel->deleteGroup($where,$where2,$where3);
       
      if($result)
      {
          echo json_encode($result);
      }

      else{

        echo json_encode("");
      }

    }


}

