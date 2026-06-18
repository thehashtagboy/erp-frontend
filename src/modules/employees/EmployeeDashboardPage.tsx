import { useNavigate } from 'react-router-dom';

interface SubModule {
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  shape: 'large-square' | 'wide' | 'tall' | 'small-square';
  gridClass: string;
  path?: string;
  icon: React.ReactNode;
}

export default function EmployeeDashboardPage() {
  const navigate = useNavigate();

  const subModules: SubModule[] = [
    {
      title: "Core Profile & Information Management",
      description: "Manage employee personal records, contact details, emergency contacts, and identification documents.",
      colorClass: "bg-primary",
      bgClass: "bg-primary/10",
      shape: "large-square",
      gridClass: "md:col-span-2 md:row-span-2",
      path: "/employees/profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )
    },
    {
      title: "Employment & Job Lifecycle Management",
      description: "Track hiring history, departments, promotion milestones, transfer logs, and exit processing.",
      colorClass: "bg-secondary",
      bgClass: "bg-secondary/10",
      shape: "wide",
      gridClass: "md:col-span-2 md:row-span-1",
      path: "/employees/lifecycle",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-secondary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      title: "Compensation & Benefits",
      description: "Manage salary scales, pay rates, regular allowances, tax definitions, and company benefits.",
      colorClass: "bg-accent",
      bgClass: "bg-accent/10",
      shape: "wide",
      gridClass: "md:col-span-2 md:row-span-1",
      path: "/employees/compensation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-accent">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h.007v.008H3.75V4.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3 13.5h.008v.008H3V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5M3 7.5h18M3 16.5h18M21 7.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    {
      title: "Leave & Time Management",
      description: "Supervise employee timesheets, configure attendance shifts, track leaves, and process time-off requests.",
      colorClass: "bg-info",
      bgClass: "bg-info/10",
      shape: "large-square",
      gridClass: "md:col-span-2 md:row-span-2",
      path: "/employees/leave-time",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-info">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      )
    },
    {
      title: "Document & Compliance Vault",
      description: "Securely store contracts, NDAs, performance reviews, certifications, and track compliance requirements.",
      colorClass: "bg-success",
      bgClass: "bg-success/10",
      shape: "large-square",
      gridClass: "md:col-span-2 md:row-span-2",
      path: "/employees/documents",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-success">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="p-6 pb-20 min-h-screen flex flex-col max-w-[1300px] mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-base-content tracking-tight mb-2">Employee Directory & HR Management</h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Manage job cycles, personal profiles, time allocation, compensation structure, and regulatory HR vaults.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-6 auto-rows-[110px]">
        {subModules.map((module, index) => {
          const isLargeSquare = module.shape === 'large-square';
          const isWide = module.shape === 'wide';
          const isTall = module.shape === 'tall';
          const isSmallSquare = module.shape === 'small-square';

          return (
            <div
              key={index}
              onClick={() => module.path && navigate(module.path)}
              className={`group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex 
                ${isWide ? 'flex-row items-center p-6 gap-6' : 'flex-col p-6 justify-between'} 
                ${module.gridClass}`}
            >
              {/* Background Tint Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${module.colorClass}`}></div>
              
              {/* Icon */}
              <div className={`
                ${isSmallSquare ? 'w-10 h-10 mb-auto' : 'w-12 h-12'} 
                ${isTall ? 'mb-auto' : ''}
                ${isLargeSquare ? 'mb-auto w-14 h-14' : ''}
                rounded-2xl ${module.bgClass} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm
              `}>
                <div className={`[&>svg]:w-6 [&>svg]:h-6 ${isSmallSquare ? '[&>svg]:w-5 [&>svg]:h-5' : ''} ${isLargeSquare ? '[&>svg]:w-7 [&>svg]:h-7' : ''}`}>
                  {module.icon}
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col ${isWide ? 'flex-1' : ''} ${isSmallSquare ? 'mt-auto' : ''}`}>
                <h3 className={`font-bold text-base-content tracking-tight ${
                  isLargeSquare ? 'text-2xl mb-1' : 
                  isWide ? 'text-lg mb-1' : 
                  isTall ? 'text-lg mb-2' : 
                  'text-base leading-tight'
                }`}>
                  {module.title}
                </h3>
                
                {/* Description */}
                {!isSmallSquare && (
                  <p className={`text-base-content/70 leading-relaxed ${
                    isLargeSquare ? 'text-sm line-clamp-2' : 
                    isWide ? 'text-xs line-clamp-1' : 
                    'text-xs line-clamp-4'
                  }`}>
                    {module.description}
                  </p>
                )}
              </div>

              {/* Action arrow */}
              {!isSmallSquare && (
                <div className={`
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  ${isWide ? 'ml-auto -translate-x-2 group-hover:translate-x-0' : 'absolute bottom-5 right-5 translate-x-2 group-hover:translate-x-0'}
                `}>
                  <div className={`w-8 h-8 rounded-full bg-base-100 shadow-sm border border-base-300 flex items-center justify-center ${module.colorClass.replace('bg-', 'text-')}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                     </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
