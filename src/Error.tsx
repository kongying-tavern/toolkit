export const Error = ({
  error = "",
}: React.PropsWithChildren<{
  error?: string;
}>) => {
  return (
    <div
      className="
        w-full h-full px-8
        flex flex-col justify-center
      "
    >
      <div className="text-xl mb-8">Application Crashed</div>
      <div className="text-sm">{error}</div>
    </div>
  );
};
