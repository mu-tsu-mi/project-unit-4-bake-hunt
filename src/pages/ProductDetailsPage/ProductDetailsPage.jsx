import './ProductDetailsPage.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as cakesAPI from '../../utilities/cakes-api';

export default function ProductDetailsPage() {
  const [cakeDetail, setCakeDetail] = useState(null)
  const { cakeNickname } = useParams()

    useEffect(function() {
      async function getItem() {
          const cake = await cakesAPI.getOne(cakeNickname);
          setCakeDetail(cake);
      }
      getItem();
  },[cakeNickname])

  if (!cakeDetail) {
    return <></>
  }

  return (
    <div className='cakeBox'>
      <h1>{cakeDetail.cakeName}</h1>
      <img src={`/images/${cakeDetail.cakeNickname}.jpeg`} alt={cakeDetail.cakeName} />
      <p>{cakeDetail.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {cakeDetail.ingredients.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}