
import { FastMCP } from "fastmcp";
import { registerDocentTool } from "./tools/registerDocentTool.js";


const server = new FastMCP({
  name: "mcp-docent",
  version: "1.0.0",
});

registerDocentTool(server);

async function main() {
  try {
    await server.start({
      transportType: "stdio",
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
