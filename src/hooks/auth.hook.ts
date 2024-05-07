import { useMutation } from '@tanstack/react-query';
import { post } from '../api/client';

export const useCreateAccount = () =>
  useMutation({
    mutationFn: (body: object) => post({ url: 'api/v1/user/create', body }),
  });

export const useLoginAccount = () =>
  useMutation({
    mutationFn: (body: object) => post({ url: 'api/v1/user/login', body }),
  });
