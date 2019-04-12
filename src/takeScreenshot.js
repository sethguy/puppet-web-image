
exports.takeScreenshot = async (browser, targetUrl) => {
	console.log("TCL: exports.takeScreenshot -> targetUrl", targetUrl)
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        isMobile: true
    });

    await page.goto(targetUrl, {
        waitUntil: ["domcontentloaded", "networkidle0"]
    });

    let element = null;

    const imagePath = `./lake/screenshot-${new Date().getTime()}.png`;

    console.error("Loaded target element");

    await page.screenshot({
        path: imagePath,
        clip: {
            x: 0,
            y: 0,
            width:1920,
            height: 1080,
        }
    });

    console.error("Made screeshot");

    return null;
};
