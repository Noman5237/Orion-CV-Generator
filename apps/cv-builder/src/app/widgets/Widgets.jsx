
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import Draggable from 'react-draggable'


const TextWidget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });

  const [value, setValue] = useState("");

  const profile = useSelector((state) => state.profile.value);

  const onSubmit = (path) => {
    console.log(path);
    const directives = path.value.split('.');
    const pathValue = directives.reduce((acc, curr) => {
      if (acc[curr]) {
        return acc[curr];
      }
      return directives[directives.length - 1];
    }, profile);
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
