import { BasePlugin } from "./BasePlugin";
import { Server } from "http";

export class ProductionPluginRunner {
  pluginPort: number;

  plugin: BasePlugin;
  server: Server;

  constructor(plugin: BasePlugin) {
    this.plugin = plugin;
  }

  // Start a server serving the plugin app
  // A port can be provided to run the server on it
  start(port?: number) {

    const pluginPort = process.env.PLUGIN_PORT;
    this.pluginPort = pluginPort ? parseInt(pluginPort) : 8080;
    
    const serverPort = port ? port : this.pluginPort;

    this.server = this.plugin.app.listen(serverPort, () =>
      this.plugin.logger.info("Plugin started, listening at " + serverPort)
    );
  }
}
