define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 
    'ojs/ojrouter', 'ojs/ojoffcanvas', 'ojs/ojmenu', 'ojs/ojtoolbar', 'ojs/ojnavigationlist'],
        function (oj, ko, $ ,common)
        {
            'use strict';

            function viewModel(params)
            {
                var self = this;
                self.router = oj.Router.rootInstance.getChildRouter('dashboardRouter');
                self.goMenu = function(){
                   self.router.go('catalog');
                };
             
              
               self.goAddPage = function(){
                   self.router.go('maintainAdd');
                };
                
             
            }
            return viewModel;
        }
);