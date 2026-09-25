import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { Person } from '../../models/models';
import { Environments } from '../../environment/environment';

const fetchPersons = async (): Promise<Person[]> => {
  // Preserve 2-second delay from original Context implementation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const response = await axiosClient.get<Person[]>(
    Environments.apiPersonEndPoint || '/person'
  );
  return response.data;
};

export const usePersonsQuery = () => {
  return useQuery({
    queryKey: ['persons'],
    queryFn: fetchPersons,
  });
};
