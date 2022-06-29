import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormTextField from "../../app/components/formcontrol/FormTextField";
import ContentHeader from "../../app/components/header/ContentHeader";
import Validation from "../../app/services/validation";
import { exec } from "../../app/services/util";

function Step2Page(props) {
    const { t } = useTranslation();

    const { handleSubmit, control } = useForm({
        defaultValues: {
            code: ""
        }
    });

    const submit = data => exec(props.submit, [data]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContentHeader
                    title={t("signup.email.title")}
                    subtitle={t("signup.email.subtitle")}
                    className="box-label-center box-margin-bottom-2"
                    classNameTitle="box-label-bold"
                    classNameSubtitle="label-size-md"
                />
            </Grid>

            <Grid item xs={12}>
                <FormTextField
                    control={control}
                    name="code"
                    size="medium"
                    label={t("signup.email.code.label")}
                    rules={{
                        required: Validation.required(t),
                        maxLength: Validation.maxStrLength(t),
                        pattern: Validation.string(t)
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    className="btn-full-width page-payment-btn-first-margin"
                    size="large"
                    color="primary"
                    style={{ marginTop: "1rem", width: '100%' }}
                    onClick={()=>{
                        console.log('resend', props.onResend);
                        exec(props.onResend);
                    }}
                >
                    {t("signup.email.btn.resend")}
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    className="btn-full-width page-payment-btn-first-margin"
                    size="large"
                    color="primary"
                    style={{ marginTop: "1rem", width: '100%' }}
                    onClick={handleSubmit(submit)}
                >
                    {t("signup.email.btn.next")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default Step2Page;