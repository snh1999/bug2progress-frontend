# bug2progress - Frontend

Frontend for a Bug Tracker application built with Next.js, featuring multiple ticket views, project management, and
role-based access control.

| Project Home                                                                                                                  | Homepage (dark mode)                                                                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| <img width="1871" alt="project-home" src="https://github.com/user-attachments/assets/aca72c71-c365-494f-8b93-fdcf7ded1a11" /> | <img width="1875" alt="homepage-dark" src="https://github.com/user-attachments/assets/3b841452-997a-4a21-b3d7-abd91b8a560f" />|

## 🚀 Getting Started
Prerequisites
1. Node.js (v20+), npm (pnpm and docker for backend)
2. Backend API running (see [backend repository](http://github.com/snh1999/bug2progress))

3. 
```bash
# Clone the repository
git clone https://github.com/yourusername/bugtracker-frontend.git
cd bugtracker-frontend

# Install dependencies
npm install
```

4. Environment Setup: create a `.env`/`.env.local` file or rename the `.env.example` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```
Note: reflect any modification to the backend API URL in the `.env` file.

5. Start the development server:
```bash
npm run dev
```
other scripts
```bash
npm run build # Build for production
npm run start # Start production server
npm run lint  # Run ESLint
```

6. Open your browser and navigate to http://localhost:3000



### ✨ Features
#### 🎯 Core Functionality
- [x] Authentication and Authorization
- [x] **Project**
  - [x] Project dashboards page
  - [x] Project creation, editing, and deletion (with role based permissions)
  - [ ] Project Analytics
  - [ ] Project Discussions (post and comment)
- [x] **Contributor**
  - [x] Contributor joining with invite code
  - [ ] Contributor invitation
  - [ ] Contributor Management
    - [x] Contributor Role update 
    - [ ] Contributor Removal
- [x] Features Management (for better structure, ticket organization)
  - [x] Feature creation, updating, deleting
  - [x] Feature page
  - [ ] Feature Analytics
  - [ ] Feature History
- [x] **Tickets**
  - [x] Ticket creation, updating, and deletion
  - [x] Ticket details page
    - [x] Ticket filtering (by properties)
    - [ ] Filter by multiple value of same property
    - [ ] Text Search
  - [x] Ticket comments/discussions
  - [ ] Ticket history
  - [x] Ticket Views
    - [x] List View
    - [x] Kanban View
    - [x] Calendar View
- [ ] Super user (site admin)
- [ ] **User**
  - [ ] User profile update
  - [ ] User password update
  - [ ] User deletion
  - [ ] User Profile Page

### 🔄 Planned Features
- [ ] Rich text editor for description
- [ ] Comment endpoints integration and view
- [ ] Pagination for tickets
- [ ] Progressive data loading
- [ ] Real time Updates
- [ ] Image upload (preferably using s3/localstack or cloudinary)
- [ ] User profile management


#### 🎨 UI/UX Highlights
- [x] Responsive Design
- [x] Dark/Light Mode
- [x] Real-time form validation with helpful error messages
- [x] Clean sidebar navigation with project switching and easy to access relevant features
- [x] Optimistic updates and smooth user interactions
  - [x] Visual clue for each operation (e.g., success or error toast or loading state)


### 🛠️ Libraries used

- Framework: Next.js (v15 with App Router)
- Language: TypeScript (< v5.8)
- Styling: Tailwind CSS (v3)
- UI Components: shadcn (v2), react-big-calendar(v1), react-day-picker (v8)
- HTTP Requests: Axios(v1) + Tanstack Query(v5)
- Form Handling: React Hook Form (v7) + Zod (v3)
- Helpers: Date-fns (v3), nuqs (v2), jose (v5)


### 📁 Project Structure

```bash
src/
├── api/                    # API call and type related files (grouped by directory)
│   ├── auth/   
│   │   ├── auth.ts         # Hooks for Api calls
│   │   ├── auth.types.ts   # Relevant response types and dto (from backend)
│   ├── features/          
│   ├── posts/              # only contains types for posts           
│   ├── projects/                    
│   └── tickets/             
│  
├── app/                   # Next.js App Router
│   ├── (home)/
│   │   ├── page.tsx  
│   │   └── layout.tsx  
│   ├── (auth)/            # Authentication routes/pages
│   │   ├── login/
│   │   └── register/
│   ├── projects/                 # Main application routes (all subfolders contain page.tsx)
│   │   └── [projectId]/
│   │      ├── contributors/     # Project contributors view 
│   │      ├── features/
│   │      │   └── [featureId]/ 
│   │      ├── settings/         # update project, invite code, ownership 
│   │      └── tickets/ 
│   │         └──[ticketId]/ 
│   ├── globals.css        
│   ├── layout.tsx         
│   └── page.tsx           
│  
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Login and register form cards
│   ├── common/           # Header, Theme. Form/Input component wrappers, Card view, Text Avatar, Loading component 
│   ├── contributors/             
│   ├── features/         # create and update feature form| features view              
│   ├── projects/         # Create, update, view and switch projects
│   └── tickets/          # Ticket views (table, kanban, calendar), create, view, update tickets
│  
├── lib/                   # Utilities and configurations    # App constants
├── hooks/                 # Custom React hooks
│   ├── use-mobile.tsx 
│   ├── useConfirm.ts       # confirmation modal
│   ├── useModal.ts    
│   ├── useFeatureId.ts     # extract feature id from url
│   ├── useProjectId.ts     
│   ├── useTicketId.ts      
│   └── useTicketFilters.ts # ticket filters data      
├── app.constants.ts
└── middleware.ts
```

### 🔐 Application Flow

#### Authentication
| Login Page (dark mode) | Register Page |
|------------------------|---------------|
| <img width="1875" alt="Image" src="https://github.com/user-attachments/assets/c48b7fe1-0e4c-4060-bfc7-31c7daa1f371" />| <img width="1875" alt="Image" src="https://github.com/user-attachments/assets/9f9c0b1a-795b-446b-8a5d-3380248b4f37" />| 

- Login/Register: Users authenticate through dedicated forms (successful register redirects to `/login` page)
- JWT Storage: Tokens stored securely in httpOnly cookies, localStorage
- Route Protection: Private routes redirect unauthenticated users (using middleware)
- Logout: token removal and redirect to login

#### Projects
Users get redirected to home page (`/`) after login.

<img width="1875" alt="no project home" src="https://github.com/user-attachments/assets/7e40d633-8948-47dc-9a25-788d86f71067" />

Initially, there is no project, so the user has to create one or join via invite code

| join project | Create project |
|--------------|----------------|
| <img width="1503"  alt="join project" src="https://github.com/user-attachments/assets/29f65175-c3b0-4cbc-a1d7-91cc19dd6724" />| <img width="1505"  alt="create project" src="https://github.com/user-attachments/assets/60f38185-706c-4085-b74a-1e36ff79368d" />| 

Already existing users will see the project list.
<img width="1871" alt="homepage" src="https://github.com/user-attachments/assets/a4d88a71-2f7d-4cda-85c6-92cfe1a58d73" />


Joining/creating a project redirects to the project dashboard, where the user can create tickets and features. The sidebar contains the project and features list and a switcher to switch between projects.
<img width="1869" alt="empty project" src="https://github.com/user-attachments/assets/ee6db0d8-b7d9-4c90-86af-7d64770576ad" />

Users can add new tickets and features to the project.

| Create Ticket                                                                                                                  | Create Feature |
|--------------------------------------------------------------------------------------------------------------------------------|----------------|
| <img width="958"  alt="create ticket" src="https://github.com/user-attachments/assets/1ef1dc41-8be4-44eb-86f4-2652392f2f30" /> | <img width="958"  alt="create feature" src="https://github.com/user-attachments/assets/1a165da7-4571-4404-a849-4607baed0f21" />| 

Older projects will view existing tickets, contributors and features.
<img width="1871" alt="project-home" src="https://github.com/user-attachments/assets/aca72c71-c365-494f-8b93-fdcf7ded1a11" />

Settings tab (`projects/:id/settings`) allows users to update project details, invite contributors, and change ownership.
<img width="1868" alt="Image" src="https://github.com/user-attachments/assets/580da61b-4b3c-4da6-afe7-9f9b784bef82" />

Tickets tab (`projects/:id/tickets`) of features page (`projects/:ifeatures/:id`) allows users to view all tickets associated (features page filter by relevant feature id).

There exists three distinct ticket views switchable from tabs:
- ListView: Traditional table format with sorting and filtering
  <img width="1871" alt="table-view" src="https://github.com/user-attachments/assets/22a15d47-4be8-425d-b9fc-c8ffd6e92639" />
- KanbanBoard: Drag-and-drop interface with status columns
  <img width="1871" alt="kanban-view" src="https://github.com/user-attachments/assets/bf03f035-1a31-465a-8f93-5e117a926dde" />
- CalendarView: Timeline view for deadline management
  <img width="1871"  alt="calendar-view" src="https://github.com/user-attachments/assets/aef96f95-c163-4361-97f0-0376f0e12ead" />

Individual ticket view (`projects/:id/tickets/:id`) allows users to view and update tickets.
<img width="1875" alt="ticket-view" src="https://github.com/user-attachments/assets/36eb7b18-67b5-4a53-b7b6-f82bc540b797" />

#### Responsive Design




#### 🤝 API
For complete API documentation, see the [bug2progress backend repository](https://github.com/snh1999/bug2progress).

## 📱 Browser Support

Tested on Ungoogled Chromium, Firefox and brave browser.



