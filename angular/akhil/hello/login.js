angular.module('LoginApp', [])
    .controller('MainCtrl', [function() {
      var self = this;
      self.change = function() {
        self.username = 'Tom';
        self.password = 'Jerry';
        console.log('User clicked "Reset Values" with ',
            self.username, self.password);
      };

      self.submit = function() {
        console.log('User clicked submit with ',
            self.username, self.password);
      };

    }]);//controller