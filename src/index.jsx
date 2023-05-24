import { createRoot } from 'react-dom/client';

import Container from 'react-bootstrap/Container'
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
//
import { MainView } from "./components/main-view/main-view";
// Main component (will eventually use all the others)
const App = () => {
  
  return (
    <Container style={{border: "3px solid #8b7e07"}}>
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);








