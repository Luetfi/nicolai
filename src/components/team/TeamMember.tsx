import { User } from 'lucide-react';
import type { TeamMember as TeamMemberType } from '../../data/team';

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`flex flex-col items-center justify-center ${member.image ? 'hidden' : ''}`}>
          <User className="w-24 h-24 text-gray-400" />
          <span className="text-gray-500 text-sm mt-2">Foto folgt</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
        <p className="text-accent font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.description}</p>
      </div>
    </div>
  );
}
