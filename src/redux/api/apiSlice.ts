import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/book',
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => '/get',
      providesTags: ['Books']
    }),
    getSinglePost: builder.query({
      query: (id) => `/get/${id}`,
      providesTags: ['Books']
    }),
    postComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/reviews/${id}`,
        method: 'POST',
        body: data,
        invalidatesTags: ['Books']
      }),
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: '/add',
        method: 'POST',
        body: data,
        invalidatesTags: ['Books']
      }),
    }),
    updateBookData: builder.mutation({
      query: (data) => {
        const { id, ...body } = data
        console.log('apiSlice-Update-data', body)
        console.log('apiSlice-Update-ID', id)
        return {
          url: `/update/${id}`,
          method: 'PUT',
          body,
          invalidatesTags: ['Books']
        }
      },
    }),
    // updateBookData: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/update/${id}`,
    //     method: 'PUT',
    //     body: data,
    //     invalidatesTags:['Books']
    //   }),
    // }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
        body: id,
        invalidatesTags: ['Books']
      }),
    }),


  })
})

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useAddNewBookMutation,
  usePostCommentMutation,
  useUpdateBookDataMutation,
  useDeleteBookMutation } = api