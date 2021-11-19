import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...props }) => {
	const { user } = useSelector(({ user }) => ({ user: user.user }))

	return user ? <Route {...props}>{children}</Route> : <Redirect to='/' />
}

export default PrivateRoute
