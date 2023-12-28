import React from 'react';
import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <h1>Draft Editor</h1>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default DraftEditor;
