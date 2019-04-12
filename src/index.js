// const setup = require("./starter-kit/setup");
const getChrome = require("./getChrome");
const puppeteer = require("puppeteer-core");

const { takeScreenshot } = require("./takeScreenshot.js");

const handler = async (event, context, callback) => {
    // // For keeping the browser launch
    context.callbackWaitsForEmptyEventLoop = false;
    const chrome = await getChrome();

    console.log("got chrome");
    console.log(chrome);

    const browser = await puppeteer.connect({
        browserWSEndpoint: chrome.endpoint
    });

    console.log("got browser");

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "access-control-allow-methods": "GET"
    };

    const targetUrl = event.queryStringParameters.url;

    try {
        await takeScreenshot(browser, targetUrl);
    } catch (e) {
        console.log("TCL: handler -> e", e)
    }
};

exports.handler = handler;

const event = {
    queryStringParameters: {
        url: 'https://medium.muz.li/weekly-design-inspiration-201-b0ec904c2f8d'
    }
}

const context = {};
const callback = (response) => {
    console.log("TCL: callback -> response", response)
}


const result = handler(event, context, callback);