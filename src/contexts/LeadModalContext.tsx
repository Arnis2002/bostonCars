import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AvailabilityModal } from '../components/vehicle/AvailabilityModal';
import { TestDriveModal } from '../components/vehicle/TestDriveModal';
import type { Vehicle } from '../types/vehicle';

type ModalKind = 'availability' | 'test-drive';

interface LeadModalValue {
  openAvailability: (vehicle: Vehicle, message?: string) => void;
  openTestDrive: (vehicle: Vehicle) => void;
}

const LeadModalContext = createContext<LeadModalValue | null>(null);

export function LeadModalProvider({ children }: {children: React.ReactNode;}) {
  const [state, setState] = useState<{kind: ModalKind;vehicle: Vehicle;message?: string;} | null>(null);
  const [open, setOpen] = useState(false);

  const openAvailability = useCallback((vehicle: Vehicle, message?: string) => {
    setState({ kind: 'availability', vehicle, message });
    setOpen(true);
  }, []);
  const openTestDrive = useCallback((vehicle: Vehicle) => {
    setState({ kind: 'test-drive', vehicle });
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openAvailability, openTestDrive }), [openAvailability, openTestDrive]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      {state &&
      <>
          <AvailabilityModal
          key={`a-${state.vehicle.id}-${state.message ?? ''}`}
          open={open && state.kind === 'availability'}
          vehicle={state.vehicle}
          initialMessage={state.message}
          onClose={close} />
        
          <TestDriveModal key={`t-${state.vehicle.id}`} open={open && state.kind === 'test-drive'} vehicle={state.vehicle} onClose={close} />
        </>
      }
    </LeadModalContext.Provider>);

}

export function useLeadModal(): LeadModalValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error('useLeadModal must be used within LeadModalProvider');
  return ctx;
}