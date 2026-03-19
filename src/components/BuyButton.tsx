"use client";

import { useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import { TicketType } from "buidl-ticketing";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const MAX_PER_ORDER = 50;

const defaultTicketTypes: TicketType[] = [
  {
    id: "general-event-1",
    name: "General Admission",
    description:
      "Portraits @ The Godfrey — April 13, 7–11PM at The Godfrey. Live art, DJs, portrait workshop, caricature booth. Art supplies provided.",
    price: 10,
    available: 200,
    sold: 0,
    reserved: 0,
    remaining: 200,
  },
];

const QuantityWrap = styled.div<{ $portraits?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
`;

const QuantityLabel = styled.span<{ $portraits?: boolean }>`
  font-family: "Space Grotesk", -apple-system, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => (p.$portraits ? "#111" : "rgba(255,255,255,0.85)")};
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const QtyBtn = styled.button<{ $portraits?: boolean }>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 4px;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border: 2px solid ${(p) => (p.$portraits ? "#111" : "rgba(255,255,255,0.6)")};
  background: ${(p) => (p.$portraits ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")};
  color: ${(p) => (p.$portraits ? "#111" : "#fff")};
  transition: background 0.15s, transform 0.15s;

  &:hover:not(:disabled) {
    background: ${(p) => (p.$portraits ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.4)")};
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const QtyValue = styled.span<{ $portraits?: boolean }>`
  min-width: 2rem;
  text-align: center;
  font-family: "Space Grotesk", -apple-system, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(p) => (p.$portraits ? "#111" : "#fff")};
`;

const TotalLine = styled.span<{ $portraits?: boolean }>`
  font-family: "Space Grotesk", -apple-system, sans-serif;
  font-size: 0.8125rem;
  color: ${(p) => (p.$portraits ? "rgba(17,17,17,0.85)" : "rgba(255,255,255,0.8)")};
`;

const StyledButton = styled.button<{ dark?: boolean; $variant?: string }>`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.5rem;
  background: ${(props) =>
    props.$variant === "portraits"
      ? "#8C1D18"
      : props.dark
        ? "linear-gradient(135deg, #5C5C3D, #4A4433)"
        : "linear-gradient(135deg, #4ade80, #22c55e)"};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: bold;
  font-size: 1rem;
  font-family: var(--font-cambria);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  width: auto;
  min-width: 180px;
  max-width: 250px;
  transition: all 0.3s;
  box-shadow: ${(props) =>
    props.$variant === "portraits"
      ? "0 4px 20px rgba(140, 29, 24, 0.5)"
      : props.dark
        ? "0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        : "0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"};
  cursor: pointer;
  animation: pulse 2s infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);

  @keyframes pulse {
    0% {
      box-shadow: ${(props) =>
        props.$variant === "portraits"
          ? "0 4px 20px rgba(140, 29, 24, 0.5)"
          : props.dark
            ? "0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"
            : "0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"};
    }
    50% {
      box-shadow: ${(props) =>
        props.$variant === "portraits"
          ? "0 4px 28px rgba(140, 29, 24, 0.65)"
          : props.dark
            ? "0 0 30px rgba(92, 92, 61, 0.8), 0 10px 20px -3px rgba(0, 0, 0, 0.3)"
            : "0 0 30px rgba(74, 222, 128, 0.8), 0 10px 20px -3px rgba(0, 0, 0, 0.3)"};
    }
    100% {
      box-shadow: ${(props) =>
        props.$variant === "portraits"
          ? "0 4px 20px rgba(140, 29, 24, 0.5)"
          : props.dark
            ? "0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"
            : "0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)"};
    }
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) =>
      props.$variant === "portraits"
        ? "0 6px 28px rgba(140, 29, 24, 0.6)"
        : props.dark
          ? "0 0 30px rgba(92, 92, 61, 0.9), 0 15px 20px -5px rgba(0, 0, 0, 0.3)"
          : "0 0 30px rgba(74, 222, 128, 0.9), 0 15px 20px -5px rgba(0, 0, 0, 0.3)"};
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    animation: none;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
    min-width: 150px;
    max-width: 200px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    min-width: 120px;
    max-width: 180px;
    letter-spacing: 0.03em;
  }
`;

const BuyButton = ({
  dark = false,
  label,
  variant,
  showQuantitySelector = true,
}: {
  dark?: boolean;
  label?: string;
  variant?: "default" | "portraits";
  showQuantitySelector?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const ticket = defaultTicketTypes[0];
  const maxQty = useMemo(
    () => Math.min(ticket.remaining ?? ticket.available ?? MAX_PER_ORDER, MAX_PER_ORDER),
    [ticket.remaining, ticket.available]
  );

  const unitPrice = ticket.price;
  const total = quantity * unitPrice;
  const portraits = variant === "portraits";

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(maxQty, q + 1));

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const lineItems = [
        {
          ticketTypeId: ticket.id,
          quantity,
        },
      ];

      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: "1",
          items: lineItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showQuantitySelector && (
        <QuantityWrap $portraits={portraits}>
          <QuantityLabel $portraits={portraits}>Tickets</QuantityLabel>
          <QuantityRow>
            <QtyBtn
              type="button"
              $portraits={portraits}
              onClick={dec}
              disabled={quantity <= 1 || isLoading}
              aria-label="Decrease quantity"
            >
              −
            </QtyBtn>
            <QtyValue $portraits={portraits}>{quantity}</QtyValue>
            <QtyBtn
              type="button"
              $portraits={portraits}
              onClick={inc}
              disabled={quantity >= maxQty || isLoading}
              aria-label="Increase quantity"
            >
              +
            </QtyBtn>
          </QuantityRow>
          <TotalLine $portraits={portraits}>
            ${unitPrice} each · ${total} total
          </TotalLine>
        </QuantityWrap>
      )}
      <StyledButton
        onClick={handleCheckout}
        disabled={isLoading}
        dark={dark}
        $variant={variant}
      >
        {isLoading ? "Processing..." : label ?? "Buy Tickets"}
      </StyledButton>
    </>
  );
};

export default BuyButton;
