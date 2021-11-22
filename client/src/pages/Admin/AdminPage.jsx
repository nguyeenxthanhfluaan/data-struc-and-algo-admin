import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBook,
	faListAlt,
	faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'

import CreatePostPage from './CreatePostPage'
import ManageCategory from './ManageCategory'
import ManageSubject from './ManageSubject'
import Helmet from '../../components/Helmet'

const AdminPage = () => {
	const [active, setActive] = useState('create-post')

	return (
		<Helmet title='Admin'>
			<div className='admin'>
				<div className='admin__menu'>
					<ul className='admin__menu__list'>
						<li
							className={`admin__menu__list__item ${
								active === 'create-post' ? 'active' : ''
							}`}
							onClick={() => setActive('create-post')}
						>
							<FontAwesomeIcon
								icon={faPlusCircle}
								className='admin__menu__list__item__icon'
							/>
							Tạo bài đăng
						</li>
						<li
							className={`admin__menu__list__item ${
								active === 'category' ? 'active' : ''
							}`}
							onClick={() => setActive('category')}
						>
							<FontAwesomeIcon
								icon={faListAlt}
								className='admin__menu__list__item__icon'
							/>
							Danh mục
						</li>
						<li
							className={`admin__menu__list__item ${
								active === 'subject' ? 'active' : ''
							}`}
							onClick={() => setActive('subject')}
						>
							<FontAwesomeIcon
								icon={faBook}
								className='admin__menu__list__item__icon'
							/>
							Chủ đề
						</li>
					</ul>
				</div>
				<div className='admin__separate'></div>
				<div className='admin__content'>
					{active === 'create-post' && <CreatePostPage />}
					{active === 'category' && <ManageCategory />}
					{active === 'subject' && <ManageSubject />}
				</div>
			</div>
		</Helmet>
	)
}

export default AdminPage
