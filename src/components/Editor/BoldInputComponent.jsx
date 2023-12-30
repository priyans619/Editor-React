// BoldInputComponent.jsx
import React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';

export const BoldInputComponent = ({ editorState, setEditorState }) => {
  const handleBoldInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed() || chars !== ' ') {
      return 'not-handled';
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    if (blockText === '*') {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ''
      );

      let newEditorState = RichUtils.toggleInlineStyle(
        EditorState.push(editorState, newContentState, 'change-inline-style'),
        'BOLD'
      );

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  return handleBoldInput;
};
