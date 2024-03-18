document.addEventListener('DOMContentLoaded', async () => {
  const colorScheme = await loadColorSchemeSettings();

  document.getElementById('bin1Max').value = colorScheme.bin1Max;
  document.getElementById('bin1Color').value = colorScheme.bin1Color;

  document.getElementById('bin2Min').value = colorScheme.bin2Min;
  document.getElementById('bin2Min').min = colorScheme.bin1Max + 1;
  document.getElementById('bin2Max').value = colorScheme.bin2Max;
  document.getElementById('bin2Max').min = colorScheme.bin2Min + 1;
  document.getElementById('bin2Color').value = colorScheme.bin2Color;

  document.getElementById('bin3Min').value = colorScheme.bin3Min;
  document.getElementById('bin3Min').min = colorScheme.bin2Max + 1;
  document.getElementById('bin3Max').value = colorScheme.bin3Max;
  document.getElementById('bin3Max').min = colorScheme.bin3Min + 1;
  document.getElementById('bin3Color').value = colorScheme.bin3Color;

  document.getElementById('bin4Min').value = colorScheme.bin4Min;
  document.getElementById('bin4Min').min = colorScheme.bin3Max + 1;
  document.getElementById('bin4Max').value = colorScheme.bin4Max;
  document.getElementById('bin4Max').min = colorScheme.bin4Min + 1;
  document.getElementById('bin4Color').value = colorScheme.bin4Color;

  document.getElementById('bin5Min').value = colorScheme.bin5Min;
  document.getElementById('bin5Color').value = colorScheme.bin5Color;
});


document.getElementById('saveColorScheme').addEventListener('click', async () => {

  const bin1Max = parseInt(document.getElementById('bin1Max').value, 10);
  const bin1Color = document.getElementById('bin1Color').value;

  const bin2Min = bin1Max + 1;
  const bin2Max = parseInt(document.getElementById('bin2Max').value, 10);
  const bin2Color = document.getElementById('bin2Color').value;

  const bin3Min = bin2Max + 1;
  const bin3Max = parseInt(document.getElementById('bin3Max').value, 10);
  const bin3Color = document.getElementById('bin3Color').value;

  const bin4Min = bin3Max + 1;
  const bin4Max = parseInt(document.getElementById('bin4Max').value, 10);
  const bin4Color = document.getElementById('bin4Color').value;

  const bin5Min = bin4Max + 1;
  const bin5Color = document.getElementById('bin5Color').value;

  const colorScheme = {
    bin1Max, bin1Color,
    bin2Min, bin2Max, bin2Color,
    bin3Min, bin3Max, bin3Color,
    bin4Min, bin4Max, bin4Color,
    bin5Min, bin5Color
  };

  chrome.storage.sync.set({ colorScheme }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error saving color scheme:', chrome.runtime.lastError.message);
    } else {
      console.log('Color scheme saved successfully');
      alert('Color scheme settings saved successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  });
  chrome.runtime.sendMessage({ action: 'updateBadge' });
});
