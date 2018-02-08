define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojselectcombobox'
], function (oj, ko, $, common) {
    /**
     * The view model for the main content view template
     */
    function monthViewModel(params) {
        var self = this;

        self.returnBtn = function () {
            window.history.back();
        };
        self.data = ko.observable(oj.Router.rootInstance["dt"]);
        self.region = ko.observable(self.data().region);

        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
//        self.areaSeriesValue = ko.observableArray();
//        self.areaGroupsValue = ko.observableArray();
        self.lineSeriesValue = ko.observableArray();
        self.lineGroupsValue = ko.observableArray();
        /* chart data */
        var dataAddress = [];
        var items = [];
        var month = [];
        var month1 = [];
        common.get('transaction/branch/' + self.data().region + '?' + self.data().month, '', function (data) {
            console.log(data.data);
            if (data.data.code === '0') {
                $.each(data.data.data, function (index, item) {
                    items.push(item.transaction);
                    month.push(item.month);
                });
                var _data = {'name': '', 'items': items};
                dataAddress.push(_data);
                //self.areaSeriesValue(dataAddress);
                self.lineSeriesValue(dataAddress);
                for (var i = month.length - 1; i >= 0; i--) {
                    month1.push(month[i]);
                }
                //self.areaGroupsValue(month1);
                self.lineGroupsValue(month1);
            }
            ;
        });
    }

    return monthViewModel;
});
