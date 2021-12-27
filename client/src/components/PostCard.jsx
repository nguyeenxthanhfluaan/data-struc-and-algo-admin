import React from 'react'
import { Link } from 'react-router-dom'

import { format } from 'date-format-parse'

const PostCard = ({ post, className }) => {
	if (!post) {
		return null
	}

	return (
		<div className={`post-card ${className}`}>
			<div className='post-card__thumb'>
				<img src={post.thumbnail.url} alt='' />
			</div>
			<div className='post-card__info'>
				<div className='post-card__info__wrapper'>
					<span>Tiêu đề: </span>
					<Link to={`/post/detail/${post._id}`}>
						<h4 className='post-card__info__title'>{post.title}</h4>
					</Link>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Mô tả: </span>
					<p className='post-card__info__text'>{post.description}</p>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Danh mục: </span>
					<p className='post-card__info__text'>
						id: {post.category._id} - tên: {post.category.name}
					</p>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Chủ đề: </span>
					<p className='post-card__info__text'>
						id: {post.subject._id} - tên: {post.subject.name}
					</p>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Loại: </span>
					<p className='post-card__info__text'>
						id: {post.type._id} - tên: {post.type.name}
					</p>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Lượt xem: </span>
					<p className='post-card__info__text'>{post.viewCount}</p>
				</div>
				<div className='post-card__info__wrapper'>
					<span>Chỉnh sửa cuối: </span>
					<p className='post-card__info__text'>
						{format(new Date(post.lastModified), ' HH:mm - DD/MM/YYYY  ')}
					</p>
				</div>
				{post.score && (
					<div className='post-card__info__wrapper'>
						<span>Điểm tìm kiếm: </span>
						<p className='post-card__info__text'>{post.score}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default PostCard
