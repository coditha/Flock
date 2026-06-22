import { useState } from 'react';
import { ROLES } from '../data/roles';

interface Props {
  onClose: () => void;
  rotated?: boolean;
}

const ROLE_BODY = 'Each role has a unique ability usable once per turn:\n' +
  ROLES.map(r => `${r.emoji} ${r.name} — ${r.specialAbility}`).join('\n');

const STEPS = [
  {
    title: 'The Situation',
    body: 'Your city is installing surveillance cameras, license plate readers, and smart devices across every neighborhood. Privacy is eroding and community trust is falling. You and your neighbors must work together to push back.',
  },
  {
    title: 'Your Goal',
    body: 'Remove all excess surveillance devices from all 4 neighborhoods before the Privacy & Community Trust meter hits 0. All players win or lose together — coordinate your moves!',
  },
  {
    title: 'Taking Your Turn',
    body: 'Roll the dice to earn actions for your turn. Use them to move, remove devices, play cards, or use your special ability. When you are done, press End Turn to draw 2 new Community Cards.',
  },
  {
    title: 'Moving Around',
    body: 'Moving to an adjacent road tile or device slot costs 1 action. Highlighted tiles show where you can go. Navigate through the neighborhoods to reach devices you want to remove, or head to the Town Square in the center.',
  },
  {
    title: 'Remove Device',
    body: 'To remove a surveillance device: move into the neighborhood, tap the device slot to target it, select 2 Community Cards that match the neighborhood color, then press Remove Device. Costs 1 action. Removing a device raises the Privacy Meter!',
  },
  {
    title: 'Community Cards',
    body: 'Cards come in 5 colors: Legal (blue), Organizing (yellow), Media (green), Political (red), and Neighborhood (purple). You can hold up to 7 cards. Match colors to neighborhoods — Neighborhood needs yellow, Courthouse needs blue, Downtown needs green, Civic Center needs red.',
  },
  {
    title: 'Shimmer Cards',
    body: 'Some cards have a shimmer effect — these are powerful one-time power-ups. Select one shimmer card and press Play Card (costs 1 action). Effects include drawing extra cards, removing devices instantly, blocking the Board Phase, and more.',
  },
  {
    title: 'Exchange Cards',
    body: 'You can give a teammate 1 Community Card if you are both on the exact same tile. Press Exchange Cards, choose your teammate, then pick which card to give. Costs 1 action. Use this to pass the right color card to the right player!',
  },
  {
    title: 'Town Square',
    body: 'The Town Square is the center of the board. When you are there, select 4 cards (one of each color: blue, yellow, green, red) and press Deposit. This clears ALL devices from the most crowded neighborhood and gives the Privacy Meter a big boost!',
  },
  {
    title: 'Board Phase',
    body: 'After all players have taken their turns, the city places a new surveillance device. A flash will highlight exactly which slot gets the device. The more neighborhoods fill up, the worse the devices get — keep clearing them!',
  },
  {
    title: 'Incident Cards',
    body: 'When a neighborhood reaches maximum devices, an Incident Card is triggered. These cause setbacks: dropping the Privacy Meter, adding more devices, or blocking actions. Read the card carefully — sometimes you vote on how to respond.',
  },
  {
    title: 'Player Special Powers',
    body: ROLE_BODY,
  },
  {
    title: 'Privacy Meter',
    body: 'The meter starts at 20 out of 30. Every device placed by the city drops it. If it hits 0, everyone loses. Keep it healthy by removing devices, depositing at the Town Square, and playing shimmer cards. Watch for the red pulse — it means danger!',
  },
  {
    title: 'Ready to Play!',
    body: 'Work together, share cards, use your special powers, and clear all 4 neighborhoods before the Privacy Meter hits zero. Good luck — your community is counting on you!',
  },
];

export default function TutorialOverlay({ onClose, rotated }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className={`tutorial-overlay${rotated ? ' overlay-rotated' : ''}`} onClick={onClose}>
      <div className="tutorial-overlay-panel" onClick={e => e.stopPropagation()}>
        <div className="tutorial-overlay-header">
          <span className="tutorial-overlay-title">How to Play</span>
          <button className="tutorial-overlay-close" onClick={onClose}>✕</button>
        </div>

        <div className="tutorial-overlay-step">
          <div className="tutorial-overlay-step-title">{current.title}</div>
          <p className="tutorial-overlay-step-body">{current.body}</p>
        </div>

        <div className="tutorial-overlay-nav">
          <button
            className="tutorial-overlay-nav-btn"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            ←
          </button>
          <div className="tutorial-dots">
            {STEPS.map((_, i) => (
              <button
                key={i}
                className={`tutorial-dot ${i === step ? 'active' : ''}`}
                onClick={() => setStep(i)}
              />
            ))}
          </div>
          {isLast ? (
            <button className="tutorial-overlay-nav-btn tutorial-overlay-done" onClick={onClose}>
              Done
            </button>
          ) : (
            <button className="tutorial-overlay-nav-btn" onClick={() => setStep(s => s + 1)}>
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
