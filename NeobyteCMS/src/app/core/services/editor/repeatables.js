
export function moveRepeatableUp(editor) {
  return () => {
    const node = editor.selection.getNode();
    const block = editor.dom.getParent(node, '.cms-repeatable');
    if (block && block.previousElementSibling) {
      editor.dom.insertAfter(block.previousElementSibling, block);
      editor.undoManager.add();
    }
  };
}

export function moveRepeatableDown(editor) {
  return () => {
    const node = editor.selection.getNode();
    const block = editor.dom.getParent(node, '.cms-repeatable');
    if (block && block.nextElementSibling && !block.nextElementSibling.hasAttribute('data-mce-bogus')) {
      block.parentNode.insertBefore(block.nextElementSibling, block);
      editor.undoManager.add();
    }
  };
}

export function deleteRepeatable(editor) {
  return () => {
    const node = editor.selection.getNode();
    const block = editor.dom.getParent(node, '.cms-repeatable');
    const next = block ? block.nextElementSibling : null;
    const prev = block ? block.previousElementSibling : null;
    if (block) {
      if (next && next.classList.contains('cms-repeatable')) {
        editor.selection.select(next);
      } else if (prev && prev.classList.contains('cms-repeatable')) {
        editor.selection.select(prev);
      }
      editor.dom.remove(block);
      editor.undoManager.add();
    }
  };
}

export function duplicateRepeatable(editor) {
  return () => {
    const node = editor.selection.getNode();
    const block = editor.dom.getParent(node, '.cms-repeatable');
    const newBlock = block ? block.cloneNode(true) : null;
    if (block) {
      editor.dom.insertAfter(newBlock, block);
      editor.selection.select(newBlock);
      editor.undoManager.add();
    }
  };
}
