import clsx from "clsx";

export default function Section({
  children,
  className: classNames,
  wrapperClass,
  id,
}) {
  return (
    <section id={id} className={clsx(classNames)}>
      <div className={clsx("mx-auto max-w-7xl px-6 flex-grow", wrapperClass)}>
        {children}
      </div>
    </section>
  );
}
