import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ContentHeader from "../../app/components/header/ContentHeader";
import './LoginPage.scss';
import srvUser from "../../user/services/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import FrameWrapper from "./FrameWrapper";

function LoginPage() {
    const { t } = useTranslation();
    srvUser.setDependency(useDispatch, useSelector);
    const loginUrl = srvUser.selector.loginUrl();
    if (loginUrl === '#') {
        srvUser.action.getLoginUrl();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContentHeader
                    title={t("signup.show.title")}
                    subtitle={t("signup.show.subtitle")}
                    className="box-label-center box-margin-bottom-2"
                    classNameTitle="box-label-bold"
                    classNameSubtitle="label-size-md"
                />
            </Grid>
            <Grid item xs={12}>
                {loginUrl !== '#' ?
                    <FrameWrapper url={loginUrl} />
                    : null}
            </Grid>
        </Grid>
    )
}

export default LoginPage;