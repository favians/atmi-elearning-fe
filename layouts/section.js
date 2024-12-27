import clsx from "clsx";

export default function Section({
  children,
  className: classNames,
  wrapperClass,
}) {
  return (
    <section className={clsx(classNames)}>
      <div className={clsx("mx-auto max-w-7xl px-6 flex-grow", wrapperClass)}>
        {children}
      </div>
    </section>
  );
}
