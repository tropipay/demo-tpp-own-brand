import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormTextField from "../../app/components/formcontrol/FormTextField";
import FormSelect from "../../app/components/formcontrol/FormSelect";
import ContentHeader from "../../app/components/header/ContentHeader";
import Validation from "../../app/services/validation";
import Currency from "../../app/services/currency";
import ClientType from "../../app/services/ClientType";

import Lang from "../../app/services/lang";
import srvReason from "../../app/services/ReasonSlice";
import { useDispatch, useSelector } from "react-redux";

function Step1Page(props) {
    const { t } = useTranslation();
    srvReason.setDependency(useDispatch, useSelector);
    const reasons = srvReason.selector.data();

    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            amount: "",
            currency: "EUR",
            concept: "",
            lang: "es",
            reason: 9,
            description: t("signup.title"),
            reasonDes: t("signup.title"),
            reference: ""
        }
    });

    const watchFields = watch({
        "email": "email",
        "password": "password",
        "phone": "phone",
        "lang": "lang"
    });

    function isValidForm(watchFields) {
        const mandatory = watchFields.email !== "" &&
            watchFields.password !== "" &&
            watchFields.phone !== "";
        return mandatory;
    }

    const submit = data => {
        if (props.submit instanceof Function) {
            props.submit(data);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContentHeader
                    title={t("signup.form.title")}
                    subtitle={t("signup.form.subtitle")}
                    className="box-label-center box-margin-bottom-2"
                    classNameTitle="box-label-bold"
                    classNameSubtitle="label-size-md"
                />
            </Grid>

            <Grid item xs={12} sm={7}>
                <FormTextField
                    control={control}
                    name="email"
                    size="medium"
                    label={t("signup.form.email.label")}
                    rules={{
                        required: Validation.required(t),
                        pattern: Validation.email(t)
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={5}>
                <FormSelect
                    control={control}
                    name="clientTypeId"
                    defaultValue={watchFields.currency}
                    size="medium"
                    fullWidth
                    label={t("signup.form.clientTypeId.label")}
                    placeholder={t("signup.form.clientTypeId.label")}
                    rules={{ required: t("error.required") }}
                    options={ClientType.list()}
                />
            </Grid>

            <Grid item xs={12}>
                <FormTextField
                    control={control}
                    name="name"
                    size="medium"
                    label={t("signup.form.name.label")}
                    rules={{
                        required: Validation.required(t),
                        maxLength: Validation.maxStrLength(t),
                        pattern: Validation.string(t)
                    }}
                />
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="surname"
                    size="medium"
                    label={t("signup.form.surname.label")}
                />
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="password"
                    type="password"
                    size="medium"
                    label={t("signup.form.password.label")}
                />
            </Grid>

            <Grid item xs={12} sm={3} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="callingCode"
                    size="medium"
                    label={t("signup.form.callingCode.label")}
                    rules={{
                        required: Validation.required(t),
                        maxLength: Validation.maxStrLength(t),
                        pattern: Validation.number(t)
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={9} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="phone"
                    size="medium"
                    label={t("signup.form.phone.label")}
                />
            </Grid>

            <Grid item xs={12}>
                <FormSelect
                    control={control}
                    name="lang"
                    size="medium"
                    defaultValue={watchFields.lang}
                    label={t("signup.form.lang.label")}
                    placeholder={t("signup.form.lang.label")}
                    keys={{ label: "label", value: "lang" }}
                    options={Lang.getSupported()}
                />
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="birthDate"
                    size="medium"
                    label={t("signup.form.birthDate.label")}
                />
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                <FormTextField
                    control={control}
                    name="birthDate"
                    size="medium"
                    label={t("signup.form.birthDate.label")}
                />
            </Grid>

            <Grid item xs={12}>
                <FormSelect
                    control={control}
                    name="occupationId"
                    size="medium"
                    value="1"
                    fullWidth
                    defaultValue={watchFields.reason}
                    label={t("signup.form.occupationId.label")}
                    placeholder={t("signup.form.occupationId.label")}
                    options={getItems(reasons)}
                />
            </Grid>

            <Grid item xs={12}>
                <FormTextField
                    control={control}
                    name="reasonDes"
                    size="medium"
                    label={t("signup.form.reason.des")}
                //rules={{ required: t("error.required") }}
                />
            </Grid>

            <Grid item xs={12}>
                <FormTextField
                    control={control}
                    name="description"
                    multiline
                    minRows="3"
                    size="medium"
                    label={t("signup.form.description.label")}
                    placeholder={t("signup.form.description.label")}
                //rules={{ required: t("error.required") }}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    className="btn-full-width page-payment-btn-first-margin"
                    size="large"
                    color="primary"
                    disabled={!isValidForm(watchFields)}
                    style={{ marginTop: "1rem", width: '100%' }}
                    onClick={handleSubmit(submit)}
                >
                    {t("signup.form.btn.next")}
                </Button>
            </Grid>
        </Grid>
    )
}

function getItems(lst) {
    if (lst && lst instanceof Array) {
        return lst.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        });
    }
    return [];
}

export default Step1Page;