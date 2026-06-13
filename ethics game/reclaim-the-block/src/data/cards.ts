import type { CommunityCard, IncidentCard } from '../types/game';

export const COMMUNITY_CARDS: CommunityCard[] = [
  // ── BLUE LEGAL CARDS (12) ───────────────────────────────────────────────
  // ── Educational Legal cards (no gameplay effect) ──
  {
    id: 'blue-01',
    type: 'community',
    category: 'blue',
    name: 'Beyond the Fourth',
    educationalContent:
      'As the city installs surveillance devices across every neighborhood, many residents assume the Fourth Amendment, which protects citizens from unreasonable government searches, will shield them. However, street-level and smart home surveillance data exists in a legal gray area that courts are still actively defining, leaving open the question of whether police even need a warrant to access footage captured outside your front door.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-02',
    type: 'community',
    category: 'blue',
    name: 'Right to Know',
    educationalContent:
      'As your community fights back, you learn that submitting a public records request can reveal exactly which surveillance devices your city has installed. Many residents are shocked to discover how many exist that were never publicly announced.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-03',
    type: 'community',
    category: 'blue',
    name: 'Request Information',
    educationalContent:
      'Residents file public records requests to learn how surveillance cameras are storing and sharing data.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-04',
    type: 'community',
    category: 'blue',
    name: 'Warrant Required',
    educationalContent:
      'Community lawyers pressure government officials to require warrants before accessing surveillance footage.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-05',
    type: 'community',
    category: 'blue',
    name: 'Facial Recognition Ban',
    educationalContent:
      'After many wrongful identifications, activists and legal experts campaign to ban facial recognition technology in public spaces.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-06',
    type: 'community',
    category: 'blue',
    name: 'Know Your Rights Workshop',
    educationalContent:
      'Volunteer attorneys organize workshops teaching residents their legal rights during police stops, public monitoring, and digital surveillance encounters.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  // ── Duplicate educational cards to fill remaining slots ──
  {
    id: 'blue-07',
    type: 'community',
    category: 'blue',
    name: 'Beyond the Fourth',
    educationalContent:
      'As the city installs surveillance devices across every neighborhood, many residents assume the Fourth Amendment, which protects citizens from unreasonable government searches, will shield them. However, street-level and smart home surveillance data exists in a legal gray area that courts are still actively defining, leaving open the question of whether police even need a warrant to access footage captured outside your front door.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-08',
    type: 'community',
    category: 'blue',
    name: 'Right to Know',
    educationalContent:
      'As your community fights back, you learn that submitting a public records request can reveal exactly which surveillance devices your city has installed. Many residents are shocked to discover how many exist that were never publicly announced.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-09',
    type: 'community',
    category: 'blue',
    name: 'Request Information',
    educationalContent:
      'Residents file public records requests to learn how surveillance cameras are storing and sharing data.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'blue-10',
    type: 'community',
    category: 'blue',
    name: 'Know Your Rights Workshop',
    educationalContent:
      'Volunteer attorneys organize workshops teaching residents their legal rights during police stops, public monitoring, and digital surveillance encounters.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  // ── Legal Power-Up cards (gameplay effects) ──
  {
    id: 'blue-11',
    type: 'community',
    category: 'blue',
    name: 'Balance the Meter',
    educationalContent:
      'Sustained legal challenges and public-records fights can restore community trust and roll back surveillance overreach.',
    effect: 'Shift the Privacy & Trust Meter back 3 spaces.',
    effectType: 'meter-plus-immediate',
    effectValue: 3,
    isPowerUp: true,
  },
  {
    id: 'blue-12',
    type: 'community',
    category: 'blue',
    name: 'Warrant Requirement',
    educationalContent:
      'Requiring a warrant before police can access surveillance footage is a key legal protection communities organize to secure.',
    effect: 'Ignore the effects of the next Incident Card (if you are in the affected neighborhood).',
    effectType: 'cancel-next-incident',
    isPowerUp: true,
  },

  // ── YELLOW COMMUNITY ORGANIZING CARDS (12) ─────────────────────────────
  // ── Educational cards (no gameplay effect) ──
  {
    id: 'yellow-01',
    type: 'community',
    category: 'yellow',
    name: 'Know Your Lease',
    educationalContent:
      'While organizing your neighborhood, you learn that tenant organizations have successfully negotiated privacy protections into lease agreements in cities where landlords were quietly installing surveillance devices in common areas without resident consent.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-02',
    type: 'community',
    category: 'yellow',
    name: 'Community Tech Audit',
    educationalContent:
      'Your neighbors form a coalition to walk public streets and map existing cameras to document the density and distribution of surveillance throughout the community. The resulting data helps residents better understand where monitoring is concentrated and informs future advocacy efforts.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-03',
    type: 'community',
    category: 'yellow',
    name: 'Joining Forces with Locals',
    educationalContent:
      'Community members build alliances with local businesses, schools, and student organizations to amplify concerns regarding surveillance and collectively demand greater transparency from local government officials.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-04',
    type: 'community',
    category: 'yellow',
    name: 'Block Party Campaign',
    educationalContent:
      "At the neighborhood's weekly farmers market, a grassroots organization sets up an outreach booth to engage residents, collect petition signatures, and recruit volunteers for future privacy advocacy efforts.",
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-05',
    type: 'community',
    category: 'yellow',
    name: 'Protest Against Expansion',
    educationalContent:
      'After learning about plans for additional surveillance installations, residents organize a peaceful demonstration to voice concerns about privacy, accountability, and the impact of increased monitoring on community trust.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-06',
    type: 'community',
    category: 'yellow',
    name: 'Door-to-Door Outreach',
    educationalContent:
      'Volunteers speak directly with residents about alternatives to surveillance-based safety measures, helping neighbors learn about community-led approaches to crime prevention and public safety.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  // ── Community Organizing Power-Up cards (gameplay effects) ──
  {
    id: 'yellow-07',
    type: 'community',
    category: 'yellow',
    name: 'Rally the Block',
    educationalContent:
      'Bringing neighbors together for collective action energizes the whole community and multiplies its capacity to push back against surveillance.',
    effect: 'Each player immediately draws 1 Community Card.',
    effectType: 'draw-cards-all',
    effectValue: 1,
    isPowerUp: true,
  },
  {
    id: 'yellow-08',
    type: 'community',
    category: 'yellow',
    name: 'Community Watch',
    educationalContent:
      'Community watch programs built on mutual support and trust strengthen neighborhood safety far more effectively than constant monitoring.',
    effect: 'Increase the Privacy & Trust Meter by 1.',
    effectType: 'meter-plus-immediate',
    effectValue: 1,
    isPowerUp: true,
  },
  // ── Duplicate educational cards to fill remaining slots ──
  {
    id: 'yellow-09',
    type: 'community',
    category: 'yellow',
    name: 'Know Your Lease',
    educationalContent:
      'While organizing your neighborhood, you learn that tenant organizations have successfully negotiated privacy protections into lease agreements in cities where landlords were quietly installing surveillance devices in common areas without resident consent.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-10',
    type: 'community',
    category: 'yellow',
    name: 'Community Tech Audit',
    educationalContent:
      'Your neighbors form a coalition to walk public streets and map existing cameras to document the density and distribution of surveillance throughout the community. The resulting data helps residents better understand where monitoring is concentrated and informs future advocacy efforts.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-11',
    type: 'community',
    category: 'yellow',
    name: 'Joining Forces with Locals',
    educationalContent:
      'Community members build alliances with local businesses, schools, and student organizations to amplify concerns regarding surveillance and collectively demand greater transparency from local government officials.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'yellow-12',
    type: 'community',
    category: 'yellow',
    name: 'Door-to-Door Outreach',
    educationalContent:
      'Volunteers speak directly with residents about alternatives to surveillance-based safety measures, helping neighbors learn about community-led approaches to crime prevention and public safety.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },

  // ── GREEN MEDIA CARDS (12) ─────────────────────────────────────────────
  // ── Educational cards (no gameplay effect) ──
  {
    id: 'green-01',
    type: 'community',
    category: 'green',
    name: 'Investigative Journalism',
    educationalContent:
      'To hold officials and police departments accountable, local reporters and independent journalists investigate and publish exposés detailing hidden contracts between city governments, law enforcement agencies, and surveillance technology companies. Public scrutiny often reveals surveillance programs that residents were never informed about.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-02',
    type: 'community',
    category: 'green',
    name: 'Resident Op-Eds',
    educationalContent:
      'You and your neighbors submit opinion pieces to local newspapers to shape public narratives, raise awareness, and alert the community to the gradual normalization of neighborhood surveillance.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-03',
    type: 'community',
    category: 'green',
    name: 'Creative Campaigns',
    educationalContent:
      'Local filmmakers, artists, and content creators collaborate to produce documentaries, short films, and video essays highlighting the impact of constant monitoring and encouraging public discussion about privacy rights.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-04',
    type: 'community',
    category: 'green',
    name: 'Undercover Investigation',
    educationalContent:
      'An independent journalist uncovers evidence showing that surveillance technologies are disproportionately concentrated in lower-income and historically marginalized neighborhoods. The resulting report sparks renewed public debate over fairness and accountability.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-05',
    type: 'community',
    category: 'green',
    name: 'Viral Testimony',
    educationalContent:
      "A resident shares their experience of being wrongly identified by a surveillance system, and the story quickly spreads online. Public attention increases pressure on officials to review the technology's accuracy and oversight.",
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-06',
    type: 'community',
    category: 'green',
    name: 'Livestream Accountability',
    educationalContent:
      'Community activists livestream a surveillance-related incident, allowing thousands of residents to witness events in real time. The public visibility forces local officials to respond and address community concerns.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  // ── Media Power-Up cards (gameplay effects) ──
  {
    id: 'green-07',
    type: 'community',
    category: 'green',
    name: 'Bad Publicity',
    educationalContent:
      'Negative press coverage can be powerful: a single damaging story has pushed cities and companies to pull surveillance devices to protect their reputation.',
    effect: 'Remove one surveillance device from the Red or Yellow neighborhood.',
    effectType: 'remove-device-any',
    effectValue: 1,
    isPowerUp: true,
  },
  {
    id: 'green-08',
    type: 'community',
    category: 'green',
    name: 'Undercover Report',
    educationalContent:
      'Undercover reporting has repeatedly exposed surveillance plans before they roll out, forcing officials to pause and answer to the public.',
    effect: 'Your report forces a pause — block the next Board Phase so no new surveillance devices are placed for one round.',
    effectType: 'block-board-phase',
    isPowerUp: true,
  },
  // ── Duplicate educational cards to fill remaining slots ──
  {
    id: 'green-09',
    type: 'community',
    category: 'green',
    name: 'Investigative Journalism',
    educationalContent:
      'To hold officials and police departments accountable, local reporters and independent journalists investigate and publish exposés detailing hidden contracts between city governments, law enforcement agencies, and surveillance technology companies. Public scrutiny often reveals surveillance programs that residents were never informed about.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-10',
    type: 'community',
    category: 'green',
    name: 'Resident Op-Eds',
    educationalContent:
      'You and your neighbors submit opinion pieces to local newspapers to shape public narratives, raise awareness, and alert the community to the gradual normalization of neighborhood surveillance.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-11',
    type: 'community',
    category: 'green',
    name: 'Creative Campaigns',
    educationalContent:
      'Local filmmakers, artists, and content creators collaborate to produce documentaries, short films, and video essays highlighting the impact of constant monitoring and encouraging public discussion about privacy rights.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'green-12',
    type: 'community',
    category: 'green',
    name: 'Undercover Investigation',
    educationalContent:
      'An independent journalist uncovers evidence showing that surveillance technologies are disproportionately concentrated in lower-income and historically marginalized neighborhoods. The resulting report sparks renewed public debate over fairness and accountability.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },

  // ── RED POLITICAL ACTION CARDS (12) ────────────────────────────────────
  // ── Educational cards (no gameplay effect) ──
  {
    id: 'red-01',
    type: 'community',
    category: 'red',
    name: 'Voter Registration Campaigns',
    educationalContent:
      'Voter registration initiatives become active throughout the community, helping residents build a politically engaged electorate capable of supporting local officials who prioritize privacy protections and government transparency.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-02',
    type: 'community',
    category: 'red',
    name: 'Mayor Appearance',
    educationalContent:
      'The local mayor attends a neighborhood event to engage directly with residents, creating an opportunity for community members to ask questions about surveillance policies and express concerns regarding future implementation plans.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-03',
    type: 'community',
    category: 'red',
    name: 'Vote at City Hall',
    educationalContent:
      'Residents attend local government meetings and vote against proposed surveillance contracts, demonstrating how public participation can influence decisions regarding technology adoption and community oversight.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-04',
    type: 'community',
    category: 'red',
    name: 'Surveillance Review Period',
    educationalContent:
      'City officials temporarily halt new surveillance installations while existing systems are evaluated for their effectiveness, privacy implications, and impact on neighborhood trust.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-05',
    type: 'community',
    category: 'red',
    name: 'City Budget Allocation Vote',
    educationalContent:
      'Local leaders debate whether public funds should be directed toward surveillance technologies or invested in alternative community priorities such as education, housing, healthcare, and social services.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-06',
    type: 'community',
    category: 'red',
    name: 'School Board Meeting',
    educationalContent:
      'The school board considers expanding surveillance systems in public schools after students, parents, and educators raise concerns regarding privacy, safety, and long-term impacts on student well-being.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  // ── Political Power-Up cards (gameplay effects) ──
  {
    id: 'red-07',
    type: 'community',
    category: 'red',
    name: 'Loss of Funding',
    educationalContent:
      'When the money dries up, surveillance programs stall — budget cuts and lost grants have halted planned camera rollouts in many cities.',
    effect: 'Prevent one surveillance device from being placed during the next Board Phase.',
    effectType: 'cancel-next-surveillance',
    isPowerUp: true,
  },
  {
    id: 'red-08',
    type: 'community',
    category: 'red',
    name: 'Election Day',
    educationalContent:
      'Elections can reset the political landscape overnight, sweeping in officials who roll back surveillance and rebuild public trust.',
    effect: 'Move the Privacy & Trust Meter back 1 space.',
    effectType: 'meter-plus-immediate',
    effectValue: 1,
    isPowerUp: true,
  },
  // ── Duplicate educational cards to fill remaining slots ──
  {
    id: 'red-09',
    type: 'community',
    category: 'red',
    name: 'Voter Registration Campaigns',
    educationalContent:
      'Voter registration initiatives become active throughout the community, helping residents build a politically engaged electorate capable of supporting local officials who prioritize privacy protections and government transparency.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-10',
    type: 'community',
    category: 'red',
    name: 'Mayor Appearance',
    educationalContent:
      'The local mayor attends a neighborhood event to engage directly with residents, creating an opportunity for community members to ask questions about surveillance policies and express concerns regarding future implementation plans.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-11',
    type: 'community',
    category: 'red',
    name: 'Vote at City Hall',
    educationalContent:
      'Residents attend local government meetings and vote against proposed surveillance contracts, demonstrating how public participation can influence decisions regarding technology adoption and community oversight.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },
  {
    id: 'red-12',
    type: 'community',
    category: 'red',
    name: 'Surveillance Review Period',
    educationalContent:
      'City officials temporarily halt new surveillance installations while existing systems are evaluated for their effectiveness, privacy implications, and impact on neighborhood trust.',
    effect: '',
    effectType: 'none',
    isPowerUp: false,
  },

];

export const INCIDENT_CARDS: IncidentCard[] = [
  {
    id: 'incident-01',
    type: 'incident',
    name: 'Catalytic Converter Theft Spike',
    effect: 'Add 1 surveillance device to a yellow neighborhood (Suburb).',
    deviceTarget: 'suburb',
    deviceCount: 1,
    educationalNote:
      'A wave of catalytic converter thefts prompts city officials to fast-track surveillance infrastructure in areas experiencing increased property crime.',
  },
  {
    id: 'incident-02',
    type: 'incident',
    name: 'Amber Alert',
    effect: 'Add 1 surveillance device to all neighborhoods.',
    deviceTarget: 'all',
    deviceCount: 1,
    educationalNote:
      'Police expand camera monitoring and automated license plate tracking during an active child abduction investigation.',
  },
  {
    id: 'incident-03',
    type: 'incident',
    name: 'City Approves Smart Traffic Lights',
    effect: 'Decrease the Privacy & Community Trust Meter by 1.',
    meterDelta: -1,
    educationalNote:
      'The city funds a new "smart safety initiative" that introduces AI-assisted traffic monitoring and automated data collection systems.',
  },
  {
    id: 'incident-04',
    type: 'incident',
    name: 'Crime Spike Reported on the News',
    effect: 'Decrease the Privacy & Community Trust Meter by 1.',
    meterDelta: -1,
    educationalNote:
      'Media reports of increased crime generate public concern and pressure local officials to invest in additional surveillance technologies.',
  },
  {
    id: 'incident-05',
    type: 'incident',
    name: 'Data Breach',
    effect: 'Subtract 1 from Privacy & Community Trust.',
    meterDelta: -1,
    educationalNote:
      'Footage collected from neighborhood surveillance systems is leaked online, damaging public trust and raising concerns about data security.',
  },
  {
    id: 'incident-06',
    type: 'incident',
    name: 'Protest Leads to More Monitoring',
    effect: 'Add 1 surveillance device to the Red neighborhood (Politics Row).',
    deviceTarget: 'politics',
    deviceCount: 1,
    educationalNote:
      'Following a series of public demonstrations, city officials deploy additional crowd-monitoring technologies to track large gatherings.',
  },
  {
    id: 'incident-07',
    type: 'incident',
    name: 'Retail Theft Prevention Initiative',
    effect: 'Add 1 surveillance device to the Green neighborhood (Media District).',
    deviceTarget: 'media',
    deviceCount: 1,
    educationalNote:
      'Major retail stores expand facial recognition and tracking systems after reports of organized shoplifting activity.',
  },
  {
    id: 'incident-08',
    type: 'incident',
    name: 'Wildfire Evacuation Monitoring',
    effect: 'Subtract 1 from Privacy & Community Trust.',
    meterDelta: -1,
    educationalNote:
      'Emergency response agencies deploy drones and automated tracking systems to monitor evacuation routes and population movement during a wildfire.',
  },
];
