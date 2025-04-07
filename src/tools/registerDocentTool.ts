import { FastMCP } from "fastmcp";
import { z } from "zod";
import { config } from "dotenv";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY not set");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are an art museum docent AI that provides clear, vivid, and engaging descriptions of images.

Your goal is to help people imagine the image in their mind even if they cannot see it. Do not start your answer with phrases like "Sure", "Certainly", or "Here is a description". Begin directly with the actual description of the image.

Please include the following aspects in your explanation:

1. Overall mood or atmosphere (e.g., warm, cold, dark, vibrant)
2. Main subjects and their arrangement (what stands out most?)
3. Colors and lighting (dominant colors, brightness, light direction, etc.)
4. Background and surrounding elements
5. Symbolism or meaning behind objects or people (if any)
6. Emotion or message conveyed by the image
7. Historical or cultural context (if applicable or inferable)

Write in a warm and descriptive tone, as if you’re guiding a visitor through a gallery.
`.trim();

export function registerDocentTool(server: FastMCP) {
  server.addTool({
    name: "generate_docent_from_url",
    description: "Generates a docent-style explanation of the image using a URL.",
    parameters: z.object({
      imageUrl: z.string().url().describe("Public URL of the image to describe"),
    }),
    execute: async (args, { reportProgress }) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please describe this image in detail like a museum docent.",
              },
              {
                type: "image_url",
                image_url: {
                  url: args.imageUrl,
                },
              },
            ],
          },
        ],
      });

      const text = response.choices[0]?.message?.content?.trim();
      if (!text) throw new Error("Failed to generate explanation");

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    },
  });

  // 파일 업로드 기반 도슨트 툴
  server.addTool({
    name: "generate_docent_from_file_upload",
    description: "Generates a docent-style explanation from an uploaded image file.",
    parameters: z.object({
      filePath: z.string().describe("Path to the uploaded image file on the server"),
    }),
    execute: async (args, { reportProgress }) => {
      const fileBuffer = await fs.readFile(args.filePath);
      const base64Image = fileBuffer.toString("base64");
      const ext = path.extname(args.filePath).slice(1); 

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please describe this image in detail like a museum docent.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/${ext};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      });

      const text = response.choices[0]?.message?.content?.trim();
      if (!text) throw new Error("Failed to generate explanation");

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    },
  });
}
