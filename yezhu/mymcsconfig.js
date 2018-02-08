var mcs_config = {
    "logLevel": "",
    "logHTTP": true,
    "mobileBackends": {
        "jet4mcs": {
            "authType": "basicAuth",
            "default": true,
            "baseUrl": "https://cofco-a491065.mobileenv.us2.oraclecloud.com:443",
            "applicationKey": "",
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
                    "backendId": "YOUR_BACKEND_ID"
                }
            }
        }
    },
    // "sync": {
    //   "periodicRefreshPolicy": "PERIODIC_REFRESH_POLICY_REFRESH_NONE",
    //   "policies": [
    //     {
    //       "path": '/mobile/custom/firstApi/tasks',
    //       "fetchPolicy": 'FETCH_FROM_SERVICE_ON_CACHE_MISS'
    //     },
    //     {
    //       "path": '/mobile/custom/secondApi/tasks',
    //     }
    //   ]
    // },
    "syncExpress": {
        "handler": "OracleRestHandler",
        "policies": [
            {
                "path": '/mobile/custom/test/approveList/:id?'
            }
        ]
    }

};