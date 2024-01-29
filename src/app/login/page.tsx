import { redirect } from "next/navigation";

export default function LoginPage() {

  return (
    <div>
     {redirect("/")}
    </div>
  );
}