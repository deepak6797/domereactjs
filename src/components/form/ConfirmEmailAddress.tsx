import { useFormContext } from "react-hook-form";
interface Props {
  defaultValue?: string;
}

const ConfirmEmailAddress: React.FC<Props> = ({ defaultValue }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const emailAddress = watch("emailAddress");

  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="flex flex-col gap-2 w-full">
        <input
          defaultValue={defaultValue}
          className="w-full outline-none py-2 px-4 border-[1px] rounded-md border-[#CACACA] text-sm  text-slate-700"
          placeholder="Email Address"
          {...register("emailAddress", { required: "This field is required" })}
        />
        {errors.emailAddress && (
          <span className="text-red-500 text-sm">
            {errors.emailAddress.message?.toString()}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          defaultValue={defaultValue}
          className="w-full outline-none py-2 px-4 border-[1px] rounded-md border-[#CACACA] text-sm  text-slate-700"
          placeholder="Confirm email address"
          {...register("confirmEmailAddress", {
            required: "This field is required",
            validate: (value) =>
              value === emailAddress || "Email Address do not match",
          })}
        />
        {errors.confirmEmailAddress && (
          <span className="text-red-500 text-sm">
            {errors.confirmEmailAddress.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailAddress;
