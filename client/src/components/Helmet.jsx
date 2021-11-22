import React, { useEffect } from 'react'

const Helmet = ({ children, title }) => {
	useEffect(() => {
		document.title = title
		window.scrollTo(0, 0)
	}, [])

	return <div>{children}</div>
}

export default Helmet
