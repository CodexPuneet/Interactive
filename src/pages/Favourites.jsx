import React, {useState, useEffect } from 'react'
import styled from "styled-components";

const Favourites = () => {
  const token=localStorage.getItem('token')
  const [fav,setFav]=useState([])
  useEffect(()=>{
    addToFavourite()
  },[]);


   function addToFavourite(){
 
  fetch(`https://gorgeous-miniskirt-ant.cyclic.cloud/favourite/alldishes`,{
      method:"Get",
      headers: {
        'Content-Type': 'application/json', 
        "Authorization":`Bearer ${token}`
        
      },

    }).then(res=>res.json())
    .then(res=>{console.log(res);setFav(res)})

  
  }

  return (
    <div>
      {
        fav && fav.map((item,index)=>{
          return <Box key={index}>
            {item.dish}

          </Box>
        })
      }

    </div>
  )
}
let Box=styled.div`
padding: 1rem 2rem;
color: #313131;
background: #fff;
border: 2px solid #000;
margin-right: 2rem;
font-weight: 600;
`


export default Favourites