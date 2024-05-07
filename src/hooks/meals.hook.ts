import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const MEALS_QUERY = {
  meals: "meals",
};

export const useGetAllMeals = () =>
  useQuery({
    queryKey: [MEALS_QUERY.meals],
    queryFn: () => get({ url: "api/v1/packages/meals/" }),
  });

export const useAddMeals = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "api/v1/packages/meals/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [MEALS_QUERY.meals],
      });
      return response;
    },
  });

export const useUpdateMeals = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/meals/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [MEALS_QUERY.meals],
      });
      return response;
    },
  });

export const useDeleteMeals = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/meals/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [MEALS_QUERY.meals],
      });
      return response;
    },
  });
