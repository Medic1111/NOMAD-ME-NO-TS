import classes from "./ImgUpload.module.css";
import React, { useContext } from "react";
import { uploadCtx } from "../../features/upload-ctx";

const ImgUpload = ({ formTitle }) => {
  const uploadMgr = useContext(uploadCtx);

  return (
    <React.Fragment>
      <label className={`${classes.label} label_standard`}>
        {formTitle ? formTitle : null}
        <span className={`${classes.camera} material-symbols-outlined`}>
          {/* {uploadMgr.url === "" ? "add_a_photo" : "check"} */}
          {uploadMgr.url === "" ? (
            "add_a_photo"
          ) : (
            <img
              className={classes.preview}
              alt="Preview"
              src={uploadMgr.url}
            />
          )}
        </span>
        <input
          value={""}
          onChange={uploadMgr.handleUpload}
          className={classes.input}
          type={"file"}
          accept="image/*"
        />
      </label>
    </React.Fragment>
  );
};

export default ImgUpload;
