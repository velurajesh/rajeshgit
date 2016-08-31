var mymodule = angular.module('repeatApp', []);
mymodule.controller('MainCtrl', [function() {
      var self = this;
      self.friends = [
        {name:'Amit', city:'Bangalore'}, 
		{name:'Gyan', city:'Delhi'}, 
		{name:'Vijay', city:'Mumbai'}, 
		{name:'Anup', city:'Delhi'}, 
		{name:'Praveen', city:'Mumbai'}
      ];
}]);