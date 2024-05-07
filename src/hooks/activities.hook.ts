import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const ACTIVITIES_QUERY = {
  activities: "activities",
};

export const useGetAllActivities = () =>
  useQuery({
    queryKey: [ACTIVITIES_QUERY.activities],
    queryFn: () => get({ url: "api/v1/packages/activities/list" }),
  });

export const useAddActivities = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "/api/v1/packages/activities/create/",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITIES_QUERY.activities],
      });
      return response;
    },
  });

export const useUpdateActivities = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/activities/${id}/`,
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITIES_QUERY.activities],
      });
      return response;
    },
  });

export const useDeleteActivities = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/activities/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITIES_QUERY.activities],
      });
      return response;
    },
  });
