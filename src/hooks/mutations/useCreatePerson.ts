import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Person, CreatePersonInput } from '../../models/models';
import { Environments } from '../../environment/environment';

const createPerson = async (input: CreatePersonInput): Promise<Person> => {
  const response = await axiosClient.post<Person>(
    Environments.apiPersonEndPoint || '/person',
    input
  );
  return response.data;
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      // Invalidate and refetch persons query
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};
