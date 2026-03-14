import HeroLogin from "../components/Hero/HeroLogin"
import LoginForm from "../components/Form/LoginForm"

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-white py-10">
      <div className="w-full max-w-7xl bg-slate-50 border border-gray-200 rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center p-2 bg-white/80 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
            <HeroLogin />
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-2 rounded-b-3xl md:rounded-b-none md:rounded-r-3xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}