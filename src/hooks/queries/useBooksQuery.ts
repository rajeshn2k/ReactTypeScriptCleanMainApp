import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Book } from '../../models/models';
import { Environments } from '../../environment/environment';

const fetchBooks = async (): Promise<Book[]> => {
  // Preserve 2-second delay before fetching
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const endpoint = Environments.apiBookEndPoint || '/book';
  const response = await axiosClient.get<Book[]>(endpoint);
  return response.data;
};

export const useBooksQuery = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  return {
    data: data ?? [],
    isPending,
    isError,
    error,
    isSuccess,
  };
};
