import test from "node:test";
import assert from "node:assert/strict";
import handler, { buildEmail, validateContact } from "./contact.js";

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("accepts and normalizes a valid portfolio message", () => {
  assert.deepEqual(
    validateContact({
      name: "  Alex Morgan ",
      email: " ALEX@example.com ",
      message: "  I would like to discuss a role.  ",
    }),
    {
      name: "Alex Morgan",
      email: "alex@example.com",
      message: "I would like to discuss a role.",
    },
  );
});

test("rejects spam and invalid form values", () => {
  assert.match(validateContact({ website: "spam.example" }).error, /unable/i);
  assert.match(
    validateContact({ name: "A", email: "invalid", message: "short" }).error,
    /name/i,
  );
  assert.match(
    validateContact({
      name: "Alex",
      email: "invalid",
      message: "A valid length message",
    }).error,
    /email/i,
  );
  assert.match(
    validateContact({ name: "Alex", email: "a@example.com", message: "short" })
      .error,
    /10 characters/i,
  );
});

test("escapes visitor content and sets reply-to", () => {
  const email = buildEmail({
    name: "<Alex>",
    email: "alex@example.com",
    message: "Hello <script>alert('x')</script>",
  });
  assert.equal(email.to[0], "saimanjunadhareddy1309@gmail.com");
  assert.equal(email.reply_to, "alex@example.com");
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;/);
});

test("contact endpoint returns success after the provider accepts the email", async (context) => {
  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "re_test_key";
  const originalFetch = global.fetch;
  global.fetch = async (_url, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.to[0], "saimanjunadhareddy1309@gmail.com");
    assert.equal(payload.reply_to, "alex@example.com");
    return { ok: true, json: async () => ({ id: "email_test_123" }) };
  };
  context.after(() => {
    global.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  });

  const response = mockResponse();
  await handler(
    {
      method: "POST",
      body: {
        name: "Alex",
        email: "alex@example.com",
        message: "I would like to discuss a role.",
      },
    },
    response,
  );

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { ok: true, id: "email_test_123" });
});

test("contact endpoint reports missing delivery configuration", async (context) => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  context.after(() => {
    if (previousKey !== undefined) process.env.RESEND_API_KEY = previousKey;
  });
  const response = mockResponse();
  await handler({ method: "POST", body: {} }, response);
  assert.equal(response.statusCode, 503);
  assert.match(response.body.error, /temporarily unavailable/i);
});
