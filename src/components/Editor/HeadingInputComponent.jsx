// HeadingInputComponent.jsx
import React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';

export const HeadingInputComponent = ({ editorState, setEditorState }) => {
  const handleHeadingInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed() || chars !== ' ') {
      return 'not-handled';
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    if (blockText === '#') {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ''
      );

      let newEditorState = RichUtils.toggleBlockType(
        EditorState.push(editorState, newContentState, 'change-block-data'),
        'header-one'
      );

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  return handleHeadingInput;
};

