import { baseApi } from "../baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ searchTerm, category, sortBy, sortOrder, limit, skip }) => {
        let url = `/products`; // Base URL

        if (searchTerm) {
          url = `/products/search?q=${searchTerm}`; // Search-specific URL
        } else if (category) {
          url += `/category/${category}?limit=${limit}&skip=${skip}`; // Category-specific URL
        } else if (sortBy) {
          url = `/products?sortBy=${sortBy}&order=${sortOrder}&limit=${limit}&skip=${skip}` 
        }
        else {
          // Regular product list URL
          url += `?limit=${limit}&skip=${skip}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
