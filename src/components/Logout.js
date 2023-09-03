import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/logout', {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        }).then((res) => {
            navigate('/', { replace: true });
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <div>Logout</div>
    )
}
