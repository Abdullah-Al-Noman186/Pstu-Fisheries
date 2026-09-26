interface Props { title: string; subtitle?: string; center?: boolean; }

export default function SectionHeader({ title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2 className="section-title">{title}</h2>
      <div className={`wave-divider ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className="section-sub mt-3">{subtitle}</p>}
    </div>
  );
}