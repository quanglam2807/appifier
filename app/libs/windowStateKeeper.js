// https://raw.githubusercontent.com/mawie81/electron-window-state/master/index.js
const path = require('path');
const electron = require('electron');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');
const deepEqual = require('deep-equal');

module.exports = (options) => {
  const app = electron.app;
  const screen = electron.screen;
  let state;
  let winRef;
  let stateChangeTimer;
  const eventHandlingDelay = 100;
  const config = Object.assign({
    /* Store state for each app seperately */
    file: `window-state-${options.id}.json`,
    path: app.getPath('userData'),
    maximize: true,
    fullScreen: true,
  }, options);
  const fullStoreFileName = path.join(config.path, config.file);

  function isNormal(win) {
    return !win.isMaximized() && !win.isMinimized() && !win.isFullScreen();
  }

  function hasBounds() {
    return state &&
      state.x !== undefined &&
      state.y !== undefined &&
      state.width !== undefined &&
      state.height !== undefined;
  }

  function validateState() {
    const isValid = state && (hasBounds() || state.isMaximized || state.isFullScreen);
    if (!isValid) {
      state = null;
      return;
    }

    if (hasBounds() && state.displayBounds) {
      // Check if the display where the window was last open is still available
      const displayBounds = screen.getDisplayMatching(state).bounds;
      const sameBounds = deepEqual(state.displayBounds, displayBounds, { strict: true });
      if (!sameBounds) {
        if (displayBounds.width < state.displayBounds.width) {
          if (state.x > displayBounds.width) {
            state.x = 0;
          }

          if (state.width > displayBounds.width) {
            state.width = displayBounds.width;
          }
        }

        if (displayBounds.height < state.displayBounds.height) {
          if (state.y > displayBounds.height) {
            state.y = 0;
          }

          if (state.height > displayBounds.height) {
            state.height = displayBounds.height;
          }
        }
      }
    }
  }

  function updateState(inputWin) {
    const win = inputWin || winRef;
    if (!win) {
      return;
    }

    const winBounds = win.getBounds();
    if (isNormal(win)) {
      state.x = winBounds.x;
      state.y = winBounds.y;
      state.width = winBounds.width;
      state.height = winBounds.height;
    }
    state.isMaximized = win.isMaximized();
    state.isFullScreen = win.isFullScreen();
    state.displayBounds = screen.getDisplayMatching(winBounds).bounds;
  }

  function saveState(win) {
    // Update window state only if it was provided
    if (win) {
      updateState(win);
    }

    // Save state
    try {
      mkdirp.sync(path.dirname(fullStoreFileName));
      jsonfile.writeFileSync(fullStoreFileName, state);
    } catch (err) {
      // Don't care
    }
  }

  function stateChangeHandler() {
    // Handles both 'resize' and 'move'
    clearTimeout(stateChangeTimer);
    stateChangeTimer = setTimeout(updateState, eventHandlingDelay);
  }

  function closeHandler() {
    updateState();
  }

  function closedHandler() {
    // Unregister listeners and save state
    /* eslint-disable no-use-before-define */
    unmanage();
    /* eslint-enable no-use-before-define */
    saveState();
  }


  function unmanage() {
    if (winRef) {
      winRef.removeListener('resize', stateChangeHandler);
      winRef.removeListener('move', stateChangeHandler);
      clearTimeout(stateChangeTimer);
      winRef.removeListener('close', closeHandler);
      winRef.removeListener('closed', closedHandler);
      winRef = null;
    }
  }

  function manage(win) {
    if (config.maximize && state.isMaximized) {
      win.maximize();
    }
    if (config.fullScreen && state.isFullScreen) {
      win.setFullScreen(true);
    }
    win.on('resize', stateChangeHandler);
    win.on('move', stateChangeHandler);
    win.on('close', closeHandler);
    win.on('closed', closedHandler);
    winRef = win;
  }

  // Load previous state
  try {
    state = jsonfile.readFileSync(fullStoreFileName);
  } catch (err) {
    // Don't care
  }

  // Check state validity
  validateState();

  // Set state fallback values
  state = Object.assign({
    width: config.defaultWidth || 800,
    height: config.defaultHeight || 600,
  }, state);

  return {
    get x() { return state.x; },
    get y() { return state.y; },
    get width() { return state.width; },
    get height() { return state.height; },
    get isMaximized() { return state.isMaximized; },
    get isFullScreen() { return state.isFullScreen; },
    saveState,
    unmanage,
    manage,
  };
};
