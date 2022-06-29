import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepperControl from "../../app/components/stepper/StepperControl";
import srvReason from "../../app/services/ReasonSlice";
import srvUser from "../../user/services/UserSlice";

import Step1Page from "./Step1Page";
import Step2Page from "./Step2Page";
import Step3Page from "./Step3Page";
import Step4Page from "./Step4Page";

function RegisterPage() {
    const { t } = useTranslation();
    const nav = useNavigate();
    const stepper = StepperControl();

    srvReason.setDependency(useDispatch, useSelector);
    srvUser.setDependency(useDispatch, useSelector);

    const reasons = srvReason.selector.data();
    const user = srvUser.selector.data();

    if (!reasons || reasons.length < 1) {
        srvReason.action.load();
    }

    //... define components by step
    const steps = [
        //... registration form
        () => (
            <Step1Page
                submit={async payload => {
                    srvUser.action.update(payload);
                    srvUser.action.sendCode({ target: payload.email, resource: 'email' });
                    stepper.next();
                }}
            />
        ),
        //... email validation 
        () => (
            <Step2Page
                submit={async payload => {
                    const data = { ...user, validationCode: payload.code };
                    console.log('big-pyload', data, user);
                    srvUser.action.validate(payload, data => {
                        console.log('SIIIIIIIIII', data);
                    });
                    stepper.next();
                }}
            />
        ),
        //... phone validation 
        () => (
            <Step3Page
                submit={payload => {
                    srvUser.action.validate(payload, 'phone');
                    stepper.next();
                }}
            />
        ),
        //... process complete
        () => (
            <Step4Page
                submit={payload => {
                    nav('/');
                }}
            />
        )
    ];

    //... set components to stepper
    stepper.add(steps);

    function getPageName(index) {
        switch (index) {
            case 0:
                return "form";

            case 1:
                return "email";

            case 1:
                return "phone";

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
                onClick={() => {
                    if (stepper.index > 0 && stepper.total > stepper.index) {
                        stepper.back();
                    } else {
                        nav("/");
                    }
                }}
                color="secondary"
                style={{ marginTop: "1rem", marginBottom: "1rem", width: '100%' }}
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