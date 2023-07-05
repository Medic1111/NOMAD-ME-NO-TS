import { useContext, useEffect, useState } from "react";
import { postCtx } from "../../../features/posts-ctx";

const LabelBadge = () => {
  const postMgr = useContext(postCtx);
  const [content, setContent] = useState("toggle_on");
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const setBackground = () => {
      switch (postMgr.labelToDisplay) {
        case "none": {
          return setBgColor("#0f172a");
        }
        case "green": {
          return setBgColor("#22c55e");
        }
        case "blue": {
          return setBgColor("#0ea5e9");
        }
        case "orange": {
          return setBgColor("#f97316");
        }
        case "brown": {
          return setBgColor("#92400e");
        }
        case "gray": {
          return setBgColor("#6b7280");
        }
        default: {
          return setBgColor("#0f172a");
        }
      }
    };
    setBackground();
  }, [postMgr.labelToDisplay]);

  return (
    <span
      style={{ color: bgColor }}
      className={`text-5xl cursor-pointer  material-symbols-outlined`}
      onClick={() => {
        postMgr.setIsFiltering(false);
        postMgr.fetchPostApi();
      }}
      onMouseEnter={() => setContent("toggle_off")}
      onMouseLeave={() => setContent("toggle_on")}
    >
      {content}
    </span>
  );
};

export default LabelBadge;
