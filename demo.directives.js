(function(window, angular, undefined){

    var directives = angular.module('simpleApp.directives', ['simpleApp.services']);

    directives.directive('localStorage', ['$templateCache', '$http', 'simpleStorage', function($templateCache, $http, simpleStorage)
    {
        return {
            restrict: 'A',
            require: 'ngInclude',
            priority: 405,
            scope:{
                localStorage:'='
            },
            link: function(scope, element, attr, ctrl)
            {
                var src         = scope.$eval(attr.ngInclude || attr.src),
                    local       = simpleStorage.get(src);

                scope.$watch('localStorage', function(expire)
                {
                    switch(expire)
                    {
                        case 'expire':
                        case 'clear':
                            simpleStorage.clear(src);
                            break;
                        case 'reload':
                            simpleStorage.clear(src);
                            $http
                                .get(src, {cache: false})
                                .success(function(data)
                                {
                                    simpleStorage.set(src, data);
                                });
                            break;
                    }
                });

                if( 'data' in local )
                {
                    $templateCache.put(src, local.data);
                }
                else
                {
                    $http
                        .get(src, {cache: $templateCache})
                        .success(function(data)
                        {
                            simpleStorage.set(src, data);
                        });
                }
            }

        };
    }]);

})(this, angular);