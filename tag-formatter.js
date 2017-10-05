/** converts string with nested tags into string with unnested tags
 * @param string string with nested tags
 * @param ignoreTagList Array with tags which shouldn't be denested. Is set to empty if undefined
 * @returns {string}string with unnested tags
 */
formatTagString = (string, ignoreTagList) => {
   //ignoreTagList == Array mit Strings die nicht denestified werden
    let reg = new RegExp("(<.*?>)", "g");
    let contentArray = string.split(reg);

    let tagStringClosed = "";
    let tagStringOpening = "";

    if(ignoreTagList === undefined){
        ignoreTagList = [];
    }

    let isIgnored = false;

    //Array for opened tags without corresponding closing tags
    let wholeTagStringArray = [];

    for (let index = 0; index < contentArray.length; index++) {

        //if the tag-ignore-list contains items, check if current contentArray-element is listed there
        if(ignoreTagList.length > 0) {
            for (let i = 0; i < ignoreTagList.length; i++) {

                if (/<[^\/].*>/.test(contentArray[index])) {
                    if (getOpeningTagName(contentArray[index]) === ignoreTagList[i]) {
                        isIgnored = true;
                    }
                }

                else if (/<\/.*>/.test(contentArray[index])) {
                    if (getClosingTagName(contentArray[index]) === ignoreTagList[i]) {
                        isIgnored = true
                    }
                }
            }
        }

        //If element is an opening tag and not in the "tag-ignore-list"
        if ((/<[^\/].*>/.test(contentArray[index])) && !isIgnored) {
            tagStringClosed = "</" + getOpeningTagName(contentArray[index]) + ">";
            tagStringOpening = "<" + getClosingTagName(contentArray[index]) + ">";

            //Array-structure looking like ["<t>", "Hello", "</t>"] - every second entry is a tag
            if (contentArray[index + 2] !== tagStringClosed) {
                contentArray.splice(index + 2, 0, tagStringClosed);
                wholeTagStringArray.push(contentArray[index]);
                index = index + 2;
            }
        }

        //if element is a closing tag and not in the "tag-ignore-list"
        else if ((/<\/.*>/.test(contentArray[index]))&& !isIgnored) {
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
        isIgnored = false;
    }
    return contentArray.join("").replace(/<[^<|>|\/]*><\/[^<|>]*>/g, "");
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
