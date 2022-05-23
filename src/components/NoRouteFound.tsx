export default function NoRouteFound() {
  return (
    <header>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              404
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Not Found
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
