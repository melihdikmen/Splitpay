<?php 

class LoginModel extends CI_Model{


    public function login($where)
    {

        return $this->db->where($where)->get("users")->row();
        

    }

    public function register($data)
    {
         $result["isRegister"]=$this->db->insert('users',$data);
        $result["last_id"]= $this->db->insert_id();
        return $result;
    }


    public function UpdateUser($data,$where)
    {
         
        $this->db->where($where);
        return $this->db->update('users', $data); 

    }

    
    public function getUser($where)
    {

        return $this->db->where($where)->get("users")->row();
        

    }

    public function UploadPhoto($userId)
    {
     
        $where=array(
            "userId"=>$userId,
        );
        $data=array(
            "path"=>$userId
        );

        
      $this->db->where($where);
      return $this->db->update('users', $data); 
    }

    
    public function ChangePassword($where,$data)
    {
        $this->db->where($where);
      return $this->db->update('users', $data); 
    }


    
}








?>