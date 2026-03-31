import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'QuickDevTools terms of service and usage conditions.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4 text-text-muted dark:text-text-muted-dark">
        <p><em>Last updated: March 31, 2026</em></p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing and using QuickDevTools (&quot;the Service&quot;), you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">2. Description of Service</h2>
        <p>
          QuickDevTools provides free, browser-based developer and designer tools including but not limited to
          JSON formatting, image conversion, hash generation, color conversion, and other utilities.
          All data processing occurs entirely within your web browser.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">3. Use of Service</h2>
        <p>You agree to use the Service only for lawful purposes. You shall not:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Attempt to interfere with or disrupt the Service</li>
          <li>Use automated systems to access the Service in a manner that sends more requests than a human could reasonably produce</li>
          <li>Reverse engineer or attempt to extract source code beyond what is publicly available</li>
        </ul>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">4. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant that the tools will produce accurate, complete, or reliable results.
          You are solely responsible for verifying the output of any tool before relying on it
          in production systems, security-sensitive contexts, or any other critical application.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">5. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL QUICKDEVTOOLS, ITS OPERATORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION
          LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE
          OF THE SERVICE.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">6. Intellectual Property</h2>
        <p>
          The Service, its design, and underlying code are protected by copyright and other intellectual
          property laws. You may use the tools for personal and commercial purposes, but you may not
          copy, modify, or redistribute the Service itself.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">7. Advertising</h2>
        <p>
          The Service may display third-party advertisements. We are not responsible for the content,
          accuracy, or opinions expressed in such advertisements. Your interactions with advertisers
          are solely between you and the advertiser.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be posted on this page
          with an updated effective date. Continued use of the Service after changes constitutes
          acceptance of the new Terms.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws,
          without regard to conflict of law provisions.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">10. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us through the information
          provided on our About page.
        </p>
      </div>
    </div>
  )
}
