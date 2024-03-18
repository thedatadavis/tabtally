chrome.runtime.onInstalled.addListener(function() {
  updateBadge();
});

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateBadge") {
    updateBadge();
  }
});

function updateBadge() {
  chrome.tabs.query({}, async (tabs) => {
    const colorScheme = await loadColorSchemeSettings();
    chrome.action.setBadgeText({ text: tabs.length.toString() });
    chrome.action.setBadgeBackgroundColor({ color: getBadgeColor(tabs.length, colorScheme) });
  });
}

function loadColorSchemeSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('colorScheme', (data) => {
      resolve(data.colorScheme || {
        bin1Max: 10, bin1Color: "#339900",
        bin2Min: 11, bin2Max: 35, bin2Color: "#99cc33",
        bin3Min: 36, bin3Max: 60, bin3Color: "#ffcc00",
        bin4Min: 61, bin4Max: 85, bin4Color: "#ff9966",
        bin5Min: 86, bin5Color: "#cc3300"
      });
    });
  });
}

function getBadgeColor(tabCount, colorScheme) {
  if (tabCount <= colorScheme.bin1Max) {
    return colorScheme.bin1Color;
  } else if (tabCount <= colorScheme.bin2Max) {
    return colorScheme.bin2Color;
  } else if (tabCount <= colorScheme.bin3Max) {
    return colorScheme.bin3Color;
  } else if (tabCount <= colorScheme.bin4Max) {
    return colorScheme.bin4Color;
  } else {
    return colorScheme.bin5Color;
  }
}