import { useState } from 'react';
import { useDrop } from 'react-dnd';

const ITEM_TYPES = {
  TEXT_BOX: 'text-box',
  LIST: 'list',
};

const Grid = () => {
  const [items, setItems] = useState([]);

  const [, drop] = useDrop({
    accept: [ITEM_TYPES.TEXT_BOX, ITEM_TYPES.LIST],
    drop: (item, monitor) => {
      const { x, y } = monitor.getSourceClientOffset();
      setItems((prevItems) => [
        ...prevItems,
        {
          type: item.type,
          x: Math.round(x / 50) * 50, // snap to 50px grid
          y: Math.round(y / 50) * 50,
        },
      ]);
    },
  });

  const getItemStyle = (item) => ({
    position: 'absolute',
    left: item.x,
    top: item.y,
  });

  return (
    <div
      ref={drop}
      className="grid grid-cols-12 grid-rows-20 gap-1 border-2 border-gray-500"
      style={{ backgroundColor: 'lightgray' }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="border-black bg-white p-4 col-span-2 row-span-2"
          style={getItemStyle(item)}
        >
          {item.type === ITEM_TYPES.TEXT_BOX && <input type="text" />}
          {item.type === ITEM_TYPES.LIST && (
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Grid;
