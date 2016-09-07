module.exports = {
    createOrUpdate: Backbone.View.extend({
        template: require('templates/companyCreateOrUpdate.pug'),
        events: {
            'submit form': 'submit',
            'keyup #zip_code': 'changeZipCode',
            'click .update-location': 'updateLocation',
        },
        initialize: function(options) {
            this.fields = options.fields;
            this.campaign = options.campaign;
        },

        updateLocation(e) {
            this.$('.js-city-state').text(this.$('.js-city').val() + ', ' + this.$('.js-state').val());
        },

        changeZipCode(e) {
            // if not 5 digit, return
            if (e.target.value.length < 5) return;
            if (!e.target.value.match(/\d{5}/)) return;
            this.getCityStateByZipCode(e.target.value, ({ success=false, city="", state=""}) => {
                // this.zipCodeField.closest('div').find('.help-block').remove();
                if (success) {
                    this.$('.js-city-state').text(`${city}, ${state}`);
                    // this.$('#city').val(city);
                    this.$('.js-city').val(city);
                    // this.$('#state').val(city);
                    this.$('.js-state').val(state);

                } else {
                    console.log("error");
                }
            });
        },

        render: function() {
            console.log('asdf', this, this.campaign);
            this.getCityStateByZipCode = require("helpers/getSityStateByZipCode");
            this.usaStates = require("helpers/usa-states");
            this.$el.html(
                this.template({
                    serverUrl: serverUrl,
                    Urls: Urls,
                    fields: this.fields,
                    values: this.model.toJSON(),
                    user: app.user.toJSON(),
                    campaign: this.campaign,
                    states: this.usaStates,
                })
            );
            return this;
        },

        getSuccessUrl: function(data) {
            return '/campaign/general_information/?company_id=' + data.id;
        },

        submit: app.defaultSaveActions.submit,

    }),
};