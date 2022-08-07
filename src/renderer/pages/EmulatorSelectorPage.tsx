import React, { useEffect, useState, useContext } from 'react';
import { useGlobalContext, EmuConfigKeys } from 'context/globalContext';

import EmulatorSelector from 'components/organisms/Wrappers/EmulatorSelector.js';

const EmulatorSelectorPage = () => {
  const { state, setState } = useGlobalContext();
  const { device, installEmus } = state;

  const [statePage, setStatePage] = useState({
    disabledNext: false,
    disabledBack: false,
    data: '',
  });
  const { disabledNext, disabledBack, data } = statePage;

  const toggleEmus = (emulatorProp: EmuConfigKeys) => {
    const { id, name, status } = installEmus[emulatorProp];

    setState({
      ...state,
      installEmus: {
        ...installEmus,
        [emulatorProp]: { ...installEmus[emulatorProp], status: !status },
      },
    });
  };

  return (
    <EmulatorSelector
      data={data}
      onClick={toggleEmus}
      disabledNext={disabledNext}
      disabledBack={disabledBack}
    />
  );
};

export default EmulatorSelectorPage;
