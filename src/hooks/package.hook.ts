import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, patch, post } from "../api/client";
import { queryClient } from "../main";
import { showErrorMessage, showSuccessMessage } from "../utils/toast";
import { getValue } from "../utils/object";
import { useNavigate } from "react-router-dom";

const QUERY_KEY = {
  packages: "packages",
  enquiry: "enquiry",
};

export const useGetAllPackages = () =>
  useQuery({
    queryKey: [QUERY_KEY.packages],
    queryFn: () => get({ url: "api/v1/packages/cms/list" }),
    refetchOnWindowFocus: false,
    staleTime: 1000,
    retry: 3,
  });

export const useGetAllEnquiry = () =>
  useQuery({
    queryKey: [QUERY_KEY.enquiry],
    queryFn: () => get({ url: "api/v1/bookings/inquiry/list" }),
    refetchOnWindowFocus: true,
    staleTime: 1000,
  });

export const useGetSingleEnquiryDetails = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.packages, id],
    queryFn: () => get({ url: `api/v1/bookings/inquiry/${id}` }),
    refetchOnWindowFocus: true,
    staleTime: 1000,
    retry: 3,
    select: (response) => {
      return response;
    },
  });

export const useDeleteEnquiry = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/bookings/inquiry/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.enquiry],
      });
      return response;
    },
  });

export const useGetSinglePackageDetails = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.packages, id],
    queryFn: () => get({ url: `api/v1/packages/cms/${id}/detail` }),
    refetchOnWindowFocus: true,
    staleTime: 1000,
    retry: 3,
    select: (response) => {
      return response;
    },
  });

export const useCreatePackages = () => {
  const navigate = useNavigate(); // initialize useHistory

  return useMutation({
    mutationFn: (body: object) =>
      post({ url: "api/v1/packages/cms/create", body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.packages] });
      showSuccessMessage("Package added successfully !!!");
      navigate("/package"); 
    },
    onError: (error: any) => showErrorMessage(getValue(error, "message")),
  });
};

export const useUpdatePackages = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      patch({ url: `api/v1/packages/${id}/cms/update`, body }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.packages] }),
        showSuccessMessage(getValue(response, "message"));
    },
    onError: (error: any) => showErrorMessage(getValue(error, "message")),
  });

export const useDeletePackage = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `/api/v1/packages/cms/${id}/delete`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.packages],
      });
      return response;
    },
  });
