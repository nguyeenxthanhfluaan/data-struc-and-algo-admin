import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
	if (!post) {
		return null
	}
	return (
		<div className='post-card'>
			<h4 className='post-card__title'>
				<Link to={''}>{post.title}</Link>
			</h4>
		</div>
	)
}

export default PostCard
