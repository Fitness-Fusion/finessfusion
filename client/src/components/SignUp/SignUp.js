import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      email: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:5000/auth/api/register', formData);
          console.log('Пользователь успешно зарегистрирован:', response.data);
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
        }
    };      
  
    return (
      <div>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    );
  }
  
  export default SignUp;
  