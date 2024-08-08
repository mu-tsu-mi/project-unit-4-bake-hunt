import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({setUser}) {
  const navigate = useNavigate()
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  })

  const handleChange = (evt) => {
    setSignup({
      ...signup,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = signup;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      setUser(user);
      navigate('/')
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      setSignup({
        ...signup,
        error: 'Sign Up Failed - Try Again'
      });
    }
  };

  const disable = signup.password !== signup.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={signup.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={signup.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={signup.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={signup.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{signup.error}</p>
    </div>
  );
}