import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import { fetchCategory } from './redux/category/category.actions'
import { fetchSubject } from './redux/subject/subject.actions'
import { fetchTypes } from './redux/type/type.actions'

import Homepage from './pages/Homepage'
import CatagoryPage from './pages/CatagoryPage'
import Menu from './components/Menu'
import SearchPage from './pages/SearchPage'
import PostDetailPage from './pages/PostDetailPage'
import Header from './components/Header'
import CreatePostPage from './pages/CreatePostPage'
import UpdatePostPage from './pages/UpdatePostPage'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategory())
		dispatch(fetchSubject())
		dispatch(fetchTypes())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/category/:id' exact component={CatagoryPage} />
					<Route path='/search' exact component={SearchPage} />
					<Route path='/post/create' exact component={CreatePostPage} />
					<Route path='/post/update' exact component={UpdatePostPage} />
					<Route path='/post/:id' exact component={PostDetailPage} />
				</Switch>
			</div>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
