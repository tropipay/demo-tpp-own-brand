import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "./Message";
import srvMessage from "../../services/MessageSlice";

export default function MessageApp() {
    const { t } = useTranslation();
    srvMessage.setDependency(useDispatch, useSelector);
    const msgId = srvMessage.selector.code();
    const msgType = srvMessage.selector.type();

    return (
        <Message
            cls={msgType || ""}
            message={traslate(msgId, t, msgType)}
            onClose={() => srvMessage.action.clean()}
        />
    );
}

function traslate(id, t, scope = 'error', msgDefault = "error.internal") {
    if (!id || id === '') return '';
    const msgId = scope + "." + id;
    return t(msgId) !== msgId ? t(msgId) : t(msgDefault)
}