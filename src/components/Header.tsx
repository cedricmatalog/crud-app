export default function Header({ title }: { title: string }) {
  return (
    <div>
      <h2 className="mt-1 mb-5 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl">
        {title}
      </h2>
    </div>
  );
}
