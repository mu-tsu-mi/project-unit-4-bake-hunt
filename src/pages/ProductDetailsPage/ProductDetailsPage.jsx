import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
  const {cakeNickname} = useParams()
  
  return (
    <h1>ProductDetailsPage</h1>
  );
}