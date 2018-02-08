define(['jquery', 'common/mcs'], function ($, mcs) {
    var mcs_config = {
        "logLevel": mcs.LOG_LEVEL.INFO,
        "logHTTP": true,
        "mobileBackends": {
            "tongfupoc": {
                "default": true,
                "baseUrl": "https://cofco-a491065.mobileenv.us2.oraclecloud.com:443",
                "applicationKey": "7c25db2a-1790-4756-b923-6c38b5076487",
                "analytics": {
                    "location": true
                },
                "authorization": {
                    "basicAuth": {
                        "backendId": "c1769fbf-18ac-4c14-bab2-874cbfafc3ce",
                        "anonymousToken": "QTQ5MTA2NV9DT0ZDT19NT0JJTEVfQU5PTllNT1VTX0FQUElEOkFobWwyZ3kzX2NvYmp0"
                    },
                    "oAuth": {
                        "clientId": "5d0d027c-611b-44c1-8331-1b437f83372c",
                        "clientSecret": "HYbpCiRLaiAONbsNBMf2",
                        "tokenEndpoint": "https://a491065.identity.us.oraclecloud.com/oam/oauth2/tokens"
                    },
                    "facebookAuth": {
                        "facebookAppId": "YOUR_FACEBOOK_APP_ID",
                        "backendId": "YOUR_BACKEND_ID",
                        "anonymousToken": "YOUR_BACKEND_ANONYMOUS_TOKEN"
                    },
                    "ssoAuth": {
                        "clientId": "YOUR_CLIENT_ID",
                        "clientSecret": "YOUR_ClIENT_SECRET",
                        "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
                    },
                    "tokenAuth": {
                        "backendId": "17a07491-be7c-4feb-b732-77b43ccd4d93"
                    }
                }
            }
        }
      
    };
    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        //Always using the same collection in this example, called JETCollection. Can be dynamic if using multiple collections, but for example using one collection.
        var COLLECTION_NAME = "cfg_collection";
        function init() {
            mcs.MobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is JETSample.
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('tongfupoc');
            self.mobileBackend.setAuthenticationType("oAuth ");
        }
        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here.
        self.authAnonymous = function () {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                function (response, data) {
                    console.log("Success authenticating against mobile backend");
                },
                function (statusCode, data) {
                    console.log("Failure authenticating against mobile backend");
                }
            );
        };
        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (username, password, successCallback, failureCallback) {
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };
        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };
        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.isAuthorized;
        };
        self.invokeCustomAPI = function (_path, _method, _data, _successCallback, _errorCallback) {
            return self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(_path, _method, _data).then(_successCallback, _errorCallback);
        };
        self.invokeCustomAPI = function (_path, _method, _data, _successCallback, _errorCallback) {
            return self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(_path, _method, _data).then(_successCallback, _errorCallback);
        };

        self.getStorageObjectFromCollection = function(collectionName,storageId,success,failure) {
            self.mobileBackend.Storage.getCollection(collectionName, null
              , function(collection) {
                collection.getObject(storageId
                    , function(storageObject) {success(storageObject)}
                    , failure
                    ,'blob');
              }
              , failure);
          };
        init();
    }
    return new MobileBackend();
});