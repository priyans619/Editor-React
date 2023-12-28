if (typeof global === 'undefined') {
  global = window;
}
import React from "react"
import Title from "./components/Title/Title.jsx"
import Button from "./components/Button/Button.jsx";
import DraftEditor from "./components/Editor/DraftEditor.jsx";

const App = () => {

  return (
    <div>
      <Title />
      <Button name= "Save" onClick={() => console.log('Button 1 clicked')} />
      <DraftEditor/>
    </div>
  );
}

export default App
