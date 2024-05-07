import { useMutation, useQuery } from "@tanstack/react-query";
import { get, deleteApi } from "../api/client";
import { queryClient } from "../main";

const CUSTOMER_QUERY = {
  customer: "customer",
};

export const useGetAllCustomer= () =>
    useQuery({
      queryKey: [CUSTOMER_QUERY.customer],
      queryFn: () => get({ url: "api/v1/customer" }),
    });

export const useDeleteCustomer = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/customer/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY.customer],
      });
      return response;
    },
  });


