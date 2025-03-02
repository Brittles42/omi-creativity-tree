# 🌳 Creativity Tree - OMI Integration

An interactive, real-time visualization of ideas and conversations captured through OMI, with seamless transitions between web and VR experiences.

## 🚀 Getting Started

### Environment Variables

```bash
# Required for NextAuth.js
NEXTAUTH_URL=https://your-domain.com        # In development: http://localhost:3000
NEXTAUTH_SECRET=your-secret-key             # Generate a secure random string

# OMI Integration (After registering app)
OMI_CLIENT_ID=your-omi-client-id           # From OMI App Store
OMI_CLIENT_SECRET=your-omi-client-secret   # From OMI App Store
OMI_AUTH_URL=https://omi-auth-url          # OMI authentication endpoint

# Development Only (remove in production)
TEST_USERNAME=test                          # Temporary test login
TEST_PASSWORD=test                          # Temporary test login
```

### OMI Integration Steps

1. **Register Your App**
   - Go to OMI App Store
   - Click "Create New App"
   - Fill in app details:
     - Name: "Creativity Tree"
     - Description: "Visualize your ideas in a magical 3D tree"
     - Redirect URIs: 
       - Development: `http://localhost:3000/api/auth/callback/omi`
       - Production: `https://your-domain.com/api/auth/callback/omi`

2. **Get Credentials**
   - Save your Client ID and Client Secret
   - Add them to your environment variables

3. **Deploy Your App**
   - Deploy to Vercel or your preferred platform
   - Set all environment variables in your deployment platform
   - Update the OMI App Store with your production URL

4. **Launch Process**
   - Test thoroughly in development
   - Submit for OMI review
   - Once approved, your app will appear in the OMI App Store

## 📋 Project Phases

### Phase 1: Core Web Implementation
- [ ] **Frontend Setup**
  - Next.js + Three.js setup
  - Basic 3D tree visualization
  - Responsive design
  - Real-time updates

- [ ] **Backend Infrastructure**
  - Neo4j database setup
  - API routes
  - WebSocket for real-time
  - Data models

- [ ] **OMI Integration**
  - Authentication flow
  - Webhook endpoints
  - Real-time data sync
  - ThinkPad integration

### Phase 2: Features & Modes
- [ ] **User Modes**
  - Normal Mode (Beautiful visualization)
  - Pro Mode (Advanced features)
  - Developer Mode (Technical tools)

- [ ] **Interaction Features**
  - Voice commands
  - Drag & drop
  - Branch manipulation
  - Real-time collaboration

- [ ] **Data Features**
  - Search & filter
  - Tags & categories
  - Export/import
  - Sharing capabilities

### Phase 3: VR Implementation
- [ ] **WebXR Support**
  - VR mode toggle
  - VR controls
  - Performance optimization
  - Cross-device testing

- [ ] **Unity Integration**
  - Data sync with web version
  - Enhanced VR features
  - Custom interactions
  - Advanced visualization

## 🏗 Technical Architecture

### Frontend
```
Web Client (Next.js)
├── Three.js (3D Visualization)
├── WebXR (VR Support)
└── Real-time Updates (WebSocket)
```

### Backend
```
API Layer (Next.js API Routes)
├── Authentication
├── Data Processing
└── WebSocket Server
```

### Database
```
Neo4j
├── Graph Structure
├── Real-time Updates
└── Caching Layer
```

## 🔐 Security Implementation
- OMI Authentication
- JWT tokens
- Rate limiting
- Data encryption
- SSL/TLS
- API security

## 🔄 Integration Points
- OMI API
- Neo4j Aura
- Unity WebGL
- WebXR Devices

## 📈 Scaling Strategy
- CDN for assets
- Database optimization
- Caching layers
- Load balancing
- Usage monitoring

## 🚀 Deployment
- Frontend: Vercel
- Database: Neo4j Aura
- Assets: CDN
- Monitoring: TBD

## 💻 Development Setup
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Run development server

## 🔄 Update Process
This README will be updated as:
- New features are added
- Architecture changes
- Integration points expand
- Scaling needs evolve

## 🎯 Current Focus
Phase 1: Core Web Implementation
- Setting up basic infrastructure
- Implementing core visualization
- Establishing OMI connection
