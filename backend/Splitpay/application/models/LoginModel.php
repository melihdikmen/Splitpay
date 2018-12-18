<?php 

class LoginModel extends CI_Model{


    public function login($where)
    {

        return $this->db->where($where)->get("users")->row();
        

    }

    public function register($data)
    {
        return $this->db->insert('users',$data);
    }
    
}








?>