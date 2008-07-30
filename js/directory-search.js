
/**
 * File contains code for searching the Google gadgets directory.
 */

var RSS_BASE_URL = 'http://www.google.com/ig/directory?sort=popular&output=rss';

var FEATURED_GADGETS_URL = RSS_BASE_URL + '&cat=featured&hl=en&gl=us';

/**
 * Returns an array of objects representing gadgets. Keys in the objects are:
 *   link, guid, title, description, thumbnail
 * ... and corresponds to the nodes with the same names in the RSS feed.
 */
function getRadioGadgets() {
  var rssUrl = buildSearchUrl("radio");

  _IG_XmlContent(rssUrl, function(response) {
    if (response == null || typeof(response) != 'object' || 
        response.firstChild == null) {
      return [];
    }
      
    var gadgets = [];
    var items = response.getElementsByTagName('item');

    for (var i = 0; i < items.length; ++i) {
      var item = items.item(i);
      var gadget = {
        'link': getNodeValue(item, 'link'),
        'guid': getNodeValue(item, 'guid'),
        'title': getNodeValue(item, 'title'),
        'description': getNodeValue(item, 'description')
      };

      gadgets.push(gadget);
    }

    return gadgets;
  }
}

function buildSearchUrl(searchQuery) {
  return RSS_BASE_URL + '&q=' + searchQuery;
}

/**
 * Extracts the value from an XML node that has only one (text) child.
 */
function getNodeValue(item, nodeName, opt_defaultValue) {
  try {
    return item.getElementsByTagName(nodeName).item(0).firstChild.nodeValue;
  } catch (e) {
    return opt_defaultValue || '';
  }
}

