import Header from './components/Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './scss/index.scss'

import Homepage from './pages/Homepage'
import CatagoryPage from './pages/CatagoryPage'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Switch>
					<Route path='/' exact component={Homepage}></Route>
					<Route
						path='/category/:id'
						exact
						component={CatagoryPage}
					></Route>
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
