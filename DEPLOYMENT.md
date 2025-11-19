# Production Deployment Guide

## Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- Production server (VPS, AWS, Heroku, etc.)

## Server Deployment

### 1. Environment Setup
```bash
cd server
cp .env.example .env
# Edit .env with your production values
```

### 2. Install Dependencies
```bash
npm install --production
```

### 3. Build (if needed)
```bash
# No build step required for Node.js server
```

### 4. Start with PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start server.js --name "chat-server"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### 5. Using systemd (Alternative)
Create a service file: `/etc/systemd/system/chat-server.service`
```ini
[Unit]
Description=Chat Server
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/server
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable chat-server
sudo systemctl start chat-server
```

## Client Deployment

### 1. Environment Setup
```bash
cd client
cp .env.example .env.production
# Edit .env.production with your production API URLs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### 4. Deploy Static Files

#### Option A: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option B: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option C: Traditional Web Server (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy Socket.io connections
    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL/HTTPS Setup (Recommended)

### Using Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Health Checks

### Server Health Endpoint
The server has a root endpoint for health checks:
```bash
curl http://localhost:5000/
# Should return: "Socket.io Chat Server is running"
```

### Monitoring
Set up monitoring with:
- **PM2**: `pm2 monit`
- **New Relic**: Application performance monitoring
- **Sentry**: Error tracking
- **Datadog**: Infrastructure monitoring

## Security Checklist

- [ ] Set strong JWT_SECRET if using authentication
- [ ] Enable CORS only for your domain
- [ ] Use HTTPS in production
- [ ] Set proper file upload limits
- [ ] Sanitize user inputs
- [ ] Rate limit API endpoints
- [ ] Use helmet.js for security headers
- [ ] Keep dependencies updated
- [ ] Set up firewall rules
- [ ] Regular security audits

## Performance Optimization

### Server
- Use Redis for session storage
- Implement rate limiting
- Enable gzip compression
- Use CDN for static files
- Database query optimization

### Client
- Enable code splitting
- Lazy load components
- Optimize images
- Use service workers for caching
- Minimize bundle size

## Backup Strategy

### Database Backups
```bash
# If using MongoDB
mongodump --out=/backup/$(date +%Y%m%d)

# If using PostgreSQL
pg_dump dbname > backup_$(date +%Y%m%d).sql
```

### File Uploads Backup
```bash
# Sync uploads folder to S3
aws s3 sync ./uploads s3://your-bucket/uploads
```

## Rollback Plan

### Using PM2
```bash
# List previous versions
pm2 list

# Restart specific version
pm2 restart chat-server@previous
```

### Using Git
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Redeploy
```

## Troubleshooting

### Server not starting
- Check logs: `pm2 logs chat-server`
- Verify port is not in use: `lsof -i :5000`
- Check environment variables
- Verify Node.js version

### Client build fails
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check build logs
- Verify environment variables

### Socket connection issues
- Verify CORS settings
- Check firewall rules
- Ensure WebSocket support
- Test with polling only

## Load Testing

```bash
# Install k6
brew install k6  # macOS
# or
wget https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz

# Run load test
k6 run load-test.js
```

## Scaling

### Horizontal Scaling
- Use Redis adapter for Socket.io
- Load balancer configuration
- Session persistence
- Database replication

### Vertical Scaling
- Increase server resources
- Optimize Node.js memory
- Enable clustering

## Support
For issues, contact: support@example.com
