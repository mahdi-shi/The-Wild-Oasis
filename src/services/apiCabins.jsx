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

export async function insertEditCabin(newCabin, id) {
  console.log(newCabin,id);

  const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //create/edit cabin
  let query = supabase.from("cabins");

  //create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //edit

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
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
    throw new Error("cabin could not uploaded");
  }

  return data;
}
