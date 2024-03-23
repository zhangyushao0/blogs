# Rust 构建阶段
FROM rust:latest as rust-builder
WORKDIR /usr/src/myapp

COPY ./blogserver ./blogserver

WORKDIR /usr/src/myapp/blogserver
RUN cargo build --release

FROM node
WORKDIR /app
COPY ./myblog/package*.json ./
RUN npm install && npm cache clean --force
COPY ./myblog .
RUN npm run build

# 从 Rust 构建阶段复制编译好的二进制文件
COPY --from=rust-builder /usr/src/myapp/blogserver/target/release/blogserver ./blogserver
RUN chmod +x ./blogserver

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8000

CMD ["sh", "-c", "node build & ./blogserver"]