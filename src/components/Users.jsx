
import { useEffect, useState } from "react";

import DisplayUsers from "./DisplayUsers";

export default function Users() {
    let [addedName , setAddedName] =useState("");
    let [addedEmail , setAddedEmail] =useState("");
    let [users , setUsers] =useState([]);

    function getUsers() {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]" );
        setUsers(storedUsers);
    }

    useEffect(() => {
        getUsers();
    }, []);

    function addUser(e) {
        e.preventDefault();
        const newUser = {id: Date.now(), name: addedName, email: addedEmail };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setAddedName("");
        setAddedEmail("");
        getUsers();
    }

  return (

    <>
    <h1 className="hd-o ">Users Management System</h1>
    <div className="all text-lg">
        <h2 className="hd">Add Users</h2>
        <form onSubmit={(e)=>{addUser(e)}} className="form ">
            <input type="text" placeholder="Name" value={addedName} onChange={(e)=>{setAddedName(e.target.value)}} required className="form-items "/>
            <input type="email" placeholder="Email" value={addedEmail} onChange={(e)=>{setAddedEmail(e.target.value)}} required className="form-items "/>
            <button type="submit" className="form-btn "> ADD </button>
        </form>
    </div>
    <div className="p-8"></div>
      
      <h2 className="hd">Display Users</h2>
        <div className="all true">
            <span>ID</span>
            <span>Name</span>
            <span>Email</span>
        </div>
      {
        users.length === 0 ? ( <h2 className="all no-users">No users</h2>) : 
        (users.map((user)=>{   
            return <DisplayUsers key={user.id} id={user.id} name={user.name} email={user.email} getUsers={getUsers}/>
        }))
      }
    </>
  )
}
