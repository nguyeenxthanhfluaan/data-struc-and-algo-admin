import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import logo from '../images/logo.png'
import { fetchCategory } from '../redux/category/category.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch,
	faUser,
	faPlus,
	faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Button from './Button'

const Header = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const [keyword, setKeyword] = useState('')

	const search = useCallback(() => {
		if (keyword !== '') {
			history.push(`/search?keyword=${keyword}`)
		}
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
						{/* <Button>
							<FontAwesomeIcon
								icon={faUser}
								className='header__auth__icon'
							/>
							Đăng nhập
						</Button> */}
						<Button onClick={() => history.push('/post/create')}>
							<FontAwesomeIcon
								icon={faPlusCircle}
								className='header__auth__icon'
							/>
							Tạo bài đăng
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
