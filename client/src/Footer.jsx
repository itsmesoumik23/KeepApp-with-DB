import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} | Made by Soumik Mukherjee</p>
    </footer>
  );
}

export default Footer;