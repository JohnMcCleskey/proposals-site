import "server-only";

/**
 * Sends an email from john@stonewave.life via Microsoft Graph using
 * client-credentials (app-only) auth. Credentials come from Vercel env vars.
 * Returns true on success, false on any failure. Never logs secrets or bodies.
 */
export async function sendGraphEmail(
  to: string,
  subject: string,
  body: string,
  options?: { html?: boolean },
): Promise<boolean> {
  const clientId = process.env.AZURE_CLIENT_ID;
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!clientId || !tenantId || !clientSecret) {
    console.error("Graph email: Azure credentials not configured");
    return false;
  }

  try {
    // 1. Get an app-only token
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
          scope: "https://graph.microsoft.com/.default",
        }),
      },
    );

    if (!tokenRes.ok) {
      console.error("Graph email: token request failed", tokenRes.status);
      return false;
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      console.error("Graph email: no access token");
      return false;
    }

    // 2. Send the message
    const sendRes = await fetch(
      "https://graph.microsoft.com/v1.0/users/john@stonewave.life/sendMail",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: { contentType: options?.html ? "HTML" : "Text", content: body },
            toRecipients: [{ emailAddress: { address: to } }],
          },
          saveToSentItems: true,
        }),
      },
    );

    if (!sendRes.ok) {
      console.error("Graph email: send failed", sendRes.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Graph email: unexpected error", error);
    return false;
  }
}
