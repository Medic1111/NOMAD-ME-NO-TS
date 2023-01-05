export const uiState = {
  showModal: false,
  createPost: false,
  editPost: false,
  editAvatar: false,
  editPassword: false,
  deleteAccount: false,
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
    case "DELETEACCOUNT": {
      return {
        ...uiState,
        showModal: true,
        deleteAccount: true,
      };
    }
    case "EDITPASSWORD": {
      return {
        ...uiState,
        showModal: true,
        editPassword: true,
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
