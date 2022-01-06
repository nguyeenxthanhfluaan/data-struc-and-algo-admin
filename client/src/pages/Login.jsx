import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import { loadUser, loginUser } from '../redux/user/user.actions'

import Button from '../components/Button'
import Helmet from '../components/Helmet'

const Login = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const { user } = useSelector(({ user }) => ({ user: user.user }))

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (user) {
			history.push('/')
		}
	}, [user])

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email && password) {
			dispatch(loginUser({ email, password }))
		} else {
			toast.error('Nhập đầy đủ tên đăng nhập và mật khẩu')
		}
	}

	return (
		<Helmet title='Đăng nhập'>
			<div className='login'>
				<form action='' className='login__form' onSubmit={handleSubmit}>
					<div className='login__form__group'>
						<label htmlFor='' className='login__form__label'>
							Email
						</label>
						<input
							type='text'
							className='login__form__input'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='login__form__group'>
						<label htmlFor='' className='login__form__label'>
							Mật khẩu
						</label>
						<input
							type='password'
							className='login__form__input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button onClick={handleSubmit}>Đăng nhập</Button>
				</form>
			</div>
		</Helmet>
	)
}

export default Login
