import { useEffect, useState } from 'react';
import './Task2.css';


export default function Task2() {
    
    const [userObj, setUserObj] = useState({});

    const getUserWithAxios = async () => {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        console.log(data.results[0]);
        setUserObj(data.results[0]);

    }


    useEffect(() => {
        getUserWithAxios();
    }, [])


    return(

        <>
        

        <div className="container">
            <div className="info-container">
                <img src={userObj.picture && userObj.picture.large}></img>

                <div className="details">
                    <label>Fullname:</label>
                    <p>{userObj.name && `${userObj.name.title}. ${userObj.name.first} ${userObj.name.last}`}</p>

                </div>

                <div className="details">
                    <label>Email:</label>
                    <p>{userObj.email && userObj.email}</p>
                </div>

                <div className="details">
                    <label>Phone:</label>
                    <p>{userObj.phone && userObj.phone}</p>
                </div>

                <div className="details">
                    <label>Gender:</label>
                    <p>{userObj.gender && userObj.gender}</p>
                </div>
            </div>
        </div>
        </>
    )
}