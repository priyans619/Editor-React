import { RichUtils, Modifier, EditorState } from 'draft-js';

export const RedTextInputComponent = ({ setEditorState }) => {
  const handleRedTextInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed() || chars !== ' ') {
      return 'not-handled';
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    if (blockText === '**') {
      // for remving ** this chararcter after space
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        ''
      );

      let newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');


      newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'RED_TEXT');

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  return handleRedTextInput;
};
