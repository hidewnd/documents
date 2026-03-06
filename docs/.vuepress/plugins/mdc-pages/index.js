const path = require("path");
const fs = require("fs");

/**
 * 将 docs 下所有 .mdc 文件注册为 VuePress 页面，解决 patterns 在部分环境下不生效导致的 404。
 */
module.exports = (options, ctx) => {
  return {
    name: "mdc-additional-pages",
    async additionalPages() {
      const sourceDir = ctx.sourceDir;
      const pages = [];
      const dir = path.join(sourceDir, "07.Cursor", "01.Rules");
      if (!fs.existsSync(dir)) return pages;
      const files = fs.readdirSync(dir);
      for (const name of files) {
        if (!name.endsWith(".mdc")) continue;
        const filePath = path.join(dir, name);
        if (!fs.statSync(filePath).isFile()) continue;
        const slug = name.replace(/\.mdc$/, "");
        const pathRoute = `/07.Cursor/01.Rules/${slug}/`;
        const content = fs.readFileSync(filePath, "utf8");
        pages.push({ path: pathRoute, content });
      }
      return pages;
    },
  };
};
