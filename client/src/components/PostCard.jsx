import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
	if (!post) {
		return null
	}

	return (
		<div className='post-card'>
			<div className='post-card__title'>
				<span>Tiêu đề: </span>
				<Link to={`/post/detail/${post._id}`}>
					<h4 className='post-card__title__text'>{post.title}</h4>
				</Link>
			</div>
			<div className='post-card__desc'>
				<span>Mô tả: </span>
				<p className='post-card__desc__text'>{post.description}</p>
			</div>
			<div className='post-card__category'>
				<span>Category: </span>
				<p className='post-card__category__text'>
					id: {post.category._id} - name: {post.category.name}
				</p>
			</div>
			<div className='post-card__subject'>
				<span>Subject: </span>
				<p className='post-card__subject__text'>
					id: {post.subject._id} - name: {post.subject.name}
				</p>
			</div>
			<div className='post-card__test'>
				<span>View: </span>
				<p className='post-card__test__text'>{post.viewCount}</p>
			</div>
			<div className='post-card__test'>
				<span>Chỉnh sửa cuối: </span>
				<p className='post-card__test__text'>{post.lastModified}</p>
			</div>
			{post.score && (
				<div className='post-card__test'>
					<span>Điểm tìm kiếm: </span>
					<p className='post-card__test__text'>{post.score}</p>
				</div>
			)}
		</div>
	)
}

export default PostCard
