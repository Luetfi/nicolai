import { Calendar, CheckCircle, Phone, Mail, Sparkles } from 'lucide-react';
import type { UpcomingCourse } from '../../data/services';

interface UpcomingCourseCardProps {
  course: UpcomingCourse;
  variant?: 'full' | 'compact';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function UpcomingCourseCard({ course, variant = 'full' }: UpcomingCourseCardProps) {
  const phoneHref = `tel:${course.contactPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${course.contactPhone.replace(/\D/g, '').replace(/^0/, '49')}`;

  if (variant === 'compact') {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-60" />
        <div className="relative bg-secondary-light rounded-3xl p-6 sm:p-8 border border-primary/30 shadow-xl shadow-black/40">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Nächster Kurs
            </span>
            {course.spotsAvailable && (
              <span className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Plätze frei
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl text-white mb-1">
            {course.title} ({course.type})
          </h3>
          <p className="text-gray-300 mb-1">
            Start: <span className="text-primary font-semibold">{formatDate(course.startDate)}</span>
          </p>
          <p className="text-gray-300">
            Kosten: <span className="text-white font-semibold">{course.price}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl opacity-70" />

      <div className="relative bg-gradient-to-br from-secondary-light to-secondary rounded-3xl p-8 sm:p-10 border border-primary/30 shadow-2xl shadow-black/50">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-bold uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            Nächster Kurs
          </span>
          {course.spotsAvailable && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Es sind noch Plätze frei
            </span>
          )}
        </div>

        <h2 className="display-md text-white mb-3">{course.title.toUpperCase()}</h2>

        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <p className="text-xl text-gray-100">
            Nächster Kurs startet am{' '}
            <span className="text-primary font-bold">{formatDate(course.startDate)}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-secondary/60 rounded-2xl p-5 border border-white/10">
            <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">Kursart</div>
            <div className="font-display text-2xl text-white">{course.type}</div>
          </div>
          <div className="bg-secondary/60 rounded-2xl p-5 border border-white/10">
            <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">Kosten</div>
            <div className="font-display text-2xl text-primary">{course.price}</div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <p className="text-gray-200 text-lg">
              Jetzt anmelden — wir freuen uns auf dich!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-3 btn-accent text-white px-6 py-3 rounded-xl font-bold group"
            >
              <Phone className="w-5 h-5" />
              {course.contactPhone}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={`mailto:${course.contactEmail}`}
              className="inline-flex items-center justify-center gap-3 bg-secondary-light hover:bg-secondary border border-white/10 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <Mail className="w-5 h-5" />
              E-Mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
