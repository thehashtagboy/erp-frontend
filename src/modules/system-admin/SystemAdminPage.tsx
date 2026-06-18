import { useState } from 'react';

export default function SystemAdminPage() {
  const subModules = [
    {
      title: "User & Access Management",
      description: "Manage users, roles, permissions, and departmental hierarchies.",
      colorClass: "bg-primary",
      bgClass: "bg-primary/10",
      shape: "large-square",
      gridClass: "md:col-span-2 md:row-span-2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "Security & Compliance",
      description: "Manage access controls, security policies, and ensure regulatory compliance.",
      colorClass: "bg-error",
      bgClass: "bg-error/10",
      shape: "wide",
      gridClass: "md:col-span-2 md:row-span-1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-error">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "System Configuration",
      description: "Configure system-wide settings, manage List of Values (LOV), and branding.",
      colorClass: "bg-secondary",
      bgClass: "bg-secondary/10",
      shape: "wide",
      gridClass: "md:col-span-2 md:row-span-1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-secondary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Workflow & Automation",
      description: "Define and manage automated business processes and rules.",
      colorClass: "bg-accent",
      bgClass: "bg-accent/10",
      shape: "large-square",
      gridClass: "md:col-span-2 md:row-span-2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-accent">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      title: "Integration & Data Management",
      description: "Manage APIs, third-party integrations, and data imports/exports.",
      colorClass: "bg-info",
      bgClass: "bg-info/10",
      shape: "tall",
      gridClass: "md:col-span-1 md:row-span-2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-info">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      title: "Monitoring & Maintenance",
      description: "View system health, active sessions, performance metrics, and logs.",
      colorClass: "bg-success",
      bgClass: "bg-success/10",
      shape: "small-square",
      gridClass: "md:col-span-1 md:row-span-1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-success">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: "Audit & Activity Logs",
      description: "Track system usage, user actions, and generate compliance reports.",
      colorClass: "bg-warning",
      bgClass: "bg-warning/10",
      shape: "small-square",
      gridClass: "md:col-span-1 md:row-span-1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-warning">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    }
  ];

  return (
    <div className="p-6 pb-20 min-h-screen flex flex-col max-w-[1300px] mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-base-content tracking-tight mb-2">System Administration</h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">Configure and manage core system components, security policies, and integrations.</p>
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
              className={`group relative overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex 
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

              {/* Action arrow (Bottom Right for large/tall, End for wide, Hidden for small) */}
              {!isSmallSquare && (
                <div className={`
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  ${isWide ? 'ml-auto -translate-x-2 group-hover:translate-x-0' : 'absolute bottom-5 right-5 translate-x-2 group-hover:translate-x-0'}
                `}>
                  <div className={`w-8 h-8 rounded-full bg-base-100 shadow-sm border border-base-200 flex items-center justify-center ${module.colorClass.replace('bg-', 'text-')}`}>
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
