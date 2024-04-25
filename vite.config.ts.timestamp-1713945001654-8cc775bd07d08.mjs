// vite.config.ts
import "file:///C:/Users/jules_faubourg/Desktop/M1/Cours/WorkAdventure-git/node_modules/dotenv/config.js";
import { defineConfig } from "file:///C:/Users/jules_faubourg/Desktop/M1/Cours/WorkAdventure-git/node_modules/vite/dist/node/index.js";
import { getMaps, getMapsOptimizers, getMapsScripts, LogLevel } from "file:///C:/Users/jules_faubourg/Desktop/M1/Cours/WorkAdventure-git/node_modules/wa-map-optimizer-vite/dist/index.js";
var maps = getMaps();
var optimizerOptions = {
  logs: process.env.LOG_LEVEL && process.env.LOG_LEVEL in LogLevel ? LogLevel[process.env.LOG_LEVEL] : LogLevel.NORMAL
};
if (process.env.TILESET_OPTIMIZATION && process.env.TILESET_OPTIMIZATION === "true") {
  const qualityMin = process.env.TILESET_OPTIMIZATION_QUALITY_MIN ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MIN) : 0.9;
  const qualityMax = process.env.TILESET_OPTIMIZATION_QUALITY_MAX ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MAX) : 1;
  optimizerOptions.output = {
    tileset: {
      compress: {
        quality: [qualityMin, qualityMax]
      }
    }
  };
}
var vite_config_default = defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        radio: "./radio.html",
        ...getMapsScripts(maps)
      }
    }
  },
  plugins: [...getMapsOptimizers(maps, optimizerOptions)],
  server: {
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    },
    open: "/"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqdWxlc19mYXVib3VyZ1xcXFxEZXNrdG9wXFxcXE0xXFxcXENvdXJzXFxcXFdvcmtBZHZlbnR1cmUtZ2l0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqdWxlc19mYXVib3VyZ1xcXFxEZXNrdG9wXFxcXE0xXFxcXENvdXJzXFxcXFdvcmtBZHZlbnR1cmUtZ2l0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9qdWxlc19mYXVib3VyZy9EZXNrdG9wL00xL0NvdXJzL1dvcmtBZHZlbnR1cmUtZ2l0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0ICdkb3RlbnYvY29uZmlnJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgZ2V0TWFwcywgZ2V0TWFwc09wdGltaXplcnMsIGdldE1hcHNTY3JpcHRzLCBMb2dMZXZlbCwgT3B0aW1pemVPcHRpb25zIH0gZnJvbSBcIndhLW1hcC1vcHRpbWl6ZXItdml0ZVwiO1xyXG5cclxuY29uc3QgbWFwcyA9IGdldE1hcHMoKTtcclxuXHJcbmxldCBvcHRpbWl6ZXJPcHRpb25zOiBPcHRpbWl6ZU9wdGlvbnMgPSB7XHJcbiAgICBsb2dzOiBwcm9jZXNzLmVudi5MT0dfTEVWRUwgJiYgcHJvY2Vzcy5lbnYuTE9HX0xFVkVMIGluIExvZ0xldmVsID8gTG9nTGV2ZWxbcHJvY2Vzcy5lbnYuTE9HX0xFVkVMXSA6IExvZ0xldmVsLk5PUk1BTCxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5USUxFU0VUX09QVElNSVpBVElPTiAmJiBwcm9jZXNzLmVudi5USUxFU0VUX09QVElNSVpBVElPTiA9PT0gXCJ0cnVlXCIpIHtcclxuICAgIGNvbnN0IHF1YWxpdHlNaW4gPSBwcm9jZXNzLmVudi5USUxFU0VUX09QVElNSVpBVElPTl9RVUFMSVRZX01JTiA/IHBhcnNlSW50KHByb2Nlc3MuZW52LlRJTEVTRVRfT1BUSU1JWkFUSU9OX1FVQUxJVFlfTUlOKSA6IDAuOTtcclxuICAgIGNvbnN0IHF1YWxpdHlNYXggPSBwcm9jZXNzLmVudi5USUxFU0VUX09QVElNSVpBVElPTl9RVUFMSVRZX01BWCA/IHBhcnNlSW50KHByb2Nlc3MuZW52LlRJTEVTRVRfT1BUSU1JWkFUSU9OX1FVQUxJVFlfTUFYKSA6IDE7XHJcblxyXG4gICAgb3B0aW1pemVyT3B0aW9ucy5vdXRwdXQgPSB7XHJcbiAgICAgICAgdGlsZXNldDoge1xyXG4gICAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICAgICAgcXVhbGl0eTogW3F1YWxpdHlNaW4sIHF1YWxpdHlNYXhdLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogXCIuL1wiLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogXCIuL2luZGV4Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIHJhZGlvOiBcIi4vcmFkaW8uaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgLi4uZ2V0TWFwc1NjcmlwdHMobWFwcyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbLi4uZ2V0TWFwc09wdGltaXplcnMobWFwcywgb3B0aW1pemVyT3B0aW9ucyldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBQQVRDSCwgT1BUSU9OU1wiLFxyXG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCJYLVJlcXVlc3RlZC1XaXRoLCBjb250ZW50LXR5cGUsIEF1dGhvcml6YXRpb25cIixcclxuICAgICAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wZW46IFwiL1wiLFxyXG4gICAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFcsT0FBTztBQUNyWCxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFNBQVMsbUJBQW1CLGdCQUFnQixnQkFBaUM7QUFFdEYsSUFBTSxPQUFPLFFBQVE7QUFFckIsSUFBSSxtQkFBb0M7QUFBQSxFQUNwQyxNQUFNLFFBQVEsSUFBSSxhQUFhLFFBQVEsSUFBSSxhQUFhLFdBQVcsU0FBUyxRQUFRLElBQUksU0FBUyxJQUFJLFNBQVM7QUFDbEg7QUFFQSxJQUFJLFFBQVEsSUFBSSx3QkFBd0IsUUFBUSxJQUFJLHlCQUF5QixRQUFRO0FBQ2pGLFFBQU0sYUFBYSxRQUFRLElBQUksbUNBQW1DLFNBQVMsUUFBUSxJQUFJLGdDQUFnQyxJQUFJO0FBQzNILFFBQU0sYUFBYSxRQUFRLElBQUksbUNBQW1DLFNBQVMsUUFBUSxJQUFJLGdDQUFnQyxJQUFJO0FBRTNILG1CQUFpQixTQUFTO0FBQUEsSUFDdEIsU0FBUztBQUFBLE1BQ0wsVUFBVTtBQUFBLFFBQ04sU0FBUyxDQUFDLFlBQVksVUFBVTtBQUFBLE1BQ3BDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNILE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEdBQUcsZUFBZSxJQUFJO0FBQUEsTUFDMUI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUyxDQUFDLEdBQUcsa0JBQWtCLE1BQU0sZ0JBQWdCLENBQUM7QUFBQSxFQUN0RCxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDTCwrQkFBK0I7QUFBQSxNQUMvQixnQ0FBZ0M7QUFBQSxNQUNoQyxnQ0FBZ0M7QUFBQSxNQUNoQyxpQkFBaUI7QUFBQSxJQUNyQjtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1Y7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
