import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "context/globalContext";

import EmulatorConfiguration from "components/organisms/Wrappers/EmulatorConfiguration.js";

const EmulatorConfigurationPage = () => {
  const { state, setState } = useContext(GlobalContext);
  const { device, overwriteConfigEmus } = state;

  const [statePage, setStatePage] = useState({
    disabledNext: false,
    disabledBack: false,
    data: "",
  });
  const { disabledNext, disabledBack, data } = statePage;

  const toggleEmus = (emulatorProp) => {
    let { id, name, status } = overwriteConfigEmus[emulatorProp];

    setState({
      ...state,
      overwriteConfigEmus: {
        ...overwriteConfigEmus,
        [emulatorProp]: { ...overwriteConfigEmus[emulatorProp], status: !status },
      },
    });
  };

  return (
    <EmulatorConfiguration
      data={data}
      onClick={toggleEmus}
      disabledNext={disabledNext}
      disabledBack={disabledBack}
    />
  );
};

export default EmulatorConfigurationPage;
