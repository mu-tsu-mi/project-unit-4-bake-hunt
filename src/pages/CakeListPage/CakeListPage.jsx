import './CakeListPage.css';
import { useState, useEffect } from 'react';
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
                    return <div className='cake' key={cake._id}>
                        <img src={`/images/${cake.cakeNickname}.jpeg`} alt={cake.cakeName} />
                        <h3>{cake.cakeName}</h3>
                    </div>
                })}
            </div>
        </>
    )
}