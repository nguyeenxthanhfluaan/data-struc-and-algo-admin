import React from 'react'

const Marginer = ({ direction, margin, separate }) => {
	let style = { position: 'relative' }

	if (direction === 'vertical') {
		style.width = margin
		style.height = '100%'
	} else {
		style.width = '100%'
		style.height = margin
	}

	let separateStyle = {}

	if (separate) {
		separateStyle.position = 'absolute'
		separateStyle.backgroundColor = '#000'

		if (direction === 'vertical') {
			separateStyle.height = '100%'
			separateStyle.width = '1px'
			separateStyle.left = '50%'
			separateStyle.transform = 'translateX(50%)'
		} else {
			separateStyle.width = '100%'
			separateStyle.height = '1px'
			separateStyle.top = '50%'
			separateStyle.transform = 'translateY(50%)'
		}
	}

	return (
		<div style={style}>{separate && <div style={separateStyle}></div>}</div>
	)
}

export default Marginer
