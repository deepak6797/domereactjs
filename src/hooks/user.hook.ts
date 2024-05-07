import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, put } from "../api/client";
import { queryClient } from "../main";

const USER = {
  user: "user",
};

export const useGetAllUser = () =>
  useQuery({
    queryKey: [USER.user],
    queryFn: () => get({ url: "api/v1/user" }),
  });

export const useUpdateStatus = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/user/deactivate-user/${id}`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [USER.user],
      });
      return response;
    },
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/user/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [USER.user],
      });
      return response;
    },
  });
