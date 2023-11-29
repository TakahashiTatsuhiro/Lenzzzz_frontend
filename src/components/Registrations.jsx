import { useNavigate } from 'react-router-dom';

const Registrations = () => {
	const navigate = useNavigate();

	const handleItems = () => {
		navigate('/items');
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
				<input className='login__input' type='text' placeholder='例）冷蔵庫' />
				<p className='login__input-title'>購入日</p>
				<input className='login__input' type='date' placeholder='yyyy/mm/dd' />
				<p className='login__input-title'>保証期間</p>
				<input className='login__input' type='number' placeholder='例）３' />
				<select name='unit' className='login__input'>
					<option>年</option>
					<option>月</option>
				</select>
				<p className='login__input-title'>購入先</p>
				<input className='login__input' type='text' placeholder='例）エディオン本店' />
				<p className='login__input-title'>商品写真</p>
				<img src='/src/assets/sentaku.png' alt='商品の写真'></img>
				<p className='login__input-title'>保証書写真</p>
				<img src='/src/assets/hoshosho.png' alt='保証書の写真'></img>
			</div>
			<div className='registration__footer'>
				<button className='items__btn' onClick={() => alert('保存しました！')}>
					上記の内容で保存する
				</button>
			</div>
		</div>
	);
};

export default Registrations;
