import React, { useEffect, useState } from 'react';
import { TextAreaField, TextField, SelectField } from '../forms/Field';
import { ChoiceGroup } from '../forms/ChoiceGroup';
import { DemoSubmitted } from '../forms/DemoSubmitted';
import { focusFirstError, validateContact, type FormErrors } from '../../utils/validation';

export const contactTopics = [
{ value: 'visit', label: 'Plan a visit' },
{ value: 'find', label: 'Find a specific car' },
{ value: 'question', label: 'General question' }];


function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function ContactForm({ initialTopic }: {initialTopic: string;}) {
  const [topic, setTopic] = useState(contactTopics.some((t) => t.value === initialTopic) ? initialTopic : 'visit');
  const [fullName, setFullName] = useState('');
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (contactTopics.some((t) => t.value === initialTopic)) setTopic(initialTopic);
  }, [initialTopic]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = 'Enter your name.';
    Object.assign(next, validateContact(method, email, phone));
    if (topic === 'visit' && date && date < todayIso()) next.date = 'Choose today or a later date.';
    if (topic !== 'visit' && !message.trim()) next.message = topic === 'find' ? 'Tell us what car you’re looking for.' : 'Add your question.';
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(next, ['fullName', 'method', 'email', 'phone', 'date', 'message']);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DemoSubmitted
        onEdit={() => setSubmitted(false)}
        summary={[
        { label: 'Topic', value: contactTopics.find((t) => t.value === topic)?.label ?? '' },
        ...(date ? [{ label: 'Preferred day', value: date }] : [])]
        } />);


  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <SelectField id="topic" label="What can we help with?" value={topic} onChange={(e) => setTopic(e.target.value)}>
        {contactTopics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </SelectField>
      <TextField id="fullName" label="Name" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
      <ChoiceGroup name="method" legend="Best way to reach you" columns={2} value={method} onChange={setMethod} options={[{ value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }]} />
      {method === 'email' ?
      <TextField id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} /> :

      <TextField id="phone" label="Phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
      }
      {topic === 'visit' &&
      <TextField id="date" label="Day you’d like to come in" type="date" optional min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} hint="The sales team confirms appointment times." />
      }
      <TextAreaField
        id="message"
        label={topic === 'find' ? 'What are you looking for?' : 'Message'}
        optional={topic === 'visit'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={errors.message}
        hint={topic === 'find' ? 'Make, model, year range, budget, and any must-have options.' : undefined} />
      
      <button type="submit" className="inline-flex h-12 items-center justify-center rounded bg-forest px-6 text-[15px] font-medium text-ivory transition-colors duration-150 hover:bg-forest-deep">
        Send message
      </button>
      <p className="text-xs text-ink-soft">Demo form. Nothing is sent.</p>
    </form>);

}