// import { API_BASE_URL as BASE } from "@/utils/api";
import { API_BASE_URL as BASE } from "@/constants/constant";

const ApiEndpoint = {
  users: {
    login: `${BASE}/users/login`,
    register: `${BASE}/users/register`,
    currentUser: `${BASE}/users/get-user-info`,
    getUserById: (id: string) =>`${BASE}/users/get-user-by-id/${id}`,
    logout: `${BASE}/users/logout`,
  },

  posts: {
    create: `${BASE}/posts/create`,
    getPosts: `${BASE}/posts/get-posts`,
    getPostById: (id: string) => `${BASE}/posts/get-post/${id}`,
    deleteById: (id: string) => `${BASE}/posts/delete-post/${id}`,
  },

  comments: {
    add: (postId: string) => `${BASE}/comments/add-comment/${postId}`,
    delete: (commentId: string) => `${BASE}/comments/delete-comment/${commentId}`,
    update: (commentId: string) => `${BASE}/comments/update-comment/${commentId}`,
    get: (postId: string) => `${BASE}/comments/get-comment/${postId}`,
  },

  like: {
    togglePost: (postId: string) => `${BASE}/like/toggle/p/${postId}`,
    toggleComment: (commentId: string) => `${BASE}/like/toggle/c/${commentId}`,
  },

  follow: {
    followUser: (followingId: string) => `${BASE}/follow/follow/${followingId}`,
  },

  story: {
    add: `${BASE}/story/add-story`,
    getallStories: `${BASE}/story/get-stories`,
    view: (storyId: string) => `${BASE}/story/view-story/${storyId}`,
    react: (storyId: string) => `${BASE}/story/react-story/${storyId}`,
    comment: (storyId: string) => `${BASE}/story/comment-story/${storyId}`,
    delete: (storyId: string) => `${BASE}/story/delete-story/${storyId}`,
  },

  messages:{
    send: `${BASE}/messages/send`,
    history: (userId: string) => `${BASE}/messages/history/${userId}`
  }
};

export { ApiEndpoint };

