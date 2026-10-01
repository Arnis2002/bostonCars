import React from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  message: string;
  children?: React.ReactNode;
}
export function EmptyState({
  icon: Icon,
  title,
  message,
  children
}: EmptyStateProps) {
  return <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-paper/60 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy ring-1 ring-line">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-bold text-navy">{title}</h2>
      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">{message}</p>
      {children && <div className="mt-6 flex flex-col gap-2 sm:flex-row">{children}</div>}
    </div>;
}