import { useMutation, useQuery } from "@tanstack/react-query";
import { get, deleteApi, post, put } from "../api/client";
import { queryClient } from "../main";

const ROLE_QUERY = {
  country: "country",
};

export const useGetAllCountry = () =>
  useQuery({
    queryKey: [ROLE_QUERY.country],
    queryFn: () => get({ url: "api/v1/location/countries/list" }),
  });

export const useAddCountry = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      post({
        url: `api/v1/location/${id}/countries/create`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.country],
      });
      return response;
    },
  });

export const useUpdateCountry = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/location/continents/${id}`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.country],
      });
      return response;
    },
  });

export const useDeleteCountry = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/location/${id}/countries`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.country],
      });
      return response;
    },
  });
