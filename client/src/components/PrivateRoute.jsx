import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...props }) => {
	const { user, isLoading } = useSelector(({ user }) => ({
		user: user.user,
		isLoading: user.isLoading,
	}))

	return isLoading ? null : user ? (
		<Route {...props}>{children}</Route>
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
