# Creativity Tree - OMI Integration

## Project Overview
An interactive tree visualization that connects with OMI device for creative idea generation and organization.

## System Requirements
- macOS (newer than 11.7.10)
- At least 20GB free space (for Xcode)
- Internet connection
- Apple ID (for App Store access)
- OMI device for testing

## Development Setup

### 1. Install Required Tools
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Flutter
brew install flutter

# Install Xcode from App Store
# Open App Store and search for Xcode
# After installation, run:
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch

# Install CocoaPods
sudo gem install cocoapods
```

### 2. Clone Repositories
```bash
# Clone our project
git clone <your-repo-url>

# Clone OMI app template
git clone https://github.com/BasedHardware/omi.git omi_app
```

### 3. Project Structure
```
creativity_tree/
├── web/              # Our tree visualization (Next.js)
│   ├── src/         
│   └── public/      
├── omi_app/          # OMI mobile app
│   └── app/         # Flutter app code
└── backend/          # Our backend (Neo4j + Firebase)
```

### 4. Development Setup

#### Web Visualization
```bash
cd web
npm install
npm run dev
```

#### OMI Mobile App
```bash
cd omi_app/app
flutter pub get
cd ios && pod install  # Only for iOS
flutter run --flavor dev
```

## Architecture
1. **Frontend**: Next.js + Three.js for tree visualization
2. **Mobile**: Flutter app with OMI SDK
3. **Backend**: 
   - OMI's backend for device communication
   - Our Neo4j backend for tree data

## Integration Flow
```
[OMI Device] -----> [OMI Backend] -----> [Our Flutter App]
                                             |
                                             |
                                             ↓
[Tree Viz] <----- [Our Backend] <----- [Neo4j + LangChain]
(Web App)         (For Tree Data)      (Process Ideas)
```

## Troubleshooting
- Run `flutter doctor` to check your setup
- Make sure Xcode is fully installed
- Verify OMI device is connected in the app
- Check iOS/Android simulator is running

## Next Steps
1. Complete local setup
2. Test OMI device connection
3. Implement tree visualization
4. Add backend processing
5. Connect all components

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

## Project Structure

```
/omi_hackathon_1/
├── web/                    # Current Next.js tree visualization
│   ├── src/
│   ├── public/
│   └── package.json
│
├── mobile/                 # Flutter OMI app
│   ├── lib/
│   ├── ios/
│   ├── android/
│   └── pubspec.yaml
│
└── backend/               # Shared backend services
    ├── firebase/
    ├── neo4j/
    └── langchain/
```

## Getting Started

### 1. Web Visualization
```bash
cd web
npm install
npm run dev
```

### 2. Mobile App
```bash
cd mobile
flutter pub get
flutter run
```

### 3. Backend
```bash
cd backend
npm install
npm run dev
```

## Development Plan

### Week 1: OMI App Development
- Set up Flutter project structure
- Implement OMI SDK integration
- Build core UI components
- Add authentication flow

### Week 2: Backend Infrastructure
- Configure Firebase
- Set up Neo4j database
- Implement LangChain processing
- Create API endpoints

### Week 3: Integration
- Connect app to backend
- Make tree respond to data
- Add WebView integration
- Implement real-time updates

### Week 4: Polish & Launch
- UI/UX improvements
- Add animations and effects
- Testing and bug fixes
- Documentation and demo prep

## Current Status
- Tree visualization prototype complete
- Planning OMI app integration
- Backend setup pending
