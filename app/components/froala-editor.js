import FroalaEditorComponent from 'ember-froala-editor/components/froala-editor';

export default class FroalaEditor extends FroalaEditorComponent {
  options = {
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
        heightMin: 300
  };
}