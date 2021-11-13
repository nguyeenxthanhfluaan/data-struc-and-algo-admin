import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import logo from '../images/logo.png'
import { fetchCategory } from '../redux/category/category.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Button from './Button'

const Header = () => {
	const dispatch = useDispatch()

	const { categories } = useSelector(({ category }) => ({
		categories: category.categories
	}))

	const { pathname, search } = useLocation()
	console.log({ pathname })
	console.log({ search })

	useEffect(() => {
		dispatch(fetchCategory())
	}, [])

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
						/>
						<Button>
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</div>
				</div>
				<div className='header__bot'>
					<ul className='header__bot__list'>
						<li
							className={`header__bot__list__item ${
								pathname.includes('category') ? '' : 'active'
							}`}
						>
							<Link to={`/`}>Home</Link>
						</li>
						{categories &&
							categories.length > 0 &&
							categories.map((item) => (
								<li
									className={`header__bot__list__item ${
										pathname.includes(item._id) ? 'active' : ''
									}`}
									key={item._id}
								>
									<Link to={`/category/${item._id}`}>
										{item.category}
									</Link>
								</li>
							))}
						{/* <li className='header__bot__list__item'>
							<Link to=''>Lý thuyết</Link>
						</li>
						<li className='header__bot__list__item'>
							<Link to=''>Bài tập</Link>
						</li> */}
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
