# Domain Setup: arabiancoastholidayhomes.com

## DNS Records to Add in mywebb Control Panel:

### A Record (Root Domain)
- **Name/Host:** @ 
- **Value/Points to:** 34.132.134.162
- **TTL:** 300

### A Record (www Subdomain)
- **Name/Host:** www
- **Value/Points to:** 34.132.134.162
- **TTL:** 300

### TXT Record (Verification - Get from Replit)
- **Name/Host:** @
- **Value:** replit-user=[verification-string]
- **TTL:** 300

## Step-by-Step Process:

1. **In Replit Deployment Dashboard:**
   - Go to Settings → Domains
   - Click "Link a domain"
   - Enter: arabiancoastholidayhomes.com
   - Copy the TXT verification record provided

2. **In mywebb Control Panel:**
   - Add the A records above
   - Add the TXT record from Replit
   - Save changes

3. **Back in Replit:**
   - Click "Verify Domain"
   - Wait for DNS propagation (15 minutes - 24 hours)

## Result:
Your luxury Arabian Coast Holiday Homes website will be live at:
- https://arabiancoastholidayhomes.com
- https://www.arabiancoastholidayhomes.com

All features working:
- WhatsApp booking (+971 55 816 6062)
- Real-time Hostex calendar sync
- Luxury property galleries
- Mobile-responsive design
- Professional SSL certificate