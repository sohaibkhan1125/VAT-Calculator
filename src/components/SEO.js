import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "VAT Calculator - Free Online VAT Calculator | Add & Remove VAT Instantly",
  description = "Professional VAT calculator for instant VAT calculations. Add or remove VAT with precision. Supports all VAT rates. Free, fast, and accurate VAT calculations for businesses and individuals.",
  keywords = "VAT calculator, VAT calculation, add VAT, remove VAT, value added tax, tax calculator, business calculator, UK VAT, EU VAT, tax tool, financial calculator, invoice calculator, tax rate calculator",
  image = "/logo512.png",
  url = "https://vatcalc.com",
  type = "website",
  robots = "index, follow",
  structuredData = null
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "VAT Calculator",
      "url": "https://vatcalc.com"
    },
    "featureList": [
      "Add VAT to net prices",
      "Remove VAT from total prices",
      "Support for all VAT rates",
      "Instant calculations",
      "Mobile-friendly interface",
      "Free to use"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="VAT Calculator" />
      <meta name="robots" content={robots} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="google-site-verification" content="0RTDuC178wNXNmUu5SNDnj8B8eAnlQP4IvNEZ9LUYuw" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="VAT Calculator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
