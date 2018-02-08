/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
        {
            baseUrl: 'js',
            // Path mappings for the logical module names
            // Update the main-release-paths.json for release mode when updating the mappings
            paths:
                    //injector:mainReleasePaths
                            {
                                'knockout': 'libs/knockout/knockout-3.4.0.debug',
                                'jquery': 'libs/jquery/jquery-3.1.1',
                                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
                                'promise': 'libs/es6-promise/es6-promise',
                                'hammerjs': 'libs/hammer/hammer-2.0.8',
                                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
                                'ojs': 'libs/oj/v4.1.0/debug',
                                'ojL10n': 'libs/oj/v4.1.0/ojL10n',
                                'ojtranslations': 'libs/oj/v4.1.0/resources',
                                'text': 'libs/require/text',
                                'signals': 'libs/js-signals/signals',
                                'customElements': 'libs/webcomponents/custom-elements.min',
                                'proj4': 'libs/proj4js/dist/proj4-src',
                                'css': 'libs/require-css/css',
                                'tfcommon': 'common/tongfu-common',
                            }
                    //endinjector
                    ,
                    // Shim configurations for modules that do not expose AMD
                    shim:
                            {
                                'jquery':
                                        {
                                            exports: ['jQuery', '$']
                                        }
                            }
                }
        );

        /**
         * A top-level require call executed by the Application.
         * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
         * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
         * objects in the callback
         */
        require(['ojs/ojcore', 'knockout', 'jquery',
            'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojmenu', 'ojs/ojtoolbar', 'ojs/ojnavigationlist',
            'ojs/ojoffcanvas', 'ojs/ojarraytabledatasource', 'ojs/ojmodule', 'ojs/ojrouter', 'text', 'ojs/ojcheckboxset', 'ojs/ojswitch'],
                function (oj, ko,$) { // this callback gets executed when all required modules are loaded
                    'use strict';
                    $(function () {


                        var onDeviceReady = function() {
                            document.addEventListener("jpush.receiveRegistrationId", function (event) {
                                  //alert("receiveRegistrationId" + JSON.stringify(event));
                              }, false)
                    
                            initiateUI();
                          };
                        
                          var getRegistrationID = function() {
                            window.JPush.getRegistrationID(onGetRegistrationID);
                          };
                        
                          var onGetRegistrationID = function(data) {
                            try {
                              if (data.length == 0) {
                                var t1 = window.setTimeout(getRegistrationID, 1000);
                              }
                            } catch (exception) {
                              console.log(exception);
                            }
                          };
                        
                          var onTagsWithAlias = function(event) {
                            try {
                              var result = "result code:" + event.resultCode + " ";
                              result += "tags:" + event.tags + " ";
                              result += "alias:" + event.alias + " ";
                              //alert("onTagsWithAlias:"+result);
                            } catch (exception) {
                              console.log(exception)
                            }
                          };
                        
                          var onOpenNotification = function(event) {
                            try {
                              var alertContent;
                              if (device.platform == "Android") {
                                alertContent = event.alert;
                              } else {
                                alertContent = event.aps.alert;
                              }
                            } catch (exception) {
                              console.log("JPushPlugin:onOpenNotification" + exception);
                            }
                          };
                          
                          var onReceiveNotification = function(event) {
                            try {
                              var alertContent;
                              if (device.platform == "Android") {
                                alertContent = event.alert;
                              } else {
                                alertContent = event.aps.alert;
                              }
                              alert(alertContent);
                            } catch (exception) {
                              console.log(exception)
                            }
                          };
                        
                          var onReceiveMessage = function(event) {
                            try {
                              var message;
                              if (device.platform == "Android") {
                                message = event.message;
                              } else {
                                message = event.content;
                              }
                              alert(message);
                            } catch (exception) {
                              console.log("JPushPlugin:onReceiveMessage-->" + exception);
                            }
                          };
                          var setTagAlias = function(){
                            try {
                              window.JPush.setTags({ sequence: 1, tags: ['weixiu'] },
                                function (result) {
                                  //alert('setTags:'+result.tags)
                                }, function (error) {
                                  //alert(error.code)
                                })
                                window.JPush.setAlias({ sequence: 1, alias: 'weixiu' },
                                  function (result) {
                                    //alert('setAlias:'+result.alias)
                                  }, function (error){
                                    //alert(error.code)
                                  })
                            } catch (exception) {
                              console.log(exception)
                            }
                          }
                          var initiateUI = function() {
                            try {
                              window.JPush.init();
                              window.JPush.setDebugMode(true);
                              window.setTimeout(getRegistrationID, 1000);
                    
                              if (device.platform != "Android") {
                                window.JPush.setApplicationIconBadgeNumber(0);
                              }
                              window.setTimeout(setTagAlias, 2000);
                            } catch (exception) {
                              console.log(exception);
                            }
                          };
                        
                          document.addEventListener("deviceready", onDeviceReady, false);
                          document.addEventListener("jpush.openNotification", onOpenNotification, false);
                          document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
                          document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
                                        


                        //创建路由实例
                        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
                        var router = oj.Router.rootInstance;
                        //配置当前节点路由
                        router.configure({
                            'login': {label: 'login', isDefault: true,
                                enter: function () {
                                    console.log('entered login');
                                }},
                            'logout': {label: 'logout',
                                enter: function () {
                                    console.log('entered Home');
                                }},
                            'pageRouter': {label: '主页', enter: function () {
                                    console.log('entered dashboard');
                                }},
                        });
                        function ViewModel() {

                            var self = this;

                            // Media queries for repsonsive layouts
                            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                            self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

                            self.router = router;




                            $("#navDrawer").on("ojclose", function () {
                                $('#drawerToggleButton').focus();
                            });
                            self.selectHandler = function (event, ui) {
                                if (('ojBeforeSelect' === event.type) && event.detail.originalEvent) {
                                    // router takes care of changing the selection
                                    event.preventDefault();
                                    // Invoke go() with the selected item.

                                    self.router.go(event.detail.key);
                                }
                            };


                        }


                        oj.Router.sync().then(
                                function ()
                                {
                                    ko.applyBindings(new ViewModel(), document.getElementById('globalBody'));
                                },
                                function (error)
                                {
                                    oj.Logger.error('Error when starting router: ' + error.message);
                                }
                        );


                    });
                }
        );