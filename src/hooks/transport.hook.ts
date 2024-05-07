import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const TRANSPORT_QUERY = {
  transport: "transport",
};

export const useGetAllTransport = () =>
  useQuery({
    queryKey: [TRANSPORT_QUERY.transport],
    queryFn: () => get({ url: "/api/v1/packages/transports" }),
  });

export const useAddTransport = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "/api/v1/packages/transports/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TRANSPORT_QUERY.transport],
      });
      return response;
    },
  });

export const useUpdateTransport = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/transports/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TRANSPORT_QUERY.transport],
      });
      return response;
    },
  });

export const useDeleteTransport = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/transports/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TRANSPORT_QUERY.transport],
      });
      return response;
    },
  });
