import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { 
  Navbar, 
  Home, 
  ProductPreview,
  Cart,
  Login,
  Register,
  ShippingScreen,
  Payment,
  PlaceOrder
} from './screen/index';
import PrivateRoute from './components/private_route/PrivateRoute';

const App = () => {
  return (
    <div className='container'>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '1rem'
          }
        }}
      />
      <Router>
        <Navbar/>
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductPreview/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/placeorder' element={<PlaceOrder/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;