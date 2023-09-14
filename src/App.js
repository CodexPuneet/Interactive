import { useState,useEffect } from "react";
import styled from "styled-components";
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Category from "./components/Category";
import { MdRestaurant } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";
import backgroundImage from './images/recipe.jpg';


const App = () => {
  const [logedin,setIslogedin]=useState(false);
  const [openLogin,setOpenLogin]=useState(logedin || false);
  const navigate=useNavigate();
  useEffect(()=>{
    setIslogedin(localStorage.getItem('token') || false )
   
  },[logedin]);

  function logoutUser(){
    localStorage.removeItem('token');
    setIslogedin(false)
  }
  return (
    <Background>
      <Nav>
        <MdRestaurant />
        <Logo to={"/"}>Hunger Eats</Logo>{
          logedin ?<>
          <Button onClick={()=>navigate('/favourites')}  > Favourites</Button> 
          <Button 
          onClick={()=>{logoutUser()}}
          > Logout</Button>
          </>
          :
          <Button onClick={()=>{
            setOpenLogin((val)=>!val)}} 
          > Login</Button>

        }
       
     
      </Nav>
      
      {openLogin &&  <Login boxOpen={setOpenLogin} fun={setIslogedin}/>} 
          <Search />
          <Category />
          <Pages />
     
    
    </Background>
  );
};
const Background = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover; 
  background-repeat: no-repeat; 
  background-attachment: fixed; 
  width: 100vw; 
  height: 100vh; 
  position: fixed; 
  top: 0;
  left: 0;
  padding: 0px 50px;
`;

const Button = styled.button`
  padding: 0.5rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  margin-left:40px
`;

const Nav = styled.div`
  padding: 3rem 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2.5rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

export default App;