import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, listOfUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser,  setSelectedUser] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        email:'',
        phone:'',
        website:'',
    });


useEffect(() => {
    const fetchData = async () =>{
        setLoading(true);
        try {
        const {data: response} = await axios.get('https://jsonplaceholder.typicode.com/users');
        listOfUsers(response);
        } catch (error) {
        console.error(error.message);
        }
        setLoading(false);
    }

    fetchData();
    }, []);

    const openPopup = (id) => {
        const selectedUser = users.find((user) => user.id === id);
        setSelectedUser(selectedUser);
        setUserData({
            name: selectedUser.name,
            email: selectedUser.email,
            phone: selectedUser.phone,
            website: selectedUser.website,
        });

    };

    const onCancel = () => {
        setSelectedUser([])
    };

    const onSave = (id) => {
        const updateUser = [...users];
        const newUpdatedArray = [];
        updateUser.map((item) => {
            if (item.id === id) {
                newUpdatedArray.push({
                    ...item,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                website: userData.website,
                });
            } else {
                newUpdatedArray.push(item);
            }
            return newUpdatedArray;
        });
        listOfUsers(newUpdatedArray);
    };

return (
    <div>
        {selectedUser && selectedUser?.name && (
        <div className="popup">
            <div className="overlay"></div>
            <div className="popupBody">
            <p>
                Name:{' '}
                <input
                type="text"
                value={userData.name}
                onChange={(ev) =>
                    setUserData({ ...userData, name: ev.target.value })
                }
                />
            </p>
            <p>
                Email:{' '}
                <input
                type="text"
                value={userData.email}
                onChange={(ev) =>
                    setUserData({ ...userData, email: ev.target.value })
                }
                />
            </p>
            <p>
                Phone:{' '}
                <input
                type="text"
                value={userData.phone}
                onChange={(ev) =>
                    setUserData({ ...userData, phone: ev.target.value })
                }
                />
            </p>
            <p>
                Website:{' '}
                <input
                type="text"
                value={userData.website}
                onChange={(ev) =>
                    setUserData({ ...userData, website: ev.target.value })
                }
                />
            </p>
            <div className="popup-footer">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSave.bind(this, selectedUser.id)}>Ok</button>
            </div>
            </div>
        </div>
        )}
        <div className="basic-grid">
        {users &&
            users.map((user) => (
            <div className="card" key={user.id}>
                <div className="card-header">
                <img
                    src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg`} alt=''
                />
                </div>
                <div className="card-body">
                <div className="title">
                    <Link to={`/users/${user.id}`}>{user.name} </Link>
                </div>
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
                <div className="web">{user.website}</div>
                </div>

                <div className="row_group">
                <div className="item">hart</div>
                <div className="item">
                    <button onClick={openPopup.bind(this, user.id)}>edit</button>
                </div>
                <div className="item">
                    <button onClick={openPopup.bind(this, user.id)}>
                    delete
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    );
};
export default UserList;