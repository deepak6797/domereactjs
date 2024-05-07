import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "../api/client";
import { queryClient } from "../main";

const ROLE_QUERY = {
  continent: "continent",
};

export const useGetAllContinent = () =>
  useQuery({
    queryKey: [ROLE_QUERY.continent],
    queryFn: () =>
      get({ url: "api/v1/location/continent/list" }),
  });


  export const useGetAllContinentChoice = () =>
    useQuery({
      queryKey: [ROLE_QUERY],
      queryFn: () =>
        get({ url: "api/v1/location/continent/choices" }),
    });

export const useUpdateContinent = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "api/v1/location/contient/update",
        body,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_QUERY.continent],
      });
      return response;
    },
  });

