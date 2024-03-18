document.addEventListener('DOMContentLoaded', function () {
    updateTabCount();
  });
  
chrome.tabs.onCreated.addListener(updateTabCount);
chrome.tabs.onRemoved.addListener(updateTabCount);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateTabCount") {
    updateTabCount();
  }
});

function updateTabCount() {
  chrome.tabs.query({}, async (tabs) => {
    const tabCount = tabs.length;
    const colorScheme = await loadColorSchemeSettings();
    const badgeColor = getBadgeColor(tabCount, colorScheme);
    const popupBody = document.getElementById('tabCount-number');
    const countIcon = document.getElementById('tabCount-icon');

    popupBody.innerText = `You have ${tabCount} open tabs.`
    countIcon.style.color = badgeColor;

  });
}
