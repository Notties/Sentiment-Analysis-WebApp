import Link from "next/link";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" style={{ textDecoration: "none" }}>About</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
