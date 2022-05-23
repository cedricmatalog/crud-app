import IPost from '../interfaces/IPost';

export default function Card({
  data: { active, name, description, categoryName },
}: {
  data: IPost & { categoryName?: string };
}) {
  return (
    <div data-testid="card  ">
      <div className="flex justify-center">
        <strong
          className={`relative h-6 px-4 text-xs leading-6 text-white uppercase ${
            active ? 'bg-lime-400' : 'bg-yellow-400'
          }`}
        >
          {active ? 'Active' : 'Inactive'}
        </strong>
      </div>

      <h5 className="mt-4 text-md text-black/90">{name}</h5>
      <div className="flex items-center  mt-4 font-bold">
        <p className="text-xs tracking-wide uppercase">{categoryName}</p>
      </div>
      <h4 className="mt-1 text-sm text-black/90 h-40 overflow-auto">
        {description}
      </h4>
    </div>
  );
}
