import { useFormContext } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

interface Props {
  defaultValue?: string;
  name: string;
  placeholder: string;
}

const CustomSearch: React.FC<Props> = ({ defaultValue, name, placeholder }) => {
  const { register } = useFormContext();

  return (
    <div className="flex items-center pl-2  gap-2  border-[1px] rounded-md  ">
      <IoSearch className="mx-1" />
      <input
        defaultValue={defaultValue}
        className="outline-none py-3 px-4 text-sm border-l-[1px] rounded-r-md"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default CustomSearch;
