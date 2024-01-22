'use client'
import LandingNavbar from "@/app/components/navbars/landing";
import { loginUser,createUser } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

const intialState = {
  message:"",
}

export default function LoginToAccount() {
  const { pending } = useFormStatus();
  const [state,formAction] = useFormState(loginUser,intialState);
  useEffect(()=>{
    console.log(state);
  },[state]);
  return (
    <main className="flex flex-col align-center landing">
      <LandingNavbar />
      <div className="flex justify-center h-5/6 items-center p-2">
        <div className="bg-white h-fit w-4/12 py-4 px-2 rounded-md">
          <h3 className="text-3xl mb-4 font-semibold text-center text-black">
            Welcome back
          </h3>

          <form className="w-full" action={formAction}>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-black text-xs font-bold mb-2">
                  Team Id
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-team-id"
                  name="teamId"
                  type="number"
                  required
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-3">
              <div className="w-full px-3">
                <label className="block tracking-wide text-black text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  name="password"
                  type="password"
                  placeholder="******************"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end px-3">
              <a
                href="forgot-password"
                className="text-black text-md italic hover:text-blue"
              >
                {" "}
                Forgot Password?{" "}
              </a>
            </div>

            <div className="flex justify-center py-2">
              <button
                type="submit"
                className="bg-black text-white block rounded-md py-2 px-4"
                aria-disabled={pending}
              >
                Sign In
              </button>
            </div>
          </form>

          <p>{state?.message}</p>
        </div>
      </div>
    </main>
  );
}
