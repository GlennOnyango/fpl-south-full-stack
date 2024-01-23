"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// define the form data schema
const schema = z.object({
  teamId: z.string({
    invalid_type_error: "Team ID is required",
  }),
  password: z.string({ invalid_type_error: "Password is required" }),
});

//generate server action to login
export async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    teamId: formData.get("teamId"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      message: "Invalid field",
    };
  }

  // a 10 second timeout to simulate a slow server
  //   await new Promise((resolve) => setTimeout(resolve, 10000));

  cookies().set("name", "Glenn");
  cookies().set("id", formData.get("teamId") as string);

  redirect("dashboard?page=1");
}

export async function createUser(prevState: any, formData: FormData) {
  // ...
  return {
    message: "Please enter a valid email",
  };
}
