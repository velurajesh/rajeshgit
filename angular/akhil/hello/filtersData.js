angular.module('filtersApp', [])
    .controller('filterCotroller', [function() {
      this.amount = 1024;
      this.totalCost = 4906;
      this.name = 'ABCDEF GHIJK';
      this.startTime = new Date().getTime();
    }]);