import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier, SelectionState } from 'draft-js';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed() || chars !== ' ') {
      return 'not-handled';
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    if (blockText === '#') {
      const blockKey = currentBlock.getKey();

      // this willl replace the # with empty string
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ''
      );

      let newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
      newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');

      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 0,
      });
      newEditorState = EditorState.forceSelection(newEditorState, newSelection);

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  }

 

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleBeforeInput={handleBeforeInput}
      />
    </div>
  );
};

export default DraftEditor;