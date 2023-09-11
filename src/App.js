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
  PlaceOrder,
  OrderScreen,
  Profile,
  OrderListScreen,
  ProductListScreen,
  UserListScreen,
  ProductEditScreen,
  UserEditScreen
} from './screen/index';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';

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
            <Route path='/order/:id' element={<OrderScreen/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route element={<AdminRoute/>}>
            <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
            <Route path='/admin/productlist' element={<ProductListScreen/>}/>
            <Route path='/admin/userlist' element={<UserListScreen/>}/>
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;