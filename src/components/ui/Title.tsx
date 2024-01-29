interface TitleProps {
  className?: string;
  title?: string;
}
export const Title = ({ title = "Titulo", className }: TitleProps) => {
  return (
    <>
      <h1
      
        className={`text-2xl md:text-3xl font-bold mb-4 lg:mb-0 lg:mr-4 ${className}`}
      >
        {title}
      </h1>
    </>
  );
};
