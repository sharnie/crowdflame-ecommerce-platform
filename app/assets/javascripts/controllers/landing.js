(function() {

    'use strict';

    var Landing = {
        registration: function( email, callback ) {
            $.post('https://vacationegg.com/campaigns/2/subscribers.json', { email: email })
             .success(function( response ) { if ( typeof callback === 'function' ) callback( response ) })
             .fail(function( response ) { if ( typeof callback === 'function' ) callback( response ) });
        },

        forms: function() {
            $( '.registration-form' ).on('submit', function( e ) {
                e.preventDefault();
                Landing.registration($('#email').val(), function( response ) {
                    if ( response.status === 400 ) {
                        alert( response.responseJSON.error );
                    } else {
                        alert( 'We\'ve received your request! Check your email for the next step.' );
                        $( '#modal_registration' ).modal( 'hide' );
                        $('#email').val( '' );
                    }
                });
            });
        },

        init: function( window ) {
            window.app = window.app || {};
            window.app.landing = this;
            Landing.forms();
        }
    };

    return {
        init: Landing.init
    };

})().init( window );