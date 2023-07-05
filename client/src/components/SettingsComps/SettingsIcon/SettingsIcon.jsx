import { useState } from "react";
import SettingsActions from "../SettingsActions/SettingsActions";

const SettingsIcon = () => {
  const [toggleAction, setToggleAction] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start">
      <span
        style={{ cursor: "pointer", fontSize: "2em" }}
        className="material-symbols-outlined"
        onClick={() => {
          setToggleAction((prev) => !prev);
        }}
      >
        settings
      </span>
      {toggleAction && <SettingsActions />}
    </div>
  );
};

export default SettingsIcon;
