import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	deletePost,
	fetchPostById,
	fetchPosts,
	SORT_TYPES,
} from '../redux/post/post.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import List from '../components/List'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import Helmet from '../components/Helmet'

const ManagePost = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	const handleDeletePost = (id) => {
		dispatch(deletePost(id))
	}

	useEffect(() => {
		dispatch(fetchPosts({ sort: SORT_TYPES.NEWEST }))
		window.scrollTo(0, 0)
	}, [])

	return (
		<Helmet title={'Quản lý bài viết'}>
			<div className='manage-post'>
				<div className='manage-post__list'>
					{posts &&
						posts.length > 0 &&
						posts.map((item) => (
							<div key={item._id} className='manage-post__item'>
								<PostCard
									post={item}
									className='manage-post__item__card'
								/>
								<div className='manage-post__item__btn__list'>
									<Button
										className='manage-post__item__btn__item edit'
										onClick={() =>
											history.push(`/update-post/${item._id}`)
										}
									>
										<FontAwesomeIcon
											icon={faEdit}
											className='manage-post__item__btn__item__icon'
										/>
										Chỉnh sửa
									</Button>
									<Button
										className='manage-post__item__btn__item delete'
										onClick={() => handleDeletePost(item._id)}
									>
										<FontAwesomeIcon
											icon={faTrashAlt}
											className='manage-post__item__btn__item__icon'
										/>
										Xóa
									</Button>
								</div>
							</div>
						))}
				</div>
			</div>
		</Helmet>
	)
}

export default ManagePost
