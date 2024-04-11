import supabase from "./supabase";

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
