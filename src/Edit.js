import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Edit() {
    //history
    const history = useNavigate();
    //variables
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const [password, setPassword] = useState([]);
    //params
    const params = useParams();

    async function getUserById() {
        const response = await axios.get(`http://localhost:3001/api/users/${params.id}`);
        if (response.data) {
            setName(response.data.name);
            setEmail(response.data.email);
            setBirthday(response.data.birthday);
            setPassword(response.data.password);
        }
    }

    useEffect(() => {
        getUserById();
    }, [])

    //add -- return
    async function saveUser(e) {
        e.preventDefault();

        const response = await axios.put(`http://localhost:3001/api/users/${params.id}`, {
            name: name,
            email: email,
            birthday: birthday,
            password: password
        });

        if (response.data) {
            history("/");
            alert("Edited!");
        }
    }

    return (
        <div className='container mt-5'>
            <h1>Edit</h1>
            {/* back to list */}
            <Link to={`/`} className='btn btn-dark mb-3'>Back to list</Link>
            {/* form */}
            <form onSubmit={saveUser}>
                {/* input */}
                <span>Name</span>
                <input type='text' name="name" placeholder='...'
                    className='form-control mb-3' value={name}
                    onChange={(e) => setName(e.target.value)}></input>
                <span>Email</span>
                <input type='email' name="email" placeholder='@'
                    className='form-control mb-3' value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                <span>Birthday</span>
                <input type='date' name="birthday"
                    className='form-control mb-3' value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}></input>
                <span>Password</span>
                <input type='password' name="password"
                    className='form-control mb-3' value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                {/* button */}
                <button type='submit' className='btn btn-dark'>Save</button>
            </form>
        </div>
    )
}
