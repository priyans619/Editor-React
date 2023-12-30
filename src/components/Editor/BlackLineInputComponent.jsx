// RedLineInputComponent.jsx
import React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';

export const BlackLineInputComponent = ({ editorState, setEditorState }) => {
  const handleBlackLineInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed() || chars !== ' ') {
      return 'not-handled';
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    if (blockText === '***') {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        ''
      );

      let newEditorState = RichUtils.toggleInlineStyle(
        EditorState.push(editorState, newContentState, 'change-inline-style'),
        'BLACK_LINE'
      );

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  return handleBlackLineInput;
};
