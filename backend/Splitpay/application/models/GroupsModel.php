<?php 

class GroupsModel extends CI_Model{


    public function getAll($userId)
    {

       return $this->db->query("select * from groups where groupId IN (select groupId from members where userId='$userId') ")->result();
    }

    public function addGroup($data)
    {
        $result["add"]= $this->db->insert('groups',$data);
        $result["last_id"]=$this->db->insert_id();
        return $result;
    }

    public function addMember($data)
    {
        return $this->db->insert("members",$data);
    } 

    public function deleteGroup($where,$where2,$where3)
    {   
        

       
        if( $this->db->where($where)->get("groups")->result()) 
        {
           
         $this->db->delete("expenses",$where3);
        
        $this->db->delete("members",$where3);
      return  $this->db->delete("groups",$where);

        }

        else{
        
            return $this->db->delete("members",$where2);

        }
       

        
    } 

    

    
}








?>