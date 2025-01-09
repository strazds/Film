import React, { useState, useEffect } from 'react';
import usersData from "./users.json";
import config from "../../config.json";
import './UserList.css';

interface User {
  _id: string;
  username: string;
  password: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const UserItem: React.FC<User> = ({_id, username, password}) => {
    return (
      <div className="user-item">
        <div className="user-meta">
          <span>
            <div className="username">{username}</div>
            <div className="password">***********</div>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map((user, index) => (
          <UserItem key={index} {...user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;