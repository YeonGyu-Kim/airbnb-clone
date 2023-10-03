type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({
  title,
  subtitle,
  center = false,
}: HeadingProps) {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
      <div className='text-xl font-bold'>{title}</div>
      <div className='text-sm text-neutral-500 mt-1'>{subtitle}</div>
    </div>
  );
}
