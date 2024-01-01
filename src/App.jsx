import React from "react"
import Title from "./components/Title/Title.jsx"
import Button from "./components/Button/Button.jsx";
import DraftEditor from "./components/Editor/DraftEditor.jsx";
import {EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useState } from "react";

const App = () => {
  const [editorState, setEditorState] = useState(() => {
    // Loaad content from local storage
    const savedContent = localStorage.getItem("draftEditorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  const handleSave = () => {
    // this will save content only by clicking save button
    const contentState = editorState.getCurrentContent();
    const contentJson = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("draftEditorContent", contentJson);
  };


  return (
    <div>
      <Title />
      <Button name= "Save" onClick={handleSave} />
      <DraftEditor editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
}

export default App
