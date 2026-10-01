import React from 'react';

export function LoadingSkeleton({ count = 6 }: {count?: number;}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) =>
      <div key={i} className="overflow-hidden rounded-xl border border-line bg-white" aria-hidden="true">
          <div className="aspect-[4/3] animate-pulse bg-line/70" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-line" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-line/70" />
            <div className="flex justify-between pt-1">
              <div className="h-7 w-24 animate-pulse rounded bg-line" />
              <div className="h-5 w-20 animate-pulse rounded bg-line/70" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-lg bg-line/70" />
          </div>
        </div>
      )}
      <span className="sr-only" role="status">
        Loading vehicles…
      </span>
    </>);

}