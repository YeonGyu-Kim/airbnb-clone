type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-4 px-4'>
      {children}
    </div>
  );
}
