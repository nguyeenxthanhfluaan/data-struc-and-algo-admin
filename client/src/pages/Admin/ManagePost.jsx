import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts } from '../../redux/post/post.actions'

import List from '../../components/List'

const ManagePost = () => {
	const dispatch = useDispatch()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	useEffect(() => {
		dispatch(fetchPosts({}))
	}, [])

	return (
		<div className='manage-post'>
			<List title='list' data={posts} />
		</div>
	)
}

export default ManagePost
