import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  padding: 1.5rem;
  gap: 1.5rem;
  font-family: var(--font-geist-sans);
  background: linear-gradient(135deg, #050d05, #0a2a0a, #061d0e, #011510);
  position: relative;
  overflow: hidden;
  color: #ffffff;

  @media (min-width: 640px) {
    padding: 2rem;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const Header = styled.header`
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: var(--font-cambria);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(to right, #d4fc79 0%, #96e6a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glowFade 3s ease-in-out infinite alternate;
  line-height: 1.1;
  box-shadow: none !important;

  @keyframes glowFade {
    from {
      opacity: 0.5;
      text-shadow: 0 0 10px rgba(212, 252, 121, 0.3);
    }
    to {
      opacity: 1;
      text-shadow: 0 0 15px rgba(212, 252, 121, 0.4);
    }
  }

  @media (min-width: 640px) {
    font-size: 4rem;
  }
  @media (min-width: 768px) {
    font-size: 5.5rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #a7f3d0;
  font-family: var(--font-cambria);
  text-shadow: 0 0 10px rgba(167, 243, 208, 0.5),
    0 0 15px rgba(167, 243, 208, 0.3);
  letter-spacing: 0.08em;
  margin: 0.25rem 0;

  @media (min-width: 640px) {
    font-size: 2rem;
    margin: 0.5rem 0;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Main = styled.main`
  max-width: 48rem;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #e2f8ed;
  font-family: var(--font-cambria);
  line-height: 1.625;
  text-shadow: 0 0 8px rgba(167, 243, 208, 0.4);

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
`;

const GreenText = styled.span`
  color: #4ade80;
  font-weight: 600;
`;

const GreenItalicText = styled.span`
  color: #4ade80;
  font-style: italic;
`;

const BlueText = styled.span`
  color: #60a5fa;
  font-weight: 600;
`;

const AmberText = styled.span`
  color: #fbbf24;
  font-weight: 600;
`;

const PurpleText = styled.span`
  color: #c084fc;
`;

const IndigoText = styled.span`
  color: #818cf8;
`;

const TealText = styled.span`
  color: #2dd4bf;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f0ffd6;
  margin-bottom: 1.5rem;
  font-family: var(--font-cambria);
  text-align: center;
  text-shadow: 0 0 15px rgba(212, 252, 121, 0.6);
  letter-spacing: 0.05em;
`;

const SubsectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: var(--font-cambria);
  border-bottom: 1px solid;
  padding-bottom: 0.5rem;
  color: #e2f8ed;
  text-shadow: 0 0 10px rgba(167, 243, 208, 0.5);
`;

const GreenSubsectionTitle = styled(SubsectionTitle)`
  color: #f0ffd6;
  border-color: rgba(212, 252, 121, 0.4);
  text-shadow: 0 0 15px rgba(212, 252, 121, 0.6);
`;

const IndigoSubsectionTitle = styled(SubsectionTitle)`
  color: #d1fae5;
  border-color: rgba(150, 230, 161, 0.4);
  text-shadow: 0 0 15px rgba(150, 230, 161, 0.6);
`;

const AmberSubsectionTitle = styled(SubsectionTitle)`
  color: #e2f8ed;
  border-color: rgba(167, 243, 208, 0.4);
  text-shadow: 0 0 15px rgba(167, 243, 208, 0.6);
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  color: #e2f8ed;
  font-family: var(--font-cambria);
  text-shadow: 0 0 10px rgba(167, 243, 208, 0.4);
  & > li {
    margin-bottom: 0.5rem;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(5, 13, 5, 0.8), rgba(10, 42, 10, 0.8));
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(167, 243, 208, 0.2);
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(167, 243, 208, 0.1);
`;

const ClosingText = styled.p`
  margin-top: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #f0ffd6;
  border-top: 1px solid rgba(212, 252, 121, 0.4);
  padding-top: 1rem;
  font-family: var(--font-cambria);
  text-align: center;
  text-shadow: 0 0 15px rgba(212, 252, 121, 0.6);

  @media (min-width: 640px) {
    margin-top: 2.5rem;
    font-size: 1.25rem;
    padding-top: 1.5rem;
  }
`;

const RedText = styled.span`
  color: #f87171;
`;

const BlueWaterText = styled.span`
  color: #60a5fa;
`;

const AmberGuardianText = styled.span`
  color: #fbbf24;
`;

const AllLifeText = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.75rem;
  color: #a7f3d0;
  margin-top: 1rem;
  text-shadow: 0 0 8px rgba(167, 243, 208, 0.2);

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(5, 13, 5, 0.9), rgba(10, 42, 10, 0.9));
  border-radius: 0.75rem;
  border: 1px solid rgba(167, 243, 208, 0.2);
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(167, 243, 208, 0.1);
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 1px solid rgba(167, 243, 208, 0.3);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #a7f3d0;
  background-color: rgba(5, 13, 5, 0.6);
  font-family: var(--font-cambria);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #d4fc79;
    box-shadow: 0 0 0 3px rgba(212, 252, 121, 0.2);
  }

  &::placeholder {
    color: rgba(167, 243, 208, 0.5);
  }

  &:disabled {
    background-color: rgba(5, 13, 5, 0.4);
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #5c5c3d, #4a4433);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: var(--font-cambria);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(92, 92, 61, 0.5),
    0 10px 15px -3px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(92, 92, 61, 0.7),
      0 15px 20px -5px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(212, 252, 121, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #3c3c2d, #2a2413);
    cursor: not-allowed;
    transform: none;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4fc79;
  margin-bottom: 0.5rem;
  font-family: var(--font-cambria);
  text-align: center;
  text-shadow: 0 0 10px rgba(212, 252, 121, 0.5);
`;

const FormDescription = styled.p`
  font-size: 1rem;
  color: #a7f3d0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: var(--font-cambria);
  line-height: 1.5;
  text-shadow: 0 0 8px rgba(167, 243, 208, 0.3);
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
`;

const EventImage = styled.img`
  width: 100%;
  max-width: 42rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(167, 243, 208, 0.2);
  border: 1px solid rgba(167, 243, 208, 0.2);
`;

const ImageCaption = styled(Paragraph)`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-style: italic;
  color: #a7f3d0;
  text-shadow: 0 0 8px rgba(167, 243, 208, 0.3);
`;

const FormMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  width: 100%;
  background-color: ${props => props.type === 'success' ? 'rgba(5, 13, 5, 0.8)' : 'rgba(42, 5, 5, 0.8)'};
  color: ${props => props.type === 'success' ? '#d4fc79' : '#fecaca'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(212, 252, 121, 0.3)' : 'rgba(254, 202, 202, 0.3)'};
  font-family: var(--font-cambria);
  text-shadow: 0 0 8px ${props => props.type === 'success' ? 'rgba(212, 252, 121, 0.3)' : 'rgba(254, 202, 202, 0.3)'};
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
  box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.5);
  animation: float 15s infinite ease-in-out, glow 3s infinite ease-in-out;

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(10px, -20px);
    }
    50% {
      transform: translate(-15px, -35px);
    }
    75% {
      transform: translate(20px, -15px);
    }
  }

  @keyframes glow {
    0%, 100% {
      opacity: 0.2;
      box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3);
    }
    50% {
      opacity: 0.9;
      box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.7);
    }
  }
`;

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create an array of positions for the fireflies
  const fireflies = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 10}s`,
      animation: `float ${15 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 15}s, 
                 glow ${2 + Math.random() * 2}s infinite ease-in-out ${Math.random() * 2}s`,
    },
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Thank you for subscribing!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      {fireflies.map((firefly) => (
        <FloatingParticle
          key={firefly.id}
          style={firefly.style}
        />
      ))}
      <Header>
        <MainTitle>ARTS FOR THE EARTH</MainTitle>
        <SubTitle>BURG INK PRODUCTION</SubTitle>
      </Header>

      <Main>
        <IntroSection>
          <Paragraph style={{ fontSize: '0.9rem' }}>
            On April 26th, 2024, we came together to celebrate our <GreenText>precious connection</GreenText> with{' '}
            <GreenItalicText>Mother Earth</GreenItalicText> through art, music, and community.
          </Paragraph>
        </IntroSection>

        <ImageContainer>
          <EventImage
            src="/portraits-godfrey-poster.png"
            alt="Group painting created during Arts for the Earth event"
          />
          <ImageCaption>
            This collaborative painting was created during our inaugural Arts for the Earth event. 
            The artwork represents our community&apos;s shared vision for environmental stewardship and creative expression.
          </ImageCaption>
        </ImageContainer>

        <IntroSection>
          <Paragraph>
            The event was a beautiful demonstration of our community&apos;s{" "}
            <BlueText>power to come together</BlueText> in celebration, expressing gratitude, sharing creativity, and deepening our
            connection to the Earth and one another.
          </Paragraph>
          <Paragraph>
            Through <PurpleText>art</PurpleText>, <IndigoText>music</IndigoText>, and <TealText>collective energy</TealText>, we created a space that uplifted and inspired, fostering a deeper commitment to the well-being of our world.
          </Paragraph>
          <Paragraph>
            The day was filled with <AmberText>heartfelt moments</AmberText> as we experienced the joy of creation, strengthened our bonds, and supported organizations dedicated to protecting and restoring the planet.
          </Paragraph>
        </IntroSection>

        <div className="mb-12">
          <SectionTitle>Event Highlights</SectionTitle>

          <div className="mb-8">
            <GreenSubsectionTitle>Creative Expression & Art</GreenSubsectionTitle>
            <List>
              <li>
                <BoldText>Tattoo Art</BoldText> – Artists created meaningful pieces, with proceeds supporting environmental causes.
              </li>
              <li>
                <BoldText>Gallery Exhibition</BoldText> – A breathtaking collection of artwork honoring nature was displayed throughout the venue.
              </li>
              <li>
                <BoldText>Live Painting</BoldText> – Artists shared their creative process in real-time, engaging with the community.
              </li>
              <li>
                <BoldText>Community Canvas</BoldText> – Everyone contributed to a collaborative art piece that now serves as a lasting memory of our shared vision.
              </li>
            </List>
          </div>

          <div className="mb-8">
            <IndigoSubsectionTitle>Music & Entertainment</IndigoSubsectionTitle>
            <List>
              <li>
                <BoldText>Live Performances</BoldText> – The day was filled with inspiring music that brought our community together.
              </li>
              <li>
                <BoldText>Art Night Collaboration</BoldText> – The evening featured an immersive art experience that continued the celebration of creativity.
              </li>
            </List>
          </div>

          <div className="mb-8">
            <AmberSubsectionTitle>Community Impact</AmberSubsectionTitle>
            <List>
              <li>
                <BoldText>Local Vendors</BoldText> – We supported local businesses through food and craft vendors, strengthening our community ties.
              </li>
              <li>
                <BoldText>Environmental Education</BoldText> – Interactive displays and workshops helped raise awareness about environmental protection.
              </li>
              <li>
                <BoldText>Youth Engagement</BoldText> – Children participated in crafts, temporary tattoos, and environmental learning activities.
              </li>
            </List>
          </div>

          <Card>
            <SubsectionTitle className="text-center">Fundraising Success</SubsectionTitle>
            <List>
              <li>
                <BoldText>Water Protection & Conservation</BoldText> – Supported Water Protectors Network and Friends of the Rouge in their mission to protect our waterways.
              </li>
              <li>
                <BoldText>Tree Planting & Conservation</BoldText> – Contributed to Greening of Detroit&apos;s efforts to create a greener city.
              </li>
              <li>
                <BoldText>Community Support</BoldText> – Raised funds for various local organizations including Rebel Dogs Detroit, Detroit Alley Cats, and Sanctum House.
              </li>
            </List>
          </Card>
        </div>

        <ClosingText>
          Our first Arts for the Earth event was a beautiful reminder that when we <RedText>Share Love!</RedText> and protect our{' '}
          <BlueWaterText>waters</BlueWaterText> as <AmberGuardianText>Guardians of the land</AmberGuardianText>, we are
          protecting the source of <AllLifeText>All life</AllLifeText>.
        </ClosingText>
      </Main>

      <Footer>
        <p>Thank you for being part of our journey to celebrate and protect our Earth</p>
        <EmailForm onSubmit={handleSubmit}>
          <FormTitle>Stay Connected</FormTitle>
          <FormDescription>
            Join our mailing list to be notified about next year&apos;s Arts for the Earth event
          </FormDescription>
          {status.type && (
            <FormMessage type={status.type}>
              {status.message}
            </FormMessage>
          )}
          <EmailInput
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </SubmitButton>
        </EmailForm>
      </Footer>
    </Container>
  );
}
