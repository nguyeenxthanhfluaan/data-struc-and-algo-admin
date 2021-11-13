import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchPost } from '../redux/post/post.actions'

import List from '../components/List'

const CatagoryPage = (props) => {
	const dispatch = useDispatch()

	const { id } = useParams()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	console.log(posts)

	useEffect(() => {
		dispatch(fetchPost({ category: id }))
	}, [id, dispatch])

	return <List data={posts} />
}

export default CatagoryPage
