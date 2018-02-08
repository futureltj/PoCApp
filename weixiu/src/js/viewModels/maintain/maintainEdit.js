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
                this.patternValue = ko.observable("yyyy/MM/dd hh:mm:ss");
                self.router = oj.Router.rootInstance.getChildRouter('dashboardRouter');
                self.orderType = ko.observable();

                this.dateTimeConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                        createConverter(
                                {
                                    pattern: self.patternValue(),
                                    timeZone: 'Etc/GMT-08:00'
                                }));
                self.title = ko.observable();
                self.datetime = ko.observable();

                self.info = ko.observable();
           
                self.selectListener = function (event) {
                    var files = event.detail.files;
                    for (var i = 0; i < files.length; i++) {
                        self.fileNames.push(files[i].name);
                    }
                }

                self.menuConfig = ko.pureComputed(function ()
                {

                    return  $.extend(true, {}, self.router.moduleConfig,
                            {
                                'name': 'maintain/maintainEdtiMenu'

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
                    tfcommon.headerTitle('新增订单')
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
