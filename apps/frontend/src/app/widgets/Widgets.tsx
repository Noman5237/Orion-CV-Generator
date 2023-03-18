
import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useForm } from "react-hook-form";
import Draggable from 'react-draggable'

interface TextWidgetDto {
  value: "name" | "personal" | "educations"
}

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
  obj[key];


const TextWidget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextWidgetDto>({
  });

  const [value, setValue] = useState<String | null>(null);

  const profile = useAppSelector((state) => state.profile.value);

  const onSubmit = (path: TextWidgetDto) => {
    console.log(path);
    const directives = path.value.split(".");
    const pathValue = directives.reduce((data, currentValue: any) => {
      console.log(data); return Object.entries(profile).find(([key, value]) => key === currentValue)![1];
    });
    console.log(pathValue);
    setValue(pathValue);
  }

  return (
    <>
      <Draggable
        handle=".handle"
        grid={[10, 10]}
      >
        <div className='handle'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("value")} />
            <input type="submit" />
          </form>
          <div className='border-solid border-2'>
            <p>{value}</p>
          </div>
        </div>
      </Draggable>
    </>
  );
};

TextWidget.widgetName = 'TextWidget';

export { TextWidget };
