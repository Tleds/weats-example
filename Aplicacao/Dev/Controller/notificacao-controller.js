'use-strict'
const services_mesas = require('../Model/Services/mesas-services');
const validate = require('./functions/validate-functions')
const AWS = require('aws-sdk');


module.exports = {

    async get(req, res, next){
        
    },
    async post(req, res, next){

        const credentials = {
            id: 'AKIAJ2FD7Z75UCJTO4WA',
            secret: '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'
        }
        
        // Set region
        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: credentials.id,
            secretAccessKey: credentials.secret
        
        });
        // Create publish parameters
        
        let params = {
            Message: 'Weats', /* required */
            PhoneNumber: '55319',
        };
        
        // Create promise and SNS service object
        
        
        function sendSMS(params) {
            var publishTextPromise = new AWS.SNS().publish(params).promise();
            // Handle promise's fulfilled/rejected states
            publishTextPromise.then(function (data) {
                console.log("MessageID is " + data.MessageId);
            }).catch(function (err) {
                console.error(err, err.stack);
            });
        }
        
        sendSMS(params);
        
    },
    async put(req, res, next){ //request, responde e next

    },
    async delete(req, res, next){ //request, responde e next  
        
    }
}