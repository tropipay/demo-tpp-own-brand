import React from "react";
import Menu from '../menu/Menu';

export default function Page({ children, ...rest }) {
    return (
        <div>
            <Menu />
            {(children)}
        </div>
    );
}
