import { Routes, Route } from 'react-router-dom';
import Error from './components/error.jsx';
import BookDetails from './components/bookDetails.jsx';
import Dashboard from './components/dashboard.jsx';
import ViewCart from './components/viewCart.jsx';
import ViewUser from './components/viewUser.jsx';
import SignUp from './components/signupForm.jsx';
import SignIn from './components/signinForm.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css'

// <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>

function App() {
      return (
      	<div className="App">
      	    <Routes>
      		<Route path="/" element={<Dashboard/>}/>
		<Route path="/signin" element={<SignIn/>}/>
		<Route path="/signup" element={<SignUp/>}/>
		<Route path="/user/:userID/viewcart" element={<ViewCart/>}/>
		<Route path="/user/profile/:userID" element={<ViewUser/>}/>
      		<Route path="book/view/:bookID" element={<BookDetails action="view"/>}/>
      		<Route path="book/edit/:bookID" element={<BookDetails action="edit"/>}/>
      		<Route path="book/delete/:bookID" element={<BookDetails action="delete"/>}/>
      		<Route path="book/add" element={<BookDetails action="add"/>}/>
      		<Route path="*" element={<Error/>}/>
      	    </Routes>
      	</div>
      );
}

export default App;
