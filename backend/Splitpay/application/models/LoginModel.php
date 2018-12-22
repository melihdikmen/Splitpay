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
    
}








?>