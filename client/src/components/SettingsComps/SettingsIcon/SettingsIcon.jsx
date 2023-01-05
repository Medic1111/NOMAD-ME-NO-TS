import classes from "./SettingsIcon.module.css";
import { useState } from "react";
import SettingsActions from "../SettingsActions/SettingsActions";

const SettingsIcon = () => {
  const [toggleAction, setToggleAction] = useState(false);

  return (
    <section className={`${classes.settingsSec} flex_col_center`}>
      <span
        style={{ cursor: "pointer", fontSize: "4em" }}
        className="material-symbols-outlined"
        onClick={() => {
          setToggleAction((prev) => !prev);
        }}
      >
        settings
      </span>
      {toggleAction && <SettingsActions />}
    </section>
  );
};

export default SettingsIcon;
