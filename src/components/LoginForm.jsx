import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
	const [user_name, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { login, setUserId, setUserName } = useAuth();

	const handleSubmit = async () => {
		console.log('送信時',user_name, password);
		console.log('json', JSON.stringify({ user_name: user_name, password:password }));
		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_name: user_name, password:password }),
			});
			const data = await response.json();
			if (response.ok) {
				setUserId(data[0].id);
				setUserName(user_name);
				login();
				navigate('/items'); // ここでItemsListコンポーネントへ遷移
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitTest = async () => {
		try {
			setUserId(1);
			setUserName(user_name);
			login(); // ログイン状態を更新
			navigate('/items'); // ここでItemsListコンポーネントへ遷移
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='login__container'>
			<div className='login__header'></div>
			<div className='login__box'>
				<h1 className='login__title'>Lenzzzz へようこそ</h1>
				<p className='login__input-title'>ユーザー名</p>
				<input
					className='login__input'
					type='text'
					placeholder='ユーザー名を入力'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<p className='login__input-title'>パスワード</p>
				<input
					className='login__input'
					type='password'
					placeholder='パスワードを入力'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='login__btn' onClick={handleSubmit}>
					ログイン
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
