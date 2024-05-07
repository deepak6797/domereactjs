import { useFormContext } from "react-hook-form";
interface Props {
  defaultValue?: string;
}

const ConfirmPassword: React.FC<Props> = ({ defaultValue }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");

  return (
    <div className="w-full flex flex-col  gap-5">
      <div className="flex flex-col gap-2 w-full">
        <input
          type="password"
          defaultValue={defaultValue}
          className="w-full outline-none py-2 px-4 border-[1px] rounded-md border-[#CACACA] text-sm  text-slate-700"
          placeholder="Password"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message?.toString()}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="password"
          defaultValue={defaultValue}
          className="w-full outline-none py-2 px-4 border-[1px] rounded-md border-[#CACACA] text-sm  text-slate-700"
          placeholder="Confirm Password"
          {...register("conform_password", {
            required: "This field is required",
            validate: (value) => value === password || "Password do not match",
          })}
        />
        {errors.conform_password && (
          <span className="text-red-500 text-sm">
            {errors.conform_password.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConfirmPassword;
