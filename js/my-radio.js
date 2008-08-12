
/**
 * Builds the URL used to embed a gadget.
 */
function createEmbedGadgetUrl(gadgetXmlUrl) {
  return 'http://www.gmodules.com/ig/ifr?url=' + gadgetXmlUrl +
      ['', 'w=320', 'h=60', 'output=iframe'].join('&amp;');
}


function updateRadioList(radioList) {
  getRadioGadgets(null, function (gadgetItem) {
    if (!isFeed(gadgetItem)) {
      radioList.appendChild(createOptionElement(gadgetItem));
    }
  });
}

function createOptionElement(gadgetItem) {
  var element = document.createElement('option');
  element.setAttribute('value', gadgetItem.guid);
  element.appendChild(document.createTextNode(gadgetItem.title));
  return element;
}

function updateStation(radioList, radio) {
  var selectedItem = radioList[radioList.selectedIndex];
  radio.setAttribute('src', createEmbedGadgetUrl(selectedItem.value));
  console.debug(selectedItem);
}

