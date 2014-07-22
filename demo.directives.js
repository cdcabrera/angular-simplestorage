(function(window, angular, undefined){

    var directives = angular.module('simpleApp.directives', ['simpleApp.services']);

    directives.directive('localStorage', ['$templateCache', '$http', '$timeout', 'simpleStorage', function($templateCache, $http, $timeout, simpleStorage)
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

                    value = value ? value.toLowerCase() : '';

                    switch(value)
                    {
                        case 'expire':
                        case 'clear':
                            simpleStorage.clear(localSrc);
                            break;

                        case 'reload':
                            simpleStorage.clear(localSrc);

                            GetInclude(localSrc, false).then(function()
                            {
                                scope[src] = '';
                                $timeout(function()
                                {
                                    scope[src] = localSrc;
                                },0);
                            });

                            break;

                        case 'cache':
                        default:
                            localStore = simpleStorage.get(localSrc);

                            if( 'data' in localStore )
                            {
                                $templateCache.put(localSrc, localStore.data);
                            }
                            else
                            {
                                GetInclude(localSrc, ((value === 'cache')?$templateCache : false));
                            }
                            break;
                    }
                }

                function GetInclude(localSrc, caching)
                {
                    return $http
                        .get(localSrc, {cache: caching})
                        .success(function(data)
                        {
                            simpleStorage.set(localSrc, data);
                            return data;
                        })
                        .error(function()
                        {
                            return '';
                        });
                }
            }

        };
    }]);

})(this, angular);
