import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import logo from '../images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch,
	faUser,
	faSignOutAlt,
	faTools,
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Button from './Button'
import { logoutUser } from '../redux/user/user.actions'

const Header = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const { user } = useSelector(({ user }) => ({ user: user.user }))

	const [keyword, setKeyword] = useState('')

	const search = useCallback(() => {
		history.push(`/search?keyword=${keyword}`)
	}, [keyword])

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__top'>
					<div className='header__logo'>
						<Link to='/'>
							<img src={logo} alt='' />
						</Link>
					</div>
					<div className='header__search'>
						<input
							type='text'
							className='header__search__input'
							placeholder='Nhập từ khóa'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<Button onClick={search}>
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</div>
					<div className='header__control'>
						{user ? (
							<>
								<Button
									className='header__control__btn'
									onClick={() => history.push('/admin')}
								>
									<FontAwesomeIcon
										className='header__control__btn__icon'
										icon={faTools}
									/>
									Dashboard
								</Button>
								<Button
									className='header__control__btn'
									onClick={() => dispatch(logoutUser())}
								>
									<FontAwesomeIcon
										className='header__control__btn__icon'
										icon={faSignOutAlt}
									/>
									Đăng xuất
								</Button>
							</>
						) : (
							<Button
								className='header__control__btn'
								onClick={() => history.push('/login')}
							>
								<FontAwesomeIcon
									className='header__control__btn__icon'
									icon={faUser}
								/>
								Đăng nhập
							</Button>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
