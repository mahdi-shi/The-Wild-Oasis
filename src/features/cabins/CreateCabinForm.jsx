import RowForm from "../../ui/RowForm";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Inputs";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isLoading: isInserting, mutate } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("You added a cabin to the list");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });

  function onSubmit(data) {
    mutate({...data,image : data.image[0]});
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
          {...register("name", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm lable={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
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
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm lable={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
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
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm lable={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "this field is required",
          })}
        />
      </RowForm>

      <RowForm>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isInserting} type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </RowForm>
    </Form>
  );
}

export default CreateCabinForm;
