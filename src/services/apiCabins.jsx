import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("Cabin").select("*");

  if (error) {
    console.log(error);
    throw new error(error);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("Cabin").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new error(error);
  }

  return data;
}

export async function insertCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("Cabin")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new error(error);
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("Cabin").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("cabin could not uploaded")
  }

  return data;
}
