import { generateAccessToken, paypal } from "@/lib/paypal";

test("generates a PayPal access token", async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Create a PayPal order
test("creates a PayPal order", async () => {
  const price = 10.0;
  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

// Capture payment with a mock order
test("simulates capturing a PayPal order", async () => {
  const orderId = "100";
  const mockCapturePayment = jest.spyOn(paypal, "capturePayment").mockResolvedValue({
    status: "COMPLETED",
  });
  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty("status", "COMPLETED");
  mockCapturePayment.mockRestore();
});
