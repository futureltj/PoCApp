define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter'],
        function (oj, ko, $, common)
        {
            'use strict';

            function CatalogViewModel(params)
            {
                var self = this;
               
                self.router = params.ojRouter.parentRouter;
                common.headerTitle('首页')
                self.goMaintain =  function(){
                    
                     self.router.go('maintainList');
                }
            }
            return CatalogViewModel;
        }
);