import React from 'react'
import Marginer from './Marginer'
import PostCard from './PostCard'

const List = ({ title, data }) => {
	return (
		<div className='list'>
			{title && (
				<>
					<h3 className='list__title'>{title}</h3>
					<Marginer margin='40px' />
				</>
			)}
			{data &&
				data.length > 0 &&
				data.map((item) => <PostCard post={item} key={item._id} />)}
		</div>
	)
}

export default List
