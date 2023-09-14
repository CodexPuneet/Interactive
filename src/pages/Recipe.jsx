import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
const [isLoggedin,setisLogedin]= useState(localStorage.getItem('token')!=undefined)
const token=localStorage.getItem('token')   
const params = useParams();

  const fetchDetails = async () => {
    const resp = await fetch(
      `https://gorgeous-miniskirt-ant.cyclic.cloud/recipes/${params.id}/information`
    );
    const data = await resp.json();
    return data;
  };

  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      console.log(data)
      if (isMounted) setDetails(data);
    });
    return () => {
      isMounted = false;
    };
  }, [params.id]);

async function addToFavourite(){
  let obj={
    "dish":details.title,
    "id":params.id
  }
  let res=await fetch(`https://gorgeous-miniskirt-ant.cyclic.cloud/favourite/addDish`,{
    method:"Post",
    headers: {
      'Content-Type': 'application/json', 
      "Authorization":`Bearer ${token}`
      
    },
    body:JSON.stringify(obj)
  });
  alert("added to favourites")
  console.log(res)

}

  return (
    <Wrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>{ isLoggedin &&
      <Button
         
          onClick={() => addToFavourite()}
        >
          Add to Favourites
        </Button>}
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map(({ id, original }) => (
              <li key={id}>{original}</li>
            ))}
          </ul>
        )}

        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10rem inherit 5rem;
  display: flex;

  @media (max-width: 1068px) {
    flex-direction: column;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8rem;

    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;

  @media (max-width: 1068px) {
    margin-top: 3rem;
    margin-left: 1rem;
  }
`;

export default Recipe;