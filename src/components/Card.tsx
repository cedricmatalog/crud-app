import IPost from '../interfaces/IPost';

export default function Card({
  data: { active, name, description, categoryName },
}: {
  data: IPost & { categoryName?: string };
}) {
  return (
    <div>
      <div className="flex justify-center">
        <strong
          className={`relative h-6 px-4 text-xs leading-6 text-white uppercase ${
            active ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        >
          {active ? 'Active' : 'Inactive'}
        </strong>
      </div>

      <h5 className="mt-4 text-md text-black/90">{name}</h5>
      <h4 className="mt-1 text-sm text-black/90">{description}</h4>

      <div className="flex items-center  mt-4 font-bold">
        <p className="text-xs tracking-wide uppercase">{categoryName}</p>
      </div>
    </div>
  );
}
