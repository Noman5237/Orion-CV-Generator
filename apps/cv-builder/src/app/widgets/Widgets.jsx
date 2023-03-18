import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Draggable from 'react-draggable';


const TextWidget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const [isBo , setIsBo] = useState("normal");
const[text, setText] = useState('Enter Text Here');
  const [visible, setVisible] = useState(false);

const [isBold, setBold] = useState(false);
const handleBold = () => {

    setBold("bold");
   
  };


const handleHpver = (event) =>{
    setVisible(false);


}
 const handleMouseMoveOut = (event) =>{

    setTimeout(
        setVisible(!visible)
    , 1000);

}


  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleColorChange = (event) => {

    setColor(event.target.value);
  };

  const [value, setValue] = useState('');

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
    setVisible(true);
    console.log(visible)
  };
  

  return (
    <Draggable handle=".handle" grid={[10, 10]}>
      <div onMouseLeave={handleMouseMoveOut} className=" p-4 border border-gray-400 rounded-md shadow-md"
      
      style={{
            width: '40%',
            border: '2px solid black',
            padding: '5px',
            borderRadius: '5px',
        
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
          <input hidden={visible}
          style={{margin: '10px'}}
            {...register('value')}
            className="border border-gray-400 rounded-md p-2 mr-2"
            placeholder="Enter path (e.g. name.first)"
          />
          <button
          hidden={visible}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        <div className="handle mt-4 border-solid border-2 border-gray-400 p-2 rounded-md">
          <p><div>
        <span
        
        onMouseOver={handleHpver}
        className="border-2 border-gray-400 p-4 rounded-md shadow-md border border-gray-400"
        style={{
            fontSize: `${fontSize}px`,
            color: color,
            border: '2px solid black',
            padding: '5px',
            borderRadius: '5px',
            fontWeight: isBold
        
        }}>{value}</span>
      <div hidden={visible}> 
        <label htmlFor="fontSize">Font Size:</label>
        <input
              style={{margin:'10px',
        padding:'10px',
    }}
        hidden={visible}
        className="border border-gray-400 rounded-md p-1"
          type="number"
          id="fontSize"
          name="fontSize"
          min="8"
          max="72"
          step="1"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
      </div>
      <div hidden={visible}>
        <label htmlFor="color">Color:</label>
        <input
      style={{margin:'10px',
        padding:'10px',
    }}
        className="flex items-center justify-between"
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={handleColorChange}
        />
      </div>
         <div hidden={visible}>
        add a radio button to make the text bold
        <input
        style={{margin: '10px'}}
         hidden={visible}
        className="flex items-center justify-between"

          type="radio"
          id="bold"
          name="bold"
          value={isBold}
          onChange={handleBold}
        />


      </div>
    </div></p>
        </div>
      </div>
    </Draggable>
  );
};

TextWidget.widgetName = 'TextWidget';

export { TextWidget };