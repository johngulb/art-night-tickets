import styled from "styled-components";
import BuyButton from "../components/BuyButton";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  padding: 1.5rem;
  gap: 1.5rem;
  font-family: var(--font-geist-sans);
  background: linear-gradient(to bottom, #f0fdf4, #eff6ff);

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
  font-weight: 700;
  color: #4a4433;
  margin-bottom: 0.5rem;
  font-family: var(--font-cambria);
`;

const SubTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #5d5a44;
  font-family: var(--font-cambria);
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
  color: #1f2937;
  font-family: var(--font-cambria);
  line-height: 1.625;

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
`;

const GreenText = styled.span`
  color: #166534;
  font-weight: 600;
`;

const GreenItalicText = styled.span`
  color: #166534;
  font-style: italic;
`;

const BlueText = styled.span`
  color: #1d4ed8;
  font-weight: 600;
`;

const AmberText = styled.span`
  color: #b45309;
  font-weight: 600;
`;

const PurpleText = styled.span`
  color: #7e22ce;
`;

const IndigoText = styled.span`
  color: #4f46e5;
`;

const TealText = styled.span`
  color: #0d9488;
`;

const ItalicBoldGreenText = styled.span`
  font-style: italic;
  font-weight: 600;
  color: #166534;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a4433;
  margin-bottom: 1.5rem;
  font-family: var(--font-cambria);
  text-align: center;
`;

const SubsectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: var(--font-cambria);
  border-bottom: 1px solid;
  padding-bottom: 0.5rem;
`;

const GreenSubsectionTitle = styled(SubsectionTitle)`
  color: #166534;
  border-color: #dcfce7;
`;

const IndigoSubsectionTitle = styled(SubsectionTitle)`
  color: #4338ca;
  border-color: #e0e7ff;
`;

const AmberSubsectionTitle = styled(SubsectionTitle)`
  color: #b45309;
  border-color: #fef3c7;
`;

const TealSubsectionTitle = styled(SubsectionTitle)`
  color: #0f766e;
  border-color: #ccfbf1;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  color: #1f2937;
  font-family: var(--font-cambria);
  & > li {
    margin-bottom: 0.5rem;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Card = styled.div`
  background-color: #f0fdf4;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #dcfce7;
  margin-bottom: 2rem;
`;

const ScheduleList = styled.ul`
  margin-bottom: 0;
  color: #1f2937;
  font-family: var(--font-cambria);
  font-size: 0.875rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  & > li {
    margin-bottom: 0.5rem;
  }
`;

const ScheduleItem = styled.li`
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ScheduleTime = styled.span`
  font-weight: 600;
`;

const ScheduleDivider = styled.span`
  display: none;
  flex: 1;
  margin: 0 1rem;
  border-bottom: 1px dotted #9ca3af;

  @media (min-width: 640px) {
    display: block;
  }
`;

const TicketList = styled.ul`
  color: #1f2937;
  font-family: var(--font-cambria);

  & > li {
    margin-bottom: 1rem;
  }
`;

const TicketItem = styled.li`
  display: flex;
  flex-direction: column;
`;

const TicketTitle = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
`;

const TicketNote = styled.span`
  font-size: 0.875rem;
  font-style: italic;
`;

const BeneficiarySection = styled.div`
  margin-bottom: 1.5rem;
`;

const BeneficiaryTitle = styled.h5`
  font-size: 1.125rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.5rem;
`;

const BeneficiaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BeneficiaryCard = styled.div`
  background-color: #dcfce7;
  padding: 1rem;
  border-radius: 0.375rem;
`;

const BeneficiaryCardTitle = styled.h6`
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const BeneficiaryCardText = styled.p`
  font-size: 0.875rem;
`;

const ClosingText = styled.p`
  margin-top: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #166534;
  border-top: 2px solid #dcfce7;
  padding-top: 1rem;
  font-family: var(--font-cambria);
  text-align: center;

  @media (min-width: 640px) {
    margin-top: 2.5rem;
    font-size: 1.25rem;
    padding-top: 1.5rem;
  }
`;

const RedText = styled.span`
  color: #dc2626;
`;

const BlueWaterText = styled.span`
  color: #2563eb;
`;

const AmberGuardianText = styled.span`
  color: #b45309;
`;

const AllLifeText = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.75rem;
  color: #374151;
  margin-top: 1rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
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
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ImageCaption = styled(Paragraph)`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-style: italic;
  color: #5d5a44;
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <MainTitle>ARTS FOR THE EARTH</MainTitle>
        <SubTitle>BURG INK PRODUCTION</SubTitle>
      </Header>

      <Main>
        <IntroSection>
          <Paragraph>
            Life is a <GreenText>precious gift</GreenText>, and our source of
            endless beauty, abundance, and diversity is all created from our{" "}
            <GreenItalicText>Mother Earth</GreenItalicText>.
          </Paragraph>
        </IntroSection>

        <ImageContainer>
          <EventImage
            src="/portraits-godfrey-poster.png"
            alt="Group painting created during Arts for the Earth event"
          />
          <ImageCaption>
            This collaborative painting was created during our inaugural Arts
            for the Earth event on April 26th, 2024. The artwork represents our
            community&apos;s shared vision for environmental stewardship and
            creative expression.
          </ImageCaption>
        </ImageContainer>

        <IntroSection>
          <Paragraph>
            As a community, we have the{" "}
            <BlueText>power to come together</BlueText> in celebration,
            expressing gratitude, sharing creativity, and deepening our
            connection to the Earth and one another.
          </Paragraph>
          <Paragraph>
            This gathering is a <AmberText>heartfelt offering</AmberText>, a
            space to experience the joy of creation, strengthen our bonds, and
            support organizations dedicated to protecting and restoring the
            planet.
          </Paragraph>
          <Paragraph>
            Through <PurpleText>art</PurpleText>, <IndigoText>music</IndigoText>
            , and <TealText>collective energy</TealText>, we uplift and inspire,
            fostering a deeper commitment to the well-being of our world for
            generations to come.
          </Paragraph>
          <Paragraph>
            Let&apos;s dance, create, and celebrate the{" "}
            <ItalicBoldGreenText>
              magic of being alive together
            </ItalicBoldGreenText>
            .
          </Paragraph>
        </IntroSection>

        <div className="mb-12">
          <SectionTitle>What We Offer</SectionTitle>

          <div className="mb-8">
            <GreenSubsectionTitle>
              Creative Expression & Art
            </GreenSubsectionTitle>
            <List>
              <li>
                <BoldText>Tattoo Art</BoldText> – Artists offering tattooing,
                with proceeds supporting the cause.
              </li>
              <li>
                <BoldText>Gallery Exhibition</BoldText> – A breathtaking and
                inspiring collection of artwork honoring nature.
              </li>
              <li>
                <BoldText>Live Painting</BoldText> – Artists creating in real
                time, sharing their creative process.
              </li>
              <li>
                <BoldText>Kids&apos; & Adult Crafts</BoldText> – Dedicated craft
                stations for all ages to engage in hands-on creativity.
              </li>
              <li>
                <BoldText>Community Canvas</BoldText> – A collaborative art
                piece where everyone can contribute.
              </li>
              <li>
                <BoldText>Mural Painting</BoldText> – A large-scale artwork
                created during the event to honor the planet.
              </li>
            </List>
          </div>

          <div className="mb-8">
            <IndigoSubsectionTitle>Music & Movement</IndigoSubsectionTitle>
            <List>
              <li>
                <BoldText>Live DJs & Musical Performances</BoldText> – A fusion
                of live music and DJ sets to uplift and inspire.
              </li>
            </List>
          </div>

          <div className="mb-8">
            <AmberSubsectionTitle>Food & Drink</AmberSubsectionTitle>
            <List>
              <li>
                <BoldText>Local Vendors & Refreshments</BoldText> – A variety of
                delicious food and drinks available to nourish the community
                providing support for local small businesses.
              </li>
            </List>
          </div>

          <div className="mb-8">
            <TealSubsectionTitle>
              Community Engagement & Support
            </TealSubsectionTitle>
            <List>
              <li>
                <BoldText>Raffles</BoldText> – Exciting prizes and giveaways,
                with proceeds supporting environmental organizations.
              </li>
              <li>
                <BoldText>Community Networking Board</BoldText> – A space to
                connect with local groups, opportunities, and like-minded
                individuals.
              </li>
              <li>
                <BoldText>Vendor Marketplace</BoldText> – Featuring artists,
                jewelry makers, handcrafted clothing, and eco-conscious
                projects.
              </li>
            </List>
          </div>

          <Card>
            <SubsectionTitle className="text-center">
              Event Schedule
            </SubsectionTitle>
            <ScheduleList>
              <ScheduleItem>
                <ScheduleTime>11:45 AM</ScheduleTime>
                <ScheduleDivider />
                <span>Acknowledgements and prep talk</span>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleTime>12:00 PM - 5:00 PM</ScheduleTime>
                <ScheduleDivider />
                <span>Crafts, Tattoos, Music and Open Floor</span>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleTime>~2:00 PM - 2:30 PM</ScheduleTime>
                <ScheduleDivider />
                <span>Non-profit Info (on mic)</span>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleTime>5:00 PM - 7:00 PM</ScheduleTime>
                <ScheduleDivider />
                <span>Live Music</span>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleTime>8:00 PM - 2:00 AM</ScheduleTime>
                <ScheduleDivider />
                <span>Art Night Collaboration</span>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleTime>~10:00 PM</ScheduleTime>
                <ScheduleDivider />
                <span>Live Raffle Draw</span>
              </ScheduleItem>
            </ScheduleList>
          </Card>

          <Card>
            <SubsectionTitle className="text-center">
              Ticket Sales & Pricing
            </SubsectionTitle>
            <TicketList>
              <TicketItem>
                <TicketTitle>General Admission</TicketTitle>
                <span>$20 (pre-sale) | $25 (at the door)</span>
                <TicketNote>Includes two raffle tickets</TicketNote>
              </TicketItem>
              <TicketItem>
                <TicketTitle>VIP Tattoo Ticket</TicketTitle>
                <span>$250</span>
                <TicketNote>$50 automatically donated to the cause</TicketNote>
                <TicketNote>
                  Remaining amount distributed at the artist&apos;s discretion
                </TicketNote>
              </TicketItem>
              <TicketItem>
                <TicketTitle>Kids</TicketTitle>
                <span>Free</span>
              </TicketItem>
            </TicketList>
          </Card>
        </div>

        <Card>
          <SubsectionTitle className="text-center">
            Fundraising Beneficiaries – Giving Back to Our Planet & Community
          </SubsectionTitle>

          <BeneficiarySection>
            <BeneficiaryTitle>Water Protection & Conservation</BeneficiaryTitle>
            <List>
              <li>
                <BoldText>Water Protectors Network</BoldText> – Advocating for
                clean water, Indigenous water rights, and environmental justice.{" "}
              </li>
              <li>
                <BoldText>Friends of the Rouge</BoldText> – Dedicated to
                restoring, protecting, and enhancing the Rouge River watershed,
                engaging the community in conservation efforts.{" "}
              </li>
            </List>
          </BeneficiarySection>

          <BeneficiarySection>
            <BeneficiaryTitle>
              Tree Planting & Conservation - Tree Print
            </BeneficiaryTitle>
            <List>
              <li>
                <BoldText>Greening of Detroit</BoldText> – Focused on planting
                trees, educating communities, and providing hands-on
                opportunities for people to contribute to a greener city.
              </li>
            </List>
          </BeneficiarySection>

          <BeneficiarySection>
            <BeneficiaryTitle>Youth & Family Activities</BeneficiaryTitle>
            <List>
              <li>
                <BoldText>Temporary Tattoos</BoldText> – A fun way to showcase
                artwork on our skin without the needles or pain.
              </li>
              <li>
                <BoldText>Community Coloring Book</BoldText> – Featuring artwork
                from participating artists, encouraging creativity and sharing
                insight relating to nature.
              </li>
              <li>
                <BoldText>Environmental Education</BoldText> – Interactive
                displays and information on how to keep the planet clean.
              </li>
              <li>
                <BoldText>Sidewalk Chalk Art</BoldText> – Open space for kids to
                decorate the parking lot with colorful art.
              </li>
              <li>
                <BoldText>Bubbles & More</BoldText> – Bubbles, bucket of balls,
                canvas hung on fence for finger painting, and other activities.
              </li>
            </List>
          </BeneficiarySection>

          <BeneficiarySection>
            <BeneficiaryTitle>Community Networking Board</BeneficiaryTitle>
            <BoldText>Resources & Opportunities for Engagement</BoldText>
            <List>
              <li>
                <BoldText>Detroit Cleanups</BoldText> – Information on cleanup
                events at Belle Isle and throughout the city.
              </li>
              <li>
                <BoldText>Community Gardens & Volunteering</BoldText> – Ways to
                support local gardens and urban farming initiatives.
              </li>
              <li>
                <BoldText>Youth Leadership & Guardianship</BoldText> –
                Opportunities for young people to engage in environmental
                activism and leadership roles.
              </li>
              <li>
                <BoldText>BIPOC Community Support</BoldText> – Resources for
                housing, food assistance, soup kitchens, and homelessness
                support.
              </li>
              <li>
                <BoldText>Disability Resources</BoldText> – Information on the
                Disability Act and organizations that provide assistance.
              </li>
              <li>
                <BoldText>Healing & Support Networks</BoldText> – Resources for
                connecting with nature and education on environment along with
                overall mental, physical, and emotional well-being.
              </li>
              <li>
                <BoldText>Community & Physical Activities</BoldText> – Local
                groups for tennis, yoga, biking, running, disc golf, volleyball,
                jujutsu, boxing, rock climbing and more.
              </li>
            </List>
          </BeneficiarySection>

          <BeneficiarySection>
            <BeneficiaryTitle>Vendors</BeneficiaryTitle>
            <BoldText>Food Vendors</BoldText>
            <List>
              <li>
                <BoldText>Sally B&apos;s Tacos</BoldText> – Available throughout
                the entire event.
              </li>
              <li>
                <BoldText>Matu&apos;s Catering</BoldText> – Tasty kebabs (after
                5PM).
              </li>
              <li>
                <BoldText>Taylormade Cookies</BoldText> – Taylor&apos;s famous
                chocolate chip cookies.
              </li>
            </List>
            <BoldText>Drink Vendors & Options</BoldText>
            <List>
              <li>
                <BoldText>Standard Beverages</BoldText> – Costco bulk purchase
                (soda, water, etc.).
              </li>
              <li>
                <BoldText>Art Night Bar</BoldText> – Expected 30% of sales
                revenue.
              </li>
            </List>
          </BeneficiarySection>

          <div className="border-t border-green-200 pt-4 mt-6">
            <h5 className="text-lg font-semibold text-[#4A4433] mb-3 text-center">
              Specific Art for Sale with Donations to:
            </h5>

            <BeneficiaryGrid>
              <BeneficiaryCard>
                <BeneficiaryCardTitle>
                  Animal Welfare & Ecosystem Protection - Animal Prints
                </BeneficiaryCardTitle>
                <BeneficiaryCardText>
                  • <BoldText>Rebel Dogs Detroit & Detroit Alley Cats</BoldText>{" "}
                  – Local nonprofits rescuing, rehabilitating, and rehoming
                  vulnerable animals in Detroit.
                </BeneficiaryCardText>
              </BeneficiaryCard>

              <BeneficiaryCard>
                <BeneficiaryCardTitle>
                  Women&apos;s Healing & Empowerment - Divine Feminine Print
                </BeneficiaryCardTitle>
                <BeneficiaryCardText>
                  • <BoldText>Sanctum House</BoldText> – A sanctuary for
                  survivors of sex trafficking, providing safety, healing, and
                  support for rebuilding their lives.
                </BeneficiaryCardText>
              </BeneficiaryCard>

              <BeneficiaryCard>
                <BeneficiaryCardTitle>
                  BIPOC Community Support
                </BeneficiaryCardTitle>
                <BeneficiaryCardText>
                  • <BoldText>Contact Chloe White</BoldText> – Organization
                  focused on providing resources for affordable living, food
                  assistance, and survival support for under-served communities.
                </BeneficiaryCardText>
              </BeneficiaryCard>

              <BeneficiaryCard>
                <BeneficiaryCardTitle>
                  Youth Art & Creative Resources
                </BeneficiaryCardTitle>
                <BeneficiaryCardText>
                  • <BoldText>Arts & Scraps</BoldText> – A nonprofit repurposing
                  materials for creative education, providing hands-on art
                  experiences for children, and promoting sustainability in art.
                </BeneficiaryCardText>
              </BeneficiaryCard>
            </BeneficiaryGrid>
          </div>
        </Card>

        <ClosingText>
          Our planet needs us to <RedText>Share Love!</RedText> By protecting
          our <BlueWaterText>waters</BlueWaterText> and being{" "}
          <AmberGuardianText>Guardians of the land</AmberGuardianText>, we are
          protecting the source of <AllLifeText>All life</AllLifeText>.
        </ClosingText>
      </Main>

      <Footer>
        <p>Join us in celebrating and protecting our Earth</p>
        <BuyButton dark />
      </Footer>
    </Container>
  );
}
