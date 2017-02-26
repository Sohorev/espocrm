Espo.define('skyeng-test:views/dashlets/hello-email', ['views/dashlets/abstract/base'], function (Dep) {

    return Dep.extend({

        scope: 'SkyengTest',
        url: 'SkyengTest/HelloEmail',
        _template: '<div><input type="test" name="email" class="form-control"><input type="button" class="btn btn-primary" value="Send hello email" data-action="actionHelloEmail"></input></div>',
        actionList: [],

        getOption: function (callback) {
            return 'Hello skyeng';
		},

        events: {
            'click input[data-action="actionHelloEmail"]': function (e) {
                this.actionHelloEmail();
            }
        },

        actionHelloEmail: function () {

            var email = this.$el.find('input[name="email"]').val();
            if (!email.length) {
                Espo.Ui.notify(this.translate('Please enter valid email', 'messages'));
                return;
            }
            Espo.Ui.notify(false);

            this.ajaxPostRequest(this.url, {
                email: email
            }).then(function (result) {
                if (result.state == 0) {
                    Espo.Ui.success(this.translate('Email sended', 'messages'));
                } else {
                    Espo.Ui.error(this.translate('Error while send mail', 'messages'));
                }

            }.bind(this));
        }
    });
});
