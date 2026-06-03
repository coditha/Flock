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

  // ── PURPLE NEIGHBORHOOD CARDS (12) ─────────────────────────────────────
  {
    id: 'purple-01',
    type: 'community',
    category: 'purple',
    name: 'Neighborhood Pact',
    educationalContent:
      'Collective community agreements about surveillance use carry significant weight with city officials. A written standard established norms that make it politically costly to violate community privacy expectations.',
    effect: '+1 meter',
    effectType: 'meter-plus',
    effectValue: 1,
    isPowerUp: false,
  },
  {
    id: 'purple-02',
    type: 'community',
    category: 'purple',
    name: 'Tenant Rights',
    educationalContent:
      'Tenant organizations have successfully negotiated privacy protections into lease agreements in cities where landlords were quietly installing surveillance devices in common areas.',
    effect: '+1 meter',
    effectType: 'meter-plus',
    effectValue: 1,
    isPowerUp: false,
  },
  {
    id: 'purple-03',
    type: 'community',
    category: 'purple',
    name: "Who's Being Watched",
    educationalContent:
      'Devices are disproportionately concentrated in lower-income and minority neighborhoods, revealing who the system is actually watching.',
    effect: 'Draw 2 cards, all players see top Surveillance Card',
    effectType: 'draw-cards',
    effectValue: 2,
    isPowerUp: false,
  },
  {
    id: 'purple-04',
    type: 'community',
    category: 'purple',
    name: 'Right to Know',
    educationalContent:
      'Submitting a public records request can reveal exactly which surveillance devices your city has installed. Many residents are shocked to discover how many exist that were never publicly announced.',
    effect: 'Draw 1 extra card',
    effectType: 'draw-cards',
    effectValue: 1,
    isPowerUp: false,
  },
  {
    id: 'purple-05',
    type: 'community',
    category: 'purple',
    name: 'Neighbor to Neighbor',
    educationalContent:
      'Person-to-person connection is the most resilient defense against surveillance-driven community fragmentation.',
    effect: 'Swap any number of cards with player on same space free',
    effectType: 'swap-cards',
    isPowerUp: false,
  },
  {
    id: 'purple-06',
    type: 'community',
    category: 'purple',
    name: 'Community Watch',
    educationalContent:
      'Community watch programs based on mutual support build trust more effectively than monitoring.',
    effect: 'Prevent 1 device from being placed in your neighborhood this round',
    effectType: 'cancel-next-surveillance',
    isPowerUp: false,
  },
  {
    id: 'purple-07',
    type: 'community',
    category: 'purple',
    name: 'Block Party',
    educationalContent:
      'Social events significantly increase collective action capacity against surveillance expansion.',
    effect: 'All players on adjacent spaces may swap cards freely this round',
    effectType: 'draw-cards-all',
    effectValue: 1,
    isPowerUp: false,
  },
  {
    id: 'purple-08',
    type: 'community',
    category: 'purple',
    name: 'Trust Your Neighbors',
    educationalContent:
      'Communities with high interpersonal trust are significantly more effective at resisting surveillance overreach than those relying on cameras.',
    effect: '+3 meter',
    effectType: 'meter-plus',
    effectValue: 3,
    isPowerUp: false,
  },
  {
    id: 'purple-09',
    type: 'community',
    category: 'purple',
    name: 'Local Support Network',
    educationalContent:
      'Mutual aid networks have been critical infrastructure for communities facing surveillance-driven displacement.',
    effect: 'Any player may move to your space for free',
    effectType: 'move-player-here',
    isPowerUp: false,
  },
  {
    id: 'purple-10',
    type: 'community',
    category: 'purple',
    name: 'Reclaim the Block',
    educationalContent:
      'Neighborhoods that have successfully reclaimed their blocks from surveillance reported significant increases in trust and safety.',
    effect: 'Remove all excess devices from your neighborhood, reset to baseline',
    effectType: 'remove-all-own',
    isPowerUp: false,
  },
  {
    id: 'purple-11',
    type: 'community',
    category: 'purple',
    name: 'Block Party',
    educationalContent:
      'Neighborhood events have been the catalyst for some of the most successful anti-surveillance campaigns in US history.',
    effect: 'All players draw 2 cards and may swap freely regardless of location.',
    effectType: 'draw-cards-all',
    effectValue: 2,
    isPowerUp: true,
  },
  {
    id: 'purple-12',
    type: 'community',
    category: 'purple',
    name: 'Community Watch',
    educationalContent:
      'Organized watch programs have delayed surveillance expansion long enough for legal challenges to succeed.',
    effect: 'Prevent devices from being placed in any one neighborhood for 2 full rounds.',
    effectType: 'cancel-next-2-surveillance',
    isPowerUp: true,
  },
];

export const INCIDENT_CARDS: IncidentCard[] = [
  {
    id: 'incident-01',
    type: 'incident',
    name: 'Breaking News: Crime Reported',
    effect: 'Add 2 devices to indicated neighborhood. Meter -2.',
    effectType: 'add-devices-to-neighborhood',
    educationalNote:
      'Studies show crime perception rises with surveillance apps even when actual crime rates are dropping.',
  },
  {
    id: 'incident-02',
    type: 'incident',
    name: 'Innocent Person Flagged',
    effect: 'Add 1 device to most surveilled neighborhood. Meter -3.',
    effectType: 'meter-minus',
    educationalNote:
      "Ring's Neighbors app disproportionately flags people of color. The majority of \"suspicious person\" posts in New York City targeted people of color doing ordinary activities.",
  },
  {
    id: 'incident-03',
    type: 'incident',
    name: 'Police Footage Request',
    effect: 'Police access footage without consent. Add 1 device to most surveilled neighborhood. Meter −3.',
    effectType: 'police-footage-request',
    educationalNote:
      'Amazon handed Ring footage to police without warrants until 2024. Residents were never notified their cameras were part of a police surveillance network.',
  },
  {
    id: 'incident-04',
    type: 'incident',
    name: 'Surveillance Expansion Approved',
    effect: 'Add 1 device to every neighborhood. Meter -2 per neighborhood affected.',
    effectType: 'add-device-all-neighborhoods',
    educationalNote:
      'Cities have approved multimillion dollar surveillance contracts with minimal public input or transparency.',
  },
  {
    id: 'incident-05',
    type: 'incident',
    name: 'Neighbor Reports Neighbor',
    effect: 'Add 1 device to most surveilled neighborhood. Meter -2. Active player discards 1 Community Card.',
    effectType: 'neighbor-reports-neighbor',
    educationalNote:
      'Neighborhood watch apps have been documented turning neighbors against each other along racial and class lines.',
  },
  {
    id: 'incident-06',
    type: 'incident',
    name: 'Government Contract Awarded',
    effect: 'Add 3 devices to indicated neighborhood. Density Tracker +1.',
    effectType: 'government-contract',
    educationalNote:
      'Government surveillance contracts have been approved without community knowledge or consent, sometimes discovered only through FOIA requests filed years later.',
  },
];
