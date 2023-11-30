import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const ItemsList = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        // const url = 'https://lenzzzz-backend.onrender.com';
        const url = 'http://localhost:3000';
        const response = await fetch(url + `/items/${userId}`);
        const data = await response.json();
        if (response.ok) {
          console.log('data', data);
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegistration = () => {
    navigate('/registrations');
  };

  return (
    <div className="items__container">
      <div className="items__header">
        <button className="items__btn" onClick={handleLogin}>
          ログアウト
        </button>
        <input
          className="items__serach"
          placeholder="商品名を入力してください"
        ></input>
      </div>
      <div className="items__add">
        <button className="items__btn" onClick={handleRegistration}>
          新しいアイテムを追加
        </button>
      </div>
      <div className="items__list">
        {items.map((item, idx) => {
          return (
            <div className="item" key={idx}>
              <img
                className="item__img"
                src={item.product_photo}
                alt={item.product_name}
              />
              <p className="item__name">{item.product_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsList;
