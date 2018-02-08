/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'tfcommon', 'common/mbe', 'ojs/ojrouter', 'ojs/ojlistview', 'ojs/ojpopup', 'ojs/ojarraydataprovider', 'ojs/ojbutton'],
    function (oj, ko, $, tfcommon, mbe) {

        function DashboardViewModel() {
            var self = this;
            self.startIndex = ko.observable();
            self.selectedItem = ko.observable();

            self.currentItem = ko.observable();
            self.gotoContent = function(event) {
                if (event.detail.value != null)
                {   
                    console.log('gotoContent。。。。'); 
                    console.log(event.detail.value);
                }
            };
            self.handleSelectionChanged = function () {
                var num = self.selectedItem()[0];
                //console.log('num='+num);
                //console.log(self.data());
                for (var i = 0; i < self.data().length; i++) {
                    if (self.data()[i].id === num) {
                        //console.log('i='+i);
                        self.currentItem(self.data()[i])
                    }
                }
                console.log(self.currentItem());
            }
            self.router = oj.Router.rootInstance.getChildRouter('dashboardRouter');
            self.data = ko.observableArray([]);

            self.dataProvider = new oj.ArrayDataProvider(self.data, { 'idAttribute': 'id' });

            self.addBtn = function () {

                self.router.go('maintainAdd')
            }
            self, editBtn = function (data,event) {
                self.currentItem(data);
                var popup = document.querySelector('#popup1');
                popup.open('');
            }

            self, historyBtn = function (data,event) {
                console.log(data)
                console.log(event)
                var popup = document.querySelector('#popup2');
                popup.open('');
            }
            self.closePopup = function () {
                var popup = document.querySelector('#popup1');
                popup.close();
            }
            self.closePopup2 = function () {
                var popup = document.querySelector('#popup2');
                popup.close();
            }
            /*
            self.myremove=function(data){
                var obj={};
                for(var i=0;i<self.data().length;i++){
                    console.log(self.data()[i]);
                    if(self.data()[i]===data){
                        obj=self.data()[i]
                        console.log('findi='+i)
                    }
                }
                self.data.remove(obj);
                console.log('self.data().length='+self.data().length)
            }
            */
            self.myremove = function (data) 
            {
                $.each(data, function(index, value)
                {
                    self.data.remove(function(item)
                    {
                        return (item.id == value);
                    });
                });
            }; 
            
            self,weixiuBtn = function (data,event) {
                var obj1 = data;
                var params = {}
                params.id = obj1.id;
                params.status = "维修中";
                tfcommon.postJPG('https://cofco-a491065.mobileenv.us2.oraclecloud.com:443/mobile/custom/qiaoxinapi/updateTask', params, function (data) {
                    //self.getTaskList();
                    //self.closePopup();
                    self.myremove(obj1);
                    obj1.status="维修中";
                    self.data.unshift(obj1);
                })
                
            }
            self,wanchengBtn = function (data,event) {
                var obj1 = data;
                var params = {}
                params.id = obj1.id;
                params.status = "待评价";
                params.type = obj1.type;
                console.log(params);
                console.log(obj1);
                tfcommon.postJPG('https://cofco-a491065.mobileenv.us2.oraclecloud.com:443/mobile/custom/qiaoxinapi/updateTask', params, function (data) {
                    //self.getTaskList();
                    //self.closePopup();
                    self.myremove(obj1);
                    obj1.status="待评价";
                    
                    self.data.unshift(obj1);
                })
            }

            self,feedback = function (data,event) {
                var obj1 = self.currentItem();
                console.log(obj1)
                var params = {}
                params.id = obj1.id;
                var params = {}
                params.id = obj1.id;
                params.status = "已评价";
                params.attr1 = self.startIndex() + "";
                console.log(params);
                tfcommon.postJPG('https://cofco-a491065.mobileenv.us2.oraclecloud.com:443/mobile/custom/qiaoxinapi/updateTask', params, function (data) {
                    //self.getTaskList();
                    self.myremove(obj1);
                    obj1.attr1 = self.startIndex() + "";
                    obj1.status = "已评价";
                    self.data.unshift(obj1);
                    self.closePopup();
                })
            }

            self.menuConfig = ko.pureComputed(function () {

                return $.extend(true, {}, self.router.moduleConfig,
                    {
                        'name': 'maintain/maintainListMenu'

                    });
            }, this);

            var colId = "createdOn"
            var desc = function (x, y) {
                return (x[colId] < y[colId]) ? 1 : -1
            }
            //对json进行升序排序函数  
            var asc = function (x, y) {
                return (x[colId] > y[colId]) ? 1 : -1
            }
            self.blobToBase64 = function (blob, cb) {
                var reader = new FileReader();
                reader.onload = function () {
                    var dataUrl = reader.result;
                    var base64 = dataUrl.split(',')[1];
                    cb(base64);
                };
                reader.readAsDataURL(blob);
            };
            self.updateTaskImage= function(t){
                mbe.getStorageObjectFromCollection('PicCollection', t.pic, function (obj) {
                    //var url = URL.createObjectURL(obj.getPayload());
                    //console.log(url);
                    var rawData = obj.getPayload();
                    self.blobToBase64(rawData, function (base64) {
                        //self.data.remove(t);
                        t.attr5 = "data:image/jpeg;base64," + base64;
                        console.log(t);
                        //var tmparr = $.extend(true, [], self.data());
                        //tmparr.push(t);
                        self.data.push(t);
                        console.log('self.data().length=' + self.data().length)
                    })
                }, function () {
                    console.log(error)
                })
            }
            self.getTaskList = function () {
                var loadingdiv= $("<div id='shade' style='opacity:0.85;background:white'></div><img width='30px' height='30px' src='images/loading.gif'/>").css({ 
                    position:'absolute', 
                    top:'48%', 
                    left:'45%', 
                    zIndex:300,
                    height:'50px',
                    width:'50px'
                  });
                  loadingdiv.appendTo('#listviewwrapper');

                console.log('getTaskList.......')
                
                tfcommon.headerTitle('维修单列表');
                //self.data([{"id":1,"title":"海尔空调维修","orderType":"维修","datatime":"2019-01-01 12:12:12","info":"制冷效果不理想"},{"id":2,"title":"美的挂壁内机清洗","orderType":"维护","datatime":"2019-01-01 12:12:12","info":"滚筒清洁"},{"id":3,"title":"小天鹅洗衣机维修","orderType":"维修","datatime":"2019-01-01 12:12:12","info":"有异响"},{"id":4,"title":"美的中央空调外机维护","orderType":"维护","datatime":"2019-01-01 12:12:12","info":"外机部工作"},{"id":5,"title":"海尔冰箱维修","orderType":"维修","datatime":"2019-01-01 12:12:12","info":"漏水"}]);
                /*
                var data = { "items": [{ "id": 1, "title": null, "location": "XXX小区24号楼1803室", "type": "电维修", "content": "插座没电，可能跳闸了。", "servicetime": "2018/02/05 12:00:00", "status": "维修中", "pic": null, "attr1": null, "attr2": null, "attr3": null, "attr4": "13811111111", "attr5": null }, { "id": 2, "title": null, "location": "XXX小区24号楼1803室", "type": "电维修", "content": "插座没电，可能跳闸了。", "servicetime": "2018/02/05 12:00:00", "status": "维修中", "pic": null, "attr1": null, "attr2": null, "attr3": null, "attr4": "13811111111", "attr5": null }] };
                var arr = new Array();
                var tmps = data.items;
                for (var i = 0; i < tmps.length; i++) {
                    var t = tmps[i];
                    if (t.attr1 === null) {
                        t.attr1 = "";
                    }
                    if (t.attr2 === null) {
                        t.attr2 = "";
                    }
                    if (t.attr3 === null) {
                        t.attr3 = "";
                    }
                    arr.push(t);
                }
                self.data(arr);
                //document.getElementById("listview").refresh();
                */
                tfcommon.get('listTasksWithImages', {}, function (data) {
                    self.data.removeAll();
                    var arr = new Array();
                    var tmps = data.data.items;
                    var promises = [];
                    tmps.sort(asc);
                    for (var i = 0; i < tmps.length; i++) {
                        var t = $.extend(true, {}, tmps[i]);
                        t.attr5 = "data:image/jpeg;base64," + t.attr5;
                        if (t.servicetime != null && t.servicetime != "") {
                            t.servicetime = t.servicetime.substring(0, t.servicetime.length - 6) + "时"
                        }

                        if (t.attr1 === null) {
                            t.attr1 = "";
                        }
                        if (t.attr2 === null) {
                            t.attr2 = "";
                        }
                        if (t.attr3 === null) {
                            t.attr3 = "";
                        }
                        self.data.push(t);
                        //console.log('self.data().length='+self.data().length)
                        //promises.push(self.updateTaskImage(t));
                        console.log(t);
                    }
                    
                    if(document.getElementById('shade')!=undefined){
                        loadingdiv.remove();
                    }
                    /*
                    Promise.all(promises).then(function() {
                        console.log("Promise.all")
                    }, function(err) {
                        console.log(error)
                    });
                    */
                })
            }

            self.refreshList = function () {
                document.getElementById("listview").refresh();
            }
            self.initStar = function () {
                var oStar = document.getElementById("star");
                var aLi = oStar.getElementsByTagName("li");
                var oUl = oStar.getElementsByTagName("ul")[0];
                var oSpan = oStar.getElementsByTagName("span")[1];
                var oP = oStar.getElementsByTagName("p")[0];
                var i = iScore = iStar = 0;
                var aMsg = [
                    "很不满意|维修质量很差，响应速度很慢，服务态度很差",
                    "不满意|维修质量较差，响应速度较慢，服务态度较差",
                    "一般|维修质量一般，响应速度一般，服务态度一般",
                    "满意|维修质量好，响应速度快，服务态度好",
                    "非常满意|维修质量很好，响应速度很快，服务态度很好"
                ]
                for (i = 1; i <= aLi.length; i++) {
                    aLi[i - 1].index = i;
                    //鼠标移过显示分数
                    aLi[i - 1].onmouseover = function () {
                        fnPoint(this.index);
                        //浮动层显示
                        oP.style.display = "block";
                        //计算浮动层位置
                        oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
                        //匹配浮动层文字内容
                        //oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
                    };
                    //鼠标离开后恢复上次评分
                    aLi[i - 1].onmouseout = function () {
                        fnPoint();
                        //关闭浮动层
                        oP.style.display = "none"
                    };
                    //点击后进行评分处理
                    aLi[i - 1].onclick = function () {
                        iStar = this.index;
                        self.startIndex(iStar);
                        console.log(self.startIndex())
                        oP.style.display = "none";
                        oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
                    }
                    function fnPoint(iArg) {
                        //分数赋值
                        iScore = iArg || iStar;
                        for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
                    }
                }
            }

            self.handleActivated = function (info) {
                // Implement if needed
                console.log('self.handleActivated')
                
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
                self.getTaskList()
                console.log('self.handleAttached')
                self.initStar()
                
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
                console.log('self.handleDetached')
                self.data.removeAll();
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new DashboardViewModel();
    }
);
