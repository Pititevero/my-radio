
/**
 * Builds the URL used to embed a gadget.
 */
function createEmbedGadgetUrl(gadgetXmlUrl) {
  return 'http://www.gmodules.com/ig/ifr?url=' + gadgetXmlUrl +
      ['', 'w=320', 'h=60', 'output=iframe'].join('&amp;');
}


function updateRadioList(radioList) {
  getRadioGadgets(undefined, function (gadgetItem) {
    if (!isFeed(gadgetItem)) {
      radioList.appendChild(createOptionElement(gadgetItem));
    }
  }
}

function createOptionElement(gadgetItem) {
  var element = document.createElement('option');

  element.setAttribute('value', gadgetItem.guid);
  element.appendChild(document.createTextNode(gadgetItem.title));

  return element;
}

function showRadio(stationUrl) {
  _gel('gadget').setAttribute('src', createEmbedGadgetUrl(stationUrl));
}

function setStation(select) {
  showRadio(select[select.selectedIndex].value);
}

