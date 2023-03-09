import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import RequireDataAuth from './helpers/require-data-auth'
// *------------------------------------------------
import Header   from './components/header'
import Home     from './containers/home'
import Login    from './containers/user/login'
import Register from './containers/user/register'
import Profile  from './containers/user/profile'
import Logout   from './containers/user/logout'
import Product  from './containers/product';
import Details  from './containers/details';
import Cart     from './containers/Cart';
import Admin    from "./containers/admin/admin"
import AddCosmetics from './containers/admin/cosmetics/addCosmetics';
import EditCosmetics from './containers/admin/cosmetics/editCosmetics';
import Orderdetails from './containers/admin/orderdetails';
function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
      {/* ------------------USER------------------ */}
      <Route exact path='/' element={<RequireDataAuth child={Home} auth={false}/>}/>
      <Route exact path='/login' element={<Login />}/>
      <Route exact path='/register' element={<Register />}/>
      <Route exact path='/details/:id' element={<RequireDataAuth child={Details} auth={false}/>}/>
      <Route exact path='/profile' element={<RequireDataAuth child={Profile} auth={true}/>}/>
      <Route exact path='/logout' element={<RequireDataAuth child={Logout} auth={true}/>}/>
      <Route exact path='/product' element={<RequireDataAuth child={Product} auth={false}/>}/>
      <Route exact path='/cart' element={<RequireDataAuth child={Cart} auth={true}/>}/>
      <Route exact path='/admin' element={<RequireDataAuth child={Admin} auth={true}/>}/>
      <Route exact path='/addcosmetics' element={<RequireDataAuth child={AddCosmetics} auth={true}/>}/>
      <Route exact path='/editcosmetics/:id' element={<RequireDataAuth child={EditCosmetics} auth={true}/>}/>
      <Route exact path='/orderdetails/:id' element={<RequireDataAuth child={Orderdetails} auth={true}/>}/>

    </Routes>
    </div>
  );
}

export default App;

