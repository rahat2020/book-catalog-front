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
    addNewBook: builder.mutation({
      query: (data ) => ({
        url: '/add',
        method: 'POST',
        body: data,
      }),
    })


  })
})

export const { useGetAllPostQuery, useGetSinglePostQuery, useAddNewBookMutation } = api