import { motion } from "framer-motion";

const Home = () => {
  const token = localStorage.getItem('token');
  return (
    <motion.div>
    {token ? (
      <>
        What would you like to eat today! <b>Enjoy Free Access</b>
      </>
    ) : (
      <>
        What would you like to eat today! But to access the content <b>LogIn</b>
      </>
    )}
  </motion.div>
  );
};

export default Home;