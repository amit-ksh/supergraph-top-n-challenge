# Build stage
FROM golang:1.21.3-alpine AS builder

WORKDIR /build

# Copy only the necessary files for dependency management
COPY go.mod .
COPY go.sum .

# Download dependencies
RUN go mod download

# Copy the rest of the source code and build the application
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server server.go

# Final stage
FROM alpine:3.14

RUN apk --no-cache add ca-certificates

# Copy the compiled binary from the builder stage
COPY --from=builder /server /bin/

CMD /bin/server
