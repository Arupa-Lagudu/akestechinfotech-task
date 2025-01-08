import TypicodePostsList from "./Components/TypicodePosts";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Container className="App">
      <TypicodePostsList />
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
}

export default App;
