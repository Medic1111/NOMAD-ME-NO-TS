import React from "react";

const rateList = [
  { value: "green", selected: false },
  { value: "blue", selected: false },
  { value: "gray", selected: false },
  { value: "orange", selected: false },
  { value: "brown", selected: false },
  { value: "none", selected: true },
];

const Label = ({ setLabel, label }) => {
  if (label === "none") {
    rateList.forEach((obj) => (obj.selected = false));
    rateList[5].selected = true;
  }
  return (
    <div>
      {rateList.map((obj, index) => {
        return (
          <button
            key={`BUTTON_${index}`}
            className={
              obj.selected
                ? "bg-rose-500 px-5 my-5 py-2"
                : "bg-slate-200 px-5 py-2 my-5"
            }
            onClick={(e) => {
              e.preventDefault();
              rateList.forEach((obj) => (obj.selected = false));
              obj.selected = !obj.selected;
              setLabel(obj.value);
            }}
          >
            {obj.value}
          </button>
        );
      })}
    </div>
  );
};

export default Label;
