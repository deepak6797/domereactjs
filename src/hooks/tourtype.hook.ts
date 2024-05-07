import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const TOUR_TYPE_QUERY = {
  tour_type: "tourType",
};

export const useGetAllTourType = () =>
  useQuery({
    queryKey: [TOUR_TYPE_QUERY.tour_type],
    queryFn: () => get({ url: "/api/v1/packages/tour-types/list" }),
  });

export const useAddTourType = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "api/v1/packages/tour-types/create/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TOUR_TYPE_QUERY.tour_type],
      });
      return response;
    },
  });

export const useUpdateTourType = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/tourtypes/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TOUR_TYPE_QUERY.tour_type],
      });
      return response;
    },
  });

export const useDeleteTourType = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/tourtypes/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TOUR_TYPE_QUERY.tour_type],
      });
      return response;
    },
  });
