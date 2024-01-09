"use server";

import { z } from "zod";

// define the form data schema
const schema = z.object({
  teamId: z.string({
    invalid_type_error: "Team ID is required",
  }),
  password: z.string({ invalid_type_error: "Password is required" }),
});

//generate server action to login
export async function loginUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log("Form data is invalid");
    return {
      status: 400,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // a 10 second timeout to simulate a slow server
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
