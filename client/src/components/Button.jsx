import React from 'react'

const Button = ({ style, className, onClick, ...props }) => {
	return (
		<button
			className={`btn ${className}`}
			style={style}
			onClick={onClick}
			{...props}
		>
			{props.children}
		</button>
	)
}

export default Button
