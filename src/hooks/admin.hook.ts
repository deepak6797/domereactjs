import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, put } from "../api/client";
import { queryClient } from "../main";

const ADMIN = {
  admin: "admin",
};

export const useGetAllAdmin = () =>
  useQuery({
    queryKey: [ADMIN.admin],
    queryFn: () => get({ url: "api/v1/user/all-admin" }),
  });

export const useUpdateAdminStatus = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/user/deactivate-user/${id}`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN.admin],
      });
      return response;
    },
  });

export const useDeleteAdmin = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/user/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN.admin],
      });
      return response;
    },
  });
