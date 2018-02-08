

define(['ojs/ojcore', 'knockout', 'jquery', 'common/application', 'common/mbe'],
        function (oj, ko, $, config, mbe)
        {
            'use strict';
            function viewModel()
            {


                var self = this;
                self.appConfig = config;
                self.headerTitle=ko.observable('首页')

                self.post = function (url, param, callfun) {
                    self.ajax(url, 'post', param, callfun);

                }
                self.postJPG = function (url, param, callfun) {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(param),  
                        dataType: "json", 
                        beforeSend: function (request) {
                            request.setRequestHeader('Oracle-Mobile-Backend-Id','c1769fbf-18ac-4c14-bab2-874cbfafc3ce' );
                            request.setRequestHeader('Authorization', "Basic d2FuZ3FpYW5nOlBAc3N3MHJk");
                        },
                        error: function (request, textStatus, errorThrown) {
                            //alert(errorThrown);
                            alert('有错误发生，请联系管理员');
                            if (request.status == 401) {
                                oj.Router.rootInstance.go('login')
                            }
                        },
                        success: function (data, textStatus, request) {
                            if (request.status == 200) {
                                callfun(data);
                            }

                        }

                    })

                }

                self.get = function (url, param, callfun) {

                    self.ajax(url, 'GET', param, callfun);
                }
                self.getpic = function (id, callfun) {
                    var url='https://cofco-a491065.mobileenv.us2.oraclecloud.com:443/mobile/platform/storage/collections/PicCollection/objects/'+id;
                    $.ajax({
                        url: url,
                        type: 'get',
                        contentType: "image/png",
                        beforeSend: function (request) {
                            request.setRequestHeader('Oracle-Mobile-Backend-Id','c1769fbf-18ac-4c14-bab2-874cbfafc3ce' );
                            request.setRequestHeader('Authorization', "Basic d2FuZ3FpYW5nOlBAc3N3MHJk");
                        },
                        error: function (request, textStatus, errorThrown) {
                            //alert(errorThrown);
                            console.log('有错误发生，请联系管理员');
                            if (request.status == 401) {
                                oj.Router.rootInstance.go('login')
                            }
                        },
                        success: function (data, textStatus, request) {
                            if (request.status == 200) {
                                callfun(data);
                            }
                        }

                    })
                }

                self.delete = function (url, param, callfun) {

                    self.ajax(url, 'delete', param, callfun);
                }


                self.put = function (url, param, callfun) {

                    self.ajax(url, 'put', param, callfun);
                }

                self.uploadFile = function (url, file, params, callfun) {



                    var formData = new FormData();

                    $.map(params, function (v, k) {

                        if (k != 'docMetadata') {
                            formData.append(k, v);

                        }


                    });
                    formData.append('docMetadata', JSON.stringify(typeof (params.docMetadata) == 'undefined' ? '' : params.docMetadata));
                    formData.append('file', file);
                    $.ajax({
                        url: self.fullUrl(url),
                        type: 'POST',
                        cache: false,
                        data: formData,
                        processData: false,
                        contentType: false
                        ,
                        beforeSend: function (request) {
                            request.setRequestHeader('Oracle-Mobile-Backend-Id','c1769fbf-18ac-4c14-bab2-874cbfafc3ce' );
                            request.setRequestHeader('Authorization', "Basic d2FuZ3FpYW5nOlBAc3N3MHJk");
                        },
                        error: function (request, textStatus, errorThrown) {
                            alert(errorThrown);
                            alert(request);
                            if (request.status == 401) {
                                oj.Router.rootInstance.go('login')
                            }
                        },
                        success: function (data, textStatus, request) {
                            if (request.status == 200) {
                                callfun(data);
                            }

                        }

                    })

                }



                self.ajax = function (url, method, param, callfun) {

                    var paramData = {};
                    if (method != 'get' && method != 'delete') {

                        paramData = JSON.stringify(param);
                    } else {
                        paramData = param;

                    }
                    console.log('url:'+self.fullUrl(url));

                    mbe.invokeCustomAPI(self.fullUrl(url), method, paramData, function (_response) {
                        callfun(_response)
                    }, function (error) {
                        console.log(error)
                        if (error.statusCode == '401') {
                            try {
                                oj.Router.rootInstance.go('login')
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });

                }
                self.fullUrl = function (url) {


                    if (url.indexOf("http:") < 0 && url.indexOf("https:") < 0) {

                        return url = config.rest_base_url + config.rest_web_root + url;
                    } else {
                        return url;
                    }
                }


            }
            return new viewModel();
        }
)