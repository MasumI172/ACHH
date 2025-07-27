# Custom Domain Setup for Arabian Coast Holiday Homes

## Your Current Setup:
- Website: Arabian Coast Holiday Homes (luxury property rental)
- Domain Provider: mywebb
- Hosting: Replit Deployments
- Features: WhatsApp booking, Hostex calendar sync, luxury galleries

## Domain Configuration Steps:

### Step 1: Get Your Replit Deployment URL
1. Check your Replit deployment dashboard
2. Note your current .replit.app URL
3. Locate "Custom Domain" settings in deployment

### Step 2: DNS Configuration at mywebb
Required DNS records to add in mywebb control panel:

**A Record:**
- Name: @ (root domain)
- Value: [Replit IP address]
- TTL: 300

**CNAME Record:**
- Name: www
- Value: [your-deployment].replit.app
- TTL: 300

### Step 3: Verify Domain in Replit
1. Add domain in Replit deployment settings
2. Wait for SSL certificate generation
3. Test domain connectivity

## Domain Propagation:
- Time: 15 minutes to 24 hours
- Check: Multiple locations worldwide
- SSL: Automatic via Replit

## Post-Setup:
- Update WhatsApp links with new domain
- Test all booking functionality
- Verify calendar integration works on custom domain