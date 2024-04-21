import RowForm from "../../ui/RowForm";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Inputs";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useInsertCabin from "./useInsertCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { insertCabin, isInserting } = useInsertCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isInserting || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      insertCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <RowForm lable={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm lable={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </RowForm>

      <RowForm lable={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </RowForm>

      <RowForm lable={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than price",
          })}
        />
      </RowForm>

      <RowForm lable={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm lable={"Cabin photo"}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </RowForm>

      <RowForm>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isWorking} type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit Cabin" : "Create Cabin"}</Button>
      </RowForm>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.node,
};
