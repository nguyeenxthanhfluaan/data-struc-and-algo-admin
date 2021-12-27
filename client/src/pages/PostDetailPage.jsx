import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'

import { fetchPostById, setIsUpdate } from '../redux/post/post.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import Marginer from '../components/Marginer'
import List from '../components/List'
import Button from '../components/Button'
import Helmet from '../components/Helmet'

import Highlight from 'react-highlight'

const PostDetailPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()

	const { post, posts, user } = useSelector(({ post, user }) => ({
		post: post.post,
		posts: post.posts,
		user: user.user,
	}))

	useEffect(() => {
		dispatch(fetchPostById(id))
	}, [])

	return (
		<Helmet title='Chi tiết'>
			<div className='post-detail'>
				{post && Object.keys(post).length > 0 && (
					<div>
						<div className='post-detail__header'>
							<h3 className='post-detail__header__text'>{post.title}</h3>
							{
								// user
								true && (
									<Button
										onClick={() =>
											history.push(`/update-post/${post._id}`)
										}
										className='post-detail__header__btn'
									>
										<FontAwesomeIcon icon={faEdit} />
										Sữa bài đăng
									</Button>
								)
							}
						</div>
						<Marginer margin='50px' separate />
						<Highlight className='post-detail__content' innerHTML={true}>
							{post.content}
						</Highlight>
					</div>
				)}
				<Marginer margin='50px' separate />
				{/* <div className='post-detail__related'>
					{posts && posts.length > 0 && (
						<List title='Bài viết liên quan' data={posts} />
					)}
				</div> */}
			</div>
		</Helmet>
	)
}

export default PostDetailPage
