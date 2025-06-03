import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "unplugin-vue-components/vite";
import myComponentsResolver from "./src/myComponents";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/hy-ui", // 配置别名，为了和服务器别名对应
  plugins: [
    uni(),
    // 打包体积分析
    visualizer({
      open: false,
      filename: "visualizer.html", //分析图生成的文件名
    }),
    // Components({
    //   resolvers: [
    //     myComponentsResolver, // 添加自定义解析器
    //   ],
    // }),
  ],
  server: {
    port: 8888,
  },
  build: {
    target: "esnext",
    // 开启minimize选项来进行代码压缩
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // 开启chunk大小警告
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "hy-app/theme.scss"',
      },
    },
  },
});
