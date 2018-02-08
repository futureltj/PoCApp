define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojbutton',
    'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojselectcombobox'],
        function (oj, ko, $, common)
        {
            'use strict';

            function RegionViewModel(params)
            {
                var self = this;
                //返回
                self.returnBtn = function () {
                    window.history.back();
                };
                self.data = ko.observable(oj.Router.rootInstance["dt"]);
                self.provice = ko.observable(self.data().address);
                self.groupName=ko.observable();
                //饼图
                self.threeDValue = ko.observable('off');
                self.pieSeriesValue = ko.observableArray();

                this.valmonth = ko.observable(self.data().month);
                self.monthValue = ko.observable(self.data().month);

                self.getDate = function (index) {

                    var grouping =
                            {
                                'g100': {name: '50以下', data: []},
                                'g200': {name: '50-100', data: []},
                                'g250': {name: '100-200', data: []},
                                'g300': {name: '200-300', data: []},
                                'g400': {name: '300以上', data: []},
                            };

                    var pieData = {};

                    common.get('newaccount/region/' + self.data().address + '?month=' + self.monthValue(), {}, function (data) {
                        $.each(data.data.data, function (index, item) {
                            console.log(item);
                            if (parseInt(item.newaccount) > 300) {
                                grouping["g400"].data.push(item);
                            } else if (parseInt(item.newaccount) > 200 && parseInt(item.newaccount) <= 300) {
                                grouping["g300"].data.push(item);
                            } else if (parseInt(item.newaccount) > 100 && parseInt(item.newaccount) <= 200) {
                                grouping["g300"].data.push(item);
                            } else if (parseInt(item.newaccount) > 50 && parseInt(item.newaccount) <= 100) {
                                grouping["g200"].data.push(item);
                            } else {
                                grouping["g100"].data.push(item);

                            }

                        });
                        pieData.default = [];
                        $.map(grouping, function (v, k) {
                            var _data = {'name': v.name, items: [v.data.length], data: v.data}
                            pieData.default.push(_data);

                        })



                        self.pieSeriesValue(pieData.default);

                        var bussesionList = [];


                        self.groupName(grouping[index].name);
                        $.each(grouping[index].data, function (index, item) {

                            var _data = {'name': item.name, 'items': [item.newaccount]}
                            bussesionList.push(_data)
                        });

                        console.log(bussesionList);
                        self.barSeriesValue(bussesionList);


                    })

                }
                self.getDate('g400');
           
                this.valueChangedMonth = function (event) { 
                    self.monthValue(event.detail.value);
                    
                    self.getDate('g400');
                };
                self.drillingbValue = ko.observable('on');
                self.effectbValue = function (event) {
                    console.log(event.detail.seriesData.data);


                    var bussesionList = []
                      self.groupName(event.detail.series);
                    $.each(event.detail.seriesData.data, function (index, item) {

                        var _data = {'name': item.name, 'items': [item.newaccount]}
                        bussesionList.push(_data)
                    });


                    self.barSeriesValue(bussesionList);


                };

                /* toggle button variables */
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('horizontal');

                /* chart data */
                self.barSeriesValue = ko.observableArray();
                self.barGroupsValue = ko.observableArray();

//                var group = self.data().address + "地区开户数统计";
//                var barGroups = [group];
                self.barGroupsValue(['']);

                self.drillingValue = ko.observable('on');
                self.effectValue = function (event) {
                   self.data().region= event.detail.series;
                   oj.Router.rootInstance["dt"] = self.data();
                   params.ojRouter.parentRouter.parent.go("openAccountVolume/" + event.detail.series + "_month");
                };


            }
            return RegionViewModel;
        }
);

