export const uiState = {
  showModal: false,
  createPost: false,
  editPost: false,
  editAvatar: false,
};

const uiRed = (state, action) => {
  switch (action.type) {
    case "CREATEPOST": {
      return {
        ...uiState,
        showModal: true,
        createPost: true,
      };
    }
    case "EDITPOST": {
      return {
        ...uiState,
        showModal: true,
        editPost: true,
      };
    }
    case "EDITAVATAR": {
      return {
        ...uiState,
        showModal: true,
        editAvatar: true,
      };
    }
    case "CLOSE": {
      return { ...uiState };
    }
    default:
      return { ...uiState };
  }
};

export default uiRed;
