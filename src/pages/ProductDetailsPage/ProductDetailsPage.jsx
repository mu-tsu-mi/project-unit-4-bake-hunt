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
  const [thanksMsg, setThanksMsg] = useState('')

  useEffect(function () {
    async function getItem() {
      const cake = await cakesAPI.getOne(cakeNickname);
      setCakeDetail(cake);
    }
    getItem();
  }, [cakeNickname])

  async function handleAddToCart(qty) {
    setThanksMsg('')
    await bookingsAPI.addToCart(qty, cakeDetail._id)
    setThanksMsg(`Thanks. You added ${qty} * ${cakeDetail.cakeName} to your cart.`)
  }

  // returns blank screen before useEffect fetches data from database
  if (!cakeDetail) {
    return <></>
  }

  return (
    <div className='cakeBox'>
      <h1>{cakeDetail.cakeName}</h1>

      <div className='cakeDetail'>
        <div className='cakeImage'>
          <span className='price'>${cakeDetail.unitPrice}</span>
          <img src={`/images/${cakeDetail.cakeNickname}.jpeg`} alt={cakeDetail.cakeName} />
          {user ? <AddToCart handleAddToCart={handleAddToCart} /> : <LogInMessage />}
          {thanksMsg && <div className="thanks-msg">{thanksMsg}</div>}
        </div>
        <CakeIngredients cakeDetail={cakeDetail} />
      </div>
    </div>
  );
}

function CakeIngredients({ cakeDetail }) {
  return (
    <div className='cakeIngredients'>
      <p>{cakeDetail.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {cakeDetail.ingredients.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}