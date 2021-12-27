import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Helmet from '../components/Helmet'
import List from '../components/List'
import { fetchPosts } from '../redux/post/post.actions'

const HomePage = () => {
	const dispatch = useDispatch()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	useEffect(() => {
		dispatch(fetchPosts({}))
	}, [])

	return <Helmet title='Admin'></Helmet>
}

export default HomePage
