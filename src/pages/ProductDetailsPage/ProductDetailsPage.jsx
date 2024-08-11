import './ProductDetailsPage.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as cakesAPI from '../../utilities/cakes-api';
import * as bookingsAPI from '../../utilities/booking-api'
import AddToCart from '../../components/AddToCart/AddToCart';
import LogInMessage from '../../components/LogInMessage/LogInMessage';

export default function ProductDetailsPage({ user }) {
  const [cakeDetail, setCakeDetail] = useState(null)
  const { cakeNickname } = useParams()

  useEffect(function () {
    async function getItem() {
      const cake = await cakesAPI.getOne(cakeNickname);
      setCakeDetail(cake);
    }
    getItem();
  }, [cakeNickname])

  if (!cakeDetail) {
    return <></>
  }
  async function handleAddToCart(qty) {
    await bookingsAPI.addToCart(
      Number(qty),
      cakeDetail._id
    )
  }

  return (
    <div className='cakeBox'>
      <h1>{cakeDetail.cakeName}</h1>
      
      <div className='cakeDetail'>
        <div className='cakeImage'>
          <span className='price'>${cakeDetail.unitPrice}</span>
          <img src={`/images/${cakeDetail.cakeNickname}.jpeg`} alt={cakeDetail.cakeName} />
          {user ? <AddToCart handleAddToCart={handleAddToCart} /> : <LogInMessage />}
        </div>
        <div className='cakeIngredients'>
          <p>{cakeDetail.description}</p>
          <h3>Ingredients</h3>
          <ul>
            {cakeDetail.ingredients.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}