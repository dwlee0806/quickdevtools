export interface ToolContent {
  howToUse: {
    title: string
    steps: { step: string; description: string }[]
  }
  useCases: string[]
  faq: { question: string; answer: string }[]
  relatedArticle: {
    title: string
    content: string
  }
}

export const toolContent: Record<string, ToolContent> = {
  'json-formatter': {
    howToUse: {
      title: 'How to Format JSON Online',
      steps: [
        { step: 'Paste your JSON', description: 'Copy raw JSON from your API response, config file, or database query and paste it into the input area. The tool accepts any valid JSON structure including nested objects and arrays.' },
        { step: 'Format or validate', description: 'Click the Format button to beautify your JSON with proper indentation. The validator will immediately flag syntax errors like missing commas, unmatched brackets, or trailing commas that are common in hand-edited JSON.' },
        { step: 'Copy the result', description: 'Use the copy button to grab the formatted output. You can also switch between 2-space and 4-space indentation depending on your project\'s style guide, or minify the JSON for production use.' },
      ],
    },
    useCases: [
      'Debugging API responses by making deeply nested JSON readable at a glance',
      'Validating JSON configuration files (package.json, tsconfig.json) before deployment',
      'Comparing two JSON structures by formatting them consistently first',
      'Cleaning up hand-edited JSON that may have introduced syntax errors',
      'Minifying JSON payloads to reduce bandwidth in production API calls',
      'Converting single-line log output into structured, readable JSON for analysis',
    ],
    faq: [
      { question: 'What makes JSON invalid?', answer: 'The most common JSON errors are trailing commas after the last property, single quotes instead of double quotes around keys or strings, unquoted property names, comments (JSON does not support comments), and missing commas between array elements. JavaScript objects allow all of these, but strict JSON does not.' },
      { question: 'Is my data safe when formatting JSON here?', answer: 'Absolutely. All formatting and validation happens entirely in your browser using JavaScript. Your JSON data never leaves your device — no server requests are made, and nothing is stored or logged. You can verify this by checking your browser\'s Network tab.' },
      { question: 'What is the difference between JSON.stringify and JSON.parse?', answer: 'JSON.parse() takes a JSON string and converts it into a JavaScript object. JSON.stringify() does the opposite — it serializes a JavaScript object into a JSON string. When you format JSON, the tool first parses the string to validate it, then stringifies it back with indentation.' },
      { question: 'Why should I minify JSON?', answer: 'Minified JSON removes all unnecessary whitespace, reducing file size by 20-40% depending on nesting depth. This matters for API responses served to thousands of clients, stored configuration, and anywhere bandwidth or storage costs add up. Most production APIs serve minified JSON by default.' },
      { question: 'Can this tool handle large JSON files?', answer: 'The browser-based formatter handles files up to several megabytes comfortably. For extremely large files (50MB+), you might experience slow rendering. In those cases, command-line tools like jq are better suited for the job.' },
      { question: 'What is JSON Schema and how does it relate to validation?', answer: 'JSON Schema is a separate specification that defines the expected structure, types, and constraints of a JSON document. This tool validates JSON syntax (is it well-formed?), while JSON Schema validates semantics (does the data match the expected shape?). Both are important but serve different purposes.' },
      { question: 'How do I format JSON with a specific indentation style?', answer: 'Different teams use different conventions — 2 spaces (common in JavaScript/TypeScript projects), 4 spaces (common in Python projects), or tabs. This tool lets you switch between these options. The formatted output respects your choice so it matches your codebase\'s .editorconfig or prettier settings.' },
    ],
    relatedArticle: {
      title: 'Understanding JSON: The Universal Data Exchange Format',
      content: 'JSON (JavaScript Object Notation) has become the standard data interchange format for web applications, and for good reason. Its human-readable syntax makes it easy to inspect and debug, while its simple structure — objects, arrays, strings, numbers, booleans, and null — covers virtually every data modeling need without unnecessary complexity.\n\nOriginally derived from JavaScript object literal syntax by Douglas Crockford in the early 2000s, JSON quickly displaced XML as the preferred format for REST APIs. The key advantage was simplicity: where XML required verbose opening and closing tags, JSON expressed the same data in roughly half the characters. This efficiency matters when you\'re transferring millions of API responses per day.\n\nIn modern development, JSON appears everywhere. Package managers (npm, pip) use it for dependency manifests. Configuration files for tools like TypeScript, ESLint, and Prettier are JSON-based. Databases like MongoDB store documents in a binary JSON variant called BSON. Even newer formats like JSON Lines (JSONL) extend JSON for streaming and log processing.\n\nOne common source of confusion is the difference between JSON and JavaScript objects. While they look similar, JSON is stricter: all keys must be double-quoted strings, no trailing commas are allowed, and functions or undefined values cannot be included. This strictness is intentional — it makes JSON unambiguous to parse in any programming language, not just JavaScript.\n\nWhen working with JSON in production, consider using JSON Schema for validation, streaming parsers like SAX-style readers for large files, and compression (gzip or Brotli) for network transfer. These practices ensure your JSON-based systems remain performant and reliable at scale.',
    },
  },

  'base64-encoder-decoder': {
    howToUse: {
      title: 'How to Encode and Decode Base64 Online',
      steps: [
        { step: 'Choose your operation', description: 'Select whether you want to encode plain text to Base64 or decode an existing Base64 string back to readable text. The tool supports both directions with a single click toggle.' },
        { step: 'Enter your input', description: 'Paste the text you want to encode, or the Base64 string you want to decode. The tool handles UTF-8 characters, special symbols, and multi-byte characters like emoji correctly.' },
        { step: 'Copy the output', description: 'The result appears instantly as you type. Click the copy button to grab the encoded or decoded output for use in your API headers, data URIs, email attachments, or wherever you need it.' },
      ],
    },
    useCases: [
      'Encoding API credentials for HTTP Basic Authentication headers',
      'Decoding Base64-encoded email attachments or MIME content',
      'Creating data URIs for embedding small images directly in HTML or CSS',
      'Encoding binary data for safe inclusion in JSON payloads',
      'Debugging encoded strings found in JWT tokens or OAuth flows',
      'Preparing file content for upload via REST APIs that expect Base64 input',
    ],
    faq: [
      { question: 'Is Base64 encoding the same as encryption?', answer: 'No. Base64 is an encoding scheme, not encryption. It transforms binary data into ASCII text so it can be safely transmitted over text-based protocols. Anyone can decode Base64 without a key. Never use Base64 to protect sensitive data — use proper encryption (AES, RSA) for security.' },
      { question: 'Why does Base64 increase the size of data?', answer: 'Base64 represents every 3 bytes of input as 4 ASCII characters, resulting in roughly a 33% size increase. This overhead is the trade-off for safe text-based transmission. For large files, consider using binary transfer methods instead of Base64 encoding.' },
      { question: 'What characters are used in Base64?', answer: 'Standard Base64 uses A-Z, a-z, 0-9, plus (+), and slash (/), with equals (=) for padding. URL-safe Base64 replaces + with - and / with _ to avoid conflicts with URL syntax. This distinction matters when encoding data for query parameters or file names.' },
      { question: 'Why do some Base64 strings end with equal signs?', answer: 'The equals signs (= or ==) are padding characters. Since Base64 processes input in 3-byte groups, padding is added when the input length is not a multiple of 3. One = means the last group had 2 bytes, and == means it had 1 byte. Some implementations strip this padding.' },
      { question: 'Can I encode binary files like images with this tool?', answer: 'This tool is optimized for text-to-Base64 conversion. For encoding binary files like images or PDFs, you would typically use a file-reading approach. In JavaScript, you can use FileReader.readAsDataURL() to get a Base64-encoded data URI from any file.' },
      { question: 'What is the difference between btoa() and Buffer.from() in JavaScript?', answer: 'The browser\'s btoa() function only handles Latin-1 characters and will throw errors on Unicode text. Node.js Buffer.from(str).toString(\'base64\') handles any encoding. For browser-side Unicode, you need to first encode the string to UTF-8 bytes before Base64 encoding.' },
      { question: 'When should I use Base64 in my application?', answer: 'Use Base64 when you need to embed binary data in text-based formats (JSON, XML, HTML), transmit data over protocols that only support ASCII, or encode credentials for HTTP headers. Avoid it for large files where binary transfer is available, as the 33% overhead adds up quickly.' },
    ],
    relatedArticle: {
      title: 'Base64 Encoding Explained: When and Why Developers Use It',
      content: 'Base64 encoding is one of those fundamental tools that every developer encounters but few take the time to fully understand. At its core, Base64 converts binary data into a text representation using 64 printable ASCII characters, making it safe to embed in contexts where raw binary would cause problems.\n\nThe encoding works by taking three bytes (24 bits) of input at a time and splitting them into four 6-bit groups. Each 6-bit value maps to one of the 64 characters in the Base64 alphabet. When the input length isn\'t divisible by three, padding characters (=) fill the gap. This simple mechanism has been standardized in RFC 4648 and is implemented in virtually every programming language.\n\nThe most common use case you\'ll encounter is HTTP Basic Authentication, where credentials are sent as a Base64-encoded "username:password" string in the Authorization header. Despite appearances, this provides zero security on its own — it\'s purely for safe text transmission. That\'s why Basic Auth should always be used over HTTPS.\n\nData URIs are another everyday use. By prefixing Base64-encoded file content with a MIME type (like data:image/png;base64,...), you can embed small images directly in HTML or CSS. This eliminates an HTTP request per image, which can improve performance for icons and small graphics, though it increases the HTML document size and bypasses browser caching.\n\nIn email, Base64 is the backbone of MIME encoding for attachments. When you attach a PDF to an email, your client Base64-encodes the file content so it can travel through SMTP servers that only handle 7-bit ASCII text. The receiving client decodes it back to the original binary file.\n\nModern APIs frequently use Base64 for file uploads in JSON payloads, webhook signatures, and encoded state parameters in OAuth redirects. Understanding the 33% size overhead is crucial — for a 1MB image, you\'re transmitting 1.33MB of Base64 text, which makes it impractical for large files where multipart form uploads or presigned URLs are better choices.',
    },
  },

  'url-encoder-decoder': {
    howToUse: {
      title: 'How to Encode and Decode URLs Online',
      steps: [
        { step: 'Paste your URL or text', description: 'Enter the URL containing special characters, or the percent-encoded string you need to decode. The tool handles full URLs, individual query parameters, and Unicode characters.' },
        { step: 'Select encode or decode', description: 'Choose to encode (converts special characters to percent-encoded format like %20 for spaces) or decode (converts percent-encoded characters back to their original form).' },
        { step: 'Use the result', description: 'Copy the encoded URL for safe use in links, API requests, or redirects. Or read the decoded output to understand what a complex percent-encoded string actually contains.' },
      ],
    },
    useCases: [
      'Encoding query parameters that contain spaces, ampersands, or special characters',
      'Debugging encoded URLs from analytics tracking links or marketing campaigns',
      'Preparing redirect URLs for OAuth callback parameters',
      'Encoding file paths with spaces or international characters for web servers',
      'Decoding error messages in URL-encoded server responses',
      'Building safe URLs for REST API calls that include user-generated content',
    ],
    faq: [
      { question: 'What is percent encoding?', answer: 'Percent encoding (also called URL encoding) replaces unsafe or reserved characters with a percent sign followed by two hexadecimal digits representing the character\'s ASCII value. For example, a space becomes %20, an ampersand becomes %26, and a hash becomes %23. This ensures URLs are transmitted correctly across all systems.' },
      { question: 'What is the difference between encodeURI and encodeURIComponent?', answer: 'encodeURI() encodes a full URI but preserves characters that have special meaning in URLs (like ://?#&=). encodeURIComponent() encodes everything except letters, digits, and a few safe characters. Use encodeURIComponent() for query parameter values to avoid breaking URL structure.' },
      { question: 'Why do spaces sometimes appear as + and sometimes as %20?', answer: 'In the application/x-www-form-urlencoded format (used by HTML forms), spaces are encoded as +. In standard percent encoding (RFC 3986), spaces are %20. Both are valid in different contexts. The + convention dates back to early HTML form submissions and persists in query strings.' },
      { question: 'Do I need to encode the entire URL or just parts?', answer: 'You should only encode the values within a URL, not the structural characters. Encoding the entire URL would break it by encoding the scheme (://), path separators (/), and query delimiters (?&=). Encode individual parameter values, path segments, or fragment identifiers separately.' },
      { question: 'How does URL encoding handle non-ASCII characters?', answer: 'Non-ASCII characters (like Chinese, Arabic, or emoji) are first converted to their UTF-8 byte sequence, then each byte is percent-encoded. For example, the character "ü" (U+00FC) becomes %C3%BC because its UTF-8 encoding is the two bytes 0xC3 and 0xBC.' },
      { question: 'Is URL encoding the same as HTML encoding?', answer: 'No. URL encoding (percent encoding) is for safe URL transmission, while HTML encoding (entity encoding) replaces characters like <, >, and & with HTML entities (&lt;, &gt;, &amp;). They serve different purposes and should not be confused or mixed.' },
    ],
    relatedArticle: {
      title: 'URL Encoding Demystified: A Developer\'s Guide to Percent Encoding',
      content: 'URLs were designed in an era when ASCII was king, and that legacy still shapes how we handle web addresses today. RFC 3986 defines the syntax for Uniform Resource Identifiers, and one of its most practical aspects is percent encoding — the mechanism that allows any character to appear safely in a URL.\n\nThe need for encoding arises because certain characters have structural meaning in URLs. The question mark separates the path from the query string. The ampersand separates query parameters. The hash marks a fragment identifier. If your actual data contains these characters, they must be encoded to avoid ambiguity.\n\nA practical example: suppose you\'re building a search URL where the user typed "Tom & Jerry". Without encoding, the URL https://example.com/search?q=Tom & Jerry would break — the browser would interpret "& Jerry" as a second parameter named "Jerry" with no value. The correct URL is ?q=Tom%20%26%20Jerry, where %20 replaces spaces and %26 replaces the ampersand.\n\nInternationalized domain names (IDNs) and paths add another layer. When you see a URL with Chinese, Arabic, or Cyrillic characters in the address bar, the browser is actually displaying the decoded form for readability. Under the hood, each non-ASCII character is UTF-8 encoded and then percent-encoded. Domain names use a separate scheme called Punycode for internationalization.\n\nOne of the trickiest aspects of URL encoding in practice is double encoding. If middleware or a framework encodes a value that was already encoded, you end up with %2520 instead of %20 (the % itself gets encoded). This is a frequent source of 404 errors and broken links. Always know which layer of your stack is responsible for encoding, and encode exactly once.\n\nWhen building web applications, the golden rule is: encode values at the point of URL construction, not before. Store raw data and encode only when assembling the final URL string. This prevents the double-encoding trap and keeps your data layer clean.',
    },
  },

  'jwt-decoder': {
    howToUse: {
      title: 'How to Decode JWT Tokens Online',
      steps: [
        { step: 'Paste your JWT', description: 'Copy the full JWT string (the three dot-separated Base64 segments) from your auth header, cookie, or token endpoint response and paste it into the input field.' },
        { step: 'Inspect the decoded parts', description: 'The tool splits the token into its three components: the header (algorithm and token type), the payload (claims like user ID, roles, and expiration), and the signature. Each part is displayed as formatted JSON.' },
        { step: 'Check expiration and claims', description: 'The tool automatically highlights the exp (expiration), iat (issued at), and nbf (not before) timestamps, converting them to human-readable dates so you can quickly verify if a token is still valid.' },
      ],
    },
    useCases: [
      'Debugging authentication failures by inspecting token claims and expiration times',
      'Verifying that your auth server includes the correct roles and permissions in tokens',
      'Checking the signing algorithm (RS256 vs HS256) during OAuth integration',
      'Inspecting ID tokens from OpenID Connect providers to verify user identity claims',
      'Troubleshooting "token expired" errors by comparing exp timestamp with current time',
      'Auditing tokens for excessive claims that could leak sensitive information',
    ],
    faq: [
      { question: 'Is it safe to paste my JWT into an online decoder?', answer: 'This tool decodes tokens entirely in your browser — no data is sent to any server. However, JWTs often contain sensitive claims. Never paste production tokens with real user data into tools that make server requests. Always prefer client-side decoders like this one.' },
      { question: 'Can decoding a JWT reveal the secret key?', answer: 'No. The JWT signature is a hash — you can\'t reverse it to find the secret key. The header and payload are simply Base64-encoded (not encrypted), so anyone can read them. The secret key is used only for verification, not decryption.' },
      { question: 'What is the difference between HS256 and RS256?', answer: 'HS256 (HMAC-SHA256) uses a shared secret — the same key signs and verifies the token. RS256 (RSA-SHA256) uses a public/private key pair — the private key signs, and the public key verifies. RS256 is preferred for distributed systems where you don\'t want every service holding the signing secret.' },
      { question: 'What do the standard JWT claims mean?', answer: 'The most common registered claims are: iss (issuer — who created the token), sub (subject — the user ID), aud (audience — who the token is for), exp (expiration time), iat (issued at), nbf (not before — earliest valid time), and jti (JWT ID — unique identifier). These are conventions, not requirements.' },
      { question: 'Why should I not store sensitive data in a JWT?', answer: 'JWT payloads are Base64-encoded, not encrypted. Anyone who intercepts the token can decode and read all claims. Store only non-sensitive identifiers (user ID, role) in the token, and look up sensitive details server-side using the user ID.' },
      { question: 'Can a JWT be modified without detection?', answer: 'If the server properly verifies signatures, no. Modifying any character in the header or payload changes the required signature. However, if a server skips signature verification (a common vulnerability), modified tokens would be accepted. Always validate signatures on the server.' },
      { question: 'What is a refresh token and how does it differ from a JWT?', answer: 'A JWT access token is short-lived (minutes to hours) and self-contained — the server can validate it without a database lookup. A refresh token is long-lived (days to weeks), opaque (not a JWT typically), and stored server-side. When the access token expires, the client uses the refresh token to get a new one.' },
    ],
    relatedArticle: {
      title: 'JSON Web Tokens: How Modern Authentication Works Under the Hood',
      content: 'JSON Web Tokens have become the de facto standard for stateless authentication in web applications. Understanding how they work — and their security implications — is essential knowledge for any developer building systems that handle user identity.\n\nA JWT consists of three parts separated by dots: the header, payload, and signature. The header specifies the signing algorithm (typically RS256 or HS256) and token type. The payload contains claims — standardized fields like "sub" for the user identifier and "exp" for expiration time, plus custom claims your application needs. The signature is a cryptographic hash that proves the token hasn\'t been tampered with.\n\nThe key insight that makes JWTs powerful is statelessness. Traditional session-based auth requires the server to store session data and look it up on every request. With JWTs, the token itself contains everything the server needs to authenticate the request. This eliminates the session store bottleneck and makes horizontal scaling trivial — any server instance can validate any token independently.\n\nHowever, this statelessness comes with trade-offs. You cannot revoke a JWT before its expiration without maintaining a blacklist, which partially defeats the purpose. This is why access tokens should be short-lived (5-15 minutes is common) and paired with longer-lived refresh tokens that can be revoked server-side.\n\nSecurity best practices for JWTs include: always verify signatures (never skip this step), validate the "aud" and "iss" claims to prevent token confusion, use RS256 for distributed architectures, keep payloads small to reduce overhead, and transmit tokens only over HTTPS. The "alg: none" attack — where an attacker modifies the header to skip signature verification — remains one of the most common JWT vulnerabilities in poorly implemented systems.\n\nWhen choosing between JWTs and session cookies, consider your architecture. Single-server applications work fine with sessions. Microservices and SPAs benefit from JWTs. Both can be secure when implemented correctly, but JWTs require more careful handling of expiration and revocation.',
    },
  },

  'uuid-generator': {
    howToUse: {
      title: 'How to Generate UUIDs Online',
      steps: [
        { step: 'Click generate', description: 'Press the generate button to create a new random UUID (v4). Each UUID is generated using the Web Crypto API, which provides cryptographically secure random values — not the weaker Math.random().' },
        { step: 'Generate in bulk', description: 'Need multiple UUIDs at once? Set the quantity and generate a batch. This is useful when you need to pre-assign IDs for database seeding, test fixtures, or batch record creation.' },
        { step: 'Copy and use', description: 'Click any generated UUID to copy it to your clipboard. UUIDs are generated in the standard 8-4-4-4-12 format (e.g., 550e8400-e29b-41d4-a716-446655440000) ready to use in your code or database.' },
      ],
    },
    useCases: [
      'Generating primary keys for database records before insertion (avoiding auto-increment)',
      'Creating unique identifiers for distributed systems where coordination is impractical',
      'Assigning correlation IDs to trace requests across microservices',
      'Generating session identifiers and CSRF tokens for web applications',
      'Creating unique file names for uploaded content to prevent collisions',
      'Seeding test databases with deterministic or random test data',
    ],
    faq: [
      { question: 'What is the probability of a UUID collision?', answer: 'For UUIDv4, which uses 122 random bits, you would need to generate about 2.71 quintillion (2.71 x 10^18) UUIDs to have a 50% chance of a single collision. In practical terms, generating 1 billion UUIDs per second would take about 86 years to reach a 50% collision probability. It is safe to treat them as unique.' },
      { question: 'What is the difference between UUID versions?', answer: 'UUIDv1 uses the MAC address and timestamp (partially reveals when/where it was created). UUIDv4 uses pure random data (most common, no information leakage). UUIDv5 uses SHA-1 hash of a namespace and name (deterministic). UUIDv7 is time-ordered with random data (newer, sortable, great for database indexes).' },
      { question: 'Should I use UUIDs or auto-incrementing IDs?', answer: 'Auto-increment IDs are simpler, smaller (8 bytes vs 16), and sortable by creation order. UUIDs allow ID generation without database coordination, hide record count from users, and prevent enumeration attacks. Use UUIDs for distributed systems, public-facing IDs, or when you need to generate IDs client-side.' },
      { question: 'Are UUIDs safe to expose in URLs?', answer: 'UUIDv4 IDs are safe to expose because they are random and unguessable. Unlike sequential IDs, users cannot increment a UUIDv4 to access other records. However, UUIDs alone do not replace proper authorization — always verify the requesting user has permission to access the resource.' },
      { question: 'How are UUIDs stored in databases?', answer: 'The most efficient storage is as a 16-byte binary column (BINARY(16) in MySQL, uuid type in PostgreSQL). Storing as a 36-character string wastes space and slows comparisons. PostgreSQL\'s native uuid type handles this optimally. For MySQL, consider using UUID_TO_BIN() with the swap flag for better index performance.' },
      { question: 'What is CUID or ULID and how do they compare?', answer: 'CUID2 and ULID are UUID alternatives designed for specific use cases. ULID is lexicographically sortable (useful for time-ordered data), while CUID2 focuses on security and horizontal scalability. UUIDv7 (the newest version) combines the sortability of ULID with the UUID standard, making it a strong default choice for new projects.' },
    ],
    relatedArticle: {
      title: 'UUIDs in Software Design: Choosing the Right Identifier Strategy',
      content: 'Unique identifiers sit at the foundation of nearly every software system, and choosing the right ID strategy has implications for performance, security, and system design that compound over time.\n\nUUID version 4, the most commonly used variant, generates 122 bits of random data formatted into the familiar 8-4-4-4-12 hexadecimal pattern. The mathematical guarantee against collisions is so strong that distributed systems can independently generate IDs without any coordination, which is precisely why UUIDs became popular alongside microservice architectures.\n\nHowever, UUIDv4 has a significant downside for databases: randomness destroys index locality. When a B-tree index receives random keys, new entries scatter across the tree, causing page splits and increased I/O. This is why PostgreSQL documentation recommends UUIDv7 for primary keys — it prepends a Unix timestamp, making IDs roughly time-ordered while preserving randomness in the lower bits.\n\nThe choice between UUIDs and sequential IDs often depends on your system boundaries. Internal microservices that communicate through message queues benefit from UUIDs because services can generate IDs independently. A monolithic application with a single database might prefer auto-incrementing IDs for simplicity and index performance, exposing a separate UUID or slug for public-facing URLs.\n\nSecurity is another consideration. Sequential IDs leak information — a user seeing order #1000042 knows you have had roughly a million orders. Competitors can track your growth by monitoring ID progression. UUIDv4 reveals nothing, making it the default choice for any public-facing identifier.\n\nRegardless of which format you choose, treat identifiers as opaque strings in your application code. Never parse UUIDs to extract timestamps or encode business logic in ID formats. This keeps your system flexible to change ID strategies in the future without cascading code changes.',
    },
  },

  'hash-generator': {
    howToUse: {
      title: 'How to Generate Hash Values Online',
      steps: [
        { step: 'Enter your text', description: 'Type or paste the text you want to hash into the input field. The tool accepts any UTF-8 text input of any length — from a single character to entire documents.' },
        { step: 'Choose your algorithm', description: 'Select the hash algorithm you need: MD5 (128-bit, legacy), SHA-1 (160-bit, deprecated for security), SHA-256 (256-bit, recommended), or SHA-512 (512-bit, maximum security). Multiple algorithms can be computed simultaneously.' },
        { step: 'Copy and compare', description: 'Copy the resulting hash value. You can paste a known hash to compare against — useful for verifying file integrity or checking if a downloaded file matches its published checksum.' },
      ],
    },
    useCases: [
      'Verifying file integrity by comparing SHA-256 checksums after download',
      'Generating content-addressable storage keys for caching systems',
      'Creating deterministic identifiers from strings for deduplication',
      'Computing checksums for data migration validation between systems',
      'Generating ETag values for HTTP response caching',
      'Verifying that database records haven\'t been tampered with using hash chains',
    ],
    faq: [
      { question: 'What is the difference between hashing and encryption?', answer: 'Hashing is a one-way function — you cannot recover the original input from a hash. Encryption is two-way — you can decrypt data back to its original form with the right key. Hashing is used for integrity verification and password storage. Encryption is used for confidentiality.' },
      { question: 'Is MD5 still safe to use?', answer: 'MD5 is cryptographically broken — researchers can create different inputs that produce the same hash (collision attacks). Do not use MD5 for security purposes like digital signatures or certificate verification. It remains acceptable for non-security checksums like cache keys or file deduplication where collision resistance is not critical.' },
      { question: 'Why do different inputs sometimes produce the same hash?', answer: 'This is called a collision. Since hash functions map infinite possible inputs to a fixed-size output, collisions are mathematically guaranteed to exist. A good hash function makes finding collisions computationally infeasible. SHA-256 has never had a practical collision found, while MD5 and SHA-1 have known collision attacks.' },
      { question: 'Should I use SHA-256 or SHA-512?', answer: 'SHA-256 is sufficient for virtually all use cases and is the standard for TLS certificates, Bitcoin, and most integrity checks. SHA-512 produces a longer hash and is slightly faster on 64-bit processors. Unless you have a specific requirement for the longer hash length, SHA-256 is the pragmatic default.' },
      { question: 'Can I hash passwords with SHA-256?', answer: 'You should not use plain SHA-256 for password hashing. It is too fast — attackers can compute billions of SHA-256 hashes per second with GPUs. Use purpose-built password hashing algorithms like bcrypt, scrypt, or Argon2, which are deliberately slow and include salting to prevent rainbow table attacks.' },
      { question: 'What is a salt and why does it matter?', answer: 'A salt is random data added to input before hashing. Without salts, identical inputs produce identical hashes, enabling rainbow table attacks (precomputed hash lookups). Adding a unique salt to each password means even identical passwords produce different hashes, forcing attackers to crack each one individually.' },
      { question: 'How do hash functions work internally?', answer: 'Hash functions process input in fixed-size blocks through multiple rounds of bitwise operations (XOR, rotation, shifting, modular addition). SHA-256, for example, processes 512-bit blocks through 64 rounds, mixing the input with round constants derived from prime numbers. This diffusion ensures that changing a single input bit affects roughly half of the output bits (the avalanche effect).' },
    ],
    relatedArticle: {
      title: 'Cryptographic Hash Functions: The Building Blocks of Digital Trust',
      content: 'Hash functions are among the most fundamental primitives in computer science, underpinning everything from password storage to blockchain consensus to the integrity of the software you download. Understanding how they work and their limitations makes you a more effective and security-conscious developer.\n\nA cryptographic hash function takes arbitrary-length input and produces a fixed-length output (called a digest) with three critical properties: it should be fast to compute, infeasible to reverse (preimage resistance), and infeasible to find two different inputs with the same hash (collision resistance). These properties enable a wide range of applications.\n\nThe evolution of hash algorithms tells a story of cryptographic progress. MD5 (1991) produced 128-bit hashes and was widely used until collision attacks made it unsuitable for security applications by 2004. SHA-1 (1995) held up longer but was formally deprecated in 2017 after Google demonstrated a practical collision. SHA-2 (which includes SHA-256 and SHA-512) remains secure today, and SHA-3 (Keccak) provides an alternative based on a completely different internal structure called a sponge construction.\n\nIn everyday development, hash functions appear in surprising places. Git uses SHA-1 (migrating to SHA-256) to identify every commit, tree, and blob. Content delivery networks use hashes for cache invalidation. Distributed hash tables power peer-to-peer systems. Merkle trees — binary trees of hashes — enable efficient verification of large datasets and form the backbone of blockchain technology.\n\nFor password storage specifically, general-purpose hash functions are the wrong tool. Even SHA-512 can be computed at billions of operations per second on modern GPUs. Password-specific functions like Argon2id (the current recommendation from OWASP) are designed to be memory-hard and computationally expensive, making brute-force attacks impractical even with specialized hardware.\n\nWhen choosing a hash function for your application, the decision tree is straightforward: SHA-256 for integrity checks and digital signatures, Argon2id for passwords, and HMAC-SHA256 for message authentication codes. Reserve SHA-512 for contexts that specifically benefit from the longer digest, and avoid MD5 and SHA-1 for anything security-related.',
    },
  },

  'color-converter': {
    howToUse: {
      title: 'How to Convert Colors Between Formats Online',
      steps: [
        { step: 'Enter a color value', description: 'Input your color in any supported format: HEX (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(11, 100%, 60%)), or HSB/HSV. The tool auto-detects the format and parses it immediately.' },
        { step: 'View all conversions', description: 'See your color instantly converted to every other format. Each value is ready to copy — HEX for CSS, RGB for programmatic use, HSL for intuitive adjustments, and HSB for design tools like Figma.' },
        { step: 'Fine-tune with the picker', description: 'Use the visual color picker to adjust hue, saturation, and lightness interactively. All format values update in real-time as you drag, making it easy to explore variations.' },
      ],
    },
    useCases: [
      'Converting HEX colors from a design mockup to RGB values for CSS or JavaScript',
      'Translating brand color specifications between design and development formats',
      'Adjusting color lightness systematically using HSL values for accessible contrast',
      'Converting Figma HSB color values to HEX or RGB for CSS implementation',
      'Creating consistent color variations by modifying HSL lightness or saturation',
      'Debugging CSS color issues by comparing the actual computed values across formats',
    ],
    faq: [
      { question: 'What is the difference between HSL and HSB/HSV?', answer: 'HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation, Brightness/Value) both use hue as an angle, but they differ in how they represent intensity. In HSL, 50% lightness is the pure color; 0% is black, 100% is white. In HSB, 100% brightness is the pure color; 0% is black. HSL is native to CSS. HSB is used in design tools like Photoshop and Figma.' },
      { question: 'Why does CSS use HSL instead of HSB?', answer: 'HSL maps more intuitively to how we think about color adjustments. Want a lighter shade? Increase lightness. Want it more pastel? Decrease saturation. The symmetry of HSL (0% lightness = black, 100% = white, 50% = pure color) makes it natural for generating consistent color scales in stylesheets.' },
      { question: 'What does the alpha channel (RGBA/HSLA) do?', answer: 'The alpha channel controls opacity, where 1.0 is fully opaque and 0.0 is fully transparent. In CSS, rgba(255, 0, 0, 0.5) is a 50% transparent red. Modern CSS also supports the syntax rgb(255 0 0 / 50%) and 8-digit HEX codes (#FF000080) for the same effect.' },
      { question: 'How do I create accessible color combinations?', answer: 'WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. The simplest approach using HSL: keep the same hue, and ensure a lightness difference of at least 40-50 points between text and background. Dark text should be below 30% lightness on backgrounds above 80% lightness.' },
      { question: 'What is the P3 display color gamut?', answer: 'Display P3 is a wider color gamut than sRGB, covering about 25% more visible colors. CSS now supports it via the color() function: color(display-p3 1 0 0) produces a more vivid red than #FF0000. Apple devices and modern monitors support P3, but you should always provide sRGB fallbacks for older displays.' },
      { question: 'How do I pick colors that work well together?', answer: 'Color theory provides proven formulas: complementary (opposite on the color wheel), analogous (adjacent hues), triadic (three evenly spaced hues), and split-complementary (one hue plus the two adjacent to its complement). In HSL terms, these translate to simple hue angle calculations: complementary = hue + 180, triadic = hue + 120 and hue + 240.' },
    ],
    relatedArticle: {
      title: 'Color Models in Web Development: From HEX Codes to Modern CSS Color Spaces',
      content: 'Color representation on the web has evolved significantly from the early days of 216 "web-safe" colors to today\'s wide-gamut color spaces. Understanding the different color models and when to use each one is a practical skill that pays off in both design accuracy and code maintainability.\n\nHEX codes (#RRGGBB) are the most recognized format, directly representing the red, green, and blue channel intensities as hexadecimal values from 00 to FF. They are compact and widely supported but make it difficult to reason about color relationships. Looking at #3B82F6, it is not immediately obvious that this is a medium blue with moderate saturation.\n\nRGB notation (rgb(59, 130, 246)) is functionally identical to HEX but uses decimal values, making it slightly easier to understand the channel mix. It is the native format for screens, which combine red, green, and blue light to produce colors (additive color mixing). The main limitation is that adjusting perceived lightness or saturation requires changing all three values simultaneously.\n\nHSL (hsl(217, 91%, 60%)) solves this problem by mapping color to human perception. Hue rotates through the rainbow as an angle (0/360 = red, 120 = green, 240 = blue). Saturation controls vibrancy (0% = gray, 100% = pure color). Lightness moves from black (0%) through the pure color (50%) to white (100%). This model makes it trivial to generate tints, shades, and harmonious palettes programmatically.\n\nThe newest addition to CSS color is the OKLCH model (oklch(60% 0.15 240)), designed for perceptual uniformity — equal changes in numeric values produce visually equal changes in perceived color. This fixes a long-standing issue with HSL where, for example, moving from yellow to blue at the same saturation and lightness produces dramatically different perceived brightness. OKLCH is increasingly recommended for design systems that need predictable, consistent color scales.\n\nWhen building design tokens or theme systems, HSL or OKLCH are the strongest choices because they let you define a palette as a base hue with systematic lightness steps, rather than maintaining a list of arbitrary HEX values.',
    },
  },

  'color-palette-generator': {
    howToUse: {
      title: 'How to Generate Color Palettes Online',
      steps: [
        { step: 'Start with a base color', description: 'Choose your primary brand color or starting point. You can enter a HEX value, use the color picker, or generate a random starting point for inspiration.' },
        { step: 'Select a harmony rule', description: 'Choose a color harmony: complementary (high contrast), analogous (harmonious), triadic (balanced), split-complementary (nuanced contrast), or monochromatic (single-hue variations). Each produces a different visual feel.' },
        { step: 'Export your palette', description: 'Once you have a palette you love, export it as CSS custom properties, Tailwind configuration, or copy individual color values. The generated palette is ready to drop into your project.' },
      ],
    },
    useCases: [
      'Building a consistent color system for a new brand or website design',
      'Generating Tailwind CSS color scales from a single brand color',
      'Exploring color combinations for data visualization charts and graphs',
      'Creating accessible color themes with sufficient contrast ratios',
      'Designing dark mode palettes that maintain the same visual identity',
      'Rapidly prototyping UI color options during the design exploration phase',
    ],
    faq: [
      { question: 'What is a color harmony and why does it matter?', answer: 'Color harmony refers to combinations that are visually pleasing based on their position on the color wheel. These aren\'t arbitrary rules — they are backed by centuries of color theory and practical design experience. Harmonious palettes create visual coherence, guide attention, and establish mood. Disharmonious combinations feel jarring and unprofessional.' },
      { question: 'How many colors should a website palette have?', answer: 'A practical website palette typically includes: 1 primary color (brand identity), 1 secondary/accent color (calls to action), 1 neutral scale (gray tones for text and backgrounds), and 2-3 semantic colors (success/green, warning/yellow, error/red). This gives you 5-8 base colors, each with 5-10 lightness variations, which is enough for any interface.' },
      { question: 'How do I ensure my palette is accessible?', answer: 'Test every text/background combination against WCAG contrast ratios (4.5:1 for normal text, 3:1 for large text). Build your palette with a wide lightness range — you need very light backgrounds (95%+ lightness) and very dark text (10-20% lightness). Tools like this generator can help, but always verify with a contrast checker.' },
      { question: 'What is the 60-30-10 rule in color design?', answer: 'This interior design principle applies to UI: use your dominant color for 60% of the interface (backgrounds, large surfaces), your secondary color for 30% (cards, navigation, sections), and your accent color for 10% (buttons, links, highlights). This creates visual hierarchy and prevents any single color from overwhelming the design.' },
      { question: 'How do I create a dark mode version of my palette?', answer: 'Don\'t simply invert colors. Instead: swap your lightest and darkest neutrals, reduce the saturation of primary colors by 10-20% (vibrant colors look harsh on dark backgrounds), ensure your accent colors still meet contrast requirements, and test in low-light conditions. Many design systems define both a light and dark value for each color token.' },
      { question: 'Can I use these generated palettes commercially?', answer: 'Colors themselves cannot be copyrighted or trademarked (though specific color trademarks like Tiffany Blue exist for specific industries). Any palette generated by this tool is yours to use freely in personal and commercial projects.' },
    ],
    relatedArticle: {
      title: 'Color Palette Design: Principles for Building Effective UI Color Systems',
      content: 'A well-designed color palette is the difference between a professional interface and one that feels thrown together. Yet many developers treat color as an afterthought, picking values ad hoc and ending up with inconsistent tones that create visual noise. Building a systematic palette from the start saves hours of design debt later.\n\nThe foundation of any palette is understanding color relationships. Complementary colors (opposite on the color wheel) create maximum contrast and visual energy — think blue and orange or purple and yellow. Analogous colors (neighbors on the wheel) feel harmonious and calm. Triadic combinations (three evenly spaced colors) offer balanced variety. Each harmony type creates a distinct emotional response.\n\nFor web applications, the most practical approach is to define a small set of semantic color roles rather than a large flat palette. Your "primary" color carries brand identity, "secondary" provides visual variety, and "accent" draws attention to interactive elements. Layer in a neutral gray scale (warm or cool to match your brand temperature) and semantic states (success, warning, error, info). Each of these roles gets a scale of lightness variations — typically 50 through 950 in steps, following Tailwind\'s convention.\n\nThe technique for generating a consistent lightness scale from a single color is straightforward: convert your base color to HSL, fix the hue and saturation, then vary the lightness from near-white (97%) to near-black (10%) in regular steps. For a more perceptually uniform scale, use OKLCH instead of HSL, as it produces more visually consistent steps across different hues.\n\nOne often-overlooked aspect of palette design is contextual contrast. A color that works perfectly as button text on a white background may become unreadable on a colored card surface. Test your palette not just in isolation but in the specific component contexts where each color will appear. This is especially critical for data visualization, where you may need 5-8 distinguishable colors that all work on both light and dark backgrounds.',
    },
  },

  'css-gradient-generator': {
    howToUse: {
      title: 'How to Create CSS Gradients Online',
      steps: [
        { step: 'Choose gradient type', description: 'Select between linear gradient (color flows in a straight line) or radial gradient (color radiates from a center point). Linear gradients work well for backgrounds and overlays; radial gradients suit spotlights and circular elements.' },
        { step: 'Set colors and positions', description: 'Add color stops by clicking the gradient bar. Adjust each stop\'s color and position to control the transition. You can add as many stops as needed — two creates a simple fade, three or more creates complex multi-tone effects.' },
        { step: 'Adjust direction and copy CSS', description: 'For linear gradients, set the angle (0deg = bottom to top, 90deg = left to right). For radial gradients, choose the shape and position. Copy the generated CSS code to use directly in your stylesheet.' },
      ],
    },
    useCases: [
      'Creating eye-catching hero section backgrounds for landing pages',
      'Adding subtle depth to card components with gradient overlays',
      'Building gradient text effects for headings and display typography',
      'Designing progress bars and loading indicators with color transitions',
      'Creating glassmorphism effects with semi-transparent gradient overlays',
      'Building mesh-like gradient backgrounds using multiple layered gradients',
    ],
    faq: [
      { question: 'What is the difference between linear-gradient and radial-gradient?', answer: 'linear-gradient creates a transition along a straight line defined by an angle or direction. radial-gradient radiates outward from a center point in either a circle or ellipse. There is also conic-gradient, which sweeps color around a center point like a pie chart. Each serves different visual purposes.' },
      { question: 'Why do some gradients look banded or striped?', answer: 'Banding occurs when the color difference between adjacent pixels is too small for the display\'s color depth to render smoothly. This is most visible in subtle gradients (like dark gray to slightly lighter gray) on 8-bit displays. Adding a tiny amount of noise or using wider color stops can reduce banding. The CSS color-mix() function can also help.' },
      { question: 'Can I animate CSS gradients?', answer: 'CSS cannot animate gradient values directly with transitions. However, you can work around this by animating the background-position of an oversized gradient, using CSS custom properties (Houdini @property), or layering gradients with animated opacity. The @property approach is the cleanest solution in modern browsers.' },
      { question: 'How do I create a gradient border?', answer: 'Use border-image: linear-gradient(...) 1; for a simple approach, or use a pseudo-element background with padding to simulate a gradient border that supports border-radius. The background-clip approach — setting a gradient background with background-clip: padding-box and a transparent border — is another common technique.' },
      { question: 'What gradient angles work best for UI design?', answer: 'The most common angles are 180deg (top to bottom — natural lighting), 135deg (top-left to bottom-right — dynamic feel), and 90deg (left to right — horizontal flow). Avoid odd angles like 37deg unless intentional, as they can look accidental. Consistent gradient direction across a page creates visual coherence.' },
      { question: 'How do I add a gradient overlay to an image?', answer: 'Layer a gradient over a background image using multiple backgrounds: background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(image.jpg). The gradient sits on top, creating a darkened overlay that improves text readability. This technique is essential for hero sections with text over photographs.' },
    ],
    relatedArticle: {
      title: 'CSS Gradients: From Basic Fades to Advanced Visual Effects',
      content: 'CSS gradients are one of the most versatile styling tools available, capable of creating everything from subtle background textures to complex visual effects — all without image files. Understanding their full capabilities lets you replace many static assets with resolution-independent, instantly customizable CSS.\n\nThe basic syntax is deceptively simple: background: linear-gradient(direction, color-stop, color-stop). But the real power emerges when you start combining techniques. Multiple color stops with hard transitions (where two stops share the same position) create stripes and patterns. Layering multiple gradients with transparency produces mesh-like effects. Repeating gradients (repeating-linear-gradient) generate patterns that tile infinitely.\n\nColor stop positions give you precise control over where transitions happen. A gradient with stops at "red 0%, red 50%, blue 50%, blue 100%" creates a hard split — no transition at all. Adjusting these percentages gives you asymmetric fades, where the transition happens faster in one direction. This is particularly useful for creating depth effects where you want a rapid falloff from a highlight.\n\nPerformance-wise, CSS gradients are rendered by the browser\'s compositor and are very efficient. They don\'t trigger layout recalculations and can be GPU-accelerated. A complex gradient is almost always faster than loading an equivalent image. The exception is extremely complex stacked gradients (10+), where rendering cost starts to matter on low-powered devices.\n\nFor modern design trends, gradients are essential. Glassmorphism relies on semi-transparent gradient overlays with backdrop-filter blur. Mesh gradients — achieved by layering 3-4 radial gradients at different positions — create the organic, fluid backgrounds seen in modern iOS and web design. Aurora effects combine animated gradient positions with color-shifting to create dynamic, attention-grabbing hero sections.\n\nWhen using gradients for text (background-clip: text), test carefully across browsers. The technique of setting a gradient background and clipping it to text produces beautiful display headings but can behave differently across rendering engines. Always provide a solid color fallback for accessibility.',
    },
  },

  'word-counter': {
    howToUse: {
      title: 'How to Count Words and Characters Online',
      steps: [
        { step: 'Paste or type your text', description: 'Enter the text you want to analyze. The tool handles any length of content — from a tweet to a full article. Paste directly from Google Docs, Word, or any text source.' },
        { step: 'View instant statistics', description: 'See real-time counts for words, characters (with and without spaces), sentences, and paragraphs. Reading time and speaking time estimates help you gauge content length for different contexts.' },
        { step: 'Optimize your content', description: 'Use the metrics to hit specific targets: 160 characters for meta descriptions, 280 for tweets, 300+ words for SEO blog posts, or 2-3 minutes of reading time for newsletters.' },
      ],
    },
    useCases: [
      'Checking that meta descriptions stay within the 155-160 character limit for SEO',
      'Ensuring blog posts meet minimum word count requirements for content quality',
      'Estimating presentation speaking time based on word count (roughly 130 words per minute)',
      'Verifying character limits for social media posts across platforms',
      'Tracking essay or article length against assignment or publication requirements',
      'Analyzing content density and readability by comparing sentence and paragraph counts',
    ],
    faq: [
      { question: 'How is reading time calculated?', answer: 'Reading time is based on the average adult reading speed of approximately 200-250 words per minute for online content. This tool uses 200 wpm as a baseline, which accounts for the fact that screen reading tends to be slower than printed text. Technical content may be slower (150 wpm), while light content may be faster (300 wpm).' },
      { question: 'What counts as a word?', answer: 'A word is defined as a sequence of characters separated by whitespace. Hyphenated terms like "well-known" typically count as one word. Numbers and abbreviations each count as one word. This matches how most word processors and publishing platforms count, though edge cases vary slightly between tools.' },
      { question: 'What is the ideal blog post length for SEO?', answer: 'Research consistently shows that longer, comprehensive content tends to rank better. The sweet spot is 1,500-2,500 words for competitive topics, providing enough depth to cover a subject thoroughly. However, quality matters more than length — a focused 800-word article that fully answers a search query outperforms a padded 2,000-word article.' },
      { question: 'How many words is a 5-minute speech?', answer: 'At a natural speaking pace of 130-150 words per minute, a 5-minute speech contains roughly 650-750 words. For presentations, aim for fewer words since you will be pausing, explaining visuals, and engaging with the audience. A 5-minute presentation with slides typically needs only 400-500 words of spoken content.' },
      { question: 'Do character counts include spaces?', answer: 'This tool shows both counts. "Characters" includes spaces and punctuation (matching Twitter/X and most platform limits). "Characters without spaces" counts only visible characters and is used by some publishing systems and translation services that charge per character.' },
      { question: 'What are the character limits for major platforms?', answer: 'Twitter/X: 280 characters. Instagram captions: 2,200 characters. LinkedIn posts: 3,000 characters. Meta descriptions: 155-160 characters. Google Ads headlines: 30 characters. Title tags: 50-60 characters. Knowing these limits helps you craft content that displays correctly across platforms.' },
    ],
    relatedArticle: {
      title: 'Content Length and Readability: What the Data Says About Writing for the Web',
      content: 'Writing for the web is fundamentally different from writing for print, and understanding how readers interact with online content is crucial for anyone creating text that needs to be read, shared, or ranked.\n\nStudies from the Nielsen Norman Group show that web users read only 20-28% of the words on a page. Instead of reading linearly, they scan in an F-pattern — reading the first few lines fully, then scanning the left side for interesting headings or keywords. This scanning behavior means your content structure matters as much as your word count.\n\nFor SEO, content length serves as a proxy for comprehensiveness. Google\'s helpful content guidelines emphasize that pages should provide complete answers to searchers\' questions. A 300-word page about a complex topic like "how to set up a Docker container" likely leaves too many questions unanswered, while a 1,500-word guide that covers installation, configuration, common issues, and best practices satisfies the searcher\'s intent fully.\n\nHowever, length without substance hurts more than it helps. Google\'s March 2024 core update specifically targeted "low-quality content at scale" — pages padded with filler to hit word count targets. The goal is information density: every paragraph should teach something new, answer a question, or provide actionable advice.\n\nFor different content formats, optimal lengths vary significantly. Email newsletters perform best at 200-500 words (readers are scanning their inbox). Social media posts should maximize impact in the first 100 characters (the preview length). Landing pages need just enough text to communicate the value proposition and address objections — typically 500-1,000 words for a simple product, more for high-consideration purchases.\n\nReadability metrics like the Flesch-Kincaid grade level can help calibrate your writing. Aim for grade 7-8 for general audiences (roughly what you would find in a newspaper). Technical documentation can go higher, but even expert readers prefer clear, concise prose over unnecessarily complex sentence structures.',
    },
  },

  'case-converter': {
    howToUse: {
      title: 'How to Convert Text Case Online',
      steps: [
        { step: 'Paste your text', description: 'Enter the text you want to convert. It can be anything — variable names, headings, titles, paragraphs, or code identifiers. The tool preserves your original text and shows conversions separately.' },
        { step: 'Choose a case format', description: 'Select the target case: UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, or CONSTANT_CASE. Each format is commonly used in specific programming and writing contexts.' },
        { step: 'Copy the converted result', description: 'Click to copy the converted text. The tool handles edge cases like acronyms, numbers, and special characters intelligently, so "getUserAPIResponse" correctly converts to "get_user_api_response" in snake_case.' },
      ],
    },
    useCases: [
      'Converting variable names between camelCase (JavaScript) and snake_case (Python) conventions',
      'Transforming database column names to match ORM naming conventions',
      'Converting headings to Title Case for articles and documentation',
      'Generating kebab-case slugs from page titles for URL-friendly paths',
      'Normalizing user input to consistent casing before database storage',
      'Converting CONSTANT_CASE environment variable names to camelCase config keys',
    ],
    faq: [
      { question: 'What is the difference between camelCase and PascalCase?', answer: 'camelCase starts with a lowercase letter and capitalizes subsequent words: getUserName. PascalCase capitalizes every word including the first: GetUserName. In JavaScript/TypeScript, the convention is camelCase for variables and functions, PascalCase for classes and React components. C# uses PascalCase for public methods.' },
      { question: 'When should I use snake_case vs camelCase?', answer: 'Language conventions: Python, Ruby, and Rust use snake_case. JavaScript, TypeScript, and Java use camelCase. Database columns typically use snake_case. JSON APIs vary — but within a project, consistency matters more than the specific choice. Follow your language\'s community standard.' },
      { question: 'What is kebab-case used for?', answer: 'kebab-case (words separated by hyphens) is the standard for CSS class names, URL slugs, HTML attributes, and CLI command names. It\'s readable and URL-safe. Example: "user-profile-settings" as a URL path or "primary-button" as a CSS class.' },
      { question: 'How does Title Case handle articles and prepositions?', answer: 'True Title Case (following AP or Chicago style) lowercases small words like "a", "an", "the", "in", "of", "and" unless they are the first or last word. "The Lord of the Rings" is correct Title Case. Simple Title Case capitalizes every word. This tool uses the more common approach of capitalizing every word.' },
      { question: 'What is CONSTANT_CASE and where is it used?', answer: 'CONSTANT_CASE (also called SCREAMING_SNAKE_CASE) uses all uppercase letters with underscores between words: MAX_RETRY_COUNT. It\'s the convention for constants in most languages, environment variables, and configuration values that should not change at runtime.' },
      { question: 'How do I handle acronyms in case conversion?', answer: 'Acronyms are a common source of inconsistency. Some teams write "userId" and "apiUrl" (treating acronyms as regular words), while others write "userID" and "APIURL" (preserving the acronym). The first approach is more readable and converts better between formats. Google\'s style guide recommends treating acronyms as words: "HttpUrl" not "HTTPUrl".' },
    ],
    relatedArticle: {
      title: 'Naming Conventions in Programming: Why Case Formatting Matters',
      content: 'Naming conventions might seem like a minor concern, but they have an outsized impact on code readability, team productivity, and the long-term maintainability of a codebase. A consistent naming strategy reduces cognitive load and eliminates an entire class of trivial but time-consuming debates during code review.\n\nEvery programming language community has settled on preferred conventions through decades of practice. Python\'s PEP 8 prescribes snake_case for functions and variables, PascalCase for classes, and UPPER_SNAKE_CASE for constants. JavaScript uses camelCase for almost everything, with PascalCase reserved for classes and constructors (and React components, by extension). Rust follows Python\'s conventions. Go uses PascalCase for exported identifiers and camelCase for private ones, making visibility part of the naming itself.\n\nThese conventions aren\'t arbitrary — they encode information. When you see a PascalCase identifier in JavaScript, you know it\'s either a class or a React component. When you see UPPER_SNAKE_CASE, you know it\'s a constant. snake_case in a Python codebase signals a function or variable, while PascalCase signals a class. This implicit type information reduces the need for explicit documentation.\n\nCross-language boundaries create interesting challenges. A REST API might use snake_case in its JSON responses (following backend conventions) while the JavaScript frontend expects camelCase. ORMs like Prisma handle this with automatic case conversion. When designing APIs, document your convention explicitly and apply it consistently — don\'t mix snake_case and camelCase in the same response body.\n\nAutomatic case conversion tools are valuable during refactoring, when adapting code between languages, when generating code from schemas, and when building serialization layers. The key is ensuring that edge cases (acronyms, numbers, consecutive uppercase letters) are handled consistently. A robust converter should handle "XMLParser" to "xml_parser" and back without losing meaning.',
    },
  },

  'lorem-ipsum-generator': {
    howToUse: {
      title: 'How to Generate Lorem Ipsum Placeholder Text',
      steps: [
        { step: 'Choose the output format', description: 'Select whether you need paragraphs (for article layouts), sentences (for shorter content blocks), or individual words (for labels and UI elements). Each format serves different prototyping needs.' },
        { step: 'Set the amount', description: 'Specify how many paragraphs, sentences, or words you need. The generated text will have natural variation in sentence length and structure to mimic real content flow.' },
        { step: 'Copy to your project', description: 'Click copy and paste the generated text into your mockup, design tool, or HTML template. The text starts with the classic "Lorem ipsum dolor sit amet" opening or can begin with random text.' },
      ],
    },
    useCases: [
      'Filling page layouts with realistic text to test typography and line spacing',
      'Creating content-filled mockups for client presentations before final copy is ready',
      'Testing responsive layouts to see how text flows across different screen sizes',
      'Populating database seeds with sample text data for development environments',
      'Prototyping email templates with placeholder content that matches expected length',
      'Filling CMS templates to verify that content modules handle various text lengths correctly',
    ],
    faq: [
      { question: 'What is Lorem Ipsum and where does it come from?', answer: 'Lorem Ipsum originates from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (On the Ends of Good and Evil) by the Roman philosopher Cicero, written in 45 BC. The standard Lorem Ipsum text has been scrambled and modified from the original Latin, making it mostly nonsensical while retaining a natural letter distribution that mimics readable text.' },
      { question: 'Why use placeholder text instead of real content?', answer: 'Placeholder text prevents stakeholders from reading and commenting on content during layout reviews, keeping the focus on design and structure. It also prevents the common problem of designing layouts around specific content lengths, which breaks when real content arrives. Using placeholder text forces designs to be flexible.' },
      { question: 'Are there alternatives to Lorem Ipsum?', answer: 'Yes. Some teams prefer language-specific alternatives or humorous options like Hipster Ipsum, Bacon Ipsum, or Cupcake Ipsum. For accessibility testing, using realistic content in the target language is better because it tests actual character sets, text direction (RTL languages), and word lengths that affect layout.' },
      { question: 'How much placeholder text should I use?', answer: 'Match the expected real content length. For a blog listing, use 2-3 sentences per card. For an article page, use 4-6 paragraphs. For a hero section, use 1-2 sentences. Using significantly more or less text than the final content will give you misleading layout results.' },
      { question: 'Does placeholder text affect SEO?', answer: 'Lorem Ipsum text left in production pages will not directly penalize your SEO, but it signals to Google that the page has low-quality content. Search engines may flag pages with large blocks of Latin placeholder text as thin content. Always replace placeholder text before deploying to production.' },
      { question: 'Can I use Lorem Ipsum in my commercial project?', answer: 'Lorem Ipsum is in the public domain and can be freely used in any context. However, the question is usually moot — placeholder text should never appear in the final product. It exists only during the design and development phase.' },
    ],
    relatedArticle: {
      title: 'Placeholder Content in Design Workflows: Best Practices and Pitfalls',
      content: 'Placeholder text is one of those tools that every designer and developer uses, yet its role in the design process deserves more deliberate thought than it usually receives. Used well, it enables faster prototyping and better design decisions. Used carelessly, it masks content problems that surface too late to fix cheaply.\n\nThe core purpose of placeholder text is to separate design decisions from content decisions. When a client sees a beautiful layout filled with real content, they inevitably start editing the words instead of evaluating the design. Lorem Ipsum\'s pseudo-Latin text avoids this distraction while providing realistic text properties — word length distribution, paragraph rhythm, and character frequency that approximate natural language.\n\nHowever, blind reliance on Lorem Ipsum has real costs. The most common problem is designing for an idealized content length. A card component that looks perfect with two lines of Lorem Ipsum might break when the real product name is "Professional Enterprise Resource Planning Solution with Advanced Analytics." Content-first design — where you gather representative real content before designing — produces more robust layouts.\n\nFor developers, placeholder text serves a different purpose: populating templates and database seeds during development. Here, the key consideration is generating text that exercises the full range of expected inputs. Use short and long text samples, include edge cases like single-word entries and multi-paragraph descriptions, and test with different character sets if your application supports internationalization.\n\nA modern best practice is to use structured placeholder content that matches your content model. Instead of generic Lorem Ipsum, create sample data that reflects your actual schema — realistic user names, plausible product descriptions, and properly formatted dates and prices. This makes development builds more useful for testing and gives a more accurate preview of the final product.\n\nThe placeholder phase should have a clear expiration date in your project timeline. Build content population into your definition of done, and consider using CMS or content management workflows that flag pages still containing placeholder text.',
    },
  },

  'image-converter': {
    howToUse: {
      title: 'How to Convert Image Formats Online',
      steps: [
        { step: 'Upload your image', description: 'Drag and drop or click to upload an image in any common format: PNG, JPG/JPEG, WebP, GIF, BMP, or TIFF. The image is processed entirely in your browser — nothing is uploaded to a server.' },
        { step: 'Choose the output format', description: 'Select your target format. Use WebP for web performance (25-35% smaller than JPEG), PNG for transparency, JPEG for photographs, or other formats based on your specific needs.' },
        { step: 'Download the converted file', description: 'Adjust quality settings if available, then download the converted image. For batch needs, you can convert multiple images in sequence without leaving the page.' },
      ],
    },
    useCases: [
      'Converting PNG screenshots to WebP for faster website loading',
      'Saving JPEG photos as PNG when you need lossless quality for editing',
      'Converting images to WebP format to meet Google PageSpeed requirements',
      'Batch converting legacy BMP or TIFF files to modern web formats',
      'Preparing images in multiple formats for responsive picture elements',
      'Converting screenshots with transparency from PNG to optimized WebP with alpha channel',
    ],
    faq: [
      { question: 'Which image format should I use for the web?', answer: 'WebP is the best general-purpose web format — it supports lossy and lossless compression, transparency, and animation, all at smaller file sizes than JPEG or PNG. Use JPEG for photographs where WebP is not an option, PNG for images requiring transparency on older browsers, and SVG for icons and logos. AVIF offers even better compression but has less browser support.' },
      { question: 'What is the difference between lossy and lossless compression?', answer: 'Lossy compression (JPEG, lossy WebP) discards some image data to achieve smaller files. The quality loss is usually imperceptible at high quality settings. Lossless compression (PNG, lossless WebP) preserves every pixel exactly but produces larger files. Use lossy for photographs and lossless for screenshots, text images, or pixel art.' },
      { question: 'Does converting JPEG to PNG improve quality?', answer: 'No. Converting a lossy format to a lossless format cannot recover discarded data. The JPEG artifacts are permanently embedded in the pixel data. The PNG will be larger but look identical to the JPEG. Always work from the highest quality source when possible.' },
      { question: 'How much smaller is WebP compared to JPEG?', answer: 'Google\'s studies show WebP images are 25-34% smaller than comparable quality JPEG images, and WebP lossless images are 26% smaller than PNG. At equivalent visual quality, switching from JPEG to WebP can noticeably improve page load times, especially on image-heavy sites.' },
      { question: 'Is my image data safe during conversion?', answer: 'All conversion happens in your browser using the Canvas API and native image decoders. Your images are never uploaded to any server, stored, or transmitted. You can verify this by monitoring the Network tab in your browser\'s developer tools during conversion — you will see no outbound requests.' },
      { question: 'What about AVIF format?', answer: 'AVIF (AV1 Image Format) offers 20-50% better compression than WebP and supports HDR, wide color gamut, and 10-bit color depth. Browser support has grown quickly — Chrome, Firefox, and Safari all support it. For maximum compatibility, use the HTML picture element with AVIF as the first source and WebP or JPEG as fallbacks.' },
    ],
    relatedArticle: {
      title: 'Image Formats for the Web: Choosing the Right Format for Performance and Quality',
      content: 'Images typically account for 50-70% of a web page\'s total weight, making format selection one of the highest-impact performance decisions a developer can make. The modern web offers more format options than ever, and understanding the trade-offs is essential for delivering fast, visually rich experiences.\n\nJPEG, introduced in 1992, remains the workhorse for photographs. Its lossy compression algorithm is specifically tuned for photographic content, achieving excellent quality-to-size ratios for natural images with continuous tones and gradients. At quality level 80-85, JPEG artifacts are virtually invisible to the human eye. However, JPEG struggles with sharp edges, text, and areas of solid color, where artifacts become noticeable.\n\nPNG excels where JPEG fails: screenshots, diagrams, logos, and any image requiring transparency. Its lossless compression preserves every pixel perfectly, making it ideal for source assets and images with text. The trade-off is file size — a PNG photograph can be 5-10 times larger than the equivalent JPEG. PNG-8 (256 colors) offers a smaller alternative for simple graphics.\n\nWebP, developed by Google and now supported by all modern browsers, combines the best of both worlds. Its lossy mode outperforms JPEG by 25-34% at equivalent quality. Its lossless mode beats PNG by 26%. It supports transparency (unlike JPEG) and animation (unlike JPEG and static PNG). For most web use cases, WebP is the optimal format.\n\nAVIF represents the cutting edge. Based on the AV1 video codec, it achieves dramatically better compression than WebP, especially at low bitrates where quality differences become visible. A 50KB AVIF can look equivalent to a 100KB WebP or 150KB JPEG. The encoding is slower, but for static assets that are encoded once and served millions of times, the encoding cost is negligible.\n\nThe modern best practice is to use the HTML picture element to serve multiple formats with graceful fallback: AVIF first, WebP second, JPEG or PNG as the final fallback. Combined with responsive images (srcset with width descriptors), this approach ensures every user gets the best format their browser supports at the most appropriate resolution for their device.',
    },
  },

  'csv-json-converter': {
    howToUse: {
      title: 'How to Convert Between CSV and JSON Online',
      steps: [
        { step: 'Choose conversion direction', description: 'Select CSV to JSON or JSON to CSV. The tool auto-detects common delimiters (comma, semicolon, tab) and handles quoted fields correctly.' },
        { step: 'Paste or upload your data', description: 'Enter your CSV text (with headers in the first row) or a JSON array of objects. The tool handles large datasets with thousands of rows efficiently in your browser.' },
        { step: 'Convert and download', description: 'Click convert to see the output instantly. Copy to clipboard or download as a file. The tool preserves data types — numbers stay as numbers, booleans as booleans — rather than converting everything to strings.' },
      ],
    },
    useCases: [
      'Converting Excel/Google Sheets CSV exports to JSON for API consumption',
      'Transforming JSON API responses to CSV for analysis in spreadsheet software',
      'Preparing JSON datasets for import into NoSQL databases like MongoDB',
      'Converting CSV log files to JSON for structured log analysis tools',
      'Migrating data between SQL databases (CSV exports) and document stores (JSON)',
      'Creating JSON fixtures from CSV test data for application testing',
    ],
    faq: [
      { question: 'How does the converter handle CSV headers?', answer: 'The first row of the CSV is treated as column headers, which become the property names in the resulting JSON objects. If your CSV has no header row, the tool generates default column names (column1, column2, etc.). Header names are trimmed of whitespace and used exactly as-is, preserving casing and special characters.' },
      { question: 'Can this tool handle nested JSON?', answer: 'CSV is a flat format, so deeply nested JSON needs to be flattened for CSV conversion. The tool handles one level of nesting by creating dot-notation column names (e.g., address.city). For deeply nested structures, you may need to preprocess the JSON to select the specific fields you want in the CSV output.' },
      { question: 'What happens with special characters in CSV?', answer: 'Fields containing commas, double quotes, or newlines are automatically wrapped in double quotes per the RFC 4180 standard. Double quotes within fields are escaped by doubling them (""). The tool handles these edge cases correctly in both directions.' },
      { question: 'What is the maximum file size this tool can handle?', answer: 'Since processing happens in your browser, the limit depends on your device\'s memory. Most modern devices handle files up to 10-20MB comfortably. For larger datasets, command-line tools like jq (for JSON) or csvkit (for CSV) are more appropriate.' },
      { question: 'How are data types preserved during conversion?', answer: 'When converting CSV to JSON, the tool attempts to detect data types: numbers are parsed as numeric values, "true"/"false" as booleans, and empty fields as null. When converting JSON to CSV, all values are serialized as strings (since CSV has no type system). This type inference can be toggled off if you prefer all string values.' },
      { question: 'What delimiter formats are supported?', answer: 'The tool auto-detects comma, semicolon, and tab delimiters. European CSV files often use semicolons because commas are used as decimal separators in many European locales. Tab-separated values (TSV) are common in scientific data and exports from certain database tools.' },
    ],
    relatedArticle: {
      title: 'CSV and JSON: Understanding the Two Most Common Data Exchange Formats',
      content: 'CSV and JSON are the two most universal data exchange formats in software development, and virtually every developer encounters both regularly. Understanding their strengths, limitations, and the nuances of converting between them is practical knowledge that pays off in data processing, API design, and system integration work.\n\nCSV (Comma-Separated Values) is the oldest and simplest structured data format. It represents tabular data as rows of comma-delimited values, with an optional header row naming the columns. Its simplicity is its strength — every spreadsheet application, database tool, and programming language can read and write CSV. It is human-readable, compact, and streams well (you can process one row at a time without loading the entire file).\n\nHowever, CSV has significant limitations. It has no standard type system — everything is a string unless the consumer infers types. There is no official standard (RFC 4180 is informational, not normative), so implementations vary in how they handle quoting, escaping, newlines within fields, and encoding. CSV cannot represent hierarchical or nested data without flattening it into columns, which loses structure.\n\nJSON (JavaScript Object Notation) addresses these gaps. It has a formal specification (RFC 8259), supports nested objects and arrays, and distinguishes between strings, numbers, booleans, and null. JSON has become the default format for web APIs because it maps directly to the data structures used in JavaScript, Python, Ruby, and most other languages.\n\nThe trade-off is that JSON is more verbose than CSV for tabular data. A CSV file with 1000 rows repeats column names zero times (just the header), while an equivalent JSON array of objects repeats every property name in every object. For large tabular datasets, this overhead is substantial. JSON Lines format (one JSON object per line) partially addresses this by making JSON streamable.\n\nWhen converting between formats, the critical decisions are: how to handle nested JSON (flatten with dot notation, or select specific fields), how to infer types from CSV strings (is "42" a number or a string?), and how to handle missing values (empty string, null, or omit the field). Making these choices explicitly, rather than relying on defaults, prevents data quality issues downstream.',
    },
  },

  'unix-timestamp-converter': {
    howToUse: {
      title: 'How to Convert Unix Timestamps Online',
      steps: [
        { step: 'Enter a timestamp or date', description: 'Paste a Unix timestamp (seconds or milliseconds since January 1, 1970 UTC) to convert it to a human-readable date. Or enter a date and time to get the corresponding Unix timestamp.' },
        { step: 'See the conversion', description: 'The tool displays the result in multiple formats: ISO 8601, your local timezone, UTC, and relative time (e.g., "3 hours ago"). Both seconds and milliseconds epoch values are shown.' },
        { step: 'Use the current timestamp', description: 'The live clock shows the current Unix timestamp in real-time, useful for debugging time-sensitive operations or setting expiration values in tokens and caches.' },
      ],
    },
    useCases: [
      'Debugging API responses where dates are returned as Unix timestamps',
      'Converting log file timestamps to human-readable dates for incident analysis',
      'Setting expiration times for JWT tokens, cache entries, and temporary URLs',
      'Comparing event timestamps across systems that use different date formats',
      'Converting between JavaScript millisecond timestamps and Unix second timestamps',
      'Calculating time durations between two Unix timestamps for analytics',
    ],
    faq: [
      { question: 'What is Unix time (epoch time)?', answer: 'Unix time counts the number of seconds since January 1, 1970, 00:00:00 UTC — a moment known as the Unix epoch. This provides a universal, timezone-independent way to represent a point in time as a single number. Most programming languages, databases, and operating systems use Unix timestamps internally.' },
      { question: 'What is the difference between seconds and milliseconds timestamps?', answer: 'Unix timestamps in seconds are 10 digits (e.g., 1700000000). JavaScript and Java use milliseconds (13 digits, e.g., 1700000000000). If a timestamp looks unexpectedly large, divide by 1000 to convert from milliseconds to seconds. Some systems also use microseconds (16 digits) or nanoseconds (19 digits).' },
      { question: 'What is the Year 2038 problem?', answer: 'Systems storing Unix timestamps as a 32-bit signed integer will overflow on January 19, 2038, when the value exceeds 2,147,483,647. This is analogous to Y2K. Most modern systems use 64-bit integers, which won\'t overflow for another 292 billion years. However, legacy embedded systems and older databases may still be affected.' },
      { question: 'How do time zones affect Unix timestamps?', answer: 'They don\'t — that is the point. A Unix timestamp represents a single moment in time, independent of time zones. The timestamp 1700000000 is the same instant everywhere on Earth. Time zones only matter when displaying the timestamp to humans. Always store and transmit times as UTC timestamps and convert to local time only for display.' },
      { question: 'Why do some timestamps start with a negative number?', answer: 'Negative Unix timestamps represent dates before January 1, 1970. For example, -86400 represents December 31, 1969. Most modern systems handle negative timestamps correctly, but some older databases and programming language date libraries may not support dates before the epoch.' },
      { question: 'How do I handle leap seconds in timestamps?', answer: 'Unix time ignores leap seconds — it assumes every day has exactly 86,400 seconds. When a leap second occurs, Unix time effectively "repeats" a second. For most applications, this does not matter. For high-precision scientific or financial systems, use TAI (International Atomic Time) or GPS time instead.' },
      { question: 'What is ISO 8601 and how does it relate to Unix time?', answer: 'ISO 8601 is a human-readable date format standard: "2024-01-15T14:30:00Z" (the Z means UTC). It is the recommended format for JSON APIs and data interchange. Unix timestamps are compact and efficient for storage and computation, while ISO 8601 is better for human readability and debugging. Most date libraries convert freely between both.' },
    ],
    relatedArticle: {
      title: 'Time Representation in Software: Unix Timestamps, Time Zones, and Common Pitfalls',
      content: 'Time handling is one of the most deceptively complex areas in software development. What seems like a simple concept — "what time is it?" — hides a maze of time zones, daylight saving transitions, leap seconds, and calendar quirks that cause bugs in systems of every scale.\n\nThe Unix timestamp solves the hardest part of this problem by providing a single, unambiguous number that represents a specific moment in time. By counting seconds from a fixed reference point (the epoch), it eliminates time zone confusion at the storage and computation layers. Two servers in different time zones will produce the same Unix timestamp for the same event, which is exactly what you want for logging, event ordering, and distributed systems.\n\nThe trouble starts at the boundaries — where timestamps meet human expectations. Displaying "1700000000" as a date requires knowing the user\'s time zone, which can shift due to daylight saving time, political decisions (countries change their time zone rules more often than you might expect), and historical changes. Libraries like the IANA time zone database track these rules, and production systems should always use the latest version.\n\nA common bug pattern is storing local time instead of UTC. When a user in New York creates an event at "3:00 PM" and you store that as 15:00 without a time zone, a user in London sees "3:00 PM" in their local time instead of "8:00 PM." The fix is simple: always store times as UTC (either Unix timestamps or ISO 8601 with the Z suffix) and convert to local time only at the display layer.\n\nJavaScript\'s Date object works in milliseconds, while most backend systems and databases use seconds. This mismatch causes a specific class of bugs where timestamps are off by a factor of 1000, producing dates in the year 55,000 or in 1970. Always check whether an API expects seconds or milliseconds, and document your convention explicitly in API schemas.\n\nFor scheduling future events (like a meeting at "3 PM next Tuesday"), store the local time and time zone separately, not a Unix timestamp. Daylight saving changes between now and the event could shift the intended time. Recalculate the Unix timestamp close to the event time using the stored local time and time zone rules.',
    },
  },
}
