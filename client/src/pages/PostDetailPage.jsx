import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { fetchPostById, fetchPosts } from '../redux/post/post.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Marginer from '../components/Marginer'
import PostCard from '../components/PostCard'
import List from '../components/List'

const PostDetailPage = () => {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { post, posts } = useSelector(({ post }) => ({
		post: post.post,
		posts: post.posts
	}))

	console.log({ posts })

	useEffect(() => {
		dispatch(fetchPostById(id))
		dispatch(fetchPosts({}))
	}, [])

	return (
		<div className='post-detail'>
			{post && Object.keys(post).length > 0 && (
				<div>
					<h3 className='post-detail__heading'>{post.title}</h3>
					<Marginer margin='50px' separate />
					<div dangerouslySetInnerHTML={{ __html: post.body }}></div>
				</div>
			)}
			<Marginer margin='50px' separate />
			<div className='post-detail__related'>
				{posts && posts.length > 0 && (
					<List title='Liên quan' data={posts} />
				)}
			</div>
		</div>
	)
}

export default PostDetailPage
