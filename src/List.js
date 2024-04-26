import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function List() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRows, setTotalRows] = useState([])
    const [totalPages, setTotalPages] = useState([]);
    const [value, setValue] = useState([]);

    async function getAllUsers(page) {
        const response = await axios.get(`http://localhost:3001/api/users?_page=${page}`);
        if (response.data) {
            setUsers(response.data.data);
            console.log(response.data.data);
            setTotalRows(response.data.pagination._totalRows);
            setTotalPages(Math.ceil(totalRows / 10));
            setCurrentPage(page);
        }
    }

    useEffect(() => {
        getAllUsers(1);
    }, [])

    async function deleteUser(id) {
        if (window.confirm("Are you sure?")) {
            const response = await axios.delete(`http://localhost:3001/api/users/${id}`);
            if (response.data) {
                await getAllUsers(1);
                alert("Deleted!")
            } else {
                alert("Error!")
            }
        }
    }

    async function HandleReset() {
        setValue("")
        getAllUsers(1);
    }

    async function HandleSearch(e) {
        e.preventDefault();
        const response = await axios.get(`http://localhost:3001/api/users/filter?email=${value}`);
        setUsers(response.data);
    }

    return (
        <div className="container mt-5">
            <h1>User list</h1>
            <div className='container mb-3'>
                <form onSubmit={HandleSearch}>
                    <div className='d-flex flex-row' style={{ justifyContent: "center" }}>
                        <div className='p-2'>
                            <input type='email' className='form-control'
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder='@email'>
                            </input>
                        </div>
                        <div className='p-2'>
                            <button type='submit' className='btn btn-dark me-3'>Search</button>
                            <button className='btn btn-light' onClick={() => HandleReset()}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <Link to={`/add`} className='btn btn-primary'>Add</Link> */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr>
                                <td scope="row" key={user.id}>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.birthday}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className='btn btn-success me-3'>Edit</Link>
                                    <Link className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {(currentPage != 1) && <button onClick={() => getAllUsers(currentPage - 1)} className='btn btn-light'>Previous</button>}
            {<span className='btn btn-light'>{currentPage} / {totalPages}</span>}
            {(currentPage < totalPages) && <button onClick={() => getAllUsers(currentPage + 1)} className='btn btn-light'>Next</button>}
        </div>
    )
}
