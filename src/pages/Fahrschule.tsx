import { Users, Award, Heart, Target, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/team';

export function Fahrschule() {
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
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 diagonal-stripes opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Lerne uns kennen</span>
            </div>
            <h1 className="display-xl text-white mb-6">
              ÜBER <span className="gradient-text">UNS</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Lerne unser Team kennen und erfahre mehr über die Fahrschule Nicolai
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-background relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="display-lg text-secondary mb-6">
                DEINE FAHRSCHULE IN <span className="gradient-text">LUDWIGSBURG</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
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

                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full border border-gray-100">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl text-secondary mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-secondary font-medium text-sm">Das Team</span>
            </div>
            <h2 className="display-lg text-secondary mb-4">UNSER TEAM</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Lerne die Menschen kennen, die dich auf deinem Weg zum Führerschein begleiten
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 card-hover border border-gray-100">
                  {/* Image placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-3">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <span className="text-gray-500 text-sm">Foto folgt</span>
                    </div>
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl text-secondary mb-1">{member.name}</h3>
                    <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 diagonal-stripes opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '25+', label: 'Jahre Erfahrung' },
              { number: '1000+', label: 'Erfolgreiche Schüler' },
              { number: '2', label: 'Standorte' },
              { number: '4', label: 'Erfahrene Fahrlehrer' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-display text-6xl md:text-7xl text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
