(function(window, angular, undefined){
    
    var app = angular.module('simpleApp', ['simpleApp.directives']);

    app.controller('mainCtrl', ['$scope', function($scope)
    {
        $scope.questions =
        {
            expire: '',
            result: ''
        };


        $scope.$watch('questions.expire', function(value)
        {
            var displayValue = 'If data exists in localStorage use that.';

            switch(value)
            {
                case 'reload':
                    displayValue = 'Include data reloaded and placed in localStorage.';
                    break;
                case 'expire':
                case 'clear':
                    displayValue = 'Include data cleared. On browser refresh a new request will be issued.'
                    break;
            }

            console.log({simpleApp:localStorage['demo.include.html']});

            $scope.questions.result = displayValue;
        });


        $scope.includeLoaded = function()
        {
            console.log('ng-include loaded');
        };

    }]);

})(this, angular);