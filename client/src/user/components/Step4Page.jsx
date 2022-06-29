import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ContentHeader from "../../app/components/header/ContentHeader";

function Step4Page() {
    const { t } = useTranslation();
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
        </Grid>
    )
}

export default Step4Page;