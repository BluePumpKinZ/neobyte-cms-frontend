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

  initialize() {
    return new Promise(resolve => {
      // TinyMCE settings
      const settings = {
        mode: 'textareas',
        element_format: 'html',
        entity_encoding: 'raw',
        content_style : '',
        content_css : [],


        force_br_newlines : true,
        force_p_newlines : false,
        // forced_root_block : "",
        forced_root_block : "zebber-mans",
        noneditable_noneditable_class: 'cms-lock',
        selector: '.mce-content-body',
        skin: "oxide-dark",
        menubar: false,
        inline: true,
        plugins: [
          'link',
          'lists',
          'autolink',
          'codesample',
          'link',
          'lists',
          'media',
          'table',
          'image',
          'quickbars',
          'code',
        ],
        toolbar: [
          'undo redo | styles | bold italic underline | fontfamily fontsize',
          'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent'
        ],
        // valid_elements: 'p[style],strong,em,span[style],a[href],ul,ol,li',
        // valid_styles: {
        //   '*': 'font-size,font-family,color,text-decoration,text-align'
        // },
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',
        quickbars_insert_toolbar: 'quicktable image media codesample',
        quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
        contextmenu: 'undo redo | inserttable | cell row column deletetable | quicktable image media codesample',
        style_formats_merge: true,
      }

      // Initialize TinyMCE
      this.tinymce.init(settings).then(result => {
        this.editor = result[0];
        // this.readOnly(this.options.readOnly); // initial read-only state
        resolve();
      });
    });
  }

}

export default Editor;
