define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojbutton', 'ojs/ojselectcombobox',
    'ojs/ojchart', 'ojs/ojtoolbar'],
        function (oj, ko, $, common)
        {
            'use strict';

            function OpenAccountVolumeViewModel(params)
            {
                var self = this;
                self.openAccountRouter = params.ojRouter.parentRouter.getChildRouter('openAccountRouter');
                self.returnBtn = function () {
                    window.history.back();
                };

                /* toggle button variables */
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('horizontal');

                self.barSeriesValue = ko.observableArray();
                self.barGroupsValue = ko.observableArray();
                /*total && growthRate*/
                self.total = ko.observable();
                self.growthRate = ko.observable();
                common.get('newaccount/total', {}, function (data) {
                    if (data.data.code === '0') {
                        self.total(self.toThousands(data.data.data.total));
                        self.growthRate(data.data.data.growthRate * 100);
                    }
                    ;
                });

                self.toThousands = function (num) {
                    var result = '', counter = 0;
                    num = (num || 0).toString();
                    for (var i = num.length - 1; i >= 0; i--) {
                        counter++;
                        result = num.charAt(i) + result;
                        if (!(counter % 3) && i != 0) {
                            result = ',' + result;
                        }
                    }
                    return result;
                }
                /* chart data && change month */
                var month = "201801";
                var dataAddress = [];
                this.valmonth = ko.observable("201801");
                self.monthValue = ko.observable('201801');
                this.valueChangedMonth = function (event) {
                    self.monthValue(event.detail.value);
                  
                    month = event.detail.value;
                    self.getDate();
                };  


                self.getDate = function () {


                    dataAddress = [];

                    common.get('newaccount/region?month=' + self.monthValue(), '', function (data) {
                        console.log(data.data);
                        if (data.data.code === '0') {

                            var groupArray = [];

                            $.each(data.data.data, function (index, item) {

                                dataAddress.push(item.newaccount);

                                groupArray.push(item.region)
                            });
                            self.barSeriesValue([{'name': '板块统计', 'color': '#237BB1', 'items': dataAddress}]);
                            self.barGroupsValue(groupArray);
                        }
                        ;
                        
                    });
                }
                self.getDate();
                /*root change */
                self.drillingValue = ko.observable('on');
                self.effectValue = function (event) {
                    if (month) {
                        oj.Router.rootInstance["dt"] = {month: month, address: event.detail.group};
                    }
                    ;
                    params.ojRouter.parentRouter.go("openAccountVolume/" + event.detail.group + "_account");
                };
            }
            return OpenAccountVolumeViewModel;
        }
);

