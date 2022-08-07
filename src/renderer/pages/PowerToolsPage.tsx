import { EventHandler, useEffect, useState } from 'react';
import { useGlobalContext } from 'context/globalContext';

import PowerTools from 'components/organisms/Wrappers/PowerTools.js';

const PowerToolsPage = () => {
  const { state, setState } = useGlobalContext();
  const { sudoPass } = state;
  const [statePage, setStatePage] = useState({
    disabledNext: false,
    disabledBack: false,
    data: '',
    hasSudo: false,
  });
  const { disabledNext, disabledBack, hasSudo } = statePage;

  const ipcChannel = window.electron.ipcRenderer;

  const setPowerTools = (data) => {
    if (data.target.value !== '') {
      setState({
        ...state,
        powerTools: true,
      });
    } else {
      setState({
        ...state,
        powerTools: false,
      });
    }
  };

  const createSudo = (data) => {
    ipcChannel.sendMessage('bash', [
      'cp ~/emudeck/backend/tools/passwd.desktop ~/Desktop/passwd.desktop && chmod +x ~/Desktop/passwd.desktop && ~/Desktop/passwd.desktop && rm ~/Desktop/passwd.desktop ',
    ]);
  };

  useEffect(() => {
    ipcChannel.sendMessage('bash', [
      'checkPWD|||passwd -S $(whoami) | awk -F " " "{print $2}" & exit',
    ]);

    ipcChannel.once('checkPWD', (stdout) => {
      console.log({ stdout });
      stdout = stdout.replace('\n', '');
      stdout.includes('NP') ? (stdout = false) : (stdout = true);
      setStatePage({
        ...statePage,
        hasSudo: stdout,
      });
    });
  }, []);

  return (
    <PowerTools
      disabledNext={disabledNext}
      disabledBack={disabledBack}
      onChange={setPowerTools}
      onClick={createSudo}
      hasSudo={hasSudo}
      nextText={sudoPass ? 'Continue' : 'Skip'}
    />
  );
};

export default PowerToolsPage;
