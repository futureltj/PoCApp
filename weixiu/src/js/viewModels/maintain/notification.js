define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter'],
        function (oj, ko, $, tfcommon)
        {
            'use strict';

            function NotificationViewModel(params)
            {
                var self = this;
                tfcommon.headerTitle('消息通知');
               
            }
            return NotificationViewModel;
        }
);