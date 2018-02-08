'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'common/mbe', 'ojs/ojrouter', 'ojs/ojknockout',
    'ojs/ojcheckboxset', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojanimation'],
        function (oj, ko, $, mbe) {
            function signinViewModel(params) {
                var self = this;



                // Replace with state save logic for rememberUserName
                self.userName = ko.observable('liming');
                //self.userName = ko.observable('wangqiang');
                self.passWord = ko.observable('P@ssw0rd');
                self.rememberUserName = ko.observable(['remember']);

                // Replace with sign in authentication
                self.signIn = function () {


                    mbe.authenticate(self.userName(), self.passWord(), function (_status, _args) {


                        oj.Router.rootInstance.go('pageRouter');
                    },function (errorCode, errorInfo) {
                        console.log(errorCode + ": " + errorInfo.error_description);

                        
                    })


                };

            }
            return signinViewModel;
        });
