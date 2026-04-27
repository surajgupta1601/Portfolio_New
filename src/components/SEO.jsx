import { Helmet } from "react-helmet-async";

const SEO = () => {
  const siteUrl = "https://portfolio-new-chi-six.vercel.app";
  const name = "Suraj Gupta";
  const title = "Suraj Gupta | React Developer & Frontend Engineer";
  const description =
    "Portfolio of Suraj Gupta — React Developer & Frontend Engineer from New Delhi. Specializing in responsive UIs, GSAP animations, and modern web apps built with React, Tailwind CSS & Framer Motion.";
  const keywords =
    "Suraj Gupta, React Developer, Frontend Developer, Portfolio, Web Developer, New Delhi, Tailwind CSS, Framer Motion, GSAP, JavaScript";
  const previewImage = `${siteUrl}/og-preview.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#7c3aed" />

      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={`${name} — Portfolio`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />
      <meta name="twitter:creator" content="@surajgupta23" />
    </Helmet>
  );
};

export default SEO;
