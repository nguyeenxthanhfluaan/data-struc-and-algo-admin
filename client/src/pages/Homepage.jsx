import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost, fetchPosts } from '../redux/post/post.actions'

import Menu from '../components/Menu'
import List from '../components/List'
import Helmet from '../components/Helmet'

const Homepage = () => {
	const dispatch = useDispatch()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	useEffect(() => {
		dispatch(fetchPosts({ sortBy: 'newest' }))
	}, [])

	return (
		<Helmet title='Trang chủ'>
			<div className='homepage'>
				<Menu />
				<div className='homepage__content'>
					<List title='Bài đăng mới nhất' data={posts} />
				</div>
			</div>
		</Helmet>
	)
}

export default Homepage
