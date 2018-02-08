/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojrouter', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'ojs/ojfilepicker', 'ojs/ojinputtext', 'ojs/ojtimezonedata', 'ojs/ojlabel'],
    function (oj, ko, $, tfcommon) {

        function IncidentsViewModel() {
            var self = this;

            //this.patternValue = ko.observable("yyyy/MM/dd hh:mm:ss");
            self.router = oj.Router.rootInstance.getChildRouter('dashboardRouter');
            self.type = ko.observable();
            /*
            this.dateTimeConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                createConverter(
                {
                    pattern: self.patternValue(),
                    timeZone: 'Etc/GMT-08:00'
                }));
            */
            self.title = ko.observable();
            self.servicetime = ko.observable();

            self.content = ko.observable();
            self.attr4 = ko.observable();
            self.selectListener = function (event) {
                var files = event.detail.files;
                for (var i = 0; i < files.length; i++) {
                    self.fileNames.push(files[i].name);
                }
            }

            self.imgsrc = ko.observable("");
            self.base64EncodedImage = ko.observable("");
            self.btnClick = function () {
                self.imgsrc("css/images/favicon.ico");
            }
            self.cameraSuccess = function (imageData) {
                
                //returns a file path such as: file:///storage/emulated/0/Android/data/org.oraclejet.mcsexample/cache/1459277993352.jpg
                //set observable to the path and img tag's src attributein view will be updated.
                self.base64EncodedImage(imageData)
                self.imgsrc("data:image/jpeg;base64," + imageData);
                //self.upload(imageData);
            }

            self.cameraError = function (error) {
                console.log(error);
            }
            self.upload = function () {

                
                //self.base64EncodedImage("iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABz0lEQVR4Ae3YsUrDUBTG8UtVXBwKDgqC1gcoRBwdDCi49hEcfIAqOLnUN+gj+AgdxE3MIHYTH6G7EAqtNNXq8RscDqGhh5rb3PSeA7/t5lD+hkRidHR0dHR0dHKdtavXERAzAjOH9J4+mDzluoxJcgpAKYkG0ADFBziGZxgDMX1BgA2IBSQB4pR3eIBDmwFOYQI0xUB4B5CAJABlSODIVoAuUBZhgG9bAZjIVoBxDgH6ggCVfwYY2QpAM6wLdgwFe+ozdmwJdhQS4AxMhgpcAAk8wV7Gnk3ouBrgB+IMH0D2FRtAqvwBNIAG0AAaQANoAA0QO6SQAMYhGkADaAB3AzQh+mOYACKBdpkDVKGXcU0IJBCVNUAAb0C+BWgJ/0GpQjhFI/XtMFyqAAIddr5ZxodgCC1G/MOgwc52luQtIL8m9cCs+RbgnJ27A+NbAP7XD3wLELAzPTC+BWjz29/HABF/9fkYgJjQtwA1IKa2bAFaTFaA9Bk5/R6gASpFBdh2JMBOUQEuHQlwU1SAMVzDLqyAWaBV2IdbmCwqwACoBBJbAe5LEuDFVoA6DIEcNoGT3AMwB/AIn0AO+YIuhGDmCOAnDaABNIAG8JcG0AAa4BeS5WSlIpStxAAAAABJRU5ErkJggg==");
                if(self.base64EncodedImage()===''||self.base64EncodedImage()===null){
                    alert('请拍照上传...');
                    return;
                }
                $("<div id='shade' style='opacity:0.85;background:white'></div><img width='30px' height='30px' src='images/loading.gif'/>").css({ 
                    position:'absolute', 
                    top:'48%', 
                    left:'45%', 
                    zIndex:300,
                    height:'50px',
                    width:'50px'
                  }).appendTo('#mainDiv');

                var str1 = self.servicetime()
                var timestamp2 = new Date(self.servicetime());
                str1=timestamp2.toLocaleDateString()+" "+str1.substring(11,20)
                //上传参数
                //alert('start upload');
                var params = {};
                if(self.title()!=''&&self.title()!=null&&self.title()!=undefined)
                    params.title = self.title().replace(/(\n)+|(\r\n)+/g, "").trim();
                params.servicetime = str1;
                if(self.content()!=''&&self.content()!=null&&self.content()!=undefined)
                    params.content = self.content().replace(/(\n)+|(\r\n)+/g, "").trim();
                params.type = self.type();
                params.status ='已派单';
                params.attr4 =self.attr4();
                params.collectionName = 'PicCollection';
                var timestamp = Date.parse(new Date()); 
                params.imageName=timestamp+'.jpg';
                params.base64EncodedImage = self.base64EncodedImage();
                tfcommon.postJPG('https://cofco-a491065.mobileenv.us2.oraclecloud.com:443/mobile/custom/qiaoxinapi/addTask',params,function(data){console.log(data);self.goback();});
            };

            self.takePicture = function (theID) {
                if (navigator.camera && typeof navigator.camera !== "undefined") {
                    //sample camera options, using defaults here but for illustration....
                    //Note that the destinationType can be a DATA_URL but cordova plugin warns of memory usage on that.
                    var cameraOptions = {
                        quality: 50,
                        //destinationType: Camera.DestinationType.FILE_URI,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: true,
                        correctOrientation: true
                    };
                    //use camera pluging method to take a picture, use callbacks for handling result
                    navigator.camera.getPicture(self.cameraSuccess, self.cameraError, cameraOptions);
                } else {
                    //running on web, the navigator.camera object will not be available
                    console.log("The navigator.camera object is not available.");
                }
            }

            

            self.menuConfig = ko.pureComputed(function () {

                return $.extend(true, {}, self.router.moduleConfig,
                    {
                        'name': 'maintain/maintainAddMenu'

                    });
            }, this);


            self.save = function () {

                self.router.go('maintainList')
            }
            self.goback = function () {

                self.router.go('maintainList')
            }
            self.handleActivated = function (info) {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
                // Implement if needed
                tfcommon.headerTitle('维修单填报')
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function (info) {
                // Implement if needed
                console.log('clean')
                self.type('');
                self.title('');
                self.content('');
                self.servicetime('');
                self.base64EncodedImage('');
                self.imgsrc('');
                self.attr4('');
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new IncidentsViewModel();
    }
);
