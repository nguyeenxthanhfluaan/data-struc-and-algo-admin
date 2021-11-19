import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import logo from '../images/logo.png'
import { fetchCategory } from '../redux/category/category.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch,
	faUser,
	faPlusCircle,
	faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Button from './Button'
import Marginer from './Marginer'
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
								<Button onClick={() => history.push('/post/create')}>
									<FontAwesomeIcon
										icon={faPlusCircle}
										className='header__auth__icon'
									/>
									Tạo bài đăng
								</Button>
								<Button onClick={() => dispatch(logoutUser())}>
									<FontAwesomeIcon
										icon={faSignOutAlt}
										className='header__auth__icon'
									/>
									Đăng xuất
								</Button>
							</>
						) : (
							<Button onClick={() => history.push('/login')}>
								<FontAwesomeIcon
									icon={faUser}
									className='header__auth__icon'
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
