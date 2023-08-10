import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/book',
  }),
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => '/get',
    }),
    getSinglePost: builder.query({
      query: (id) => `/get/${id}`
    }),
    postComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/reviews/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBookData: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: '/add',
        method: 'POST',
        body: data,
      }),
    })


  })
})

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useAddNewBookMutation,
  usePostCommentMutation,
  useUpdateBookDataMutation,
  useDeleteBookMutation } = api