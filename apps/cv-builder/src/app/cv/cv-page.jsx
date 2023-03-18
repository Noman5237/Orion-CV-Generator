import { useState } from "react";
import { TextWidget } from "../widgets/Widgets";

const CVPage = () => {
  const widgets = [TextWidget];

  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const onClick = (widget) => {
    setSelectedWidgets([...selectedWidgets, widget]);
  };


  return (<>
    {
      widgets.map((widget) =>
        <p key={widget.widgetName} onClick={() => onClick(widget)}>
          {widget.widgetName}</p>)
    }

    {
      selectedWidgets.map((Widget, index) => {
        return <Widget key={index} />
      })
    }

  </>);
};

export { CVPage };
