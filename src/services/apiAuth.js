import supabase from "./supabase";

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}
