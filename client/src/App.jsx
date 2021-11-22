import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import { fetchCategory } from './redux/category/category.actions'
import { fetchSubject } from './redux/subject/subject.actions'
import { fetchTypes } from './redux/type/type.actions'
import { loadUser } from './redux/user/user.actions'

import Homepage from './pages/Homepage'
import SearchPage from './pages/SearchPage'
import PostDetailPage from './pages/PostDetailPage'
import Header from './components/Header'
import UpdatePostPage from './pages/UpdatePostPage'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import AdminPage from './pages/Admin/AdminPage'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategory())
		dispatch(fetchSubject())
		dispatch(fetchTypes())
		dispatch(loadUser())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/search' exact component={SearchPage} />
					<Route
						path='/post/detail/:id'
						exact
						component={PostDetailPage}
					/>
					<Route path='/login' exact component={Login} />
					<PrivateRoute
						path='/post/update'
						exact
						component={UpdatePostPage}
					/>
					<PrivateRoute path='/admin' exact component={AdminPage} />
				</Switch>
			</div>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
