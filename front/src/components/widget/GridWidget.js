import React, { useEffect, useState } from "react";
import GridLayout from 'react-grid-layout';
import AppTable from 'components/widget/AppTable';

const GridWidget = ({ widgetList, handleWidget }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, [])

    return (
        <GridLayout className="grid" cols={5} rowHeight={3} width={windowWidth}>
            {widgetList.map((widget, index) => (
                <div key={widget.id} data-grid={{ x: index % 5, y: index % 5, w: 1, h: widget.type === 'Shiny Pokemon' ? 35 : 20 }}>
                    <AppTable widget={widget} handleWidget={handleWidget} />
                </div>
            ))}
        </GridLayout>
    );
}

export default GridWidget;