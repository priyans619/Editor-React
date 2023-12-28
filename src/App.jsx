import React from "react"
import Title from "./components/Title/Title.jsx"
import Button from "./components/Button/Button.jsx";

const App = () => {

  return (
    <div>
      <Title />
      <Button name= "Save" onClick={() => console.log('Button 1 clicked')} />
    </div>
  );
}

export default App
