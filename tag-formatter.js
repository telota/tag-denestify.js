/**
 * converts string with nested tags into string with unnested tags
 * @param string string with nested tags
 * @returns {string} string with unnested tags
 */
formatTagString = (string) =>{
    let completeTagArray = buildNewTagArray(splitStringByTag(string));
    let contentArray = splitStringIntoContent(string);

    //counting variables
    let index;
    let tagIndex = 0;

    if(string.startsWith(contentArray[0],0)) {index = 1;}
    else {index = 0;}

    for(index; index < contentArray.length; index = index+3){
        contentArray.splice(index, 0, completeTagArray[tagIndex]);
        contentArray.splice(index+2, 0, completeTagArray[tagIndex+1]);

        tagIndex = tagIndex+2;
    }
    return contentArray.join("");

}

/**
 * splits String into an Array containing all Tags
 * @param string string with tags and content
 * @returns {Array.<T>} Array with extracted Tags
 */
splitStringByTag = (string) =>{
    let reg = new RegExp("<.*?>", "g");
    return string.match(reg);
}

/**
 * splits String into Array containing all non-empty ("") content
 * @param string with tags and content
 * @returns {Array.<T>} Array with extracted Content
 */
splitStringIntoContent = (string) =>{
    let reg = new RegExp("<.*?>", "g");
    let contentArray =string.split(reg);

    let filtered = contentArray.filter(entry => {
        return entry.length > 0;
    })
    return filtered;
}

/**
 *checks if Tags in Array are in correct order and complete pairs.
 *Completes incomplete tag-pairs
 * @param tagArray Array containing tags
 * @returns {Array.<T>} correctly ordered tag-array
 */
buildNewTagArray = (tagArray) => {
    let tagStringClosed = "";
    let tagStringOpening = "";

    //Array containing all opening Strings which fit into <t> </t> scheme
    let wholeTagStringArray =[];

    //check tagArray in pairs if every Tag has a matching partner (<t> </t> <d> </d>...)
    for (let i = 0; i < tagArray.length; i = i + 2) {

        tagStringClosed = "</" + getOpeningTagName (tagArray[i])+ ">";
        tagStringOpening = "<" + getClosingTagName(tagArray[i])+ ">";

        //if tagArray[i] is a closing tag, the new tag will be inserted before it
        if((/<\/.*>/.test(tagArray[i]))){
            for(let j = 0; j < wholeTagStringArray.length; j++){

                if (getOpeningTagName(wholeTagStringArray[j]) === getClosingTagName(tagArray[i])){
                    tagArray.splice(i,0,wholeTagStringArray[j]);
                }
            }
        }

        //if tagArray[i] is an opening tag, the new tag will be inserted after it
        else if ((tagStringClosed != tagArray[i + 1])) {
             tagArray.splice(i+1,0,tagStringClosed);
             wholeTagStringArray.push(tagArray[i]);
        }
    }
    return tagArray;
}

/**
 * get TagName from opening-tag without tag-attributes
 * @param tagElement tag with eventual tag-attributes
 * @returns string tagname
 */
getOpeningTagName = (tagElement) =>{
    //if tagArray[i] is an opening tag
    let regOpening = new RegExp("<|>");
    return tagElement.split(regOpening)[1].split(" ")[0];
}


/**
 * get TagName from closing-tag
 * @param tagElement
 * @returns string Tagname
 */
getClosingTagName = (tagElement) =>{
    //if tagArray[i] is a closing tag
    let regClosing = new RegExp("<\\/|>")

    return tagElement.split(regClosing)[1];

}


module.exports = {
    splitStringByTag: splitStringByTag,
    formatTagString: formatTagString,
    buildNewTagArray: buildNewTagArray,
    splitStringIntoContent: splitStringIntoContent

}


