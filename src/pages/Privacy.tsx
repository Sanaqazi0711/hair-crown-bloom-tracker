const Privacy = () => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 prose prose-pink">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective date: July 12, 2026</p>

      <p>
        Hair Crown Bloom Tracker ("the app," "we," "us") is a habit-tracking
        app that helps you build and monitor daily and weekly hair-care
        routines. This policy explains what information we collect, how we
        use it, and how it's protected.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information we collect</h2>
      <p><strong>Account information</strong></p>
      <ul>
        <li>Email address (if you sign up with email/password)</li>
        <li>Name and profile picture (if you sign in with Google)</li>
      </ul>
      <p><strong>Usage data</strong></p>
      <ul>
        <li>The daily and weekly hair-care habits you mark as complete</li>
        <li>Dates and history of your tracked routines, used to power your calendar view</li>
      </ul>
      <p>We do not collect payment information, location data, or any information beyond what's needed to run the app.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How we use your information</h2>
      <p>We use your information only to:</p>
      <ul>
        <li>Create and secure your account</li>
        <li>Save and display your habit-tracking history</li>
        <li>Let you sign in via email/password or Google OAuth</li>
      </ul>
      <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. How your data is stored and protected</h2>
      <p>
        Your data is stored in a PostgreSQL database hosted by Supabase. We
        use Row Level Security (RLS) policies enforced at the database level,
        meaning your tracking data is only ever accessible to your own
        account — not to other users, and not through the app's interface
        alone.
      </p>
      <p>
        Authentication is handled by Supabase Auth and, if you choose that
        sign-in method, Google OAuth 2.0. We never see or store your Google
        password.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-party services</h2>
      <p>This app relies on the following third-party services to operate:</p>
      <ul>
        <li>
          <strong>Supabase</strong> (database and authentication) — see{" "}
          <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
            Supabase's Privacy Policy
          </a>
        </li>
        <li>
          <strong>Google</strong> (OAuth sign-in, if used) — see{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Google's Privacy Policy
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your choices</h2>
      <ul>
        <li>You can update or delete your account data at any time by contacting us (see below)</li>
        <li>You can stop using the app at any time, which stops any further data collection</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Children's privacy</h2>
      <p>
        This app is not directed at children under 13, and we do not
        knowingly collect information from children under 13.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to this policy</h2>
      <p>
        We may update this policy as the app changes. Continued use of the
        app after an update means you accept the revised policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p>
        Questions about this policy or your data can be sent to:{" "}
        <strong>your-email@example.com</strong>
      </p>
    </div>
  );
};

export default Privacy;
