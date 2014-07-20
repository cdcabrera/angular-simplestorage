(function(window, angular, undefined){

	var services = angular.module('simpleApp.services', []);

    services.factory('simpleStorage', function()
    {
        function getSetData( name, data, version )
        {
            var current  = new Date().getTime(),
                original = current,
                tempobj  = {};

            version = (typeof version == 'number')? version : 0.1;

            if(localStorage[name])
            {
                tempobj = JSON.parse(localStorage[name]);
            }

            if( data !== undefined )
            {
                tempobj = angular.extend(tempobj, { version:version, set:( tempobj.set || original ), updated:current, data:data });
                try
                {
                    localStorage[name] = JSON.stringify(tempobj);
                }
                catch(e)
                {}
            }

            return tempobj;
        }

        return {
            store: ('localStorage' in window && 'JSON' in window),

            clear: function(name)
            {
                if(this.store)
                {
                    if( typeof name == 'string' )
                    {
                        localStorage[name] = '{}'; //-- clear specific
                    }
                    else
                    {
                        localStorage.clear(); //-- clear all
                    }
                }
            },

            get: function(name)
            {
                return this.set.call(this, name);
            },

            set: function(name, data, version)
            {
                return (this.store && typeof name == 'string')? getSetData.call(this, name, data,version) : null;
            }
        };
    });

})(this, angular);