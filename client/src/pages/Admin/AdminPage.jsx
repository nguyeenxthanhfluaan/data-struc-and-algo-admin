import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBook,
	faListAlt,
	faPlusCircle,
	faNewspaper,
} from '@fortawesome/free-solid-svg-icons'

import CreatePostPage from './CreatePostPage'
import ManageCategory from './ManageCategory'
import ManageSubject from './ManageSubject'
import Helmet from '../../components/Helmet'
import ManagePost from './ManagePost'

const page = {
	POSTS: 'POSTS',
	CREATE_POST: 'CREATE_POST',
	CATEGORY: 'CATEGORY',
	SUBJECT: 'SUBJECT',
}

const AdminPage = () => {
	const [activatedPage, setActivatedPage] = useState(page.POSTS)

	return (
		<Helmet title='Admin'>
			<div className='admin'>
				<div className='admin__menu'>
					<ul className='admin__menu__list'>
						<li
							className={`admin__menu__list__item ${
								activatedPage === page.POSTS ? 'active' : ''
							}`}
							onClick={() => setActivatedPage(page.POSTS)}
						>
							<FontAwesomeIcon
								icon={faNewspaper}
								className='admin__menu__list__item__icon'
							/>
							Quản lý bài đăng
						</li>
						<li
							className={`admin__menu__list__item ${
								activatedPage === page.CREATE_POST ? 'active' : ''
							}`}
							onClick={() => setActivatedPage(page.CREATE_POST)}
						>
							<FontAwesomeIcon
								icon={faPlusCircle}
								className='admin__menu__list__item__icon'
							/>
							Tạo bài đăng
						</li>
						<li
							className={`admin__menu__list__item ${
								activatedPage === page.CATEGORY ? 'active' : ''
							}`}
							onClick={() => setActivatedPage(page.CATEGORY)}
						>
							<FontAwesomeIcon
								icon={faListAlt}
								className='admin__menu__list__item__icon'
							/>
							Danh mục
						</li>
						<li
							className={`admin__menu__list__item ${
								activatedPage === page.SUBJECT ? 'active' : ''
							}`}
							onClick={() => setActivatedPage(page.SUBJECT)}
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
					{activatedPage === page.POSTS && <ManagePost />}
					{activatedPage === page.CREATE_POST && <CreatePostPage />}
					{activatedPage === page.CATEGORY && <ManageCategory />}
					{activatedPage === page.SUBJECT && <ManageSubject />}
				</div>
			</div>
		</Helmet>
	)
}

export default AdminPage
