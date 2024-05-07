import { useMutation, useQuery } from "@tanstack/react-query";
import { get, deleteApi, post, put } from "../api/client";
import { queryClient } from "../main";

const ROLE_QUERY = {
  role: "role",
};

export const useGetAllRoles = () =>
  useQuery({
    queryKey: [ROLE_QUERY.role],
    queryFn: () => get({ url: "api/v1/role" }),
  });

export const useAddRoles = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "api/v1/role",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.role],
      });
      return response;
    },
  });


  export const useUpdateRole = () =>
    useMutation({
      mutationFn: ({body, id}:{body: object, id:string}) =>
        put({
          url: `api/v1/role/${id}`,
          body,
        }),
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: [ROLE_QUERY.role],
        });
        return response;
      },
    });

export const useDeleteRoles = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/role/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.role],
      });
      return response;
    },
  });
