// import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup';
import LogIn from './components/login';
import ProductFeed from './components/productFeed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const ProtectedRoute = (props) => {
  // console.log(props,"fdhferi");
  const token = localStorage.getItem("EcommerAuthToken");
  const hasLoggedIn = token != "";
  if (hasLoggedIn) return props.children;
  return <Navigate to="/login" />
}

const UnProtectedRoute = (props) => {
  // console.log(props,"dcyuresah");

  const token = localStorage.getItem("EcommerAuthToken");
  const hasLoggedIn = token != "";
  if (hasLoggedIn) return <Navigate to="/productsfeed" />;
  return props.children;

}

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/productsfeed" element={
            <ProtectedRoute>
              <ProductFeed />
            </ProtectedRoute>
          }></Route>

          <Route path="/signup" element={
            <UnProtectedRoute>
              <SignUp />
            </UnProtectedRoute>
          }></Route>

          <Route path="/login" element={
            <UnProtectedRoute>
              <LogIn />
            </UnProtectedRoute>
          }></Route>

          <Route path="/referal/referalid" element={<SignUp />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
