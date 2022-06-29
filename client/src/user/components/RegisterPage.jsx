import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepperControl from "../../app/components/stepper/StepperControl";
import srvUser from "../../user/services/UserSlice";

import Step1Page from "./Step1Page";
import Step2Page from "./Step2Page";
import Step3Page from "./Step3Page";
import Step4Page from "./Step4Page";

function RegisterPage() {
    const { t } = useTranslation();
    const nav = useNavigate();
    const stepper = StepperControl();

    srvUser.setDependency(useDispatch, useSelector);
    const user = srvUser.selector.data();

    //... define components by step
    const steps = [
        //... registration form
        () => (
            <Step1Page
                submit={async payload => {
                    srvUser.action.update(payload);
                    srvUser.action.sendCode(payload, data => {
                        stepper.next();
                    });
                }}
            />
        ),
        //... email validation 
        () => (
            <Step2Page
                onResend={() => {
                    srvUser.action.sendCode({
                        email: user,
                        name: user.name,
                        lang: user.lang
                    });
                }}
                submit={async payload => {
                    const content = { ...user, validationCode: payload.code };
                    srvUser.action.validate(content, data => {
                        stepper.next();
                    });
                }}
            />
        ),
        //... phone validation 
        () => (
            <Step3Page
                onResend={() => {
                    srvUser.action.sendCode({
                        callingCode: user.callingCode, 
                        phone: user.phone, 
                        lang: user.lang
                    });
                }}
                submit={payload => {
                    payload.resource = 'phone';
                    payload.securityPhoneCode = payload.code;
                    payload.callingCode = user ? user.callingCode : null;
                    payload.phone = user ? user.phone : null;
                    srvUser.action.validate(payload, data => {
                        stepper.next();
                    });
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

            case 2:
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
                    console.log('stepper', stepper.index, stepper.total());
                    if (stepper.index > 0 && stepper.index < stepper.total()) {
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