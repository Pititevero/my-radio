
/**
 * Builds the URL used to embed a gadget.
 */
function createEmbedGadgetUrl(gadgetXmlUrl) {
  return 'http://www.gmodules.com/ig/ifr?url=' + gadgetXmlUrl +
      ['', 'w=320', 'h=60', 'output=iframe'].join('&amp;');
}

