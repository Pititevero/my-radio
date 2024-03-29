
/**
 * File contains code for searching the Google gadgets directory.
 */

var RSS_BASE_URL = 'http://www.google.com/ig/directory?sort=popular&output=rss';

var FEATURED_GADGETS_URL = RSS_BASE_URL + '&cat=featured&hl=en&gl=us';

/**
 * Returns an array of objects representing gadgets. Keys in the objects are:
 *   link, guid, title, description, thumbnail, ghapi:type
 * ... and corresponds to the nodes with the same names in the RSS feed.
 */
function getRadioGadgets(callback, eachCallback) {
  var rssUrl = buildSearchUrl("radio");
  var doCallback = typeof(callback) == 'function';
  var doEachCallback = typeof(eachCallback) == 'function';

  if (!doCallback && !doEachCallback) {
    return;
  }

  _IG_FetchXmlContent(rssUrl, function(response) {
    if (!response || typeof(response) != 'Object' || 
        !response.firstChild) {
      if (doCallback) {
        callback([]);
      }
    }

    var nodes = [
        'link', 
        'guid', 
        'title', 
        'description',
        'thumbnail',
        'ghapi:type'];
    var gadgets = [];
    var items = response.getElementsByTagName('item');

    for (var i = 0; i < items.length; ++i) {
      var item = items.item(i);
      var gadget = {};

      for (var n = 0, node; node = nodes[i]; ++n) {
        gadget[node] = getNodeValue(item, node);
      }

      if (doEachCallback) {
        eachCallback(gadget);
      }

      if (doCallback) {
        gadgets.push(gadget);
      }
    }

    if (doCallback)
      callback(gadgets);
  });
}


/**
 * Builds the URI to ask for a list of radio stations.
 */
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

/**
 * Returns whether an item is a feed or not.
 */
function isFeed(item) {
  return item['ghapi:type'] == 'feed';
}

