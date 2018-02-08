define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 
    'ojs/ojrouter', 'ojs/ojoffcanvas', 'ojs/ojmenu', 'ojs/ojtoolbar', 'ojs/ojnavigationlist'],
        function (oj, ko, $ ,common)
        {
            'use strict';

            function viewModel(params)
            {
                var self = this;
                self.router = oj.Router.rootInstance.getChildRouter('dashboardRouter');
                   self.save=function(){
                    
                    
                }
             
              
               self.goListPage = function(){
                   self.router.go('maintainList');
                };
                
             
            }
            return viewModel;
        }
);