import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepperControl from "../../app/components/stepper/StepperControl";
import srvReason from "../../app/services/ReasonSlice";

import Step1Page from "./Step1Page";
import Step2Page from "./Step2Page";

function RegisterPage() {
    const { t } = useTranslation();
    const nav = useNavigate();
    const stepper = StepperControl();

    srvReason.setDependency(useDispatch, useSelector);
    const reasons = srvReason.selector.data();
    if (!reasons || reasons.length < 1) {
        srvReason.action.load();
    }

    //... define components by step
    const steps = [
        () => (
            <Step1Page
                submit={async payload => {
                    //dispatch(srvPaylink.action.update(payload));
                    stepper.next();
                }}
            />
        ),
        () => (
            <Step2Page
                submit={() => {
                    //dispatch(srvPaylink.action.create(paylink));
                    stepper.next();
                }}
            />
        ),
        () => (
            <Step2Page
                submit={payload => {
                    //dispatch(srvPaylink.action.share(payload));
                    nav('/');
                }}
            />
        )
    ];

    // ... set components to stepper
    stepper.add(steps);

    function getPageName(index) {
        switch (index) {
            case 0:
                return "form";

            case 1:
                return "resume";

            default:
                return "show";
        }
    }

    // ... define render controls
    const renderControls = (t, nav) => {
        const page = getPageName(stepper.index);
        return (
            <Button
                variant="contained"
                className="btn-full-width"
                size="large"
                onClick={() => nav("/")}
                color="secondary"
            >
                {t("signup." + page + ".btn.back")}
            </Button>
        );
    };

    return (
        <div className="page-margin page-padding page-payment-content">
            {stepper.render()}
            {renderControls(t, nav)}
        </div>
    );
}

export default RegisterPage;