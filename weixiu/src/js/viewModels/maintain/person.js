define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter'],
        function (oj, ko, $, tfcommon)
        {
            'use strict';

            function PersonViewModel(params)
            {
                var self = this;
                tfcommon.headerTitle('个人中心');
               
            }
            return PersonViewModel;
        }
);