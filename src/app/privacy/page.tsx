import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'QuickDevTools privacy policy. Your data stays in your browser.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4 text-text-muted dark:text-text-muted-dark">
        <p><em>Last updated: March 31, 2026</em></p>

        <p>
          QuickDevTools (&quot;we&quot;, &quot;us&quot;, or &quot;the Service&quot;) is committed to protecting your privacy.
          This Privacy Policy explains how we handle information when you use our website.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">1. Data Controller</h2>
        <p>
          QuickDevTools operates as the data controller for any personal data processed through this website.
          For questions or concerns about your data, please contact us through our{' '}
          <Link href="/about" className="text-primary hover:underline">About page</Link>.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">2. Data Processing — Tools</h2>
        <p>
          All tools on QuickDevTools process data entirely in your web browser using JavaScript.
          <strong className="text-text dark:text-text-dark"> No data you enter into any tool is ever uploaded to or stored on our servers.</strong>
        </p>
        <p>
          When you use a tool (e.g., format JSON, convert an image, generate a hash),
          the processing happens locally on your device. The data never leaves your browser.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">3. Legal Basis for Processing (GDPR)</h2>
        <p>We process limited personal data based on the following legal grounds:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text dark:text-text-dark">Consent</strong> — For advertising cookies (Google AdSense). We obtain your consent through our cookie banner before loading any advertising scripts.</li>
          <li><strong className="text-text dark:text-text-dark">Legitimate Interest</strong> — For basic analytics to understand how our tools are used and improve the Service.</li>
        </ul>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">4. Cookies and Tracking</h2>
        <p>We use the following types of cookies:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text dark:text-text-dark">Essential cookies</strong> — Your dark mode preference and cookie consent choice (stored in localStorage). These are necessary for the Service to function.</li>
          <li><strong className="text-text dark:text-text-dark">Advertising cookies</strong> — Google AdSense may set cookies to serve relevant advertisements. These are only loaded after you provide consent through our cookie banner.</li>
        </ul>
        <p>
          You can manage your cookie preferences at any time by clearing your browser&apos;s local storage
          or using your browser&apos;s cookie settings.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">5. Your Rights (GDPR / EEA Users)</h2>
        <p>If you are located in the European Economic Area, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text dark:text-text-dark">Access</strong> — Request a copy of any personal data we hold about you</li>
          <li><strong className="text-text dark:text-text-dark">Rectification</strong> — Request correction of inaccurate data</li>
          <li><strong className="text-text dark:text-text-dark">Erasure</strong> — Request deletion of your personal data</li>
          <li><strong className="text-text dark:text-text-dark">Restriction</strong> — Request restriction of processing</li>
          <li><strong className="text-text dark:text-text-dark">Data Portability</strong> — Request transfer of your data</li>
          <li><strong className="text-text dark:text-text-dark">Object</strong> — Object to processing based on legitimate interest</li>
          <li><strong className="text-text dark:text-text-dark">Withdraw Consent</strong> — Withdraw consent for advertising cookies at any time</li>
          <li><strong className="text-text dark:text-text-dark">Complaint</strong> — Lodge a complaint with your local data protection authority</li>
        </ul>
        <p>
          Since our tools process data entirely in your browser, we do not store any tool input/output data
          on our servers. The only personal data we may process relates to analytics and advertising.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">6. California Privacy Rights (CCPA)</h2>
        <p>
          If you are a California resident, you have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Know what personal information is collected about you</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of the sale or sharing of your personal information</li>
          <li>Non-discrimination for exercising your privacy rights</li>
        </ul>
        <p>
          Google AdSense may use cookies for behavioral advertising, which may constitute a &quot;sale&quot; or
          &quot;sharing&quot; of personal information under the CCPA. You can opt out of personalized advertising
          by declining cookies through our cookie banner or by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Ads Settings
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">7. Advertising</h2>
        <p>
          We display advertisements through Google AdSense. Google may use cookies and web beacons
          to serve ads based on your prior visits to this or other websites. Advertising cookies are only
          loaded after you consent through our cookie banner (for EEA users).
        </p>
        <p>
          You can opt out of personalized advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Ads Settings
          </a>
          {' '}or{' '}
          <a
            href="https://optout.aboutads.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            DAA Opt-Out
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">8. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text dark:text-text-dark">Google Fonts</strong> — For typography (may set cookies)</li>
          <li><strong className="text-text dark:text-text-dark">Google AdSense</strong> — For advertising (uses cookies, loaded only with consent)</li>
          <li><strong className="text-text dark:text-text-dark">Cloudflare</strong> — For hosting and content delivery</li>
        </ul>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">9. Data Retention</h2>
        <p>
          We do not store any data from your use of our tools. Cookie consent preferences are stored
          in your browser&apos;s local storage until you clear them. Advertising cookies have their own
          retention periods as defined by Google.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">10. Children&apos;s Privacy</h2>
        <p>
          The Service is not directed at children under 13. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">11. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be reflected on this page
          with an updated date. Continued use of the Service after changes constitutes acceptance.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">12. Contact</h2>
        <p>
          For privacy-related questions or to exercise your rights, please contact us through
          our <Link href="/about" className="text-primary hover:underline">About page</Link>.
        </p>
      </div>
    </div>
  )
}
