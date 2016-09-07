"use strict";
define(function() {
    return {
        login: Backbone.View.extend({
            events: {
                'submit .login-form': 'submit',
                'click .btn-google': 'loginGoogle',
                'click .btn-linkedin': 'loginLinkedin',
                'click .btn-facebook': 'loginFacebook'
            },

            initialize: function(options) {
                this.login_fields = options.login_fields;
                this.hello = require('hellojs');
                this.socialAuth = require('js/views/social-auth.js');
            },

            render: function() {
                this.model.urlRoot = serverUrl + Urls['rest_login']();
                let template = require('templates/userLogin.pug');
                this.$el.html(
                    template({
                        login_fields: this.login_fields,
                    })
                );
                return this;
            },

            _success: function(data) {
                if(data.hasOwnProperty('key')) {
                    localStorage.setItem('token', data.key);
                    setTimeout(function() {
                        window.location = '/' //data.next ? data.next : '/account/profile'
                    }, 200);
                } else {
                    Backbone.Validation.callbacks.invalid(                                 
                      form, '', 'Server return no authentication data'
                    );
                }
            },

            submit: app.defaultSaveActions.submit,
            loginGoogle: function() {

                var self = this;

                self.hello('google').login({
                    scope: 'profile,email'}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('google', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {

                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {
                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });
            },
            loginFacebook: function() {

                var self = this;

                self.hello('facebook').login({
                    scope: 'public_profile,email'}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('facebook', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {
                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {

                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });

            },
            loginLinkedin: function() {

                var self = this;

                self.hello('linkedin').login({
                    scope: 'r_basicprofile,r_emailaddress',}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('linkedin', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {
                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {

                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });

            }

        }),

        signup: Backbone.View.extend({
            events: {
                'submit .signup-form': 'submit',
                'click .btn-google': 'loginGoogle',
                'click .btn-linkedin': 'loginLinkedin',
                'click .btn-facebook': 'loginFacebook'
            },

            initialize: function(options) {
                this.register_fields = options.register_fields;
                this.hello = require('hellojs');
                this.socialAuth = require('js/views/social-auth.js');
            },

            render: function() {
                this.model.urlRoot = serverUrl + Urls['rest_register']();
                let template = require('templates/userSignup.pug');
                this.$el.html(
                    template({
                        register_fields: this.register_fields,
                    })
                );
                return this;
            },

            _success: function(data) {
                if(data.hasOwnProperty('key')) {
                    localStorage.setItem('token', data.key);

                    delete this.model.attributes['password1'];
                    delete this.model.attributes['password2'];
                    delete this.model.attributes['key'];

                    this.model.set('token', data.key);
                    localStorage.removeItem('user');
                    window.location = '/' //data.next ? data.next : '/account/profile'
                } else {
                    Backbone.Validation.callbacks.invalid(                                 
                      this, '', 'Server return no authentication data'
                    );
                }
            },

            submit: app.defaultSaveActions.submit,
            loginGoogle: function() {

                var self = this;

                self.hello('google').login({
                    scope: 'profile,email'}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('google', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {

                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {
                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });
            },
            loginFacebook: function() {

                var self = this;

                self.hello('facebook').login({
                    scope: 'public_profile,email'}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('facebook', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {
                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {

                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });

            },
            loginLinkedin: function() {

                var self = this;

                self.hello('linkedin').login({
                    scope: 'r_basicprofile,r_emailaddress',}).then(
                    function (e) {
                        var sendToken = self.socialAuth.sendToken('linkedin', e.authResponse.access_token);

                        $.when(sendToken).done(function (data) {
                            localStorage.setItem('token', data.key);
                            window.location = '/account/profile';
                        }).fail(function (data) {
                            app.defaultSaveActions.error(self, data);
                        });
                    },
                    function (e) {

                        // TODO: notificate user about reason of error;
                        app.routers.navigate(
                            '/account/login',
                            {trigger: true, replace: true}
                        );
                    });

            }
        }),

        profile: Backbone.View.extend({
            initialize: function(options) {
                this.fields = options.fields;

                // define ui elements
                this.cityStateArea = null;
                this.cityField = null;
                this.stateField = null;
                this.zipCodeField = null;

                // define timeout for zip code keyup event
                this.zipCodeTimeOut = null;

                // define flag for the geocode function respond
                this.geocodeIsNotInProgress = true;
            },

            events: {
                'submit form': 'update',
                'focus #ssn' : 'showSSNPopover',
                'focuseout #ssn' : 'hideSSNPopover',
                'keyup #zip_code': 'changeZipCode',
                'change .js-city': 'changeAddressManually',
                'change .js-state': 'changeAddressManually'
            },

            render: function() {
                this.getCityStateByZipCode = require("../helpers/getSityStateByZipCode");
                this.usaStates = require("../helpers/usa-states");
                let dropzone = require('dropzone');
                let template = require('templates/userProfile.pug');
                this.$el.html(
                    template({
                        serverUrl: serverUrl,
                        user: app.user.toJSON(),
                        fields: this.fields,
                        states: this.usaStates
                    })
                );

                this.cityStateArea = this.$('.js-city-state');
                this.cityField = this.$('.js-city');
                this.stateField = this.$('.js-state');
                this.zipCodeField = this.$('#zip_code');

                /*
                app.createFileDropzone(
                    dropzone,
                    'image', 
                    'avatars', '', 
                    (data) => {
                        this.model.save({
                            image: data.file_id,
                        }, {
                            patch: true
                        }).then((model) => {
                            localStorage.setItem('user', JSON.stringify(this.model.toJSON()));
                        });
                    }
                );
                */
                return this;
            },

            update: function(event) {
                event.preventDefault();
                let data = $(event.target).serializeObject();

                this.model.set(data);
                if(this.model.isValid(true)) {
                    this.model.save(data, {
                        success: (model, response, status) => {
                            defaultSaveActions.success(this, response);
                        },
                        error: (model, response, status) => {
                            defaultSaveActions.error(this, response);
                        }
                    });
                }
            },

            showSSNPopover: function(event){
                $('#ssn').popover({
                    trigger: 'focus',
                    placement: function(context, src) {
                         $(context).addClass('ssn-popover');
                         return 'right';
                    },
                    html: true,
                    content: function(){
                        var content = $('.profile').find('.popover-content-ssn ').html();
                        return content;
                    }
                });
 
                $('#ssn').popover('show');
            },

            hideSSNPopover: function(event){
                $('#ssn').popover('hide');
            },

            changeZipCode(e) {
                if (!this.geocodeIsNotInProgress) return false;

                clearTimeout(this.zipCodeTimeOut);
                this.zipCodeTimeOut = setTimeout(() => {
                    this.geocodeIsNotInProgress = false;
                    this.getCityStateByZipCode(e.target.value, ({ success=false, city="", state="" }) => {
                        this.geocodeIsNotInProgress = true;
                        // clear error
                        this.zipCodeField.closest('div').find('.help-block').remove();
                        if (success) {
                            // if (!this.usaStates.find((el) => el.name == state)) {
                            if (!this.usaStates.find((el) => el.abbreviation == state)) {
                                this.resetAddressValues();
                                return false;
                            }

                            this.cityStateArea.text(`${city}/${state}`);
                            this.cityField.val(city);
                            this.stateField.val(state);
                        } else {
                            this.resetAddressValues();
                        }
                    });
                }, 200);
            },

            resetAddressValues() {
                this.cityStateArea.text('City/State');
                this.cityField.val('');
                this.stateField.val('');
                Backbone.Validation.callbacks.invalid(this, 'zip_code', 'Sorry your zip code is not found');
            },

            changeAddressManually() {
                this.cityStateArea.text(`${this.cityField.val()}/${this.stateField.val()}`);
            }
        }),
        
        reset: Backbone.View.extend({
            initialize: function(options){

            },
            render: function(){
                let template = require('templates/reset.pug');
                this.$el.html(template({}));
                return this;
            }
        }),

        changePassword: Backbone.View.extend({
            initialize: function(options){

            },
            render: function(){
                let template = require('templates/changePassword.pug');
                this.$el.html(template({}));
                return this;
            }
        }),
    
    }
});
