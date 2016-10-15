var Alexa = require('alexa-sdk');
// var foodapi = require('./foodapi.js');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Can I Eat';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
				this.emit('HelloIntent');
        /*this.emit('GetFact');*/
    },
    'HelloIntent': function () {
				this.emit('HelloIntent');
				/*this.emit('GetFact');*/
    },
    'FoodQuery': function () {
        const food = this.event.request.intent.slots.Food.value;
        this.emit(':tell', `You asked about ${food}`);
    },
		/*
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        // this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
        this.emit(':tell', 'Hello Dave! I hope you are well.')
    },
		*/
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
