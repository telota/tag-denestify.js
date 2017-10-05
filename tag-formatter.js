/**
 * converts string with nested tags into string with unnested tags
 * @param string string with nested tags
 * @returns {string} string with unnested tags
 */
formatTagString = (string) => {
    let reg = new RegExp("(<.*?>)", "g");
    let contentArray = string.split(reg);

    let tagStringClosed = "";
    let tagStringOpening = "";

    //Array for opened tags without corresponding closing tags
    let wholeTagStringArray = [];

    for (let index = 0; index < contentArray.length; index++) {

        //If element is an opening tag
        if ((/<[^\/].*>/.test(contentArray[index]))) {
            tagStringClosed = "</" + getOpeningTagName(contentArray[index]) + ">";
            tagStringOpening = "<" + getClosingTagName(contentArray[index]) + ">";

            //Array-structure looking like ["<t>", "Hello", "</t>"] - every second entry is a tag
            if (contentArray[index + 2] !== tagStringClosed) {
                contentArray.splice(index + 2, 0, tagStringClosed);
                wholeTagStringArray.push(contentArray[index]);
                index = index + 2;
            }
        }

        else if ((/<\/.*>/.test(contentArray[index]))) {
            if (getOpeningTagName(contentArray[index - 2]) !== getClosingTagName(contentArray[index])) {
                for (let j = wholeTagStringArray.length-1; j > -1; j--) {

                    if (getOpeningTagName(wholeTagStringArray[j]) === getClosingTagName(contentArray[index])) {
                        contentArray.splice(index - 1, 0, wholeTagStringArray[j]);
                        wholeTagStringArray.splice(j, 1);
                        index = index + 2;
                    }
                }
            }
        }
    }
    return contentArray.join("").replace(/<[^<|>]*><\/[^<|>]*>/g, "");

};

/**
 * get TagName from opening-tag without tag-attributes
 * @param tagElement tag with eventual tag-attributes
 * @returns string TagName
 */
getOpeningTagName = (tagElement) => {
    //if tagArray[i] is an opening tag
    let regOpening = new RegExp("<|>");
    return tagElement.split(regOpening)[1].split(" ")[0];
};

/**
 * get TagName from closing-tag
 * @param tagElement
 * @returns string TagName
 */
getClosingTagName = (tagElement) => {
    //if tagArray[i] is a closing tag
    let regClosing = new RegExp("<\\/|>")
    return tagElement.split(regClosing)[1];
};

module.exports = {
    formatTagString: formatTagString
};
