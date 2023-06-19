import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { 
  Navbar, 
  Home, 
  ProductPreview,
  Cart,
  Login
} from './screen/index';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Navbar/>
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductPreview/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>

      {/* <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
      </Router> */}
    </div>
  )
}

export default App;