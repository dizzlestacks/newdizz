FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.26.1

WORKDIR /app

COPY package.json ./
COPY artifacts/dizzlestacks/package.json ./artifacts/dizzlestacks/package.json
COPY attached_assets ./attached_assets
COPY artifacts/dizzlestacks ./artifacts/dizzlestacks
COPY tsconfig.json ./tsconfig.json

# Minimal workspace — exact catalog versions, no Replit NixOS binary exclusions
RUN cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "artifacts/dizzlestacks"

catalog:
  '@replit/vite-plugin-cartographer': ^0.5.1
  '@replit/vite-plugin-dev-banner': ^0.1.1
  '@replit/vite-plugin-runtime-error-modal': ^0.0.6
  '@tailwindcss/vite': ^4.1.14
  '@tanstack/react-query': ^5.90.21
  '@types/node': ^25.3.3
  '@types/react': ^19.2.0
  '@types/react-dom': ^19.2.0
  '@vitejs/plugin-react': ^5.0.4
  class-variance-authority: ^0.7.1
  clsx: ^2.1.1
  framer-motion: ^12.23.24
  lucide-react: ^0.545.0
  react: 19.1.0
  react-dom: 19.1.0
  tailwind-merge: ^3.3.1
  tailwindcss: ^4.1.14
  vite: ^7.3.2
  wouter: ^3.3.5
  zod: ^3.25.76

autoInstallPeers: false

onlyBuiltDependencies:
  - esbuild
EOF

RUN pnpm install --no-frozen-lockfile --filter @workspace/dizzlestacks

ENV PORT=3000
ENV BASE_PATH=/
ENV NODE_ENV=production

RUN pnpm --filter @workspace/dizzlestacks run build

FROM nginx:alpine

COPY --from=builder /app/artifacts/dizzlestacks/dist/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
