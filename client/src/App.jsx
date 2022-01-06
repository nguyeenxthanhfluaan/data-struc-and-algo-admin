import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import './scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import { fetchCategory } from './redux/category/category.actions'
import { fetchSubject } from './redux/subject/subject.actions'
import { fetchTypes } from './redux/type/type.actions'
import { loadUser } from './redux/user/user.actions'

import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Menu from './components/Menu'

import SearchPage from './pages/SearchPage'
import PostDetailPage from './pages/PostDetailPage'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import ModifyPostPage from './pages/ModifyPostPage'
import ManagePost from './pages/ManagePosts'
import ManageCategory from './pages/ManageCategory'
import ManageSubject from './pages/ManageSubject'
import DefaultLayout from './DefaultLayout'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		document.title = 'Learn Data Structure and Algorithm'
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
					<Route path='/login' exact component={Login} />

					<Route
						path='/'
						exact
						render={() => <Redirect to={'/manage/post'} />}
					/>

					<PrivateRoute
						path='/create-post'
						exact
						render={() => (
							<DefaultLayout>
								<ModifyPostPage />
							</DefaultLayout>
						)}
					/>

					<PrivateRoute
						path='/update-post/:id'
						exact
						render={() => (
							<DefaultLayout>
								<ModifyPostPage isUpdatePost />
							</DefaultLayout>
						)}
					/>

					<PrivateRoute
						path='/manage/post'
						exact
						render={() => (
							<DefaultLayout>
								<ManagePost />
							</DefaultLayout>
						)}
					/>

					<PrivateRoute
						path='/manage/category'
						exact
						render={() => (
							<DefaultLayout>
								<ManageCategory />
							</DefaultLayout>
						)}
					/>

					<PrivateRoute
						path='/manage/subject'
						exact
						render={() => (
							<DefaultLayout>
								<ManageSubject />
							</DefaultLayout>
						)}
					/>

					<PrivateRoute
						path='/post/detail/:id'
						exact
						component={PostDetailPage}
						render={() => (
							<DefaultLayout>
								<PostDetailPage />
							</DefaultLayout>
						)}
					/>

					<Route
						path='/search'
						exact
						component={SearchPage}
						render={() => (
							<DefaultLayout>
								<SearchPage />
							</DefaultLayout>
						)}
					/>
				</Switch>
			</div>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
