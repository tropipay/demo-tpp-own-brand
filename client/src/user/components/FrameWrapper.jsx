import React from "react";
import { exec } from "../../app/services/util";

function FrameWrapper(props) {
    const ref = React.useRef();
    const [height, setHeight] = React.useState("0px");
    const onLoad = () => {
        //setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
        exec(props.onLoad, [ref]);
    };
    return (
        <iframe
            ref={ref}
            onLoad={onLoad}
            id={props.id || 'iframe'}
            src={props.url}
            width="100%"
            height={height}
            scrolling="no"
            frameBorder="0"
            className={props.className || ''}
            style={{
                minWidth: 640,
                minHeight: 640,
                width: "100%",
                overflow: "hidden",
            }}
        ></iframe>
    );
}

export default FrameWrapper;