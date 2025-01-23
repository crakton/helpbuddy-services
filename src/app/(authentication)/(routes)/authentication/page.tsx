import { FC } from "react";
import AuthForm from "../_components/AuthForm";

interface AuthenticationPageProps {}
const AuthenticationPage: FC<AuthenticationPageProps> = ({}) => {
  return (
    <section className="flex flex-col justify-center items-center pb-10 lg:pb-16">
      <AuthForm />
    </section>
  );
};

export default AuthenticationPage;
