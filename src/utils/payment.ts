export interface PaymentInput {
  price: number;
  downPayment: number;
  tradeEquity: number;
  apr: number;
  termMonths: number;
}

export interface PaymentResult {
  amountFinanced: number;
  monthlyPayment: number;
  totalInterest: number;
  totalOfPayments: number;
}

/** Standard amortized loan payment. Excludes taxes and fees by design. */
export function estimatePayment({ price, downPayment, tradeEquity, apr, termMonths }: PaymentInput): PaymentResult {
  const amountFinanced = Math.max(0, price - Math.max(0, downPayment) - tradeEquity);
  const n = Math.max(1, Math.round(termMonths));
  const r = Math.max(0, apr) / 100 / 12;
  const monthlyPayment = amountFinanced === 0 ? 0 : r === 0 ? amountFinanced / n : amountFinanced * r / (1 - Math.pow(1 + r, -n));
  const totalOfPayments = monthlyPayment * n;
  return {
    amountFinanced,
    monthlyPayment,
    totalOfPayments,
    totalInterest: Math.max(0, totalOfPayments - amountFinanced)
  };
}