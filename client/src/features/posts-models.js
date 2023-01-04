export const store = {
  displayPosts: [],
  setDisplayPosts: () => {},
  onUpVote: (id) => {},
  onDelPost: () => {},
  fetchPostApi: () => {},
  onCreateNewPost: (postData) => {},
  onEditPost: (id, oldData) => {},
  postIdToEdit: "",
  setPostIdToEdit: () => {},
  onMoreLikeThis: (label) => {},
  isFiltering: false,
  setIsFiltering: () => {},
  labelToDisplay: "",
  setLabelToDisplay: () => {},
  voteRefetch: false,
  setVoteRefetch: () => {},
  specPost: {},
  setSpecPost: () => {},
};

export const specPostTemplate = {
  content: "",
  author: { username: "" },
  up_by: [],
  voteCount: 0,
};
