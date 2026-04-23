import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { env } from "./lib/env";

export const aiRouter = createRouter({
  chat: publicQuery
    .input(
      z.object({
        message: z.string().min(1),
        history: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ).optional().default([]),
      })
    )
    .mutation(async ({ input }) => {
      const messages = [
        {
          role: "system",
          content: `You are Spectr AI, the intelligent trading assistant for Spectr Trading platform. You are knowledgeable about cryptocurrency markets, trading strategies, technical analysis, and market intelligence. You communicate in a bold, direct style — zero fluff. Keep responses concise and actionable. Use trading terminology naturally. If asked about Spectr features, you know about: AI Predictor (LLM-powered analysis with confidence scores), Whale Tracking (monitoring whale wallets across 8 chains), Cross-Exchange Mastery (Binance/Bybit/MEXC arbitrage), Ferocious Scout (real-time signal feed from elite Telegram channels and on-chain data), and Protocol Security (encrypted API keys, zero-knowledge architecture). Pricing: Pro at $29/month and Founder Lifetime at $499.`,
        },
        ...input.history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: input.message },
      ];

      try {
        const response = await fetch(
          `${env.kimiOpenUrl}/api/ai-gateway/v1/chat/completions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.appSecret}`,
            },
            body: JSON.stringify({
              model: "kimi-creative",
              messages,
              stream: false,
              temperature: 0.7,
              max_tokens: 800,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`AI Gateway error: ${errorText}`);
        }

        const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        const content = data.choices?.[0]?.message?.content || "I'm having trouble connecting. Please try again.";
        return { content };
      } catch {
        return {
          content: "I'm having trouble connecting to the AI service. Please try again in a moment.",
        };
      }
    }),
});
