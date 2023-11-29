import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Registrations = () => {
	const navigate = useNavigate();
	const { userId } = useAuth();

	const [productName, setProductName] = useState(false);
	const [purchaseDate, setPurchaseDate] = useState(false);
	const [warrantyNumber, setWarrantyNumber] = useState(false);
	const [warrantyUnit, setWarrantyUnit] = useState(false);
	const [retailer, setRetailer] = useState(false);
	const [productPhoto, setProductphoto] = useState('');
	const [warrantyPhoto, setWarrantyPhoto] = useState('');

	const refProductPhoto = React.useRef();
	const refWarrantyPhoto = React.useRef();
	const handleClickProductPhoto = () => refProductPhoto.current.click();
	const handleButtonWarrantyPhoto = () => refWarrantyPhoto.current.click();
	const handleSetPhoto = (e, setfunc) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setfunc(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleItems = () => {
		navigate('/items');
	};

	const handleSubmit = async () => {
		//デバッグ用
		console.log('productName', productName);
		console.log('購入日', purchaseDate);
		console.log('保証', warrantyNumber);
		console.log('保証単位', warrantyUnit);
		console.log('購入店', retailer);
		console.log('商品画像', productPhoto);
		console.log('保証書画像', warrantyPhoto);

		//未入力チェック
		if (!productName || !purchaseDate || !warrantyNumber || !warrantyUnit || !retailer) {
			console.log('未入力だよ');
		}

		//送信
		try {
			const url = 'https://lenzzzz-backend.onrender.com';
			const response = await fetch(url + '/registrations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: userId,
					product_name: productName,
					purchase_date: purchaseDate,
					warranty_number: warrantyNumber,
					warranty_unit: warrantyUnit,
					retailer: retailer,
					product_photo: productPhoto,
					warranty_photo: warrantyPhoto,
				}),
			});
			
			const data = await response.json();
			if (response.ok) {
				window.alert('登録しました！');
			} else {
				window.alert('登録に失敗しました！');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='registration__container'>
			<div className='items__header'>
				<button className='items__btn' onClick={handleItems}>
					戻る
				</button>
			</div>
			<div className='registration__box'>
				<p className='login__input-title'>商品名</p>
				<input
					className='login__input'
					type='text'
					placeholder='例）冷蔵庫'
					onChange={(e) => setProductName(e.target.value)}
				/>
				<p className='login__input-title'>購入日</p>
				<input
					className='login__input'
					type='date'
					placeholder='yyyy/mm/dd'
					onChange={(e) => setPurchaseDate(e.target.value)}
				/>
				<p className='login__input-title'>保証期間</p>
				<input
					className='login__input'
					type='number'
					placeholder='例）３'
					onChange={(e) => setWarrantyNumber(e.target.value)}
				/>
				<select
					name='unit'
					className='login__input'
					onChange={(e) => setWarrantyUnit(e.target.value)}
				>
					<option>年</option>
					<option>月</option>
				</select>
				<p className='login__input-title'>購入先</p>
				<input
					className='login__input'
					type='text'
					placeholder='例）エディオン本店'
					onChange={(e) => setRetailer(e.target.value)}
				/>

				<p className='login__input-title'>商品写真</p>
				<button className='button' onClick={handleClickProductPhoto}>
					商品画像を選択
				</button>
				<input
					type='file'
					style={{ display: 'none' }}
					ref={refProductPhoto}
					onChange={(e) => handleSetPhoto(e, setProductphoto)}
				/>
				{productPhoto && <img src={productPhoto} alt='商品の写真'></img>}

				<p className='login__input-title'>保証書写真</p>
				<button className='button' onClick={handleButtonWarrantyPhoto}>
					保証書画像を選択
				</button>
				<input
					type='file'
					style={{ display: 'none' }}
					ref={refWarrantyPhoto}
					onChange={(e) => handleSetPhoto(e, setWarrantyPhoto)}
				/>
				{warrantyPhoto && <img src={warrantyPhoto} alt='保証書の写真'></img>}
			</div>
			<div className='registration__footer'>
				<button className='items__btn' onClick={handleSubmit}>
					上記の内容で保存する
				</button>
			</div>
		</div>
	);
};

export default Registrations;
