import { useState } from 'react';
import { ROLES } from '../data/roles';
import type { GameState } from '../types/game';

interface Props {
  state: GameState;
  onClose: () => void;
  rotated?: boolean;
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  organizer: 'A parent deeply embedded in the community who knows their neighbors and builds trust through everyday connections. Their strength lies in collaboration — the more players they work alongside, the more powerful their actions become.',
  legal: 'A lawyer who understands the system from the inside. They can exploit legal loopholes and cross-category knowledge to remove surveillance devices directly, without needing to match neighborhood colors.',
  captain: 'A seasoned activist who knows how to shift the narrative and slow the rollout. When devices stack up too fast, they can organize a pushback and roll back the density tracker.',
  council: 'An insider with political leverage. Their ability to negotiate means the community needs fewer resources to trigger a neighborhood reset at Town Square, making wins more efficient.',
};


export default function RoleOverlay({ state, onClose, rotated }: Props) {
  const activeRoleIds = new Set(state.players.map(p => p.role.id));
  const visibleRoles = ROLES.filter(r => activeRoleIds.has(r.id));

  const startIndex = 0;
  const [index, setIndex] = useState(Math.max(0, startIndex));

  const role = visibleRoles[index];
  if (!role) return null;

  return (
    <div className={`tutorial-overlay${rotated ? ' overlay-rotated' : ''}`} onClick={onClose}>
      <div className="role-overlay-panel" onClick={e => e.stopPropagation()}>
        <div className="tutorial-overlay-header">
          <span className="tutorial-overlay-title">Roles</span>
          <button className="tutorial-overlay-close" onClick={onClose}>✕</button>
        </div>

        {/* Role tabs */}
        <div className="role-overlay-tabs">
          {visibleRoles.map((r, i) => (
            <button
              key={r.id}
              className={`role-overlay-tab ${i === index ? 'active' : ''}`}
              style={i === index ? { borderColor: r.colorHex, color: r.colorHex } : {}}
              onClick={() => setIndex(i)}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Role card */}
        <div className="role-overlay-card" style={{ borderColor: role.colorHex }}>
          <div className="role-overlay-card-header" style={{ background: role.colorHex }}>
            <span className="role-overlay-emoji">{role.emoji}</span>
            <div className="role-overlay-name">{role.name}</div>
          </div>

          <div className="role-overlay-body">
            <div className="role-overlay-section-label">Description</div>
            <p className="role-overlay-desc">{ROLE_DESCRIPTIONS[role.id]}</p>

            <div className="role-overlay-section-label" style={{ marginTop: '0.75rem' }}>Special Ability</div>
            <p className="role-overlay-ability">{role.specialAbility}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
