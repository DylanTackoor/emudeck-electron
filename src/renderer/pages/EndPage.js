import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from 'context/globalContext';

import End from 'components/organisms/Wrappers/End.js';

const EndPage = () => {
  const { state, setState } = useContext(GlobalContext);
  const [statePage, setStatePage] = useState({
    disabledNext: true,
    disabledBack: true,
    data: '',
  });
  const { disabledNext, disabledBack, data } = statePage;
  const { second, debug, branch } = state;
  const ipcChannel = window.electron.ipcRenderer;
  // Saving the config
  useEffect(() => {
    setState({ ...state, second: true });
  }, []);

  useEffect(() => {
    const json = JSON.stringify(state);
    localStorage.setItem('settings_emudeck', json);

    const path = state.storagePath;

    ipcChannel.sendMessage('bash', [`mkdir -p ~/emudeck/`]);

    ipcChannel.sendMessage('bash', [
      `echo expert=${state.mode === 'expert'} > ~/emudeck/settings.sh`,
    ]);

    // Setup Emus
    ipcChannel.sendMessage('bash', [
      `echo doSetupRA=${!!state.overwriteConfigEmus.ra
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupDolphin=${!!state.overwriteConfigEmus.dolphin
        .status} >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo doSetupPCSX2=${!!state.overwriteConfigEmus.pcsx2
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupRPCS3=${!!state.overwriteConfigEmus.rpcs3
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupYuzu=${!!state.overwriteConfigEmus.yuzu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupCitra=${!!state.overwriteConfigEmus.citra
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupDuck=${!!state.overwriteConfigEmus.duckstation
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupCemu=${!!state.overwriteConfigEmus.cemu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupXenia=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupRyujinx=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupESDE=true >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo doSetupPrimeHacks=${!!state.overwriteConfigEmus.primehacks
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupXemu=${!!state.overwriteConfigEmus.xemu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSetupPPSSPP=${!!state.overwriteConfigEmus.ppsspp
        .status} >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo doSetupSRM=${!!state.overwriteConfigEmus.srm
        .status} >> ~/emudeck/settings.sh`,
    ]);

    // Install Emus
    ipcChannel.sendMessage('bash', [
      `echo doInstallRA=${!!state.installEmus.ra
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallDolphin=${!!state.installEmus.dolphin
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallPCSX2=${!!state.installEmus.pcsx2
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallRPCS3=${!!state.installEmus.rpcs3
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallYuzu=${!!state.installEmus.yuzu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallCitra=${!!state.installEmus.citra
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallDuck=${!!state.installEmus.duckstation
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallCemu=${!!state.installEmus.cemu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallXenia=false >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo doInstallPrimeHacks=${!!state.installEmus.primehacks
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallPPSSPP=${!!state.installEmus.ppsspp
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallXemu=${!!state.installEmus.xemu
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallSRM=${!!state.installEmus.srm
        .status} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallESDE=true >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallCHD=true >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallPowertools=${!!state.powerTools} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doInstallGyro=${!!state.GyroDSU} >> ~/emudeck/settings.sh`,
    ]);

    // Aspect Ratios
    ipcChannel.sendMessage('bash', [
      `echo arSega=${state.ar.sega} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo arSnes=${state.ar.snes} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo arClassic3D=${state.ar.classic3d} >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo arDolphin=${state.ar.dolphin} >> ~/emudeck/settings.sh`,
    ]);

    // Bezels
    ipcChannel.sendMessage('bash', [
      `echo RABezels=${!!state.bezels} >> ~/emudeck/settings.sh`,
    ]);

    // AutoSave
    ipcChannel.sendMessage('bash', [
      `echo RAautoSave=false >> ~/emudeck/settings.sh`,
    ]);

    // old ar
    ipcChannel.sendMessage('bash', [
      `echo duckWide=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo DolphinWide=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo DreamcastWide=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo BeetleWide=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo pcsx2QTWide=false >> ~/emudeck/settings.sh`,
    ]);

    // Paths
    ipcChannel.sendMessage('bash', [
      `echo emulationPath=${path}Emulation/ >> ~/emudeck/settings.sh`,
    ]);
    //
    ipcChannel.sendMessage('bash', [
      `echo romsPath=${path}Emulation/roms/ >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo toolsPath=${path}Emulation/tools/ >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo biosPath=${path}Emulation/bios/ >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo savesPath=${path}Emulation/saves/ >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo storagePath=${path}Emulation/storage/ >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo ESDEscrapData=${path}Emulation/tools/downloaded_media/ >> ~/emudeck/settings.sh`,
    ]);

    // Shaders
    ipcChannel.sendMessage('bash', [
      `echo RAHandHeldShader=${!!state.shaders
        .handhelds} >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo RAHandClassic2D=${!!state.shaders
        .classic} >> ~/emudeck/settings.sh`,
    ]);

    // theme
    ipcChannel.sendMessage('bash', [
      `echo esdeTheme=\""${state.theme}\"" >> ~/emudeck/settings.sh`,
    ]);

    // AdvancedSettings
    ipcChannel.sendMessage('bash', [
      `echo doSelectWideScreen=false >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo doRASignIn=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doRAEnable=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doESDEThemePicker=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doSelectEmulators=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo doResetEmulators=false >> ~/emudeck/settings.sh`,
    ]);
    ipcChannel.sendMessage('bash', [
      `echo XemuWide=false >> ~/emudeck/settings.sh`,
    ]);

    // Achievements
    ipcChannel.sendMessage('bash', [
      `echo achievementsUser=${state.achievements.user} >> ~/emudeck/settings.sh`,
    ]);

    ipcChannel.sendMessage('bash', [
      `echo achievementsPass=${state.achievements.pass} >> ~/emudeck/settings.sh`,
    ]);

    // CloudSync
    ipcChannel.sendMessage('bash', [
      `echo doSetupSaveSync=${!!state.CloudSync} >> ~/emudeck/settings.sh`,
    ]);

    // Installation
    ipcChannel.sendMessage('bash', [
      `bash ~/emudeck/backend/install.sh ${branch} false`,
    ]);

    ipcChannel.sendMessage('emudeck', [
      `finish|||checkForFile ~/emudeck/.electron-finished delete && echo 'Starting...' > ~/emudeck/msg.log && printf "\ec" && echo true`,
    ]);

    ipcChannel.once('finish', (message) => {
      console.log({ message });
      const { stdout } = message;
      if (stdout.includes('true')) {
        setStatePage({ ...statePage, disabledNext: false });
      }
    });
  }, [second]);

  const openSRM = () => {
    if (state.storage == 'SD-Card') {
      ipcChannel.sendMessage('bash', [
        `cd /run/media/mmcblk0p1/Emulation/tools/srm && ./Steam-ROM-Manager.AppImage`,
      ]);
    } else {
      ipcChannel.sendMessage('bash', [
        `cd ~/Emulation/tools/srm && ./Steam-ROM-Manager.AppImage`,
      ]);
    }
    window.close();
  };

  const close = () => {
    window.close();
  };

  return (
    <End
      onClick={openSRM}
      onClose={close}
      data={data}
      disabledNext={disabledNext}
      disabledBack={disabledBack}
    />
  );
};

export default EndPage;
