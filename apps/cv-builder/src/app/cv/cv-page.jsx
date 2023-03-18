import { useState } from "react";
import { TextWidget } from "../widgets/Widgets";
import { ListWidget } from "../widgets/Listwidget";
import { Button, Space } from 'antd';

const CVPage = () => {
  const widgets = [TextWidget , ListWidget];

  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const onClick = (widget) => {
    setSelectedWidgets([...selectedWidgets, widget]);
  };


  return (<>

  
   {
      widgets.map((widget) =>
       <Button block>
      <p key={widget.widgetName} onClick={() => onClick(widget)}>
          {widget.widgetName}</p>
    </Button>
        )
    }

    {
      selectedWidgets.map((Widget, index) => {
        return <Widget key={index} />
      })
    }
    

  </>);
};

export { CVPage };
