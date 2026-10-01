import { FormEvent, useCallback, useId, useState } from 'react';
import { submitLead } from '../utils/leadService';
import { validateField, type FieldRule } from '../utils/validation';
import type { FormStatus, LeadType } from '../types/leads';

type Values = Record<string, string | boolean>;

export interface CheckBinding {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export interface FieldBinding {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required: boolean;
}

export interface LeadFormController {
  formId: string;
  status: FormStatus;
  submitError: string | null;
  submit: (e?: FormEvent) => Promise<void>;
  reset: () => void;
  honeypot: string;
  setHoneypot: (value: string) => void;
  bindCheck: (name: string) => CheckBinding;
}

interface Options<T extends Values> {
  type: LeadType;
  initialValues: T;
  rules: Partial<Record<keyof T & string, FieldRule>>;
  context?: Record<string, string | number>;
}

export const consentDefaults = { consentContact: false, consentMarketing: false };

export const consentRules: Record<'consentContact', FieldRule> = {
  consentContact: {
    label: 'Contact consent',
    mustBeChecked: true,
    message: 'Please agree to be contacted so our team can respond to your request.'
  }
};

export function useLeadForm<T extends Values>({ type, initialValues, rules, context }: Options<T>) {
  const formId = useId().replace(/:/g, '');
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T & string, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const fieldId = useCallback((name: string) => `${formId}-${name}`, [formId]);

  const setField = useCallback(<K extends keyof T & string,>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev[name] ? { ...prev, [name]: undefined } : prev);
  }, []);

  const validate = (names?: (keyof T & string)[]) => {
    const keys = names ?? Object.keys(rules) as (keyof T & string)[];
    const found: Partial<Record<keyof T & string, string>> = {};
    keys.forEach((key) => {
      const rule = rules[key];
      if (!rule) return;
      const message = validateField(values[key], rule);
      if (message) found[key] = message;
    });
    setErrors((prev) => {
      const merged = { ...prev };
      keys.forEach((k) => {
        merged[k] = found[k];
      });
      return merged;
    });
    const first = keys.find((k) => found[k]);
    if (first) {
      requestAnimationFrame(() => document.getElementById(fieldId(first))?.focus());
    }
    return !first;
  };

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) return;
    setStatus('submitting');
    setSubmitError(null);
    try {
      await submitLead({ type, payload: { ...values, ...context }, honeypot });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setSubmitError(null);
  };

  const bind = <K extends keyof T & string,>(name: K): FieldBinding => ({
    id: fieldId(name),
    value: String(values[name] ?? ''),
    onChange: (v: string) => setField(name, v as T[K]),
    error: errors[name],
    required: Boolean(rules[name]?.required)
  });

  const bindCheck = (name: string): CheckBinding => ({
    id: fieldId(name),
    checked: Boolean(values[name as keyof T & string]),
    onChange: (checked: boolean) => setField(name as keyof T & string, checked as T[keyof T & string]),
    error: errors[name as keyof T & string]
  });

  return { formId, values, errors, status, submitError, setField, validate, submit, reset, bind, bindCheck, fieldId, honeypot, setHoneypot };
}