 class Editor {
  // Creates a new Editor.
  constructor(element, options, tinymce) {
    this.editor = null;
    this.element = element;
    this.options = Object.assign(
      {
        allowDrop: false,
        allowNewlines: true,
        baseUrl: '/tinymce',
        suffix: '.min',
        plainText: false,
        readOnly: false
      },
      options
    );
    this.tinymce = tinymce || window.tinymce;

    if (!this.tinymce) {
      console.error('TinyMCE has not been loaded on the target window.');
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
}

exports.default = Editor;
