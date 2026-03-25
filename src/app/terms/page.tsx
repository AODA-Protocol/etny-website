import Link from 'next/link'

export const metadata = {
  title: 'ETNY Protocol — Terms of Use',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-surface-0 text-white px-6 py-32">
      <div className="max-w-[800px] mx-auto">
        <Link href="/" className="font-mono text-sm text-white/30 hover:text-white transition-colors mb-12 inline-block">
          ← Back
        </Link>

        <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-white/30 block mb-4">
          [ LEGAL ]
        </span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-sans font-normal mb-8">
          Terms of Use
        </h1>

        <div className="space-y-8 font-mono text-sm leading-relaxed text-white/30 [&_strong]:text-white [&_strong]:font-normal [&_h2]:text-white [&_h2]:font-sans [&_h2]:text-lg [&_h2]:font-normal [&_h2]:mb-3 [&_h2]:mt-0">
          <p><strong>Last updated:</strong> March 25, 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ETNY Protocol ("Protocol"), website, or any associated services, you agree to be bound by these Terms of Use. If you do not agree, do not use the Protocol.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              ETNY provides a <strong>decentralized privacy protocol</strong> for off-chain transfer of crypto wallet ownership using MPC resharing and TEE enclaves. The Protocol operates without intermediaries and does not custody user funds or private keys.
            </p>
          </section>

          <section>
            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old and legally capable of entering into binding agreements in your jurisdiction. The Protocol is not available in jurisdictions where its use would be prohibited by law.
            </p>
          </section>

          <section>
            <h2>4. No Custody</h2>
            <p>
              ETNY is a <strong>non-custodial protocol</strong>. At no point does the Protocol, its developers, or node operators have access to your complete private key. Key shards are stored in hardware-isolated enclaves and are inaccessible to any party, including the development team.
            </p>
          </section>

          <section>
            <h2>5. Risks</h2>
            <p>
              Cryptocurrency and decentralized protocols carry inherent risks. You acknowledge that: (a) loss of your device means <strong>loss of access to Shard 1</strong>, with no recovery mechanism by design; (b) the Protocol is experimental software; (c) smart contract and cryptographic vulnerabilities may exist despite audits; (d) regulatory changes may affect the availability of the Protocol in your jurisdiction.
            </p>
          </section>

          <section>
            <h2>6. No Warranty</h2>
            <p>
              The Protocol is provided <strong>"as is"</strong> without warranties of any kind, express or implied. We do not guarantee uptime, security, or fitness for any particular purpose.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall ETNY Protocol, its developers, contributors, or node operators be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Protocol.
            </p>
          </section>

          <section>
            <h2>8. Privacy</h2>
            <p>
              The Protocol is designed with <strong>privacy by default</strong>. We do not collect personal data. On-chain activity is minimized by design. Node operators cannot see wallet contents, blockchain types, or transfer participants.
            </p>
          </section>

          <section>
            <h2>9. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes take effect upon posting to the website. Continued use of the Protocol constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              For questions regarding these terms, contact us through our community channels.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
