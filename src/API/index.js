import api from "../store/api";

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({

        getPuppies: build.query({
          query: () => "players",
          providesTags: ["Puppy"],
          transformResponse: (response) => response.data.players,
          transformErrorResponse: (error) => error.data?.error || "An error occurred"
        }),

        getPuppy: build.query({
          query: (id) => `players/${id}`,
          providesTags: (result, error, id) => [{ type: "Puppy", id }],
          transformResponse: (response) => response.data.player,
          transformErrorResponse: (error) => error.data?.error || "An error occurred"
        }),

        // Mutation endpoints
        addPuppy: build.mutation({
          query: (puppy) => ({
            url: "players",
            method: "POST",
            body: puppy,
          }),
          invalidatesTags: ["Puppy"],
          transformResponse: (response) => response,
          transformErrorResponse: (error) => error.data?.error || "Failed to add puppy"
        }),
        

        deletePuppy: build.mutation({
          query: (id) => ({
            url: `players/${id}`,
            method: "DELETE"
          }),
          invalidatesTags: ["Puppy"],
          transformResponse: (response) => response,
          transformErrorResponse: (error) => error.data?.error || "Failed to delete puppy"
        })


  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
