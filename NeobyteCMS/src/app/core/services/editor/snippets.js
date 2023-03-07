//
// TinyMCE controls for working with blocks.
//

export function insertBlock(editor) {
  return (ui, block) => {
    editor.selection.collapse(); // append instead of replace
    editor.execCommand('mceInsertContent', false, block.source);
  };
}
