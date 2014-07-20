(function(window, angular, undefined){

    var directives = angular.module('simpleApp.directives', ['simpleApp.services']);

    directives.directive('localStorage', ['$templateCache', '$http', 'simpleStorage', function($templateCache, $http, simpleStorage)
    {
        return {
            restrict: 'A',
            require: 'ngInclude',
            priority: 405,
            scope:{
                ngInclude:'=',
                src:'=',
                localStorage:'='
            },
            link: function(scope, element, attr, ctrl)
            {
                var src = (scope.ngInclude)? 'ngInclude' : 'src';

                scope.$watch(src, SrcWatch);
                scope.$watch('localStorage', ExpireWatch);

                function SrcWatch(src)
                {
                    ExpireWatch();
                }

                function ExpireWatch(value)
                {
                    var localSrc = scope[src],
                        localStore;

                    if(!localSrc)
                    {
                        return;
                    }

                    switch(value)
                    {
                        case 'expire':
                        case 'clear':
                            simpleStorage.clear(localSrc);
                            break;

                        case 'reload':
                            simpleStorage.clear(localSrc);
                            GetInclude(localSrc, false);
                            break;

                        case 'cache':
                        default:
                            console.log();

                            localStore = simpleStorage.get(localSrc);

                            if( 'data' in localStore )
                            {
                                $templateCache.put(localSrc, localStore.data);
                            }
                            else
                            {
                                //GetInclude(localSrc, $templateCache);
                                GetInclude(localSrc, ((value === 'cache')?$templateCache : false));
                            }
                            break;
                    }
                }

                function GetInclude(src, caching)
                {
                    $http
                        .get(src, {cache: caching})
                        .success(function(data)
                        {
                            simpleStorage.set(src, data);
                        });
                }
            }

        };
    }]);

})(this, angular);