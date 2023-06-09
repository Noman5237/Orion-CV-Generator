import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useForm } from 'react-hook-form';
import Draggable from 'react-draggable';

interface TextWidgetDto {
  value: 'name' | 'personal' | 'educations';
}

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

const TextWidget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextWidgetDto>({});

  const [value, setValue] = useState<string | null>(null);

  const profile = useAppSelector((state) => state.profile.value);

  const onSubmit = (path: TextWidgetDto) => {
    console.log(path);
    const directives = path.value.split('.');
    const pathValue = directives.reduce((data, currentValue: any) => {
      console.log(data);
      return Object.entries(profile).find(
        ([key, value]) => key === currentValue
      )![1];
    });
    console.log(pathValue);
    setValue(pathValue);
  };

  return (
    <Draggable handle=".handle" grid={[10, 10]}>
      <div className="handle p-4 border border-gray-400 rounded-md shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('value')}
            className="border border-gray-400 rounded-md p-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 border-solid border-2 border-gray-400 p-2 rounded-md">
          <p>{value}</p>
        </div>
      </div>
    </Draggable>
  );
};

TextWidget.widgetName = 'TextWidget';

export { TextWidget };
