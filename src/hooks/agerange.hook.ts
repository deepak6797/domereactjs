import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const AGE_RANGE_QUERY = {
  age_range: "ageRange",
};

export const useGetAllAgeRange = () =>
  useQuery({
    queryKey: [AGE_RANGE_QUERY.age_range],
    queryFn: () => get({ url: "/api/v1/packages/agegroups/" }),
  });

export const useAddAgeRange = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "/api/v1/packages/agegroups/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [AGE_RANGE_QUERY.age_range],
      });
      return response;
    },
  });

export const useUpdateAgeRange = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/agegroups/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [AGE_RANGE_QUERY.age_range],
      });
      return response;
    },
  });

export const useDeleteAgeRange = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/agegroups/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [AGE_RANGE_QUERY.age_range],
      });
      return response;
    },
  });
