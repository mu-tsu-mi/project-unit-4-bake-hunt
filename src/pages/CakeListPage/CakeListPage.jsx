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
            <h1>CakeListPage</h1>
            <div>
                {cakeList.map((cake)=><div key={cake._id}>{cake.cakeName}</div>)}
            </div>
        </>
    )
}