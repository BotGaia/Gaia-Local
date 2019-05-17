module.exports = {
    treatPostCode: (name) => {
        let formattedName = [];
        let body = name.split(',');
        body.forEach(function (item) {
            formattedName.push(item.replace(/[.,\/ -]\d+/g, ''));
        });

        return formattedName;
    }
};