import './CakeListPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as cakesAPI from '../../utilities/cakes-api';

export default function CakeListPage() {
    const [cakeList, setCakeList] = useState([])
    
    useEffect(function() {
        async function getItems() {
            const cakes = await cakesAPI.getAll();
            setCakeList(cakes);
        }
        getItems();
    },[])
    
    return (
        <>
            <h1>Our Range of Cakes</h1>
            <div className='cakeList'>
                {cakeList.map((cake) => {
                    return <Link to={`/cakes/${cake.cakeNickname}`} key={cake._id}><div className='cake' >
                        <img src={`/images/${cake.cakeNickname}.jpeg`} alt={cake.cakeName} />
                        <h3>{cake.cakeName}</h3>
                    </div></Link>
                })}
            </div>
        </>
    )
}