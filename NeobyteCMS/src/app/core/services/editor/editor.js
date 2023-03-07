export default class {
  // Creates a new Editor.
  constructor(element, options, tinymce) {
    this.editor = null;
    this.element = element;
    this.options = Object.assign(
      {
        allowDrop: false,
        allowNewlines: true,
        baseUrl: '/',
        plainText: false,
        readOnly: false
      },
      options
    );
    this.tinymce = tinymce || window.tinymce;

    if (!this.tinymce) {
      throw new Error('TinyMCE has not been loaded on the target window.');
    }
  }

  //
  // Initializes the editor.
  //
  // Returns a promise that resolves when the editor has been initialized.
  //
  initialize() {
    return new Promise(resolve => {
      // TinyMCE settings
      const settings = {
        browser_spellcheck: true,
        content_style: this.editorStyles,
        document_base_url: this.options.baseUrl.replace(/\/$/, '') + '/', // must end in a slash
        element_format: 'html',
        entity_encoding: 'raw',
        extended_valid_elements: 'iframe[*],script[*]',
        formats: {
          // Use alignment classes
          alignleft: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: { textAlign: 'left' },
              inherit: false,
              preview: false,
              defaultBlock: 'div'
            },
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-left',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'img,table',
              collapsed: false,
              classes: 'align-left',
              styles: { float: 'left' },
              preview: 'font-family font-size'
            }
          ],
          aligncenter: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: { textAlign: 'center' },
              inherit: false,
              preview: 'font-family font-size',
              defaultBlock: 'div'
            },
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-center',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'img',
              collapsed: false,
              classes: 'align-center',
              styles: { display: 'block', marginLeft: 'auto', marginRight: 'auto' },
              preview: false
            },
            {
              selector: 'table',
              collapsed: false,
              classes: 'align-center',
              styles: { marginLeft: 'auto', marginRight: 'auto' },
              preview: 'font-family font-size'
            }
          ],
          alignright: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: { textAlign: 'right' },
              inherit: false,
              preview: 'font-family font-size',
              defaultBlock: 'div'
            },
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-right',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'img,table',
              collapsed: false,
              classes: 'align-right',
              styles: { float: 'right' },
              preview: 'font-family font-size'
            }
          ],
          alignjustify: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: { textAlign: 'justify' },
              inherit: false,
              defaultBlock: 'div',
              preview: 'font-family font-size'
            }
          ],
          // Remove these formatters so shortcut keys and the API won't apply them
          div: [
            {
              selector: '*',
              styles: {
                /* empty */
              }
            }
          ],
          underline: [
            {
              selector: '*',
              styles: {
                /* empty */
              }
            }
          ],
          // Enable semantic formatters
          strikethrough: { inline: 'del' },
          insert: { inline: 'ins' },
          highlight: { inline: 'mark' },
          small: { inline: 'small' },
          // Add small to the default list of formats that get removed
          removeformat: [
            {
              selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins,small',
              remove: 'all',
              split: true,
              expand: false,
              block_expand: true,
              deep: true
            },
            {
              selector: 'span',
              attributes: ['style', 'class'],
              remove: 'empty',
              split: true,
              expand: false,
              deep: true
            },
            { selector: '*', attributes: ['style', 'class'], split: false, expand: false, deep: true }
          ]
        },
        hidden_input: false,
        inline: true,
        inline_boundaries: false,
        inline_boundaries_selector: 'a[href],code,em,strong,del,ins,mark,small',
        menubar: false,
        noneditable_editable_class: 'cms-unlock',
        noneditable_noneditable_class: 'cms-lock',
        paste_preprocess: (editor, event) => {
          // Called when content is pasted into the editor
          if (this.options.plainText) {
            // Paste as plain text
            const div = document.createElement('div');
            div.innerHTML = event.content;
            event.content = div.innerText;
          }
        },
        plugins: 'anchor iconfonts image lists noneditable paste table textpattern',
        preview_styles:
          'font-family font-size font-weight font-style text-decoration text-transform outline text-shadow',
        relative_urls: true,
        table_responsive_width: true,
        table_toolbar: false,
        target: this.element,
        textpattern_patterns: [
          { start: '_', end: '_', format: 'italic' },
          { start: '*', end: '*', format: 'italic' },
          { start: '**', end: '**', format: 'bold' },
          { start: '__', end: '__', format: 'bold' },
          { start: '~~', end: '~~', format: 'strikethrough' },
          { start: '`', end: '`', format: 'code' },
          { start: '#', format: 'h1' },
          { start: '##', format: 'h2' },
          { start: '###', format: 'h3' },
          { start: '####', format: 'h4' },
          { start: '#####', format: 'h5' },
          { start: '######', format: 'h6' },
          { start: '1. ', cmd: 'InsertOrderedList' },
          { start: '* ', cmd: 'InsertUnorderedList' },
          { start: '- ', cmd: 'InsertUnorderedList' }
        ],
        theme: false,
        toolbar: false,
        setup: editor => {
          const region = editor.getElement();

          // Editor commands
          editor.addCommand('insertBlock', insertBlock(editor));
          editor.addCommand('moveRepeatableUp', moveRepeatableUp(editor));
          editor.addCommand('moveRepeatableDown', moveRepeatableDown(editor));
          editor.addCommand('duplicateRepeatable', duplicateRepeatable(editor));
          editor.addCommand('deleteRepeatable', deleteRepeatable(editor));

          // Emit editor events
          editor.on('focus', event => this.fire('focus', event));
          editor.on('blur', event => this.fire('blur', event));
          editor.on('change', event => this.fire('change', event));
          editor.on('click', event => this.fire('click', event));
          editor.on('paste', event => this.fire('paste', event));
          editor.on('dblclick', event => {
            const target = event.target;
            const isLocked = this.isLocked(event.target);
            const anchor = target.closest('a[id]');
            const codeBlock = target.closest('.cms-code');
            const embed = target.closest('.cms-embed');
            const gallery = target.closest('.cms-gallery');
            const image = target.closest('img, figure.image');
            const link = target.closest('a');

            // Fire the generic double click event
            this.fire('dblclick', event);

            // Anchors
            if (anchor && !isLocked) {
              this.setSelectedElement(anchor).fire('insertAnchor');
              return event.stopPropagation();
            }

            // Code blocks
            if (codeBlock && !isLocked) {
              this.setSelectedElement(codeBlock).fire('insertCodeBlock');
              return event.stopPropagation();
            }

            // Embeds
            if (embed && !isLocked) {
              this.setSelectedElement(embed).fire('insertEmbed');
              return event.stopPropagation();
            }

            // Galleries
            if (gallery && !isLocked) {
              this.setSelectedElement(gallery).fire('insertGallery');
              return event.stopPropagation();
            }

            // Images
            if (image && !isLocked) {
              this.setSelectedElement(image).fire('insertImage');
              return event.stopPropagation();
            }

            // Links
            if (link && !isLocked) {
              this.setSelectedElement(link).fire('insertLink');
              return event.stopPropagation();
            }
          });
          editor.on('keydown', event => this.fire('keydown', event));
          editor.on('keyup', event => this.fire('keyup', event));
          editor.on('NodeChange', event => this.fire('change', event));

          // Emit drop event when an object is dropped. We do this at the element level since
          // TinyMCE doesn't appear to offer a public drop event yet.
          if (this.options.allowDrop) {
            region.addEventListener('dragover', event => {
              event.preventDefault();
              region.classList.add('cms-is-dragging');
            });

            region.addEventListener('dragleave', event => {
              event.preventDefault();
              region.classList.remove('cms-is-dragging');
            });

            region.addEventListener('drop', event => {
              event.preventDefault();
              region.classList.remove('cms-is-dragging');
              this.fire('drop', event);
            });
          }

          // Editor shortcuts
          editor.on('keydown', event => {
            const metaKey = this.tinymce.Env.mac ? 'metaKey' : 'ctrlKey';
            const node = editor.selection.getNode();

            // Blur the editor when escape is pressed
            if (event.key === 'Escape') {
              this.collapseSelection();
              this.blur();
            }

            // Link
            if (event[metaKey] && event.key === 'k') {
              event.preventDefault();
              this.fire('insertLink');
            }

            // Image
            if (event[metaKey] && event.shiftKey && event.key === 'i') {
              event.preventDefault();
              this.fire('insertImage');
            }

            // Anchor
            if (event[metaKey] && event.shiftKey && event.key === 'a') {
              event.preventDefault();
              this.fire('insertAnchor');
            }

            // Blocks
            if (event[metaKey] && event.shiftKey && event.key === 'b') {
              event.preventDefault();
              this.fire('insertBlock');
            }

            // Section break
            if (event[metaKey] && event.key === 'Enter') {
              event.preventDefault();
              editor.insertContent('<hr>');
            }

            // Move repeatable up
            if (event[metaKey] && event.key === 'ArrowUp' && node.closest('.cms-repeatable')) {
              event.preventDefault();
              editor.execCommand('moveRepeatableUp');
            }

            // Move repeatable down
            if (event[metaKey] && event.key === 'ArrowDown' && node.closest('.cms-repeatable')) {
              event.preventDefault();
              editor.execCommand('moveRepeatableDown');
            }

            // Toggle the code format
            if (event[metaKey] && event.shiftKey && event.key === 'c') {
              event.preventDefault();
              this.toggleFormat('code');
            }

            // Disallow newlines
            if (this.options.allowNewlines === false && event.key === 'Enter') {
              event.preventDefault();
            }
          });

          // Visually focus the root when a locked region has focus
          editor.on('NodeChange', () => {
            const node = editor.selection.getNode();
            const lock = editor.dom.getParent(node, '.cms-lock');
            if (lock) {
              editor.getElement().classList.add('mce-focus');
            }
          });
          editor.on('blur', () => editor.getElement().classList.remove('mce-focus'));

          // Visually focus repeatable regions when their node is active
          editor.on('NodeChange', () => {
            const node = editor.selection.getNode();
            const repeatable = editor.dom.getParent(node, '.cms-repeatable');
            const repeatables = [...editor.getElement().querySelectorAll('.cms-repeatable')];
            repeatables.map(el => el.removeAttribute('data-mce-selected'));
            if (repeatable) {
              repeatable.setAttribute('data-mce-selected', true);
            }
          });
          editor.on('blur', () => {
            const repeatables = [...editor.getElement().querySelectorAll('.cms-repeatable')];
            repeatables.map(el => el.removeAttribute('data-mce-selected'));
          });

          // Remove empty paragraphs that get inserted for some reason, usually around headings,
          // code blocks, and probably any other block-level element. In this case, the paragraphs
          // are literally <p></p> and don't have <br data-mce-bogus> inside them. This makes the
          // paragraph collapse visually in the editor, but when TinyMCE serializes the content it
          // adds a <br>, causing the content to look different in the editor and the live page.
          //
          // This will not remove paragraphs that were inserted intentionally, as their innerHTML
          // contains a <br data-mce-bogus></p> element before serializing.
          editor.on('PreProcess', event => {
            [...event.node.querySelectorAll('p')].map(el => {
              if (el.innerHTML === '') {
                el.remove();
              }
            });
          });

          // Disable TinyMCE's window manager. We do this because certain plugins such as paste and
          // table may trigger a popup in rare cases even though we're not using them.
          editor.on('PreInit', () => {
            editor.windowManager = {
              alert: function () {},
              close: function () {},
              confirm: function () {},
              open: function () {}
            };
          });

          // Prepare code block elements when content is set.
          //
          // This:
          //
          //   <pre class="cms-code">
          //     <code class="language-{language}">
          //       {source}
          //     </code>
          //   </pre>
          //
          // Will become this:
          //
          //   <pre
          //     class="cms-code"
          //     data-source="{source}"
          //     data-language="{language}
          //     contenteditable="false"
          //   >
          //     <code class="language-{language}">
          //       {source}
          //     </code>
          //   </pre>
          //
          editor.on('BeforeSetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-code');
            for (let i = 0; i < matches.length; i++) {
              const pre = matches[i];
              const code = pre.querySelector('code');
              const classes = code.getAttribute('class') || '';
              const source = code.innerText;
              let language = 'none';
              classes
                .split(' ')
                .map(name => name.trim())
                .map(name => {
                  const match = name.match(/^language-([a-z0-9-]+)/i);
                  if (match) language = match[1];
                });

              pre.setAttribute('data-language', language);
              pre.setAttribute('data-source', source);
              pre.setAttribute('contenteditable', false);
            }
            event.content = doc.body.innerHTML;

            // Emit the render event on next tick (after content is set)
            setTimeout(() => {
              [...editor.getElement().querySelectorAll('.cms-code')].map(el => {
                bean.fire(el, 'render');
              });
            });
          });

          // Restore code block elements when content is fetched.
          //
          // This:
          //
          //   <pre
          //     class="cms-code"
          //     data-source="{source}"
          //     data-language="{language}
          //     contenteditable="false"
          //   >
          //     <code class="language-{language}">
          //       {source}
          //     </code>
          //   </pre>
          //
          // Will go back to this:
          //
          //   <pre class="cms-code">
          //     <code class="language-{language}">
          //       {source}
          //     </code>
          //   </pre>
          //
          editor.on('GetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-code');
            for (let i = 0; i < matches.length; i++) {
              const pre = matches[i];
              const language = pre.getAttribute('data-language');
              const source = pre.getAttribute('data-source');
              const code = document.createElement('code');
              code.textContent = source; // innerText produces <br>
              pre.removeAttribute('data-language');
              pre.removeAttribute('data-source');
              pre.setAttribute('class', 'cms-code');
              code.setAttribute('class', `language-${language}`);
              pre.removeAttribute('contenteditable');
              pre.innerHTML = code.outerHTML;
            }
            event.content = doc.body.innerHTML;
          });

          // Prepare embed elements when content is set. We store the original embed code to make
          // sure it remains unaltered by scripts or other DOM modifications.
          //
          // This:
          //
          //   <div class="cms-embed">
          //     {source}
          //   </div>
          //
          // Will become this:
          //
          //   <div class="cms-embed" data-source="{source}" contenteditable="false">
          //     {source}
          //   </div>
          //
          editor.on('BeforeSetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-embed');
            for (let i = 0; i < matches.length; i++) {
              // Remove data-mce-* from pasted embed blocks
              matches[i].setAttribute('data-source', this.cleanAttributes(matches[i].innerHTML));
              matches[i].setAttribute('contenteditable', false);
            }
            event.content = doc.body.innerHTML;
          });

          // Restore embedded elements when content is fetched.
          //
          // This:
          //
          //   <div class="cms-embed" data-source="{source}" contenteditable="false">
          //     {source}
          //   </div>
          //
          // Will go back to this:
          //
          //   <div class="cms-embed">
          //     {source}
          //   </div>
          //
          editor.on('GetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-embed');
            for (let i = 0; i < matches.length; i++) {
              const source = matches[i].getAttribute('data-source');
              matches[i].removeAttribute('contenteditable');
              matches[i].removeAttribute('data-source');
              matches[i].innerHTML = source;
            }
            event.content = doc.body.innerHTML;
          });

          // Prepare gallery elements when content is set.
          //
          // This:
          //
          //   <div class="cms-gallery">{html}</div>
          //
          // Will become this:
          //
          //   <div class="cms-gallery" contenteditable="false">{html}</div>
          //
          editor.on('BeforeSetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-gallery');
            for (let i = 0; i < matches.length; i++) {
              matches[i].setAttribute('contenteditable', false);
            }
            event.content = doc.body.innerHTML;
          });

          // Restore gallery elements when content is fetched.
          //
          // This:
          //
          //   <div class="cms-gallery" contenteditable="false">{html}</div>
          //
          // Will go back to this:
          //
          //   <div class="cms-gallery">{html}</div>
          //
          editor.on('GetContent', event => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.content, 'text/html');
            const matches = doc.body.querySelectorAll('.cms-gallery');
            for (let i = 0; i < matches.length; i++) {
              matches[i].removeAttribute('contenteditable');
            }
            event.content = doc.body.innerHTML;
          });
        }
      };

      // Adjust settings for plain text editors
      if (this.options.plainText) {
        settings.valid_elements = 'br'; // can't be blank

        // Unset formatters
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'pre',
          'div',
          'p',
          'blockquote',
          'bold',
          'italic',
          'underline',
          'code',
          'highlight',
          'insert',
          'small',
          'strikethrough',
          'subscript',
          'superscript',
          'alignleft',
          'alignright',
          'aligncenter',
          'alignjustify'
        ].map(format => {
          settings.formats[format] = [
            {
              selector: '*',
              styles: {
                /* empty */
              }
            }
          ];
        });
      }

      // Initialize TinyMCE
      this.tinymce.init(settings).then(result => {
        const editor = result[0];

        this.editor = editor;
        this.readOnly(this.options.readOnly); // initial read-only state

        // Emit the ready event on the root element
        bean.fire(this.getRootElement(), 'ready');

        resolve();
      });
    });
  }

  //
  // Destroys the editor instance
  //
  // Returns a promise that resolves when the editor has been destroyed.
  //
  destroy() {
    return new Promise(resolve => {
      if (this.editor) {
        this.editor.destroy();
      }

      resolve();
    });
  }

  //
  // Attaches a listener to the editor object.
  //
  //  eventType (string) - The type of event to listen for.
  //  handler (function) - The function to call when the event is fired.
  //
  // Returns an Editor instance.
  //
  on(eventType, handler) {
    bean.on(this, eventType, handler);
    return this;
  }

  //
  // Attaches a one-time listener to the editor object.
  //
  //  eventType (string) - The type of event to listen for.
  //  handler (function) - The function to call when the event is fired.
  //
  // Returns an Editor instance.
  //
  one(eventType, handler) {
    bean.one(this, eventType, handler);
    return this;
  }

  //
  // Removes a listener from the editor object.
  //
  //  eventType (string) - The type of event to remove.
  //  handler (function) - Optional callback function to remove.
  //
  // Returns an Editor instance.
  //
  off(eventType, handler) {
    bean.off(this, eventType, handler);
    return this;
  }

  //
  // Fires an editor event.
  //
  //  eventType (string) - The type of event to fire.
  //  args (object) - Optional data to pass to the handler.
  //
  // Returns an Editor instance.
  //
  fire(eventType, args) {
    bean.fire(this, eventType, args);
    return this;
  }

  //
  // Adds an undo state if the content of the editor is dirty.
  //
  // Returns an Editor instance.
  //
  addUndo() {
    this.editor.undoManager.add();
    return this;
  }

  //
  // Applies a format to the current selection.
  //
  //  name* (string) - The name of the format to apply (e.g. bold, italic, code, h1, h2, h3, etc.)
  //
  // Returns an Editor instance.
  //
  applyFormat(name) {
    this.editor.formatter.apply(name);
    this.editor.undoManager.add();
    this.editor.nodeChanged();
    return this;
  }

  //
  // Removes focus from the editor.
  //
  // Returns an Editor instance.
  //
  blur() {
    this.editor.getElement().blur();
    return this;
  }

  //
  // Removes data-mce-* attributes from all elements in an HTML string.
  //
  //  html* (string) - The HTML to parse.
  //
  // Returns a string.
  //
  cleanAttributes(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const matches = doc.body.querySelectorAll('*');
    let attribs;
    let i;
    let j;

    // Loop through each element
    for (i = 0; i < matches.length; i++) {
      // Get a list of attributes and remove ones that start with data-mce-
      attribs = matches[i].attributes;
      for (j = 0; j < attribs.length; j++) {
        if (attribs[j].name.match(/^data-mce-/)) {
          matches[i].removeAttribute(attribs[j].name);
        }
      }
    }

    return doc.body.innerHTML;
  }

  //
  // Collapses the selection to the start or end of the current range.
  //
  //  position (string) - Set to 'start' or 'end', default 'start'.
  //
  // Returns an Editor instance.
  //
  collapseSelection(position) {
    this.editor.selection.collapse(position !== 'start');
    return this;
  }

  //
  // Deletes the selected repeatable.
  //
  // Returns an Editor instance.
  //
  deleteRepeatable() {
    this.editor.execCommand('deleteRepeatable');
    return this;
  }

  //
  // Duplicates the selected repeatable.
  //
  // Returns an Editor instance.
  //
  duplicateRepeatable() {
    this.editor.execCommand('duplicateRepeatable');
    return this;
  }

  //
  // Sets focus on the editor.
  //
  // Returns an Editor instance.
  //
  focus() {
    this.editor.focus();
    return this;
  }

  //
  // Gets an element's attribute. Always use the getAttribute and setAttribute methods to ensure
  // TinyMCE serializes and parses the appropriate values (e.g. data-mce-href).
  //
  //  el* (element) - The target element.
  //  attribute* (string) - The attribute name.
  //
  // Returns a string.
  //
  getAttribute(el, attribute) {
    return this.editor.dom.getAttrib(el, attribute);
  }

  //
  // Gets an object containing the current selection. Use with restoreBookmark to restore the
  // selection after content has changed.
  //
  // Returns a TinyMCE bookmark object.
  //
  getBookmark() {
    return this.editor.selection.getBookmark(2);
  }

  //
  // Gets the content of the editor.
  //
  // Returns a string.
  //
  getContent() {
    if (this.editor) {
      if (this.options.plainText) {
        // Plain text regions allow <br> tags, so we need to preserve them with a very unique
        // placeholder and restore them after getting the text content.
        const placeholder = `__${uuid().slice(-12)}__`;
        const replaceRegex = new RegExp(placeholder, 'g');
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.editor.getContent(), 'text/html');
        [...doc.body.querySelectorAll('br')].map(br => {
          br.replaceWith(doc.createTextNode(placeholder));
        });

        return doc.body.textContent.replace(replaceRegex, '<br>');
      } else {
        return this.editor.getContent();
      }
    } else {
      return '';
    }
  }

  //
  // Gets an elements coordinates.
  //
  //  el (element) - The target element. If unset, the editor's container will be assumed.
  //
  // Returns an object { x, y, top, right, bottom, left, height, width }.
  //
  getCoordinates(el) {
    if (this.editor) {
      el = el || this.editor.getElement();
      return el.getBoundingClientRect();
    } else {
      return {};
    }
  }

  //
  // Determines the type of region the editor has been initialized on.
  //
  // Returns a string.
  //
  getRegionType() {
    const root = this.getRootElement();
    return getType(root);
  }

  //
  // Gets the editor's root element.
  //
  // Returns an HTML element, or null if the editor isn't initialized.
  //
  getRootElement() {
    if (this.editor) {
      return this.editor.getElement();
    } else {
      return null;
    }
  }

  //
  // Gets the selected content as an HTML string.
  //
  // Returns a string.
  //
  getSelectedContent() {
    return this.editor.selection.getContent();
  }

  //
  // Gets the selected element. If the selection spans multiple elements, the parent element of all
  // selected elements will be returned.
  //
  // Returns an element or null if no selection exists.
  //
  getSelectedElement() {
    return this.editor.selection.getNode();
  }

  //
  // Tests the current selection to see if the specified format is applied.
  //
  // Returns a boolean.
  //
  hasFormat(name) {
    return this.editor.formatter.match(name);
  }

  //
  // Detects if the editor has an available undo state.
  //
  // Returns a boolean.
  //
  hasUndo() {
    return this.editor.undoManager.hasUndo();
  }

  //
  // Detects if the editor has an available redo state.
  //
  // Returns a boolean.
  //
  hasRedo() {
    return this.editor.undoManager.hasRedo();
  }

  //
  // Increases the current selection's indentation.
  //
  // Returns an Editor instance.
  //
  indent() {
    this.editor.execCommand('indent');
    return this;
  }

  //
  // Inserts or updates an anchor at the current selection.
  //
  //  id* (string) - The anchors id.
  //
  // Returns an Editor instance.
  //
  insertAnchor(id) {
    const anchor = this.editor.dom.getParent(this.editor.selection.getNode(), 'a[id]');

    this.editor.undoManager.transact(() => {
      if (!anchor) {
        // Insert a new anchor
        if (id) {
          this.editor.selection.collapse(true);
          this.editor.execCommand(
            'mceInsertContent',
            false,
            this.editor.dom.createHTML('a', {
              id
            })
          );
        }
      } else {
        // Update an existing anchor
        if (id) {
          anchor.setAttribute('id', id);
          anchor.removeAttribute('name');
        } else {
          this.removeElement(anchor);
        }
      }
    });

    return this;
  }

  //
  // Inserts or updates a code block at the current selection.
  //
  //  source* (string) - The code block's source.
  //  options.language (string) - The code block's language.
  //
  // Returns an Editor instance.
  //
  insertCodeBlock(source, options) {
    options = Object.assign(
      {
        language: ''
      },
      options
    );

    const codeBlock = this.editor.dom.getParent(this.editor.selection.getNode(), '.cms-code');
    const language = options.language ? options.language.toLowerCase() : 'none';
    const isNew = !codeBlock;

    this.editor.undoManager.transact(() => {
      const pre = isNew ? document.createElement('pre') : codeBlock;
      const code = document.createElement('code');
      code.textContent = source; // innerText produces <br>
      pre.setAttribute('data-language', language);
      pre.setAttribute('data-source', source);
      pre.setAttribute('class', 'cms-code');
      code.setAttribute('class', `language-${language}`);
      pre.innerHTML = code.outerHTML;

      if (isNew) {
        // Insert a new code block
        this.insertElement(pre);
      } else {
        // Update an existing code block
        pre.innerHTML = code.outerHTML;
        bean.fire(pre, 'render');
      }
    });

    return this;
  }

  //
  // Inserts content at the last known caret position.
  //
  //  content* (string) - The content to insert.
  //
  // Returns an Editor instance.
  //
  insertContent(content) {
    this.editor.execCommand('mceInsertContent', false, content);
    return this;
  }

  //
  // Inserts an HTML element at the last known caret position.
  //
  //  element* (element) - An HTML element.
  //
  // Returns the inserted element.
  //
  insertElement(element) {
    this.editor.dom.setAttrib(element, 'data-mce-id', '__mcenew');
    this.editor.focus();
    this.editor.selection.setContent(element.outerHTML);

    const insertedElement = this.editor.dom.select('*[data-mce-id="__mcenew"]')[0];
    this.editor.dom.setAttrib(insertedElement, 'data-mce-id', null);

    return insertedElement;
  }

  //
  // Inserts an embeddable object at the current selection.
  //
  //  source* (string) - The HTML source of the embed.
  //
  // Returns an Editor instance.
  //
  insertEmbed(source) {
    const embed = this.editor.dom.getParent(this.editor.selection.getNode(), '.cms-embed');

    this.editor.undoManager.transact(() => {
      if (!embed) {
        // Insert a new embed
        const div = document.createElement('div');
        div.setAttribute('class', 'cms-embed');
        div.setAttribute('data-source', source);
        div.setAttribute('contenteditable', false);
        div.innerHTML = source;
        this.editor.insertContent(div.outerHTML);
      } else {
        // Update an existing embed
        embed.setAttribute('data-source', source);
        embed.setAttribute('contenteditable', false);
        embed.innerHTML = source;
      }
    });

    return this;
  }

  //
  // Inserts an image.
  //
  //  src* (string) - The images's src attribute.
  //  options.alt (string) - The image's alt attribute.
  //  options.title (string) - A title for the image.
  //  options.align (string) - The image's alignment, either 'left', 'right', or 'center'.
  //  options.caption (string|boolean) - The caption's innerHTML or false to disable.
  //
  // Returns an Editor instance.
  //
  insertImage(src, options) {
    const node = this.editor.selection.getNode();
    const figure = this.editor.dom.getParent(node, 'figure.image');
    const figcaption = figure ? figure.querySelector('figcaption') : null;
    const image = figure ? figure.querySelector('img') : this.editor.dom.getParent(node, 'img');
    options = Object.assign(
      {
        src: '',
        alt: '',
        title: '',
        align: null,
        caption: null
      },
      options
    );

    // Wraps an image in a figure/figcaption
    const addCaption = (image, html) => {
      const figure = this.editor.dom.create('figure', { class: 'image', contentEditable: false });
      const figcaption = this.editor.dom.create('figcaption', { contentEditable: true }, html);
      this.editor.dom.insertAfter(figure, image);
      figure.appendChild(image);
      figure.appendChild(figcaption);
      return figure;
    };

    // Pops an image out of a figure/figcaption
    const removeCaption = image => {
      const figure = image.closest('figure');
      if (figure) {
        this.editor.dom.insertAfter(image, figure);
        this.editor.dom.remove(figure);
      }
      return image;
    };

    // Triggers a node change after the image loads, causing resize handle positions to update
    const waitForImage = image => {
      image.onload = () => {
        image.onload = null;
        this.editor.nodeChanged();
      };
    };

    this.editor.undoManager.transact(() => {
      if (!image) {
        // Create a new image
        const image = this.insertElement(
          this.editor.dom.create('img', {
            src,
            alt: options.alt,
            title: options.title
          })
        );

        // Add the caption
        if (typeof options.caption === 'string') {
          this.setSelectedElement(addCaption(image, options.caption));
        } else {
          this.setSelectedElement(image);
        }

        // Set alignment
        if (typeof options.align === 'string') {
          this.setAlignment(options.align);
        }

        waitForImage(image);
      } else {
        // Update an existing image
        this.editor.dom.setAttribs(image, {
          src,
          alt: options.alt,
          title: options.title
        });

        // Reset height
        this.editor.dom.setStyles(image, { height: null });

        // Update caption
        if (!figure && typeof options.caption === 'string') {
          // Create the caption
          this.removeAlignment();
          this.setSelectedElement(addCaption(image, options.caption));
        } else if (figure && figcaption && typeof options.caption === 'string') {
          // Update the caption
          figcaption.innerHTML = options.caption;
        } else if (figure && figcaption && options.caption === false) {
          // Remove the caption
          this.setSelectedElement(removeCaption(image));
        }

        // Set alignment
        if (typeof options.align === 'string') {
          this.setAlignment(options.align);
        }

        waitForImage(image);
      }
    });
  }

  //
  // Applies a link to the current selection.
  //
  //  href* (string) - The link's href attribute.
  //  options.target (string) - The link's target attribute.
  //  options.title (string) - The link's title attribute.
  //
  // Returns an Editor instance.
  //
  insertLink(href, options) {
    options = Object.assign(
      {
        target: '',
        title: ''
      },
      options
    );

    this.editor.execCommand('mceInsertLink', false, {
      href: href || '',
      target: options.target || '',
      title: options.title || '',
      rel: options.target ? 'noopener' : ''
    });

    return this;
  }

  //
  // Inserts a table at the current position.
  //
  //  rows (number) - The number of rows (default 2).
  //  cols (number) - The number of columns (default 3).
  //
  // Returns an Editor instance.
  //
  insertTable(rows, cols) {
    // width: 100% ensures percentage units when resizing. See https://github.com/tinymce/tinymce/issues/4935
    let table = '<table style="width: 100%;"><tbody>';
    for (let r = 0; r < rows; r++) {
      table += '<tr>';
      for (let c = 0; c < cols; c++) {
        table += '<td></td>';
      }
      table += '</tr>';
    }
    table += '<tbody></table>';
    this.editor.insertContent(table);

    return this;
  }

  //
  // Inserts a table columnn.
  //
  //  position (string) - Either 'before' or 'after'.
  //
  // Returns an Editor instance.
  //
  insertTableColumn(position) {
    const command = position === 'before' ? 'mceTableInsertColBefore' : 'mceTableInsertColAfter';
    this.editor.execCommand(command);
    return this;
  }

  //
  // Inserts a table row.
  //
  //  position (string) - Either 'before' or 'after'.
  //
  // Returns an Editor instance.
  //
  insertTableRow(position) {
    const command = position === 'before' ? 'mceTableInsertRowBefore' : 'mceTableInsertRowAfter';
    this.editor.execCommand(command);
    return this;
  }

  //
  // Tells if an element is locked by checking it's DOM ancestors.
  //
  //  element* (object) - An HTML element.
  //
  // Returns a boolean.
  //
  isLocked(element) {
    // Grab the closest lock. If we don't find one, it's not locked
    const lock = element.closest('.cms-lock');
    if (!lock) return false;

    // Ok, we're inside a lock. If there's no unlocked children, it's definitely locked
    const unlocks = lock.querySelectorAll('.cms-unlock');
    if (!unlocks) return true;

    // Ok, we have unlocked children. If the target element is inside one of them, it's not locked
    let isLocked = true;
    [...unlocks].map(unlock => {
      if (unlock.contains(element)) {
        isLocked = false;
      }
    });

    return isLocked;
  }

  //
  // Deletes the selected table row.
  //
  // Returns an Editor instance.
  //
  deleteTableColumn() {
    this.editor.execCommand('mceTableDeleteCol');
    return this;
  }

  //
  // Merges the selected table cells.
  //
  // Returns an Editor instance.
  //
  mergeTableCells() {
    this.editor.execCommand('mceTableMergeCells');
    return this;
  }

  //
  // Splits the selected table cells.
  //
  // Returns an Editor instance.
  //
  splitTableCells() {
    this.editor.execCommand('mceTableSplitCells');
    return this;
  }

  //
  // Deletes the selected table row.
  //
  // Returns an Editor instance.
  //
  deleteTableRow() {
    this.editor.execCommand('mceTableDeleteRow');
    return this;
  }

  //
  // Toggles the selected table cells between header and data cells.
  //
  // Returns an Editor instance.
  //
  toggleTableHeadersCells() {
    const node = this.editor.selection.getNode();
    const table = node.tagName.toLowerCase() === 'table' ? node : node.closest('table');
    const cell = node.tagName.match(/^(td|th)$/i) ? node : node.closest('td, th');
    const changeCellType = function (cell, tag) {
      if (tag === 'td') {
        cell.outerHTML = cell.outerHTML.replace(/^<th/i, '<td').replace(/<\/th>$/, '</td>');
      } else {
        cell.outerHTML = cell.outerHTML.replace(/^<td/i, '<th').replace(/<\/td>$/, '</th>');
      }
    };

    if (table && cell) {
      // Get all selected cells
      const selectedCells = [...table.querySelectorAll('td[data-mce-selected], th[data-mce-selected]')];

      // If no cells are selected, change the current cell
      if (!selectedCells.length) {
        selectedCells.push(cell);
      }

      // Toggle the cells
      const type = selectedCells[0].tagName.toLowerCase() === 'th' ? 'td' : 'th';
      const bookmark = this.editor.selection.getBookmark(2);
      selectedCells.map(cell => changeCellType(cell, type));
      this.editor.selection.moveToBookmark(bookmark);
      this.editor.undoManager.add();
    }

    return this;
  }

  //
  // Detects if the current selection is aligned center.
  //
  // Returns a boolean.
  //
  isAlignCenter() {
    return this.editor.formatter.match('aligncenter');
  }

  //
  // Detects if the current selection is aligned center.
  //
  // Returns a boolean.
  //
  isAlignJustify() {
    return this.editor.formatter.match('alignjustify');
  }

  //
  // Detects if the current selection is aligned left.
  //
  // Returns a boolean.
  //
  isAlignLeft() {
    return this.editor.formatter.match('alignleft');
  }

  //
  // Detects if the current selection is aligned right.
  //
  // Returns a boolean.
  //
  isAlignRight() {
    return this.editor.formatter.match('alignright');
  }

  //
  // Detects if the current selection is an anchor.
  //
  // Returns a boolean.
  //
  isAnchor() {
    return this.editor.dom.getParent(this.editor.selection.getNode(), 'a[id]');
  }

  //
  // Detects if the current selection is a code block.
  //
  // Returns a boolean.
  //
  isCodeBlock() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), '.cms-code');
  }

  //
  // Detects if the editor has unsaved changes.
  //
  // Returns a boolean.
  //
  isDirty() {
    return this.editor.isDirty();
  }

  //
  // Detects if the current selection is an embed.
  //
  // Returns a boolean.
  //
  isEmbed() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), '.cms-embed');
  }

  //
  // Detects if the current selection is a gallery.
  //
  // Returns a boolean.
  //
  isGallery() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), '.cms-gallery');
  }

  //
  // Detects if the current selection is an image.
  //
  // Returns a boolean.
  //
  isImage() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), 'img, figure.image');
  }

  //
  // Detects if the current selection is a link.
  //
  // Returns a boolean.
  //
  isLink() {
    return (
      !!this.editor.dom.getParent(this.editor.selection.getNode(), 'a') &&
      !this.editor.dom.getParent(this.editor.selection.getNode(), 'a[id]')
    );
  }

  //
  // Detects if the current selection is an ordered list.
  //
  // Returns a boolean.
  //
  isOrderedList() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), 'ol');
  }

  //
  // Tells if the current selection is collapsed.
  //
  // Returns a boolean.
  //
  isSelectionCollapsed() {
    return this.editor.selection.isCollapsed();
  }

  //
  // Detects if the current selection is a table.
  //
  // Returns a boolean.
  //
  isTable() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), 'table');
  }

  //
  // Detects if the current selection is an unordered list.
  //
  // Returns a boolean.
  //
  isUnorderedList() {
    return !!this.editor.dom.getParent(this.editor.selection.getNode(), 'ul');
  }

  //
  // Resets the editor's dirty state.
  //
  // Returns an Editor instance.
  //
  makeClean() {
    this.editor.setDirty(false);
    return this;
  }

  //
  // Moves the selected repeatable up.
  //
  // Returns an Editor instance.
  //
  moveRepeatableUp() {
    this.editor.execCommand('moveRepeatableUp');
    return this;
  }

  //
  // Moves the selected repeatable down.
  //
  // Returns an Editor instance.
  //
  moveRepeatableDown() {
    this.editor.execCommand('moveRepeatableDown');
    return this;
  }

  //
  // Decreases the current selection's indentation.
  //
  // Returns an Editor instance.
  //
  outdent() {
    this.editor.execCommand('outdent');
    return this;
  }

  //
  // Toggles the editor's read-only state.
  //
  //  readOnly* (boolean) - The desired read-only state.
  //
  // Returns an Editor instance.
  //
  readOnly(readOnly) {
    this.editor.setMode(readOnly === true ? 'readonly' : 'design');
    return this;
  }

  //
  // Reverts content to the next undo state.
  //
  // Returns an Editor instance.
  //
  redo() {
    this.editor.execCommand('Redo');
    return this;
  }

  //
  // Removes the current selection's alignment.
  //
  // Returns an Editor instance.
  //
  removeAlignment() {
    this.editor.undoManager.transact(() => {
      this.editor.formatter.remove('alignleft');
      this.editor.formatter.remove('aligncenter');
      this.editor.formatter.remove('alignright');
      this.editor.formatter.remove('alignjustify');
    });
    return this;
  }

  //
  // Removes an element element.
  //
  //  element* (element) - The element to remove.
  //
  // Returns an Editor instance.
  //
  removeElement(element) {
    this.editor.dom.remove(element);
    this.editor.undoManager.add();
    return this;
  }

  //
  // Removes a format from the current selection.
  //
  //  name (string) - The name of the format to remove. If empty, all formats will be removed.
  //
  // Returns an Editor instance.
  //
  removeFormat(name) {
    if (typeof name === 'string') {
      this.editor.formatter.remove(name);
      this.editor.undoManager.add();
      this.editor.nodeChanged();
    } else {
      this.editor.execCommand('RemoveFormat');
    }
    return this;
  }

  //
  // Removes a link from the current selection.
  //
  // Returns an Editor instance.
  //
  removeLink() {
    this.editor.execCommand('unlink');
    return this;
  }

  //
  // Resets the editor's undo history.
  //
  // Returns an Editor instance.
  //
  resetUndo() {
    this.editor.undoManager.clear();
    return this;
  }

  //
  // Moves the selection to a previously saved bookmark.
  //
  //  target* (bookmark) - A DOM element or a TinyMCE bookmark object as returned from getBookmark.
  //
  // Returns an Editor instance.
  //
  restoreBookmark(bookmark) {
    this.editor.selection.moveToBookmark(bookmark);
  }

  //
  // Selects the contents of the editor.
  //
  // Returns an Editor instance.
  //
  selectAll() {
    this.editor.selection.select(this.editor.getBody(), true);
    return this;
  }

  //
  // Sets the current selection's alignment.
  //
  //  align* (string) - Can be 'left', 'center', 'right', or 'full'.
  //
  // Returns an Editor instance.
  //
  setAlignment(align) {
    this.editor.undoManager.transact(() => {
      this.editor.formatter.remove('alignleft');
      this.editor.formatter.remove('aligncenter');
      this.editor.formatter.remove('alignright');
      this.editor.formatter.remove('alignjustify');
      if (align === 'left') this.editor.formatter.apply('alignleft');
      if (align === 'center') this.editor.formatter.apply('aligncenter');
      if (align === 'right') this.editor.formatter.apply('alignright');
      if (align === 'full') this.editor.formatter.apply('alignjustify');
    });
    return this;
  }

  //
  // Sets an element's attribute. Always use the getAttribute and setAttribute methods to ensure
  // TinyMCE serializes and parses the appropriate values (e.g. data-mce-href).
  //
  //  el* (element) - The target element.
  //  attribute* (string) - The attribute name.
  //  value* (string|null) - The value of the attribute. If null, the attribute will be removed.
  //
  // Returns a string.
  //
  setAttribute(el, attribute, value) {
    this.editor.dom.setAttrib(el, attribute, value);
    return this;
  }

  //
  // Sets the editor's content.
  //
  //  content* (string) - The content to set.
  //
  // Returns an Editor instance.
  //
  setContent(content) {
    this.editor.setContent(content);
    return this;
  }

  //
  // Sets the selection to the specified element.
  //
  // Returns an Editor instance.
  //
  setSelectedElement(element) {
    this.editor.selection.select(element);
    return this;
  }

  //
  // Toggles the current selection's alignment.
  //
  //  align* (string) - One of left, center, right, or full.
  //
  // Returns an Editor instance.
  //
  toggleAlignment(align) {
    switch (align) {
      case 'left':
        this.editor.formatter.toggle('alignleft');
        break;
      case 'center':
        this.editor.formatter.toggle('aligncenter');
        break;
      case 'right':
        this.editor.formatter.toggle('alignright');
        break;
      case 'full':
        this.editor.formatter.toggle('alignjustify');
        break;
    }
    return this;
  }

  //
  // Toggles a format on/off of the current selection.
  //
  //  name* (string) - The name of the format to toggle.
  //
  // Returns an Editor instance.
  //
  toggleFormat(name) {
    this.editor.formatter.toggle(name);
    this.editor.undoManager.add();
    this.editor.nodeChanged();
    return this;
  }

  //
  // Toggles an ordered list for the current selection.
  //
  // Returns an Editor instance.
  //
  toggleOrderedList() {
    this.editor.execCommand('InsertOrderedList');
    return this;
  }

  //
  // Toggles an unordered list for the current selection.
  //
  // Returns an Editor instance.
  //
  toggleUnorderedList() {
    this.editor.execCommand('InsertUnorderedList');
    return this;
  }

  //
  // Reverts content to the previous undo state.
  //
  // Returns an Editor instance.
  //
  undo() {
    this.editor.execCommand('Undo');
    return this;
  }
}
