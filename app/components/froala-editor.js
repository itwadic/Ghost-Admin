import FroalaEditorComponent from 'ember-froala-editor/components/froala-editor';

export default class FroalaEditor extends FroalaEditorComponent {
  options = {
        key: 'xGE6oE3A3B3A10A5C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5G5B1C3F3A1B8B6==',
        toolbarInline: true,
        pastePlain: true,
        toolbarButtons:  {
            // Key represents the more button from the toolbar.
            moreText: {
              // List of buttons used in the  group.
              buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],

              // Alignment of the group in the toolbar.
              align: 'left'
            },

            moreParagraph: {
              buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
              align: 'left'
            },

            moreRich: {
              buttons: ['insertLink', 'insertImage', 'callToAction', 'insertFiles', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
              align: 'left'
            },

            moreMisc: {
              buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
              align: 'right',
              // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
              buttonsVisible: 2
            }
        },
        events: {
            'paste.afterCleanup': function (clipboard_html) {
                if (clipboard_html) {
                    clipboard_html =  clipboard_html.replace(/<\s*(\w+).*?>/gi, '<$1>')
                }
                return clipboard_html;
            },
            'image.removed': function ($img) {
                $.ajax({
                    method: 'POST',
                    url: '/ghost/api/v3/admin/delete_image',
                    data: {
                        image: $img.attr('src')
                    }
                })
                .done (function (data) {
                    console.log('Image was deleted');
                })
                .fail (function (err) {
                    console.log('Image delete problem: ' + JSON.stringify(err));
                })
            }
        },
        imageUpload: true,
        imageUploadURL: '/ghost/api/v3/admin/upload_image',
        imageUploadParam: 'image',
        imageUploadRemoteUrls: false,
        // iframeStyleFiles: ['/ghost/assets/krabi/style-min.css'],
        requestWithCORS: false,
        iframeStyle: '.fr-view { margin: 0; padding: 0; }',
        heightMin: 300,
        iframe: true
  };
}
