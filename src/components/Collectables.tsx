"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Collectible, mockCoins } from "@/mockCoins";
import ProgressBar from "@/components/ProgressBar";
const getCollectionStatus = (coinId: string) => {
  if (typeof window === "undefined") return false;
  const collectedCoins = JSON.parse(
    localStorage.getItem("collectedCoins") || "[]"
  );
  return collectedCoins.includes(coinId);
};

const Collectables = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);

  useEffect(() => {
    const collectibles = Object.values(mockCoins).map((coin) => ({
      id: coin.id,
      title: coin.title,
      image: coin.image,
      description: coin.description,
    }));
    setCollectibles(collectibles);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Check initial scroll position
      handleScroll();

      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <CollectablesContainer>
      <CollectablesTitle>
        <TitleLine>PORTRAIT&apos;S AT THE GODFREY</TitleLine>
        <TitleLine>Collectibles</TitleLine>
      </CollectablesTitle>

      <ScrollableContainer>
        {showLeftArrow && (
          <ScrollArrow direction="left" onClick={scrollLeft}>
            &#10094;
          </ScrollArrow>
        )}

        <CollectablesScroll ref={scrollContainerRef}>
          {collectibles.map((collectible) => (
            <CollectibleItem key={collectible.id}>
              <Link href={`/collect/${collectible.id}`}>
                <CollectibleContent
                  collected={getCollectionStatus(collectible.id)}
                >
                  <CollectibleImageWrapper
                    collected={getCollectionStatus(collectible.id)}
                  >
                    <Image
                      src={collectible.image}
                      alt={collectible.title}
                      width={90}
                      height={90}
                      className="collectible-image"
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                      {getCollectionStatus(collectible.id) && (
                        <CollectedBadge>✓</CollectedBadge>
                      )}
                    </Suspense>
                  </CollectibleImageWrapper>
                  <CollectibleName>{collectible.title}</CollectibleName>
                  {/* <Suspense fallback={<div>Loading...</div>}>
                    <CollectibleStatus>
                      {getCollectionStatus(collectible.id)
                        ? "Collected"
                        : "Tap to collect"}
                    </CollectibleStatus>
                  </Suspense> */}
                </CollectibleContent>
              </Link>
            </CollectibleItem>
          ))}
        </CollectablesScroll>

        {showRightArrow && (
          <ScrollArrow direction="right" onClick={scrollRight}>
            &#10095;
          </ScrollArrow>
        )}
      </ScrollableContainer>

      <ProgressBar collectibles={collectibles} getCollectionStatus={getCollectionStatus} />
      
    </CollectablesContainer>
  );
};

export default Collectables;

const CollectablesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0.5rem;
`;

const CollectablesTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  text-align: center;
  font-family: var(--font-cambria);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const TitleLine = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(to right, #d4fc79 0%, #96e6a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(212, 252, 121, 0.4);
`;

const ScrollableContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CollectablesScroll = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem 0.5rem;
  gap: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollArrow = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "left" ? "left: -10px;" : "right: -10px;")}
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(150, 230, 161, 0.2);
  color: #a7f3d0;
  border: 1px solid #a7f3d0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(150, 230, 161, 0.3);
    transform: translateY(-50%) scale(1.1);
  }
`;

const CollectibleItem = styled.div`
  flex: 0 0 auto;
  width: 120px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CollectibleContent = styled.div<{ collected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(26, 42, 31, 0.7);
  border: 1px solid rgba(150, 230, 161, 0.3);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.collected ? 1 : 0.6)};

  &:hover {
    background: rgba(26, 42, 31, 0.9);
    box-shadow: 0 0 15px rgba(150, 230, 161, 0.3);
    border-color: rgba(150, 230, 161, 0.6);
    opacity: ${(props) => (props.collected ? 1 : 0.8)};
  }
`;

const CollectibleImageWrapper = styled.div<{ collected: boolean }>`
  position: relative;
  margin-bottom: 0rem;

  .collectible-image {
    border-radius: 50%;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(150, 230, 161, 0.5));
    border: 2px solid #96e6a1;
    opacity: ${(props) => (props.collected ? 1 : 0.7)};
  }
`;

const CollectedBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 22px;
  background: #96e6a1;
  color: #0d1d12;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
`;

const CollectibleName = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0.2rem 0;
  color: #d4fc79;
  text-align: center;
`;

// const CollectibleStatus = styled.p`
//   font-size: 0.7rem;
//   color: #a7f3d0;
// `;

