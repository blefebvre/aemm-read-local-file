/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // read text file from the filesystem via XHR
        app.fetchJSON('data.json', function(err, data) {
            if (err) {
                return console.error(err);
            }
            // set the contents of #header to the file's message property
            document.getElementById("header").textContent = data.message;
        });
    },
    fetchJSON: function(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if ((request.status >= 200 && request.status < 400) || request.status === 0) {
                // Success!
                return callback(null, JSON.parse(request.responseText));
            } else {
                // We reached our target server, but it returned an error
                return callback('Connected to [' + url + '] but server returned a [' + request.status + '] error.');
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            return callback('Connection error to [' + url + '].');
        };

        request.send();
    }
};

app.initialize();