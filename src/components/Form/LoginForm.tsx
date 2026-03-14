import LoginButton from "../Button/LoginButton";

export default function LoginForm() {
  return(
    <>
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-10">

          <div className="w-full max-w-md border border-gray-300 border-t-8 border-t-blue-500 rounded-xl px-15 py-23 bg-white">

            <h5 className="text-2xl font-bold mb-3">Login</h5>
            <input type="text" placeholder="Username" className="input w-full mb-3" />
            <input type="password" placeholder="Password" className="input password w-full mb-2" />
            <div className="grid grid-cols-2 justify-between items-center">
              <div>
                <input type="checkbox" className="checkbox checkbox-sm text-xs" />
                <label className="label-text text-xs ml-2 text-slate-500">Remember me</label>
              </div>
              <a href="#" className="text-xs text-red-500 font-normal text-right">Forgot password?</a>
            </div>

            <div className="mt-10">
              <LoginButton />
              <button className="btn bg-white text-black border-[#e5e5e5] w-full mt-2">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
 }