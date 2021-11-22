import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ children, setActivated, className, ...props }) => {
	const handleStopPropagation = (e) => e.stopPropagation()

	return (
		<div className='modal' onClick={() => setActivated(false)} {...props}>
			<div className='modal__content' onClick={handleStopPropagation}>
				<div
					className='modal__content__close'
					onClick={() => setActivated(false)}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				{children}
			</div>
		</div>
	)
}

export default Modal
