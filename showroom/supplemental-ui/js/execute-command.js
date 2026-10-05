(function () {
  'use strict'

  function terminalFrame() {
    if (!window.parent || window.parent === window) return null
    try {
      return Array.from(window.parent.document.querySelectorAll('iframe')).find(function (frame) {
        return (frame.getAttribute('src') || '').includes('/terminal')
      }) || null
    } catch (_error) {
      return null
    }
  }

  function installTerminalListener(frame) {
    if (frame.dataset.executeListenerInstalled === 'true') return true
    try {
      var terminalWindow = frame.contentWindow
      var script = terminalWindow.document.createElement('script')
      script.textContent = [
        '(function () {',
        '  if (window.__launchpadExecuteListenerInstalled) return;',
        '  window.__launchpadExecuteListenerInstalled = true;',
        '  window.addEventListener("message", function (event) {',
        '    if (event.origin !== window.location.origin) return;',
        '    if (!event.data || event.data.type !== "execute") return;',
        '    var command = String(event.data.data || "").replace(/[\\r\\n]+$/, "");',
        '    if (!command) return;',
        '    if (window.client && typeof window.client.sendData === "function") {',
        '      window.client.sendData(command + "\\r");',
        '      return;',
        '    }',
        '    if (window.term && window.term._core && window.term._core._onData) {',
        '      window.term._core._onData.fire(command + "\\r");',
        '    }',
        '  });',
        '})();',
      ].join('\n')
      terminalWindow.document.body.appendChild(script)
      frame.dataset.executeListenerInstalled = 'true'
      return true
    } catch (_error) {
      return false
    }
  }

  function executeCommand(block, button) {
    var frame = terminalFrame()
    if (!frame || !installTerminalListener(frame)) {
      window.alert('Open the Terminal tab once, then try Execute again.')
      return
    }
    var code = block.querySelector('code')
    var command = (code ? code.textContent : block.textContent).trim()
    frame.contentWindow.postMessage({ type: 'execute', data: command + '\r' }, window.location.origin)
    var original = button.textContent
    button.textContent = 'Sent to Terminal'
    button.dataset.state = 'sent'
    window.setTimeout(function () {
      button.textContent = original
      delete button.dataset.state
    }, 1800)
  }

  function installExecuteControls() {
    document.querySelectorAll('.listingblock.execute').forEach(function (block) {
      if (block.querySelector('.launchpad-execute-button')) return
      var button = document.createElement('button')
      button.type = 'button'
      button.className = 'launchpad-execute-button'
      button.textContent = 'Execute'
      button.setAttribute('aria-label', 'Execute this command in the lab terminal')
      button.style.cssText = [
        'margin-top:0.65rem',
        'border:1px solid #0066cc',
        'border-radius:4px',
        'background:#0066cc',
        'color:#fff',
        'padding:0.45rem 0.9rem',
        'font:600 0.875rem RedHatText,Overpass,sans-serif',
        'cursor:pointer',
      ].join(';')
      button.addEventListener('click', function () {
        executeCommand(block, button)
      })
      block.appendChild(button)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installExecuteControls)
  } else {
    installExecuteControls()
  }
})()
