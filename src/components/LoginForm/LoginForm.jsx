import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/')
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <div className="form-wrapper">
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit} className="auth-form">
            <label>Email</label>
            <input className="auth-item" type="text" name="email" value={credentials.email} onChange={handleChange} required />
            <label>Password</label>
            <input className="auth-item" type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <div className="form-button">
              <button className="auth-button" type="submit">LOG IN</button>
            </div>
          </form>
        </div>

      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}