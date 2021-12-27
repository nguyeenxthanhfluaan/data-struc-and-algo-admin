import React from 'react'

import Menu from './components/Menu'

const DefaultLayout = ({ children }) => {
	return (
		<div className='flex-content'>
			<div className='left-sidebar'>
				<Menu />
			</div>
			<div className='main-sidebar'>{children}</div>
		</div>
	)
}

export default DefaultLayout
