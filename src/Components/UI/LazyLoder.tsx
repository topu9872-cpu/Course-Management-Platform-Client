import dynamic from "next/dynamic";

export const LazyLoader = <T extends object>(
  loader: () => Promise<{ default: React.ComponentType<T> }>,
) => {
  return dynamic(loader, {
    loading: () => (
      <div className="mx-auto flex justify-center items-center pt-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    ),
  });
};
