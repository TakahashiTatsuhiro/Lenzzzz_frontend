import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registrations = () => {
	const navigate = useNavigate();
	const [productName, setProductName] = useState(false);
	const [purchaseDate, setPurchaseDate] = useState(false);
	const [warrantyNumber, setWarrantyNumber] = useState(false);
	const [warrantyUnit, setWarrantyUnit] = useState(false);
	const [retailer, setRetailer] = useState(false);
	const [productPhoto, setProductphoto] = useState('');
	const [warrantyPhoto, setWarrantyPhoto] = useState('');

	const refProductPhoto = React.useRef();
	const handleClickProductPhoto = ()=>refProductPhoto.current.click();
	const refWarrantyPhoto = React.useRef();
	const handleClickWarrantyPhoto = ()=>refWarrantyPhoto.current.click();


	const handleItems = () => {
		navigate('/items');
	};

	const handleSubmit = () => {
		//購入日を把握する
		console.log('productName',productName);
		console.log('購入日',purchaseDate);
		console.log('保証',warrantyNumber);
		console.log('保証単位',warrantyUnit);
		console.log('購入店',retailer);
		console.log('商品画像',productPhoto);
		console.log('保証書画像',warrantyPhoto);
		
		//未入力チェック
		if(!productName || !purchaseDate || !warrantyNumber || !warrantyUnit || !retailer){
			console.log('未入力だよ');
		}


	}

	return (
		<div className='registration__container'>
			<div className='items__header'>
				<button className='items__btn' onClick={handleItems}>
					戻る
				</button>
			</div>
			<div className='registration__box'>
				<p className='login__input-title'>商品名</p>
				<input className='login__input' type='text' placeholder='例）冷蔵庫' onChange={(e) => setProductName(e.target.value)}/>
				<p className='login__input-title'>購入日</p>
				<input className='login__input' type='date' placeholder='yyyy/mm/dd' onChange={(e)=>setPurchaseDate(e.target.value)}/>
				<p className='login__input-title'>保証期間</p>
				<input className='login__input' type='number' placeholder='例）３' onChange={(e)=>setWarrantyNumber(e.target.value)}/>
				<select name='unit' className='login__input' onChange={e => setWarrantyUnit(e.target.value)}>
					<option>年</option>
					<option>月</option>
				</select>
				<p className='login__input-title'>購入先</p>
				<input className='login__input' type='text' placeholder='例）エディオン本店' onChange={(e)=> setRetailer(e.target.value)}/>

				<p className='login__input-title'>商品写真</p>
				<button className='button' onClick={handleClickProductPhoto}>商品画像を選択</button>
				<input type="file" style={{display: 'none'}} ref={refProductPhoto} onChange={(e)=>setProductphoto(e.target.files[0])} />
				{productPhoto && <img src={productPhoto.name} alt='商品の写真'></img>}
				
				<p className='login__input-title'>保証書写真</p>
				<button className='button' onClick={handleClickWarrantyPhoto}>保証書画像を選択</button>
				<input type="file" style={{display: 'none'}} ref={refWarrantyPhoto} onChange={(e)=>setWarrantyPhoto(e.target.files[0])} />
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
