import React, { DragEvent, FC } from 'react';
import Dropzone from 'react-dropzone';
import { IoIosClose } from 'react-icons/io';
import { BsPlusLg } from 'react-icons/bs';
import { getValue } from '../../utils/object';
import { getCompleteImageUrl } from '../../helper/url-constructor';

interface ImageDropZoneProps {
  onImageDropAccepted: (acceptedFiles: File[]) => void;
  allowMultiple?: boolean;
  selectedImage: File[];
  removeSelectedImage: (data: {
    event: React.MouseEvent;
    name: string;
  }) => void;
  setSelectedImages: (val: any[]) => unknown;
  label: string;
}

const ImageDropZone: FC<ImageDropZoneProps> = ({
  onImageDropAccepted,
  selectedImage,
  removeSelectedImage,
  setSelectedImages,
  label,
  allowMultiple = false,
}) => {
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const files = (event as any).dataTransfer.files as FileList;
    const filesArray = Array.from(files);
    setSelectedImages([...selectedImage, ...filesArray]);
  };

  return (
    <>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="py-8 border border-gray-200 dark:border-gray-600  rounded-lg flex justify-center items-center">
        <Dropzone onDropAccepted={onImageDropAccepted} multiple={allowMultiple}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={`w-full flex flex-row flex-wrap gap-5 justify-center items-center overflow-x-auto`}
            >
              <input {...getInputProps()} />

              {selectedImage && selectedImage.length > 0 && (
                <div className="flex gap-4  overflow-x-auto flex-wrap">
                  {selectedImage.map((data: File | string) => (
                    <div
                      key={getValue(data, 'name', data)}
                      className="border relative"
                    >
                      <div
                        onDrop={handleDrop}
                        onDragOver={(event) => event.preventDefault()}
                        className="relative group"
                      >
                        <IoIosClose
                          className="absolute -top-2 -right-2 text-4xl text-white font-extrabold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:cursor-pointer"
                          onClick={(event) =>
                            removeSelectedImage({
                              event,
                              name: getValue(data, 'name', data),
                            })
                          }
                        />

                        {!getValue(data, 'name', '') ? (
                          <>
                            {data ? (
                              <img
                                className="h-[80px] w-[110px] group-hover:opacity-80 z-1"
                                alt={'Food'}
                                src={getCompleteImageUrl(String(data))}
                              />
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <img
                            src={URL.createObjectURL(getValue(data, '', data))}
                            className="h-[80px] w-[110px] group-hover:opacity-80 z-1"
                            alt={getValue(data, 'name')}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-100 dark:bg-gray-600  h-[80px] w-[110px] relative flex flex-col justify-center items-center border-dotted dark:border-gray-300 border-4">
                <BsPlusLg className="text-3xl text-black dark:text-gray-200 cursor-pointer" />
                <p className="text-pink-500 absolute bottom-2 text-xs block">
                  Choose a Photo
                </p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default ImageDropZone;
