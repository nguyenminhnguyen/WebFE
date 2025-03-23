import NavBar from "./components/navbar";
import Home from "./pages/Home";
import "./styles/App.css";
function App() {
  const bodyStyle = {
    marginLeft: "10vw",
    marginRight: "10vw",
  };
  return (
    <div>
      <NavBar />
      <div style={bodyStyle}>
        <Home />
      </div>
    </div>
  );
}
export default App;
