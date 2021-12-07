Module.register("MMM-TibberLite",{
	// Default module config.
	defaults: {
		accessToken: "Invalid config",
        interval: 60000
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

        if (this.config.accessToken.length == 0) {
            wrapper.innerHTML = "Missing access token";
        } else if (!this.dataLoaded){
            wrapper.innerHTML = "Loading data..";
        } else {
            let tb = document.createElement("table");
            let row = document.createElement("tr");
        	let titleCol = document.createElement("td");
        	let dataCol = document.createElement("td");

            //let currentCost = parseFloat(this.result.data.viewer.homes[0].currentSubscription.priceInfo.current.total).toFixed(2) + " " + this.result.data.viewer.homes[0].currentSubscription.priceInfo.current.currency;
            let currentCost = JSON.stringify(this.result);
             titleCol.innerText = "Current cost:"
             dataCol.innerHTML = currentCost;

            row.appendChild(titleCol);
        	row.appendChild(dataCol);
        	tb.appendChild(row);
            wrapper.appendChild(tb);
        }
		
		return wrapper;
	},

    start: function() {
        const self = this;
        this.dataLoaded = false;
        this.getTibberData();
        setInterval(function() {
            self.getTibberData();
            self.updateDom();
        }, this.config.interval);
    },

    getHeader: function() {
        return "Tibber";
    },

    getTibberData: function() {
        this.sendSocketNotification("FETCH_DATA", {
            config: this.config
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "DATA_RECEIVED") {
            this.result = payload;
            this.dataLoaded = true;
            this.updateDom();
        }
    },
});