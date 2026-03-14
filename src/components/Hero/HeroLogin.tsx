
export default function HeroLogin() {
  return(
    <>
      <div className="max-w-md text-center md:text-left">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Welcome!</h1>
          <p className="text-base md:text-lg text-slate-600">Sign in to access your dashboard, manage data, and stay on top of your business.</p>
        </div>

        <div className="space-y-4 text-sm md:text-base text-slate-600">
          <p className="flex items-start gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">✓</span>
            Secure access with encrypted authentication
          </p>
          <p className="flex items-start gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">✓</span>
            Fast navigation to your most important workflows
          </p>
          <p className="flex items-start gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">✓</span>
            Built for teams, with role-based access and reporting
          </p>
        </div>
      </div>
    </>
  )
}