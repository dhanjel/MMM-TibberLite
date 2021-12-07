const request = require('request');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
        
    socketNotificationReceived: function(notification, payload)
	{
		const self = this;

		if(notification === "FETCH_DATA")
		{
            request({
                url : "https://api.tibber.com/v1-beta/gql",
                method :"POST",
                headers : {
                  "content-type": "application/json",
                  "Authorization": "Bearer " + payload.config.accessToken,
                },
                body: {
                    "query": "subscription{ liveMeasurement(homeId:\"1d490465-b415-470e-b696-8760c6e73079\"){ power } }"
                },
                json: true
              }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        self.sendSocketNotification("DATA_RECEIVED", body);
                    } else {
                        Log.error("Failed to request data from Tibber: " + response);
                    }
              });


			
		}
	}
})