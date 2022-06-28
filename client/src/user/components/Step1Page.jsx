import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormTextField from "../../app/components/formcontrol/FormTextField";
import FormSelect from "../../app/components/formcontrol/FormSelect";
import ContentHeader from "../../app/components/header/ContentHeader";
import Validation from "../../app/services/validation";
import Currency from "../../app/services/currency";

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
    const watchFields = watch({ "amount": "amount", "currency": "currency", "description": "description", "concept": "concept", "lang": "lang", "reason": "reason", "reference": "reference" });

    function isValidForm(watchFields) {
        const mandatory = watchFields.amount !== "" &&
            watchFields.concept !== "" &&
            watchFields.currency !== "" &&
            //watchFields.description !== "" &&
            watchFields.lang !== "" &&
            watchFields.reason !== "";
        return /*advanced ? mandatory && watchFields.reference !== "" :*/ mandatory;
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
                    name="amount"
                    size="medium"
                    label={t("signup.form.amount.label")}
                    rules={{
                        required: Validation.required(t),
                        pattern: Validation.number(t)
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={5}>
                <FormSelect
                    control={control}
                    name="currency"
                    defaultValue={watchFields.currency}
                    size="medium"
                    fullWidth
                    label={t("signup.form.currency.label")}
                    placeholder={t("signup.form.currency.label")}
                    rules={{ required: t("error.required") }}
                    options={Currency.list()}
                />
            </Grid>

            <Grid item xs={12}>
                <FormTextField
                    control={control}
                    name="concept"
                    size="medium"
                    label={t("signup.form.concept.label")}
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
                    name="reference"
                    size="medium"
                    label={t("signup.form.reference.label")}
                //rules={{ required: t("error.required") }}
                />
            </Grid>

            <Grid item xs={12}>
                <FormSelect
                    control={control}
                    name="reason"
                    size="medium"
                    value="1"
                    fullWidth
                    defaultValue={watchFields.reason}
                    label={t("signup.form.reason.label")}
                    placeholder={t("signup.form.reason.label")}
                    //rules={{ required: t("error.required") }}
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
                <FormSelect
                    control={control}
                    name="lang"
                    size="medium"
                    defaultValue={watchFields.lang}
                    label={t("signup.form.lang.label")}
                    placeholder={t("signup.form.lang.label")}
                    keys={{ label: "label", value: "lang" }}
                    //rules={{ required: t("error.required") }}
                    options={Lang.getSupported()}
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
                    size="medium"
                    color="primary"
                    disabled={!isValidForm(watchFields)}
                    style={{ marginTop: "1rem" }}
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