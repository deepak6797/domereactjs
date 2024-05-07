import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface Props {
  required?: boolean;
  selectedImage: any;
  setSelectedImage: (val:any)=>void
}

const UploadImage: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <input
          type="file"
          id="image"
          className="hidden"
          {...register("image", { required: required && "Image is required" })}
          onChange={(event) => {
            handleImageChange(event);
            register("image", {
              required: required && "Image is required",
            }).onChange(event);
          }}
        />
        <div className="flex gap-5">
          <button
            type="button"
            className="text-xs text-white  rounded p-10 border border-dotted "
            onClick={() => document.getElementById("image")?.click()}
          >
            <FaPlus className="text-black dark:text-white " />
          </button>

          {selectedImage && (
            <div className="relative h-[100px] w-[100px]">
              <img
                src={selectedImage}
                width={100}
                height={100}
                alt="image"
                className=""
              />
              <RxCross2
                className="absolute top-0 right-0 text-black dark:text-white text-xs hover:text-red-500 hover:cursor-pointer"
                onClick={handleRemove}
              />
            </div>
          )}
        </div>
        {errors.image && (
          <span className="text-red-500 text-sm">
            {errors.image.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
