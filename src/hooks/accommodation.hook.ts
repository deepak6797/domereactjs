import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const ACCOMMODATION_QUERY = {
  accommodation: "accommodation",
};

export const useGetAllAccommodation = () =>
  useQuery({
    queryKey: [ACCOMMODATION_QUERY.accommodation],
    queryFn: () => get({ url: "/api/v1/packages/accommodations/list" }),
  });

export const useAddAccommodation = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "/api/v1/packages/accommodations/create/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOMMODATION_QUERY.accommodation],
      });
      return response;
    },
  });

export const useUpdateAccommodation = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/accomodation/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOMMODATION_QUERY.accommodation],
      });
      return response;
    },
  });

export const useDeleteAccommodation = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/accomodation/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOMMODATION_QUERY.accommodation],
      });
      return response;
    },
  });
