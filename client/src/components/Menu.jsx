import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBook,
	faListAlt,
	faPlusCircle,
	faNewspaper,
} from '@fortawesome/free-solid-svg-icons'

const menuTemplate = [
	{
		display: 'Quản lý bài viết',
		path: '/manage/post',
		icon: faNewspaper,
	},
	{
		display: 'Tạo bài bài viết',
		path: '/create-post',
		icon: faPlusCircle,
	},
	{
		display: 'Quản lý danh mục',
		path: '/manage/category',
		icon: faListAlt,
	},
	{
		display: 'Quản lý chủ đề',
		path: '/manage/subject',
		icon: faBook,
	},
]
const Menu = () => {
	const history = useHistory()
	const { pathname } = useLocation()

	return (
		<div className='menu'>
			<ul className='menu__list'>
				{menuTemplate.map((item, index) => (
					<li
						key={index}
						className={`menu__list__item ${
							pathname.includes(item.path) ? 'active' : ''
						}`}
						onClick={() => history.push(item.path)}
					>
						<FontAwesomeIcon
							icon={item.icon}
							className='menu__list__item__icon'
						/>
						{item.display}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Menu
