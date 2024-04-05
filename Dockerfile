# Rust 构建阶段
FROM rust:latest as rust-builder
WORKDIR /usr/src/myapp

# 复制Rust项目并构建
COPY ./blogserver ./blogserver
WORKDIR /usr/src/myapp/blogserver
RUN cargo build --release

# Svelte 构建阶段
FROM node:lts-alpine as svelte-builder
WORKDIR /app

# 复制Svelte项目文件并安装依赖
COPY ./myblog/package*.json ./
RUN npm install && npm cache clean --force

# 复制其余的Svelte项目文件并构建项目
COPY ./myblog .
RUN npm run build

# 运行阶段
FROM oven/bun:alpine
WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=svelte-builder /app/build ./build
COPY --from=svelte-builder /app/package.json ./package.json
COPY --from=svelte-builder /app/package-lock.json ./package-lock.json
RUN bun install --frozen-lockfile

# 从Rust构建阶段复制编译好的二进制文件
COPY --from=rust-builder /usr/src/myapp/blogserver/target/release/blogserver ./blogserver

# 设置环境变量
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8000

# 启动命令
CMD ["sh", "-c", "./blogserver & bun run ./build/index.js"]
