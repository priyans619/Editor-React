import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { HeadingInputComponent } from './HeadingInputComponent';
import { BoldInputComponent } from './BoldInputComponent';
import { RedTextInputComponent } from './RedTextInputComponent';
import { BlackLineInputComponent } from './BlackLineInputComponent';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleBeforeInput = (chars) => {
    if (HeadingInputComponent({ editorState, setEditorState })(chars, editorState) === 'handled') {
      return 'handled';
    }

    if (BoldInputComponent({ editorState, setEditorState })(chars, editorState) === 'handled') {
      return 'handled';
    }
    if (RedTextInputComponent({ editorState, setEditorState })(chars, editorState) === 'handled') {
      return 'handled';
    }
    if (BlackLineInputComponent({ editorState, setEditorState })(chars, editorState) === 'handled') {
      return 'handled';
    }
    

    return 'not-handled';
  };
  
 

  const combinedStyleMap = {
    RED_TEXT: {
      color: 'red', 
    },
    BLACK_LINE: {
      borderBottom: '2px solid black', 
    },
    
  };

  return (
    <div style={editorStyle}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={combinedStyleMap}
      />
    </div>
  );
};

export default DraftEditor;
