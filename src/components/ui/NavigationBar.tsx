
import Link from "next/link";

export const NavigationBar = () => {
  

  return (
    <>
      <div className="flex flex-col mt-2 pb-5 ">
        <div className="flex justify-center gap-2 ">
          <Link
            href={"/"}
            
            className="btn btn-primary disabled"
          >
            {"<"}
          </Link>

          <Link
            href="/seleccionados"
            className="btn btn-primary"
          >
            {">"}
          </Link>
        </div>
      </div>
    </>
  );
};
