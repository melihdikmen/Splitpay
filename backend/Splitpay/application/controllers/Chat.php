
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {

	public function __construct()
	{
			parent::__construct();
		
			
    }
    
    public function getRoomMessages()
    {
        require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);


        $sonuc=$chatkit->getUserRooms([ 'id' =>(string) $obj["userId"] ]);
			
        foreach ($sonuc["body"] as $item ) {
            if($item["custom_data"]["id"]==(string)$obj["groupId"])
            {
                $room_id=$item["id"];
            }
        }

        
       $messages= $chatkit->getRoomMessages([
            'room_id' => (string)$room_id
          ]);
        
        
        if($messages["body"]!=[])
        {
            echo json_encode($messages["body"]);
        }   

        else
        {
            echo json_encode(false);
        }
         
    }

    public function getRoomId()
    {
       require_once('vendor/autoload.php');

		$chatkit = new Chatkit\Chatkit([
			'instance_locator' => 'v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4',
			'key' => '1f6a2d90-0d5e-4596-9204-0df0c4067ab0:daapDNShkarWi87y6b7NulEyaW7rdOb/1BOVMS0Dlx8='
		  ]);

        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);


        $sonuc=$chatkit->getUserRooms([ 'id' =>(string) $obj["userId"] ]);
			
        foreach ($sonuc["body"] as $item ) {
            if($item["custom_data"]["id"]==(string)$obj["groupId"])
            {
                $room_id=$item["id"];
            }
        }

        echo json_encode($room_id);

    }


	

	




}

