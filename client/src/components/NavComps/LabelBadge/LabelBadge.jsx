import { useContext, useEffect, useState } from "react";
import { postCtx } from "../../../features/posts-ctx";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const LabelBadge = () => {
  const postMgr = useContext(postCtx);
  const [content, setContent] = useState(<BsToggleOn />);
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
      className={`text-3xl cursor-pointer`}
      onClick={() => {
        postMgr.setIsFiltering(false);
        postMgr.fetchPostApi();
      }}
      onMouseEnter={() => setContent(<BsToggleOff />)}
      onMouseLeave={() => setContent(<BsToggleOn />)}
    >
      {content}
    </span>
  );
};

export default LabelBadge;
