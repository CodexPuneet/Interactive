import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import backgroundImage from '../images/loginbg.avif';

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #FDF9F3;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;

const Wrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
height: 100%;

background-image: url(${backgroundImage}); 
background-size: cover; 
background-repeat: no-repeat; 
background-attachment: fixed; 
`;

const DivWrap = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const DivCre=styled.div`
  cursor:pointer;
  font-size:20px
`

function Login({fun,boxOpen}) {
  const [loginScreen,setLoginScreen]=useState(true)
  const [dados, setDados] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = e => {
    e.preventDefault()
    console.log(dados);
if(dados.email.length==0 || dados.password.length==0)
    return alert('please enter proper email and password');


  if(loginScreen) loginUser()
  if(!loginScreen) createUser()
   
  };
async function loginUser(){
  let data=await fetch(`https://gorgeous-miniskirt-ant.cyclic.cloud/user/login`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(dados),
    });
  data=await data.json()
  if(data.token== undefined)
    return alert(data.message)
  localStorage.setItem('token',data.token)
  fun(true)
  boxOpen(false)
  window.location.reload(false);

}
async function createUser(){
  let data=await fetch(`https://gorgeous-miniskirt-ant.cyclic.cloud/user/createAccount`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(dados),
    });
  data=await data.json()
  setLoginScreen(true)
  console.log(data)
}
  const handleChange = e => {
   setDados({...dados,[e.target.name]:e.target.value})
    
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <DivWrap >
    <div>Email</div>
          <Input
            type="email"
            name="email"
            value={dados.email}
            onChange={handleChange}
          />
           <div>Password</div>
          <Input
            type="password"
            name="password"
            value={dados.password}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} >{   loginScreen ? <>Login</>:<>createAccount</> }</Button>
        <DivCre onClick={()=>{setLoginScreen(val=>!val)}} >    
        {loginScreen?
      <>    Don't have an account? SignUp...  </>:
      <>  Already have an account? LogIn...</>  
      
      }
        
        
        </DivCre>
        </DivWrap>
      </Wrapper>
    </>
  );
}
export default Login
