import { Users, Award, Heart, Target, Phone, ShieldCheck, GraduationCap, BadgeCheck } from 'lucide-react';
import { PageHero } from '../components/common';
import { useJsonData } from '../hooks/useJsonData';
import type { TeamFile } from '../data/team';

export function Fahrschule() {
  const { data: teamData } = useJsonData<TeamFile>('/data/team.json');
  const teamMembers = teamData?.members ?? [];

  const values = [
    {
      icon: Heart,
      title: 'Mit Leidenschaft',
      description: 'Wir lieben was wir tun und das spürt man in jeder Fahrstunde.',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Zielorientiert',
      description: 'Dein Führerschein ist unser Ziel - wir begleiten dich bis zur Prüfung.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Persönlich',
      description: 'Bei uns bist du keine Nummer - individuelle Betreuung ist wichtig.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Qualifiziert',
      description: 'Erfahrene Fahrlehrer mit regelmäßigen Weiterbildungen.',
      gradient: 'from-accent to-orange-500',
    },
  ];

  return (
    <>
      <PageHero
        crumb="Fahrschule"
        title={<>ÜBER <span className="gradient-text">UNS</span></>}
        subtitle="Lerne unser Team kennen und erfahre mehr über die Fahrschule Nicolai"
      />

      {/* About */}
      <section className="py-24 bg-secondary relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="display-lg text-white mb-6">
                DEINE FAHRSCHULE IN <span className="gradient-text">LUDWIGSBURG</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  Die Fahrschule Nicolai ist seit über 25 Jahren dein zuverlässiger Partner
                  für die Führerscheinausbildung in Ludwigsburg und Umgebung.
                </p>
                <p>
                  Mit zwei Standorten in Eglosheim und Grünbühl sind wir immer in deiner Nähe.
                  Unser moderner Fuhrpark und unsere erfahrenen Fahrlehrer sorgen dafür,
                  dass du bestens auf deine Prüfungen vorbereitet bist.
                </p>
                <p>
                  Wir legen großen Wert auf eine entspannte Lernatmosphäre,
                  in der du dich wohlfühlen und optimal entwickeln kannst.
                  Denn nur wer sich sicher fühlt, fährt auch sicher.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                  <div className="relative bg-secondary-light rounded-2xl p-6 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 transition-shadow h-full border border-white/10">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-secondary relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-white font-medium text-sm">Das Team</span>
            </div>
            <h2 className="display-lg text-white mb-4">UNSER TEAM</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Lerne die Menschen kennen, die dich auf deinem Weg zum Führerschein begleiten
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {!teamData && [0, 1, 2, 3].map((i) => (
              <div key={`skeleton-${i}`} className="relative bg-secondary-light rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col animate-pulse">
                <div className="aspect-square bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-32 bg-white/10 rounded" />
                  <div className="h-4 w-48 bg-white/10 rounded" />
                  <div className="h-4 w-40 bg-white/10 rounded" />
                </div>
              </div>
            ))}
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-secondary-light rounded-3xl overflow-hidden shadow-xl shadow-black/40 card-hover border border-white/10 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-secondary-light to-secondary relative overflow-hidden flex-shrink-0">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-3">
                          <Users className="w-12 h-12 text-gray-400" />
                        </div>
                        <span className="text-gray-500 text-sm">Foto folgt</span>
                      </div>
                    )}
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl text-white mb-1">{member.name}</h3>
                    <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
                    {member.description && (
                      <p className="text-gray-300 text-sm mb-3">{member.description}</p>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-primary transition-colors mt-auto pt-2"
                      >
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verbandsmitgliedschaft */}
      <section className="py-24 bg-secondary relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Verbandsmitgliedschaft</span>
            </div>
            <h2 className="display-lg text-white mb-4">
              ZERTIFIZIERTE <span className="gradient-text">QUALITÄT</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Wir sind offizielles Mitglied im Fahrlehrerverband Baden-Württemberg —
              und damit Teil eines Netzwerks, das sich höchsten Ausbildungsstandards verpflichtet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <a
              href="https://www.flvbw.de/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              aria-label="Fahrlehrerverband Baden-Württemberg (öffnet in neuem Tab)"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl shadow-black/50 border border-white/10 group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/fahrlehrerverband-bw.png"
                  alt="Mitglied im Fahrlehrerverband Baden-Württemberg"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </a>

            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: 'Geprüfte Ausbildung', desc: 'Verbandlich anerkannte Standards in Theorie und Praxis.' },
                { icon: GraduationCap, title: 'Ständige Weiterbildung', desc: 'Regelmäßige Schulungen unserer Fahrlehrer.' },
                { icon: BadgeCheck, title: 'Aktuelle Standards', desc: 'Immer auf dem neuesten Stand der StVO.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
