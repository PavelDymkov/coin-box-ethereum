exports.catched = async (testFunction, containingMessage) => {
    let hasError = false;

    try {
        await testFunction();
    } catch (error) {
        hasError = error.message.indexOf(containingMessage) != -1;
    }

    return hasError;
};
