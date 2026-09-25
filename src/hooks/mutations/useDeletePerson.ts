import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Environments } from '../../environment/environment';

const deletePerson = async (id: string): Promise<void> => {
  await axiosClient.delete(
    `${Environments.apiPersonEndPoint || '/person'}/${id}`
  );
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};
