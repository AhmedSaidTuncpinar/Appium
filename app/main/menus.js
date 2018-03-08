import { app, shell } from 'electron';
import { createNewSessionWindow, createPlaybackWindow } from './appium';
import autoUpdater from './auto-updater';

let menuTemplates = {mac: {}, other: {}};

function macMenuAppium (mainWindow) {
  return {
    label: 'Appium',
    submenu: [{
      label: 'About Appium',
      selector: 'orderFrontStandardAboutPanel:'
    }, {
      label: 'Check for updates',
      click () {
        autoUpdater.openUpdaterWindow(mainWindow);
        autoUpdater.checkForUpdates();
      }
    }, {
      type: 'separator'
    }, {
      label: 'New Inspector Session...',
      accelerator: 'Command+N',
      click () {
        createNewSessionWindow(mainWindow);
      }
    }, {
      label: 'New Playback Session...',
      accelerator: 'Command+P',
      click () {
        createPlaybackWindow(mainWindow);
      }
    }, {
      type: 'separator'
    }, {
      label: 'Hide Appium',
      accelerator: 'Command+H',
      selector: 'hide:'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Shift+H',
      selector: 'hideOtherApplications:'
    }, {
      label: 'Show All',
      selector: 'unhideAllApplications:'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click () {
        app.quit();
      }
    }]
  };
}

const macMenuEdit = {
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'Command+Z',
    selector: 'undo:'
  }, {
    label: 'Redo',
    accelerator: 'Shift+Command+Z',
    selector: 'redo:'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'Command+X',
    selector: 'cut:'
  }, {
    label: 'Copy',
    accelerator: 'Command+C',
    selector: 'copy:'
  }, {
    label: 'Paste',
    accelerator: 'Command+V',
    selector: 'paste:'
  }, {
    label: 'Select All',
    accelerator: 'Command+A',
    selector: 'selectAll:'
  }]
};

function macMenuView (mainWindow) {
  return {
    label: 'View',
    submenu: (process.env.NODE_ENV === 'development') ? [{
      label: 'Reload',
      accelerator: 'Command+R',
      click () {
        mainWindow.webContents.reload();
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: 'Alt+Command+I',
      click () {
        try {
          mainWindow.toggleDevTools();
        } catch (ign) {}
      }
    }] : [{
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  };
}

const macMenuWindow = {
  label: 'Window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'Command+M',
    selector: 'performMiniaturize:'
  }, {
    label: 'Close',
    accelerator: 'Command+W',
    selector: 'performClose:'
  }, {
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    selector: 'arrangeInFront:'
  }]
};

const macMenuHelp = {
  label: 'Help',
  submenu: [{
    label: 'Learn More',
    click () {
      shell.openExternal('http://appium.io');
    }
  }, {
    label: 'Documentation',
    click () {
      shell.openExternal('https://appium.io/documentation.html');
    }
  }, {
    label: 'Search Issues',
    click () {
      shell.openExternal('https://github.com/appium/appium-desktop/issues');
    }
  }]
};

menuTemplates.mac = (mainWindow) => [
  macMenuAppium(mainWindow),
  macMenuEdit,
  macMenuView(mainWindow),
  macMenuWindow,
  macMenuHelp
];

function otherMenuFile (mainWindow) {
  let fileSubmenu = [{
    label: '&Open',
    accelerator: 'Ctrl+O'
  }, {
    label: '&About Appium',
    click () {
      autoUpdater.openUpdaterWindow(mainWindow);
      autoUpdater.checkForUpdates();
    }
  }, {
    type: 'separator'
  }, {
    label: '&New Inspector Session...',
    accelerator: 'Ctrl+N',
    click () {
      createNewSessionWindow(mainWindow);
    }
  }, {
    label: 'New &Playback Session...',
    accelerator: 'Ctrl+P',
    click () {
      createPlaybackWindow(mainWindow);
    }
  }, {
    label: '&Close',
    accelerator: 'Ctrl+W',
    click () {
      mainWindow.close();
    }
  }];

  // If it's Windows, add a 'Check for Updates' menu option
  if (process.platform === 'win32') {
    fileSubmenu.splice(1, 0, {
      label: '&Check for updates',
      click () {
        autoUpdater.openUpdaterWindow(mainWindow);
        autoUpdater.checkForUpdates();
      }
    });
  }

  return {
    label: '&File',
    submenu: fileSubmenu,
  };
}

function otherMenuView (mainWindow) {
  return {
    label: '&View',
    submenu: (process.env.NODE_ENV === 'development') ? [{
      label: '&Reload',
      accelerator: 'Ctrl+R',
      click () {
        mainWindow.webContents.reload();
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+Ctrl+I',
      click () {
        try {
          mainWindow.toggleDevTools();
        } catch (ign) {}
      }
    }] : [{
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  };
}

const otherMenuHelp = {
  label: 'Help',
  submenu: [{
    label: 'Learn More',
    click () {
      shell.openExternal('http://appium.io');
    }
  }, {
    label: 'Documentation',
    click () {
      shell.openExternal('https://appium.io/documentation.html');
    }
  }, {
    label: 'Search Issues',
    click () {
      shell.openExternal('https://github.com/appium/appium-desktop/issues');
    }
  }]
};

menuTemplates.other = (mainWindow) => [
  otherMenuFile(mainWindow),
  otherMenuView(mainWindow),
  otherMenuHelp
];

export default menuTemplates;
