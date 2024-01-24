import LandingNavbar from "@/app/components/navbars/landing";

export default function CreateAccount() {
  return (
    <main className="flex flex-col align-center landing">
      <LandingNavbar />
      <div className="flex justify-center h-5/6 items-center p-2">
        <div className="bg-white h-fit w-6/12 p-3 rounded-md">
          <h3 className="text-3xl mb-3 font-semibold text-center text-black">
            Create Account
          </h3>

          <form className="w-full ">
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-black text-xs font-bold mb-2">
                  Team Id
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-team-id"
                  type="number"
                  placeholder="00000"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-black text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  placeholder="someone@example.com"
                />
                <p className="text-black text-xs italic">
                  Please use your fpl email.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-black text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                />
                <p className="text-black text-xs italic">
                  Make it as long and as crazy as you would like
                </p>
              </div>
            </div>

            <div className="flex justify-center py-2">
              <button
                type="submit"
                className="bg-black block rounded-md py-2 px-4"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
