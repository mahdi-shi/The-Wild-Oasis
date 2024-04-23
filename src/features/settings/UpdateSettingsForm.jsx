import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Inputs";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    Settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const {  isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSettings({ [field]: value });
  }

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <Form>
        <RowForm lable="Minimum nights/booking">
          <Input
            type="number"
            defaultValue={minBookingLength}
            id="min-nights"
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            disabled={isUpdating}
          />
        </RowForm>
        <RowForm lable="Maximum nights/booking">
          <Input
            type="number"
            defaultValue={maxBookingLength}
            id="max-nights"
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            disabled={isUpdating}
          />
        </RowForm>
        <RowForm lable="Maximum guests/booking">
          <Input
            type="number"
            defaultValue={maxGuestsPerBooking}
            id="max-guests"
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
            disabled={isUpdating}
          />
        </RowForm>
        <RowForm lable="Breakfast price">
          <Input
            type="number"
            defaultValue={breakfastPrice}
            id="breakfast-price"
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            disabled={isUpdating}
          />
        </RowForm>
      </Form>
    );
  }
}

export default UpdateSettingsForm;
