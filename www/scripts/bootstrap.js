"browser test", function () {
    try {
        eval("``.length")
    } catch (error) {
        showErrorMessage('Browser not supported. Use latest version');
    }
} ();

if (typeof web3 == "undefined") {
    showErrorMessage(`Install <a href="https://metamask.io/">MetaMask</a> extension for your browser.`);
}

if (!web3.isConnected()) {
    showErrorMessage(`Can't connect to testrpc`);
}



function showErrorMessage(message) {
    document.write(message);

    throw new Error("can't start application");
}
