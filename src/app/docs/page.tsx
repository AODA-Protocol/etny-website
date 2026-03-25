import Link from 'next/link'

export const metadata = {
  title: 'ETNY Protocol — Documentation',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-surface-0 text-white px-6 py-32">
      <div className="max-w-[800px] mx-auto">
        <Link href="/" className="font-mono text-sm text-white/30 hover:text-white transition-colors mb-12 inline-block">
          ← Back
        </Link>

        <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-white/30 block mb-4">
          [ DOCUMENTATION ]
        </span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-sans font-normal mb-8">
          ETNY Protocol Docs
        </h1>

        <div className="space-y-12 font-mono text-sm leading-relaxed text-white/30 [&_strong]:text-white [&_strong]:font-normal [&_h2]:text-white [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-normal [&_h2]:mb-4 [&_h2]:mt-0">
          <section>
            <h2>Overview</h2>
            <p>
              ETNY is a crypto privacy protocol that enables <strong>off-chain transfer of wallet ownership</strong> without any blockchain transaction. Instead of sending tokens on-chain, ETNY transfers the <strong>private key itself</strong> using MPC resharing inside hardware-isolated TEE enclaves.
            </p>
          </section>

          <section>
            <h2>How It Works</h2>
            <p>
              The protocol uses a <strong>2-of-2 MPC key scheme</strong>. The private key never exists in whole form. Shard 1 lives in the device's Secure Enclave (iOS) or StrongBox (Android). Shard 2 is split into <strong>5 sub-shards via Shamir 3-of-5</strong> threshold scheme, stored across 5 independent TEE enclave nodes.
            </p>
            <p className="mt-4">
              Transfer happens in two phases: <strong>PREPARE</strong> (generate new shards, ~800ms) and <strong>COMMIT</strong> (activate new, tombstone old, ~300ms). Total transfer time is <strong>under 2 seconds</strong>.
            </p>
          </section>

          <section>
            <h2>Key Properties</h2>
            <ul className="list-none space-y-3 mt-4">
              <li>→ <strong>Zero gas fees</strong> — no blockchain transaction during transfer</li>
              <li>→ <strong>Zero on-chain trace</strong> — wallet address stays the same</li>
              <li>→ <strong>~2 second transfers</strong> — MPC resharing completes in under 2 seconds</li>
              <li>→ <strong>No seed phrases</strong> — key shards replace traditional recovery</li>
              <li>→ <strong>Chain agnostic</strong> — works with EVM (secp256k1) and Solana (Ed25519)</li>
            </ul>
          </section>

          <section>
            <h2>Security Model</h2>
            <p>
              <strong>TEE Enclaves:</strong> Each node runs inside Intel SGX or AWS Nitro enclaves. Sub-shards are sealed in silicon — not even node operators can access them.
            </p>
            <p className="mt-4">
              <strong>MPC Resharing:</strong> During transfer, new key shards are generated through multi-party computation. Old shards are tombstoned (marked unusable) then purged.
            </p>
            <p className="mt-4">
              <strong>Proactive Secret Sharing:</strong> Sub-shards are rotated every 5-10 minutes. Even if an attacker captures a shard, it becomes useless after rotation.
            </p>
          </section>

          <section>
            <h2>Architecture</h2>
            <p>
              <strong>Client:</strong> Mobile app with Secure Enclave / StrongBox for Shard 1 storage. Communicates with nodes via gRPC + TLS 1.3.
            </p>
            <p className="mt-4">
              <strong>Nodes:</strong> 5 TEE nodes per wallet. Each holds one Shamir sub-shard. Go process + separate enclave process communicating via unix socket + protobuf IPC.
            </p>
            <p className="mt-4">
              <strong>ZKP Layer:</strong> Pedersen commitments on Ristretto255. Chain-agnostic — nodes don't know what blockchain the wallet uses.
            </p>
          </section>

          <section>
            <h2>API Reference</h2>
            <p>
              Full API documentation is available on <strong>GitHub</strong>. The protocol exposes gRPC services for wallet management (DKG, signing), transfer orchestration (resharing, confirmation), and node P2P communication.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
