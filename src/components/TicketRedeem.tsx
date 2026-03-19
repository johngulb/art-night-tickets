'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #8c1d18;
  color: #f5ede3;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  &:hover:not(:disabled) {
    background: #6b1612;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Err = styled.p`
  color: #b91c1c;
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
`;

type Props = {
  token: string;
};

export function TicketRedeem({ token }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/ticket/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error || 'Could not redeem ticket');
        return;
      }
      window.location.reload();
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrap>
      <form onSubmit={handleRedeem}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Mark as redeemed'}
        </Button>
        {error && <Err>{error}</Err>}
      </form>
    </Wrap>
  );
}
