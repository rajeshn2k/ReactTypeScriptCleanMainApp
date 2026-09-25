import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Environments } from '../../environment/environment';

const deleteBook = async (id: string): Promise<void> => {
  await axiosClient.delete(
    `${Environments.apiBookEndPoint || '/book'}/${id}`
  );
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
