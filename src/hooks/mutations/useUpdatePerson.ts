import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Person } from '../../models/models';
import { Environments } from '../../environment/environment';

const updatePerson = async (person: Person): Promise<void> => {
  await axiosClient.put(
    `${Environments.apiPersonEndPoint || '/person'}/${person.id}`,
    person
  );
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};
