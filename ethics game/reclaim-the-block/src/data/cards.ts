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
      'The Fourth Amendment protects citizens from unreasonable government searches, but surveillance data collected in public spaces exists in a legal gray area. Courts are still debating whether police need a warrant to access footage captured outside your door. Many cities have installed cameras and smart devices without any public notice. Residents often don\'t realize how few legal protections currently apply to street-level surveillance.',
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
      'A public records request is a powerful tool — it can reveal exactly which surveillance devices your city has installed. Many residents are shocked to discover how many cameras exist that were never publicly announced. Filing a request is free, and governments are legally required to respond. This transparency helps communities understand and push back against surveillance expansion.',
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
      'Residents file public records requests to learn how surveillance cameras are storing and sharing their data. These requests are a legal right and can reveal contracts between cities and tech companies. Knowing who can access footage and for how long helps communities hold officials accountable. Transparency is the first step toward meaningful privacy protection.',
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
      'Community lawyers pressure officials to require warrants before police can access surveillance footage. Without this protection, law enforcement can review camera data without a judge\'s approval. Many cities have adopted warrant requirements after sustained community organizing. These legal safeguards help ensure surveillance is used responsibly and only when justified.',
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
      'Facial recognition technology has repeatedly misidentified people — particularly people of color — leading to wrongful stops and arrests. Activists and legal experts have successfully campaigned to ban its use in public spaces in several cities. These bans reflect growing recognition that accuracy and bias concerns make the technology unsafe. Without oversight, facial recognition can cause serious harm to innocent people.',
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
      'Volunteer attorneys organize workshops teaching residents their legal rights during police stops, public monitoring, and digital surveillance encounters. Knowing your rights is one of the most effective tools for protecting yourself. These workshops help communities understand what data is collected, how it\'s used, and when they can push back. Informed residents are better equipped to challenge surveillance overreach.',
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
      'The Fourth Amendment protects citizens from unreasonable government searches, but surveillance data collected in public spaces exists in a legal gray area. Courts are still debating whether police need a warrant to access footage captured outside your door. Many cities have installed cameras and smart devices without any public notice. Residents often don\'t realize how few legal protections currently apply to street-level surveillance.',
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
      'A public records request is a powerful tool — it can reveal exactly which surveillance devices your city has installed. Many residents are shocked to discover how many cameras exist that were never publicly announced. Filing a request is free, and governments are legally required to respond. This transparency helps communities understand and push back against surveillance expansion.',
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
      'Residents file public records requests to learn how surveillance cameras are storing and sharing their data. These requests are a legal right and can reveal contracts between cities and tech companies. Knowing who can access footage and for how long helps communities hold officials accountable. Transparency is the first step toward meaningful privacy protection.',
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
      'Volunteer attorneys organize workshops teaching residents their legal rights during police stops, public monitoring, and digital surveillance encounters. Knowing your rights is one of the most effective tools for protecting yourself. These workshops help communities understand what data is collected, how it\'s used, and when they can push back. Informed residents are better equipped to challenge surveillance overreach.',
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
      'Sustained legal challenges and public records fights can restore community trust and roll back surveillance overreach. Filing lawsuits and demanding audits forces officials to justify their programs. When communities win in court, it sets precedents that protect cities across the country. These victories show that legal action is one of the most powerful tools available.',
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
      'Requiring a warrant before police can access surveillance footage is a key legal protection. Organized communities have successfully pushed for warrant requirements in cities across the country. Without this safeguard, law enforcement can access camera data on anyone at any time without oversight. A warrant requirement forces accountability and limits the potential for surveillance abuse.',
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
      'Tenant organizations have successfully negotiated privacy protections directly into lease agreements in cities where landlords were quietly installing surveillance devices. Residents have the right to know about any monitoring equipment in their building. Many installations happen without tenant consent or even notice. Organizing with neighbors is one of the most effective ways to set clear boundaries around surveillance in your home.',
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
      'Your neighbors form a coalition to walk public streets and map existing cameras, documenting the density and spread of surveillance in your community. This kind of grassroots audit makes the invisible visible. Residents who see the data often become more motivated to act. The resulting maps become powerful tools for advocacy and community organizing.',
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
      'Community members build alliances with local businesses, schools, and student organizations to amplify concerns about surveillance. A broader coalition makes it harder for officials to dismiss community voices. Together, these groups can demand greater transparency and accountability from local government. Collective pressure is far more effective than individual complaints.',
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
      'A grassroots organization sets up an outreach booth at the local farmers market to engage residents and collect petition signatures. Face-to-face conversations are one of the most effective ways to build awareness around privacy issues. Each signature represents a neighbor ready to take action against surveillance expansion. Events like these transform casual concern into organized community power.',
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
      'After learning about plans for additional surveillance installations, residents organize a peaceful demonstration to voice their concerns. Public protests put pressure on officials and draw media attention to privacy issues. Visible community opposition can delay or stop surveillance projects before they start. Every voice in the crowd sends a message that residents are paying attention.',
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
      'Volunteers speak directly with residents about community-led alternatives to surveillance-based safety measures. Door-to-door conversations build trust and give people a chance to share their experiences. Many residents don\'t know that alternatives to surveillance exist. This outreach helps neighbors connect and work together toward safer, more accountable communities.',
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
      'Bringing neighbors together for collective action multiplies the community\'s ability to push back against surveillance. When people organize as a group, officials take notice. A united block is harder to ignore than individual complaints. Community rallies build energy, recruit new advocates, and remind everyone that they are not alone in this fight.',
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
      'Community watch programs built on mutual support and trust strengthen neighborhood safety far more effectively than constant monitoring. Neighbors looking out for each other creates genuine accountability without invading anyone\'s privacy. Studies show that community connection — not cameras — is the strongest predictor of neighborhood safety. Investing in relationships, not surveillance, is the most effective long-term strategy.',
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
      'Tenant organizations have successfully negotiated privacy protections directly into lease agreements in cities where landlords were quietly installing surveillance devices. Residents have the right to know about any monitoring equipment in their building. Many installations happen without tenant consent or even notice. Organizing with neighbors is one of the most effective ways to set clear boundaries around surveillance in your home.',
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
      'Your neighbors form a coalition to walk public streets and map existing cameras, documenting the density and spread of surveillance in your community. This kind of grassroots audit makes the invisible visible. Residents who see the data often become more motivated to act. The resulting maps become powerful tools for advocacy and community organizing.',
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
      'Community members build alliances with local businesses, schools, and student organizations to amplify concerns about surveillance. A broader coalition makes it harder for officials to dismiss community voices. Together, these groups can demand greater transparency and accountability from local government. Collective pressure is far more effective than individual complaints.',
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
      'Volunteers speak directly with residents about community-led alternatives to surveillance-based safety measures. Door-to-door conversations build trust and give people a chance to share their experiences. Many residents don\'t know that alternatives to surveillance exist. This outreach helps neighbors connect and work together toward safer, more accountable communities.',
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
      'Local reporters investigate and publish exposés revealing hidden contracts between city governments, law enforcement, and surveillance tech companies. Public scrutiny often uncovers surveillance programs that residents were never informed about. A single well-researched story can shift public opinion and force officials to answer for their decisions. Investigative journalism is one of the most powerful tools communities have for holding power accountable.',
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
      'You and your neighbors submit opinion pieces to local newspapers to shape public narratives around surveillance. Personal stories from real residents are more persuasive than statistics alone. Op-eds reach readers who might not otherwise follow local policy debates. Sharing your experience can inspire others to speak out and join the movement.',
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
      'Local filmmakers, artists, and content creators collaborate to produce short films and video essays about the impact of constant monitoring. Creative media reaches audiences that traditional advocacy often misses. Art has a unique ability to make complex issues like surveillance feel personal and urgent. These campaigns spark public conversation and shift the culture around privacy.',
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
      'An independent journalist uncovers evidence showing that surveillance technologies are disproportionately concentrated in lower-income and historically marginalized neighborhoods. The report sparks public debate over fairness and accountability. Data showing where surveillance is heaviest exposes patterns of discrimination embedded in these programs. When the numbers are made public, communities can demand more equitable treatment.',
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
      'A resident shares their experience of being wrongly identified by a surveillance system, and the story quickly spreads online. Real accounts of harm are harder to dismiss than abstract privacy concerns. Public attention forces officials to review the technology\'s accuracy and address its failures. One person\'s story can be the spark that changes policy.',
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
      'Community activists livestream a surveillance-related incident, letting thousands of residents witness events in real time. Visibility is accountability — when the public watches, officials must respond. Live footage creates a record that can\'t be denied or revised. This kind of transparent documentation keeps power in check and builds public trust.',
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
      'Negative press coverage can be powerful — a single damaging story has pushed cities and companies to pull surveillance devices to protect their reputation. Officials and corporations care deeply about public perception. Strategic media pressure shifts the cost-benefit calculation for surveillance programs. When the public backlash outweighs the perceived benefits, devices come down.',
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
      'Undercover reporting has repeatedly exposed surveillance plans before they roll out, forcing officials to pause and answer to the public. A well-timed story can delay or derail a surveillance expansion entirely. Journalists working in the public interest serve as an early warning system for communities. When officials know they\'re being watched, they are more careful about what they approve.',
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
      'Local reporters investigate and publish exposés revealing hidden contracts between city governments, law enforcement, and surveillance tech companies. Public scrutiny often uncovers surveillance programs that residents were never informed about. A single well-researched story can shift public opinion and force officials to answer for their decisions. Investigative journalism is one of the most powerful tools communities have for holding power accountable.',
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
      'You and your neighbors submit opinion pieces to local newspapers to shape public narratives around surveillance. Personal stories from real residents are more persuasive than statistics alone. Op-eds reach readers who might not otherwise follow local policy debates. Sharing your experience can inspire others to speak out and join the movement.',
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
      'Local filmmakers, artists, and content creators collaborate to produce short films and video essays about the impact of constant monitoring. Creative media reaches audiences that traditional advocacy often misses. Art has a unique ability to make complex issues like surveillance feel personal and urgent. These campaigns spark public conversation and shift the culture around privacy.',
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
      'An independent journalist uncovers evidence showing that surveillance technologies are disproportionately concentrated in lower-income and historically marginalized neighborhoods. The report sparks public debate over fairness and accountability. Data showing where surveillance is heaviest exposes patterns of discrimination embedded in these programs. When the numbers are made public, communities can demand more equitable treatment.',
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
      'Voter registration initiatives help residents build a politically engaged electorate that can support candidates who prioritize privacy protections. Elected officials respond to voters — so increasing civic participation is a direct form of power. Communities with high voter turnout have more leverage when demanding policy changes. Registration drives transform frustration into political action.',
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
      'The local mayor attends a neighborhood event and faces direct questions from residents about surveillance policies. Public officials must account for their decisions when they meet constituents face to face. These encounters create pressure that private meetings or formal hearings often don\'t. Showing up and speaking out is one of the most effective forms of civic engagement.',
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
      'Residents attend local government meetings and vote against proposed surveillance contracts, showing that public participation shapes policy. City councils respond to organized community presence. When residents show up in numbers, officials know the issue matters. Democratic participation at the local level is one of the most direct ways to influence how surveillance is governed.',
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
      'City officials temporarily halt new surveillance installations while existing systems are reviewed for effectiveness and privacy impact. A pause gives communities time to organize, gather data, and make their case to decision-makers. Review periods often reveal that many surveillance programs lack clear evidence of effectiveness. Demanding a review is a concrete first step toward accountability.',
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
      'Local leaders debate whether public funds should go toward surveillance technologies or toward education, housing, and healthcare. Budget decisions reveal a community\'s true priorities. When residents advocate for reinvestment over surveillance, it shifts the political calculus. Every dollar not spent on cameras is a dollar available for programs that actually build community safety.',
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
      'The school board considers expanding surveillance systems in schools after students, parents, and educators raise serious concerns. Surveillance in schools sends a message of distrust to young people. Research shows it can harm the learning environment and disproportionately affect students of color. Community members who attend these meetings and speak up can change the outcome.',
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
      'When funding dries up, surveillance programs stall — budget cuts and lost grants have halted camera rollouts in many cities. Surveillance systems are expensive to install and maintain, making them vulnerable to financial pressure. Advocacy groups that target funding sources have successfully shut down major surveillance contracts. Cutting the money cuts the program.',
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
      'Elections can reset the political landscape overnight, sweeping in officials who roll back surveillance and rebuild public trust. Voting is one of the most direct tools communities have to shape local policy. Officials who approve surveillance without community consent can be replaced by those who won\'t. Every election is an opportunity to choose leaders who prioritize privacy.',
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
      'Voter registration initiatives help residents build a politically engaged electorate that can support candidates who prioritize privacy protections. Elected officials respond to voters — so increasing civic participation is a direct form of power. Communities with high voter turnout have more leverage when demanding policy changes. Registration drives transform frustration into political action.',
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
      'The local mayor attends a neighborhood event and faces direct questions from residents about surveillance policies. Public officials must account for their decisions when they meet constituents face to face. These encounters create pressure that private meetings or formal hearings often don\'t. Showing up and speaking out is one of the most effective forms of civic engagement.',
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
      'Residents attend local government meetings and vote against proposed surveillance contracts, showing that public participation shapes policy. City councils respond to organized community presence. When residents show up in numbers, officials know the issue matters. Democratic participation at the local level is one of the most direct ways to influence how surveillance is governed.',
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
      'City officials temporarily halt new surveillance installations while existing systems are reviewed for effectiveness and privacy impact. A pause gives communities time to organize, gather data, and make their case to decision-makers. Review periods often reveal that many surveillance programs lack clear evidence of effectiveness. Demanding a review is a concrete first step toward accountability.',
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
    effect: 'Add 1 surveillance device to a yellow neighborhood (Neighborhood).',
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
    effect: 'Privacy & Community Trust decreases by 1.',
    meterDelta: -1,
    educationalNote:
      'Footage collected from neighborhood surveillance systems is leaked online, damaging public trust and raising concerns about data security.',
  },
  {
    id: 'incident-06',
    type: 'incident',
    name: 'Protest Leads to More Monitoring',
    effect: 'Add 1 surveillance device to the Red neighborhood (Civic Center).',
    deviceTarget: 'politics',
    deviceCount: 1,
    educationalNote:
      'Following a series of public demonstrations, city officials deploy additional crowd-monitoring technologies to track large gatherings.',
  },
  {
    id: 'incident-07',
    type: 'incident',
    name: 'Retail Theft Prevention Initiative',
    effect: 'Add 1 surveillance device to the Green neighborhood (Downtown).',
    deviceTarget: 'media',
    deviceCount: 1,
    educationalNote:
      'Major retail stores expand facial recognition and tracking systems after reports of organized shoplifting activity.',
  },
  {
    id: 'incident-08',
    type: 'incident',
    name: 'Wildfire Evacuation Monitoring',
    effect: 'Privacy & Community Trust decreases by 1.',
    meterDelta: -1,
    educationalNote:
      'Emergency response agencies deploy drones and automated tracking systems to monitor evacuation routes and population movement during a wildfire.',
  },
];
