<?php 

class ExpenseModel extends CI_Model{


    public function getAll($where)
    {
        return  $this->db->where($where)->get("expenses")->result();
        
    
    }


    public function AddExpense($data,$userId)
    {

        $where=array(
            'groupId'=>$data['groupId'],
            'userId'=>$userId
        );

        $this->db->where('groupId', $where["groupId"]);
        $this->db->where('userId',$where["userId"]);
        $members=$this->db->get("members")->row();
       
        $update=array(
            'paid'=>$members->paid+$data["paid"] 

        );

       
         $this->db->where('groupId', $where["groupId"]);
         $this->db->where('userId',$where["userId"]);
         $this->db->update('members', $update); 
        return $this->db->insert('expenses',$data);
       
    }

    public function deleteExpense($where)
    {
        $expense=$this->db->where($where)->get("expenses")->row();
        $user=$this->db->query("select * from users where fullname='$expense->fullname'")->row();
      
        
        $this->db->where("userId",$user->userId);
        $this->db->where("groupId",$expense->groupId);
        $member= $this->db->get("members")->row();

       $update=array(
           'paid'=>($member->paid)-($expense->paid),
       );
     
       $this->db->where("userId",$user->userId);
       $this->db->where("groupId",$expense->groupId);
        $this->db->update("members",$update);

        $users=explode(",",$expense->users);

        foreach ($users as  $value) {
            

            $this->db->where("groupId",$expense->groupId);
            $this->db->where("userId",$value);
            $member= $this->db->get("members")->row();
       
        $update=array(
            'payable'=>$member->payable-($expense->paid/(count($users)))
        );

            $this->db->where("groupId",$expense->groupId);
             $this->db->where("userId",$value);
            $this->db->update("members",$update);
        }


        return  $this->db->delete("expenses",$where);
        
    
    }

    public function UpdateSum($groupId)
    {
        $sum=$this->db->query("select sum(paid) from expenses where groupId=$groupId")->row_array();
       $update=array('groupPay'=>$sum["sum(paid)"]);
        $this->db->where('groupId', $groupId);
        return $this->db->update('groups', $update); 
    }

    public function getMembers($where)
    {
        return  $this->db->query("select * from users where userId  IN (select userId from members where groupId=$where)")->result();
        
    
    }

    public function searchMember($where)
    {
        
        return  $this->db->where($where)->get("users")->result();
       
    
    }


    public function addMember($data)
    {

        
        return $this->db->insert('members',$data);
        
       
    
    }


    public  function UpdateCount($groupId)
    {
        $count=$this->db->query("select count(*) from members where groupId=$groupId")->row_array();
        $update=array('count'=>$count['count(*)']);
         $this->db->where('groupId', $groupId);
        return $this->db->update('groups', $update); 

    }

    public function deleteMember($where,$where2)
    {
        if(!$this->db->where($where2)->get("groups")->result())
        {
            return  $this->db->delete("members",$where);

        }

        else{
            return false;
        }
      
        
    }


    public  function UpdateGroups($data,$where)
    {
        
         $this->db->where($where);
        return $this->db->update('groups', $data); 

    }

    public  function getGroupInfo($where)
    {
        
         
        return  $this->db->where($where)->get("groups")->result();
        

    }

    public function MemberSum($where,$payable){

        $this->db->where($where);
        $members=$this->db->get("members")->row();
        $data=array(
            'payable'=>$members->payable+$payable,
        );

        $this->db->where($where);
        return $this->db->update('members', $data); 
    }

      public function UploadPhoto($groupId)
      {
          $where=array(
              "groupId"=>$groupId,
          );
          $data=array(
              "path"=>$groupId
          );

          
        $this->db->where($where);
        return $this->db->update('groups', $data); 

     }

   
    public function getSummary($where)
    {   
       return $this->db->where($where)->get("members")->result();
    }




   

    

    
}








?>