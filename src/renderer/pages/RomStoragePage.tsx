import { useEffect, useState } from 'react';
import { useGlobalContext } from 'context/globalContext';

import RomStorage from 'components/organisms/Wrappers/RomStorage.js';

const RomStoragePage = () => {
  const ipcChannel = window.electron.ipcRenderer;
  const { state, setState } = useGlobalContext();
  const { storage, SDID } = state;
  const [statePage, setStatePage] = useState({
    disabledNext: true,
    disabledBack: false,
    data: '',
    sdCardValid: false,
    sdCardName: '',
  });
  const { disabledNext, disabledBack, data, sdCardValid, sdCardName } =
    statePage;
  const { mode, system } = state;

  useEffect(() => {
    setState({
      ...state,
      second: false,
    });
  }, []); // <-- here put the parameter to listen

  const storageSet = (storageName: string) => {
    if (storageName === 'Custom') {
      ipcChannel.sendMessage('emudeck', ['customLocation|||customLocation']);

      ipcChannel.once('customLocation', (message) => {
        console.log(message);
        let stdout = message.stdout.replace('\n', '');
        stdout = `${stdout}/`;
        setState({
          ...state,
          storage: storageName,
          storagePath: stdout,
          debugText: message,
        });
      });
    } else if (storageName === 'SD-Card') {
      const sdCardPath = `${sdCardName}/`;
      setState({
        ...state,
        storage: storageName,
        storagePath: sdCardPath,
      });
    } else {
      setState({
        ...state,
        storage: storageName,
        storagePath: '~/',
      });
    }
  };
  // Enabling button when changing the global state only if we have a device selected
  useEffect(() => {
    if (storage != '') {
      setStatePage({ ...statePage, disabledNext: false });
    }
  }, [state]); // <-- here put the parameter to listen

  // Do we have a valid SD Card?
  useEffect(() => {
    if (system !== 'darwin') {
      ipcChannel.sendMessage('emudeck', [
        'SDCardValid|||testLocationValid "SD" "$(getSDPath)"',
      ]);
    } else {
      ipcChannel.sendMessage('emudeck', [
        'SDCardValid|||testLocationValid "SD" ~/SDCARD',
      ]);
    }

    ipcChannel.once('SDCardValid', (message) => {
      console.log(message);
      const stdout = message.stdout.replace('\n', '');
      let status;
      stdout.includes('Valid') ? (status = true) : (status = false);
      setStatePage({
        ...statePage,
        sdCardValid: status,
      });
      setState({
        ...state,
        debugText: message,
      });
    });
  }, []);

  // Let's get the SD Card name
  useEffect(() => {
    // if (sdCardValid === true) {
    if (system !== 'darwin') {
      ipcChannel.sendMessage('emudeck', ['SDCardName|||getSDPath']);
    } else {
      ipcChannel.sendMessage('emudeck', ['SDCardName|||echo ~/SDCARD']);
    }
    ipcChannel.once('SDCardName', (message) => {
      console.log(message);
      const stdout = message.stdout.replace('\n', '');
      setStatePage({
        ...statePage,
        sdCardName: stdout,
      });
      setState({
        ...state,
        debugText: message,
      });
    });
    //  }
  }, [sdCardValid]);

  const onClickGetCustom = () => {};

  return (
    <RomStorage
      data={data}
      sdCardValid={sdCardValid}
      sdCardName={sdCardName}
      onClick={storageSet}
      onClickGetCustom={onClickGetCustom}
      disabledNext={disabledNext}
      disabledBack={disabledBack}
      next={mode === 'easy' ? 'end' : 'device-selector'}
    />
  );
};

export default RomStoragePage;
