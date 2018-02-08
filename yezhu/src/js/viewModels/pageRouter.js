'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojoffcanvas', 'ojs/ojmenu', 'ojs/ojtoolbar', 'ojs/ojnavigationlist'],
    function (oj, ko, $, tfcommon) {
        'use strict';

        function viewModel(params) {
            var self = this;

            self.headerTitle = ko.pureComputed(function () {

                return tfcommon.headerTitle();
            })


            self.goMaintain = function () {

                self.router.go('maintainList');
            }
            self.goCatalog = function () {

                self.dashboardRouter.go('catalog');
            }
            self.goNotification = function () {

                self.dashboardRouter.go('notification');
            }
            self.goPerson = function () {
                console.log('goperson')
                self.dashboardRouter.go('person');
            }
            var parentRouter = params.ojRouter.parentRouter;
            //系统菜单路由
            var routerConfig =
                {
                    'catalog': { value: 'catalog', isDefault: true },
                    'maintainList': { value: 'maintain/maintainList' },
                    'maintainAdd': { value: 'maintain/maintainAdd' },
                    'maintainEdit': { value: 'maintain/maintainEdit' },
                    'notification': { value: 'maintain/notification' },
                    'person': { value: 'maintain/person' }
                };

            if (parentRouter.getChildRouter('dashboardRouter')) {
                this.dashboardRouter = parentRouter.getChildRouter('dashboardRouter').configure(routerConfig);
            } else {
                this.dashboardRouter = parentRouter.createChildRouter('dashboardRouter').configure(routerConfig);
            }

            if (this.dashboardRouter.getChildRouter('dynamicRouter')) {

                this.dynamicRouter = this.dashboardRouter.getChildRouter('dynamicRouter').configure(function (stateId) {
                    if (stateId) {
                        return new oj.RouterState(stateId, { value: stateId });
                    }
                });
            } else {



                if (parentRouter.getChildRouter('dashboardRouter')) {
                    this.dashboardRouter = parentRouter.getChildRouter('dashboardRouter').configure(routerConfig);
                } else {
                    this.dashboardRouter = parentRouter.createChildRouter('dashboardRouter').configure(routerConfig);
                }

                if (this.dashboardRouter.getChildRouter('dynamicRouter')) {

                    this.dynamicRouter = this.dashboardRouter.getChildRouter('dynamicRouter').configure(function (stateId) {
                        if (stateId) {
                            return new oj.RouterState(stateId, { value: stateId });
                        }
                    });
                } else {
                }


                this.dynamicRouter = this.dashboardRouter.createChildRouter('dynamicRouter').configure(function (stateId) {
                    if (stateId) {
                        return new oj.RouterState(stateId, { value: stateId });
                    }
                });
            }
            this.router = this.dashboardRouter;


            this.moduleConfig = ko.pureComputed(function () {
                var moduleConfig;


                var moduleStateId = typeof (this.dashboardRouter.stateId()) == 'undefined' ? 'catalog' : this.dashboardRouter.stateId();
                if (moduleStateId) {

                    //console.log(this.dashboardRouter);
                    //二级路由跳转，这里module中不指定属性，name值默认为二级路由中定义的value值
                    moduleConfig = $.extend(true, {}, this.dashboardRouter.moduleConfig,
                        {
                            'params': { 'data': this.dashboardRouter.currentValue.peek() }
                        });



                }
                return moduleConfig;
            }, this);


            //传值变量
            self.createOpenAccountRouter = function () {

                self.openAccountRouter = self.router.getChildRouter('openAccountRouter');
                oj.Router.rootInstance["dt"] = {};
                if (!self.openAccountRouter) {
                    self.openAccountRouter = self.router.createChildRouter('openAccountRouter', 'openAccountVolume').configure(function (stateId) {
                        if (stateId) {
                            return new oj.RouterState(stateId, { value: stateId });
                        }
                    });

                }
            };
            self.createOpenAccountRouter();


            this.handleActivated = function () {
                // Now that the router for this view exist, synchronise it with the URL
                return oj.Router.sync().
                    then(
                    null,
                    function (error) {
                        oj.Logger.error('Error during refresh: ' + error.message);
                    }
                    );
            };
        }

        // Return constructor function
        return viewModel;
    });