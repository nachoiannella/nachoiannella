import Script from 'next/script';

/** Loads nothing unless NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID are set at build time. */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <>
      {ga ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script>
        </>
      ) : null}
      {clarity ? (
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}</Script>
      ) : null}
    </>
  );
}
