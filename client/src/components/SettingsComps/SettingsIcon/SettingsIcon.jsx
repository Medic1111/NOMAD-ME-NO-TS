import { useContext } from "react";
import SettingsActions from "../SettingsActions/SettingsActions";
import { userCtx } from "../../../features/user-ctx";

const SettingsIcon = () => {
  const { toggleActions } = useContext(userCtx);
  return (
    <div className="flex flex-col items-start justify-start">
      {toggleActions && <SettingsActions />}
    </div>
  );
};

export default SettingsIcon;
