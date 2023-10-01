type MenuItemProps = {
  onClick: () => void;
  label: string;
};

export default function MenuItem({ onClick, label }: MenuItemProps) {
  return (
    <div className='px-4 py-3 hover:bg-neutral-100 font-semibold'>{label}</div>
  );
}
