import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Book } from '../../models/models';
import { Environments } from '../../environment/environment';

const updateBook = async (book: Book): Promise<void> => {
  await axiosClient.put(
    `${Environments.apiBookEndPoint || '/book'}/${book.id}`,
    book
  );
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
