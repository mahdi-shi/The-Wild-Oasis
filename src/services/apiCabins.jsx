import supabase from "./supabase";

export async function getCabins() {
  
    let {data, error } = await supabase.from("Cabin").select("*");

    if(error){
        console.log(error);
        throw new error(error);
    }

    return data;
}
