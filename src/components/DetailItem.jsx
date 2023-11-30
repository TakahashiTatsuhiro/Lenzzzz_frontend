import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const DetailItem = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { index } = useParams();
  const [item, setItem] = useState({});

  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegistration = () => {
    navigate('/registrations');
  };
  const handleItemLists = () => {
    navigate('/items');
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        // const url = 'https://lenzzzz-backend.onrender.com';
        const url = 'http://localhost:3000';
        const response = await fetch(url + `/${userId}/items/${Number(index)}`);
        const data = await response.json();
        if (response.ok) {
          console.log('data', data);
          setItem(data);
        } else {
          setItem({});
        }
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  return (
    <div className="items__container">
      <div className="items__header">
        <button className="items__btn" onClick={handleLogin}>
          ログアウト
        </button>
        <button className="items__btn" onClick={handleItemLists}>
          戻る
        </button>
      </div>
      <div className="single__item__list">
        <p className="single__item__p">・商品</p>
        <div className="single__item">
          <img
            className="single__item__img"
            src={item.product_photo}
            alt={item.product_name}
          />
          <p className="item__name">{item.product_name}</p>
        </div>
        <p className="single__item__p">・購入日</p>
        <p className="single__item__p">　{item.purchase_date}</p>

        <p className="single__item__p">・購入場所</p>
        <p className="single__item__p">　{item.retailer}</p>
        <p className="single__item__p">・保証期間</p>
        <p className="single__item__p">
          {'　' + item.warranty_number + item.warranty_unit}
        </p>
        <p className="single__item__p">・保証書</p>
        <div className="single__item">
          <img
            className="single__item__img"
            src={item.warranty_photo}
            alt="保証書の画像"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
