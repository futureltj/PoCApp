define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter','jet-composites/my-pie/loader', 'jet-composites/my-bar/loader', 'jet-composites/my-line/loader'],
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
				self.dataurlarr2 = ko.observableArray();
                self.dataurlarr2.push({dataurl: 'js/data/orderWeek.json', chartname: '本周工单分析'});
                self.dataurlarr3 = ko.observableArray();
                self.dataurlarr3.push({dataurl: 'js/data/orderMonth.json', chartname: '工单趋势分析'});
            }
            return CatalogViewModel;
        }
);