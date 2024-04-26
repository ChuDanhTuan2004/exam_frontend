import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Add() {
    //history
    const history = useNavigate();
    //variables
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const [password, setPassword] = useState([]);

    //add -- return
    async function saveUser(e) {
        e.preventDefault();

        const response = await axios.post(`http://localhost:3001/api/users`, {
            name: name,
            email: email,
            birthday: birthday,
            password: password
        });

        if (response.data) {
            history("/");
            alert("Added!");
        }
    }
    return (
        <div className='container mt-5'>
            <h1>Create</h1>
            {/* back to list */}
            <Link to={`/`} className='btn btn-dark mb-3'>Back to list</Link>
            {/* form */}
            <form onSubmit={saveUser}>
                {/* input */}
                <span>Name</span>
                <input type='text' name="name" placeholder='...'
                    className='form-control mb-3'
                    onChange={(e) => setName(e.target.value)}></input>
                <span>Email</span>
                <input type='email' name="email" placeholder='@'
                    className='form-control mb-3'
                    onChange={(e) => setEmail(e.target.value)}></input>
                <span>Birthday</span>
                <input type='date' name="birthday"
                    className='form-control mb-3'
                    onChange={(e) => setBirthday(e.target.value)}></input>
                <span>Password</span>
                <input type='password' name="password"
                    className='form-control mb-3'
                    onChange={(e) => setPassword(e.target.value)}></input>
                {/* button */}
                <button type='submit' className='btn btn-dark'>Add</button>
            </form>
        </div>
    )
}
