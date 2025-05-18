
import { useState } from "react";

export default function DisplayUsers({id ,name ,email ,getUsers}) {
    let [updatedName,setUpdatedName] =useState(name);
    let [updatedEmail,setUpdatedEmail] =useState(email);
    let [isUpdated , setIsUpdated]= useState(false);

 
   function deleteUser(e, id) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]" )  ;
        const updatedUsers = users.filter(user => user.id !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        getUsers();
    }

    function updateUser(e, id) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]" );
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, name: updatedName, email: updatedEmail } : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setIsUpdated(false);
        getUsers();
    }
   
  return (
    <>
    
    <div className="all ">
        {
        isUpdated?(
            <div className="true ">
            <input type="text" value={id} readOnly className="form-items "/>
            <input type="text" value={updatedName} onChange={(e)=>{setUpdatedName(e.target.value)}} className="form-items "/>
            <input type="email" value={updatedEmail} onChange={(e)=>{setUpdatedEmail(e.target.value)}} className="form-items "/>

            <button className="save-btn " onClick={(e)=>{updateUser(e,id)}}>Save</button>
            <button className="delete-btn" onClick={(e)=>{deleteUser(e,id)}} >Delete</button>
            </div>
        ):(
            <div className="false ">
                <span className="spans ">{id}</span>
                <span className="spans "> {name} </span>
                <span className="spans "> {email} </span>
                
                <button className="update-btn " onClick={()=>{setIsUpdated(true)}}>Update</button>
                <button className="delete-btn " onClick={(e)=>{deleteUser(e,id)}} >Delete</button>
            </div>
        )
    }
      
      
    </div>
    </>
  )
}
