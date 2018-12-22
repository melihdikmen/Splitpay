
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

		require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

		  
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

			$chatkit->createRoom([
				'creator_id' => (string)$obj["userId"],
				'name' => $obj["groupName"],
				'user_ids' => [(string)$obj["userId"]],
				'private' => false,
				'custom_data' => ['id' => (string)$data["groupId"]]
			  ]);
			echo json_encode($result);
		}

		else{
			echo json_encode(false);
		}
		
    }
    
    public function deleteGroup()
    {


		require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

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
			$sonuc=$chatkit->getUserRooms([ 'id' =>(string) $obj["userId"] ]);
			
			foreach ($sonuc["body"] as $item ) {
				if($item["custom_data"]["id"]==(string)$obj["groupId"])
				{
					$son=$chatkit->deleteRoom([ 'id' => (string)$item["id"] ]);
				}
			}
          echo json_encode($result);
      }

      else{

        echo json_encode("");
      }

    }


}

