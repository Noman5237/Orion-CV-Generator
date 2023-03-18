import { useState } from "react";
import { TextWidget } from "../widgets/Widgets";

const CVPage = () => {
  const widgets = [TextWidget];

  const [selectedWidgets, setSelectedWidgets] = useState<any>([]);

  const onClick = (widget: any) => {
    setSelectedWidgets([...selectedWidgets, widget]);
  };


  return (<>
    {
      widgets.map((widget) =>
        <p key={widget.widgetName} onClick={() => onClick(widget)}>
          {widget.widgetName}</p>)
    }

    {
      selectedWidgets.map((Widget: any, index: number) => {
        return <Widget key={index} />
      })
    }

  </>);
};

export { CVPage };
