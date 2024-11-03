import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      {" "}
      <p>
        Enjoying this project? Sponsor on{" "}
        <a
          href="https://github.com/sponsors/ad1992/"
          style={{ color: "#0366d6" }}
        >
          GitHub
        </a>{" "}
        to help keep it going!
      </p>
      <p>
        Made with lots of ❤️ by <a href="https://aakansha.dev">Aakansha</a>
      </p>
    </div>
  );
};

export default Footer;
