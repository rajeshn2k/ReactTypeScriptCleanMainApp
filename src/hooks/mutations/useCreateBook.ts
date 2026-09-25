import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Book, CreateBookInput } from '../../models/models';
import { Environments } from '../../environment/environment';

/**
 * - This is a regular async function responsible only for the API call.
 * - It receives CreateBookInput as the request body.
 * - The returned Promise<Book> resolves with the newly created book.
 * --- This function is not a React hook and can be tested independently.
 */

const createBook = async (input: CreateBookInput): Promise<Book> => {
  const response = await axiosClient.post<Book>(
    Environments.apiBookEndPoint || '/book',
    input
  );
  return response.data;
};

/**
 * Custom React hook for creating a book.
 *
 * - useMutation is used for operations that modify server-side data,
 *   such as POST, PUT, PATCH, or DELETE requests.
 * - Unlike useQuery, a mutation does not automatically execute when the component renders.
 * - The mutation starts only when the returned `mutate()` or `mutateAsync()` function is explicitly called.
 *
 * Usage 1:
 * const createBookMutation = useCreateBook();
 *
 * createBookMutation.mutate({
 *   title: 'Clean Code',
 *   author: 'Robert C. Martin'
 * });
 *
 * Usage 2:
 * await createBookMutation.mutateAsync({
 *   title: 'Clean Code',
 *   author: 'Robert C. Martin'
 * });
 * 
 * useQueryClient:
 * provides access to React Query's central cache.
 * We use it after successfully creating a book to tell React Query
 * that the cached `books` data may now be outdated.
 * 
 * useMutation:
 * manages the complete mutation lifecycle:
 *
 * 1. User calls `mutate(input)`.
 * 2. React Query executes `createBook(input)`.
 * 3. While the request is running, `isPending` becomes true.
 * 4. If the API succeeds, `onSuccess` is called.
 * 5. If the API fails, `isError` becomes true and `error` contains information about the failure.
 *
 * The generic types are inferred from `mutationFn` in this case:
 * - Input: CreateBookInput
 * - Success result: Book
 * 
 * onSuccess:
 * Invalidate all queries whose query key starts with ['books'].
 * If that query is currently being displayed by a component,
 * React Query will normally refetch it automatically.
 */

export const useCreateBook = () => {

  const queryClient = useQueryClient();

  return useMutation({
    /* mutationFn is the function React Query executes when mutate() or mutateAsync() is called. */
    mutationFn: createBook,

    /* Called after the create-book API request succeeds. */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });
};










/*
 * ---------------------------------------------------------------------------
 * HOW TO INVOKE THIS HOOK
 * ---------------------------------------------------------------------------
 *
 * Example component:
 *
 * const CreateBookComponent = () => {
 *   const createBookMutation = useCreateBook();
 *
 *   const handleCreateBook = () => {
 *     createBookMutation.mutate({
 *       title: 'Clean Code',
 *       author: 'Robert C. Martin',
 *     });
 *   };
 *
 *   return (
 *     <button
 *       onClick={handleCreateBook}
 *       disabled={createBookMutation.isPending}
 *     >
 *       {createBookMutation.isPending ? 'Creating...' : 'Create Book'}
 *     </button>
 *   );
 * };
 *
 *
 * ---------------------------------------------------------------------------
 * HANDLING SUCCESS AND ERROR
 * ---------------------------------------------------------------------------
 *
 * mutate() can also receive lifecycle callbacks:
 *
 * createBookMutation.mutate(
 *   {
 *     title: 'Clean Code',
 *     author: 'Robert C. Martin',
 *   },
 *   {
 *     onSuccess: (book) => {
 *       console.log('Created book:', book);
 *     },
 *     onError: (error) => {
 *       console.error('Failed to create book:', error);
 *     },
 *   }
 * );
 *
 *
 * ---------------------------------------------------------------------------
 * USING async/await
 * ---------------------------------------------------------------------------
 *
 * If the calling code needs to wait for the API response, use mutateAsync():
 *
 * const handleCreateBook = async () => {
 *   try {
 *     const book = await createBookMutation.mutateAsync({
 *       title: 'Clean Code',
 *       author: 'Robert C. Martin',
 *     });
 *
 *     console.log('Created book:', book);
 *   } catch (error) {
 *     console.error('Failed to create book:', error);
 *   }
 * };
 *
 *
 * ---------------------------------------------------------------------------
 * USEFUL MUTATION STATE
 * ---------------------------------------------------------------------------
 *
 * createBookMutation.isPending
 *   -> true while the POST request is running.
 *
 * createBookMutation.isSuccess
 *   -> true after the request succeeds.
 *
 * createBookMutation.isError
 *   -> true if the request fails.
 *
 * createBookMutation.error
 *   -> Contains the error returned by the mutation.
 *
 * createBookMutation.data
 *   -> Contains the newly created Book after success.
 *
 * createBookMutation.reset()
 *   -> Resets the mutation state.
 */