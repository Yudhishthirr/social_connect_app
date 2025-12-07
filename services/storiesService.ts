
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";



export const addStory = async (data:any) => {
    const formData = new FormData();
  
    formData.append("caption", data.caption);
    formData.append("mentions", data.mentions);
    formData.append("postImage", {
      uri: data.MediaFile,
      type: "image/jpeg",
      name: "upload.jpg",
    }as any);
  
    const res = await api.post(ApiEndpoint.story.add, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return res.data;
};



export const getStories = async () => {
  const res = await api.get(ApiEndpoint.story.getallStories);
  return res.data;
}


// export const getAllPosts = async ({ pageParam = 1 }) => {
//   const res = await api.get(`/posts/get-posts?page=${pageParam}`);

//   return {
//     posts: res.data.posts,      // array
//     nextPage: res.data.nextPage, // number
//     hasMore: res.data.hasMore,   // boolean
//   };
// };


