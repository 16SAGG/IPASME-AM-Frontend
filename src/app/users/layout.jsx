import { NavBar } from "../ui/users/NavBar";

export default function Layout({ children }) {
    return (
      <div>
        <NavBar/>
        <div
          className="pt-12 pb-24 md:pt-24 md:pb-12"
        >
          {children}
        </div>
      </div>
    );
}