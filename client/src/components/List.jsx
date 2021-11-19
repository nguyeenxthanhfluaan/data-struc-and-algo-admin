import React from 'react'
import Marginer from './Marginer'
import PostCard from './PostCard'

const List = (props) => {
	return (
		<div className='list'>
			{props.title && (
				<>
					<h3 className='list__title'>{props.title}</h3>
					<Marginer margin='40px' />
				</>
			)}
			{props.data &&
				props.data.length > 0 &&
				props.data.map((item) => <PostCard post={item} key={item._id} />)}
		</div>
	)
}

export default List
