/*
 * Detta är ett litet bibliotek med metoder som är återanvändbara
 */

// CSS-klasser
function hasClass(element, searchedClassName) {
    //hämtar alla klassnamn
    var wholeClassName = element.className;
    var classNameArray = wholeClassName.split(" ");
    var found = false;
    var index = 0;
    while(!found && index < classNameArray.length) {
        if (classNameArray[index] == searchedClassName) {
            found = true
        }
        index++;
    }
    return found;
}
function getFirstClass(element) { //faces are allways first
    var wholeClassName = element.className;
    var classNameArray = wholeClassName.split(" ");
    var firstClass = classNameArray[0];
    return firstClass;
}
function addClass(element, toAddClassName) {
    if (element.className == "undefined") {
        element.className = toAddClassName;
    }
    else {
        element.className += " " + toAddClassName;
    }
}
function removeClass(element, toRemoveClassName) {
    var cn = element.className;
    if (cn != "undefined") {
        if (hasClass(element, toRemoveClassName)) {
            if (cn.indexOf(" ") != -1) { // om det finns fler klasser
                if (cn.indexOf(toRemoveClassName) == 0) { //om den kommer först
                    element.className = cn.substring(toRemoveClassName.length)
                }
                else {
                    // class = "test pust dust"
                    var beforeRemovePosition = cn.indexOf(toRemoveClassName);
                    var beforeRemove = cn.substring(0, beforeRemovePosition - 1); // ta bort med " "
                    var afterRemovePosition = beforeRemovePosition  + toRemoveClassName.length;
                    var afterRemove = cn.substring(afterRemovePosition);
                    element.className = beforeRemove + afterRemove;
                }
            }
        }
    }
}

//write text
function writeText(holder, text) {
    removeContent(holder);
    var textNode = document.createTextNode(text);
    holder.appendChild(textNode);
}
function removeContent(holder) {
    // http://snipplr.com/view/2312/remove-all-childnodes/
    while(holder.hasChildNodes()) {
        holder.removeChild(holder.lastChild);
    }
}


//Händelser
function addEvent(element, eventType, eventFunction) {

    //cross browser compatibility
    //http://www.quirksmode.org/js/introevents.html
    //rekommenderar att använda det gamla sättet
    //IE registrerar events om och om igen.

    element.onclick = eventFunction;
    if (element.captureEvents) element.captureEvents(Event.CLICK);

    /*
    if(element.addEventListener){ //DOM
        element.addEventListener(eventType, eventFunction, false);
    }
    else if(element.attachEvent){//IE
        element.attachEvent("on"+eventType, eventFunction);
    }
    */
    // show hand if clickable
    if (eventType == "click") {
        addClass(element, "clickable");
    }

}
function removeEvent(element, eventType, eventFunction) {

    //Se kommentarer till addEvent
    element.onclick = null;
    /*
    if (element.removeEventListener) { //DOM
        element.removeEventListener(eventType, eventFunction, false);
    }
    else if(element.detachEvent) {
        element.detachEvent("on"+eventType, eventFunction);
    }
    */
    // don't show hand if clickable
    if (eventType == "click") {
        removeClass(element, "clickable");
    }
}
function getEventTarget(e) {
    /*
    var eventTarget;
    if (event.target)  // DOM
        eventTarget = event.target;
    else if (event.srcElement)  // IE
        eventTarget = event.srcElement;
    return eventTarget;
    */

    // inspirerats av studiematerial 9
    var activeElement;
    if(e && e.target){ //Mozilla
        activeElement = e.target;
    }
    else if(window.event && window.event.srcElement){ //IE
        activeElement = window.event.srcElement;
    }
    return activeElement;
}
