import axios from 'axios';
import bootstrap from 'bootstrap';
import FroalaEditor from 'froala-editor';
import ghostPaths from 'ghost-admin/utils/ghost-paths';

export function initialize(/* application */){
    // Define popup template.
    FroalaEditor.POPUP_TEMPLATES['customPlugin.popup'] = '[_BUTTONS_][_CUSTOM_LAYER_]';

    // Define popup buttons.
    Object.assign(FroalaEditor.DEFAULTS, {
        popupButtons: ['popupClose', '|', 'callToActionInsert']
    });

    // The custom popup is defined inside a plugin (new or existing).
    FroalaEditor.PLUGINS.customPlugin = function (editor) {
        // Create custom popup.
        function initPopup() {
            // Popup buttons.
            var popUpButtons = '';

            // Create the list of buttons.
            if (editor.opts.popupButtons.length > 1) {
                popUpButtons += '<div class="fr-buttons">';
                popUpButtons += editor.button.buildList(editor.opts.popupButtons);
                popUpButtons += '</div>';
            }

            // Load popup template.
            var template = {
                buttons: popUpButtons,
                custom_layer: '<div class="custom-layer" style="padding:20px; width:300px; height:300px">' +
                                    '<button class="btn btn-primary btn-lg" id="call-to-action">New call-to-action</button><hr>' + 
                                    '<div class="form-group">' +
                                        '<label>Button content</label>' +
                                        '<input type="text" value="New call-to-action" class="form-control" id="call-to-action-btn-content">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label>Enter Url</label>' +
                                        '<input type="text" class="form-control" id="call-to-action-url">' +
                                    '</div>' +
                                    '<div class="form-check">' +
                                        '<input class="form-check-input" type="checkbox" value="1" id="call-to-action-new-window">' +
                                        '<label class="form-check-label">&nbsp;&nbsp;' +
                                            'Open page in new window' +
                                        '</label>' +
                                    '</div>' +
                                '</div>'
            };

            // Create popup.
            var $popup = editor.popups.create('customPlugin.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup() {
            // Get the popup object defined above.
            var $popup = editor.popups.get('customPlugin.popup');

            // If popup doesn't exist then create it.
            // To improve performance it is best to create the popup when it is first needed
            // and not when the editor is initialized.
            if (!$popup){
                $popup = initPopup();
            }

            // Set the editor toolbar as the popup's container.
            editor.popups.setContainer('customPlugin.popup', editor.$tb);

            // This will trigger the refresh event assigned to the popup.
            // editor.popups.refresh('customPlugin.popup');

            // This custom popup is opened by pressing a button from the editor's toolbar.
            // Get the button's object in order to place the popup relative to it.
            var $btn = editor.$tb.find('.fr-command[data-cmd="callToAction"]');

            // Set the popup's position.
            var left = $btn.offset().left + $btn.outerWidth() / 2;
            var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

            // Show the custom popup.
            // The button's outerHeight is required in case the popup needs to be displayed above it.
            editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
        }

        // Hide the custom popup.
        function hidePopup() {
            editor.popups.hide('customPlugin.popup');
        }

        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            hidePopup: hidePopup
        };
    };

    // Define an icon and command for the button that opens the custom popup.
    FroalaEditor.DefineIcon('callToAction', {PATH: 'M24.1,10.1c0-2.3-1.7-4.2-3.9-4.5V2.5c0-1.2-1-2.3-2.2-2.3c-1.2,0-2.2,1-2.2,2.3v0.3L9.4,5.2H6c-2.8,0-5,2.3-5,5	c0,2.6,2,4.8,4.5,5l2.2,7.6c0.1,0.3,0.3,0.5,0.7,0.5h3.4c0.2,0,0.4-0.1,0.5-0.3c0.1-0.2,0.2-0.4,0.1-0.6l-1.8-6.7l5.1,2v0.3	c0,1.2,1,2.3,2.2,2.3c1.2,0,2.2-1,2.2-2.3v-3.5C22.4,14.3,24.1,12.4,24.1,10.1L24.1,10.1z M6.7,6.6h2.1v7.4H6.7V6.6z M2.3,10.3	c0-1.8,1.3-3.4,3.1-3.6v7.3C3.6,13.6,2.3,12.1,2.3,10.3z M8.8,22l-1.9-6.7H9l1.8,6.7H8.8z M10.2,14.2V6.4l5.4-2.1v12.1L10.2,14.2z	 M18.8,18.1c0,0.5-0.4,0.9-0.9,0.9S17,18.5,17,18.1V2.5c0-0.5,0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9V18.1z M20.2,13.2V6.9	c1.5,0.3,2.5,1.6,2.5,3.2S21.6,12.9,20.2,13.2z"/>', template: 'svg'});  
    FroalaEditor.RegisterCommand('callToAction', {
        title: 'Call To Action',
        icon: 'callToAction',
        undo: false,
        focus: false,
        plugin: 'customPlugin',
        callback: function () {
            this.selection.save();
            this.customPlugin.showPopup();
        }
    });

    // Define custom popup close button icon and command.
    FroalaEditor.DefineIcon('popupClose',{NAME: 'times', SVG_KEY: 'back'});
    FroalaEditor.RegisterCommand('popupClose', {
        title: 'Close',
        undo: false,
        focus: false,
        callback: function () {
            this.customPlugin.hidePopup();
        }
    });

    FroalaEditor.DefineIcon('callToActionInsert', {PATH: 'M23.8,4L21,1.2c-0.6-0.6-1.4-0.9-2.2-0.9h-1.8v5.4c0,0.4-0.3,0.8-0.8,0.8H4.1C3.7,6.4,3.3,6,3.3,5.6V0.3H1.8		c-0.8,0-1.5,0.7-1.5,1.5v21.4c0,0.8,0.7,1.5,1.5,1.5h21.4c0.8,0,1.5-0.7,1.5-1.5V6.1C24.7,5.3,24.4,4.5,23.8,4z M21.7,21.7H3.3		v-9.2h18.4V21.7z', template: 'svg'});
    FroalaEditor.RegisterCommand('callToActionInsert', {
        title: 'Save',
        undo: false,
        focus: false,
        callback: function () {   
            var blank = '';
            
            if ($('#call-to-action-new-window').prop('checked')) {
                blank = 'target=_blank';
            }
            var url = $('#call-to-action-url').val();   
            var btn_class = $('#call-to-action').attr('class'); 
            var content = $('#call-to-action').html(); 
            //TODO
            makeRequest(url,content);
            var html = '<a href="' + url + '" class="' + btn_class + '" ' + blank + '>' + content + '</a>';
            this.selection.restore();
            this.html.insert(html);
            this.customPlugin.hidePopup();
        }
    });
}

function makeRequest(url,btnTxt){
    let urlPath = `${ghostPaths().apiRoot}/gTag`;

    axios.post(urlPath,{
        'url': url,
        'btn_txt': btnTxt
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
      });
}

export default {
    initialize
};

$(document).ready(function () {
    $('body').on('keyup', '#call-to-action-btn-content', function (){ 
        $('#call-to-action').html($(this).val());  
    });
});

