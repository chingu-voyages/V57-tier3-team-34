# API Management Structure

A clean, organized API management system using Axios with TypeScript support.

## 📁 Folder Structure

```
src/api/
├── config/
│   └── apiClient.ts      # Axios configuration
├── services/
│   ├── userService.ts    # User authentication
│   ├── electionService.ts # Elections and voting
│   └── dashboardService.ts # Dashboard data
├── types/
│   └── index.ts          # TypeScript type definitions
├── hooks/
│   └── useAuth.ts        # React authentication hook
├── utils/
│   └── apiUtils.ts       # API utility functions
├── index.ts              # Export everything
└── README.md             # This file
```

## 🚀 How to Use

### 1. Import what you need

```typescript
import { userService, electionService, useAuth, apiUtils } from '../api';
import type { User, Election, VoteData } from '../api';
```

### 2. Basic API calls with TypeScript

```typescript
// Register a voter (typed)
const response: AuthResponse = await userService.registerVoter({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Get elections (typed)
const elections: Election[] = await electionService.getActiveElections();

// Initiate a vote using your specific endpoint
await electionService.initiateVote({
  candidateId: '123',
  electionId: '456'
});
```

### 3. Using React Hooks

```typescript
import { useAuth } from '../api';

function VotingComponent() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <button onClick={handleLogin}>Login</button>;
  
  return <div>Welcome, {user?.name}!</div>;
}
```

### 4. Error handling with utilities

```typescript
import { electionService, apiUtils } from '../api';

try {
  await electionService.initiateVote({ candidateId: '123', electionId: '456' });
} catch (error) {
  if (apiUtils.isAuthError(error)) {
    console.log('Please login first');
  } else if (apiUtils.isNetworkError(error)) {
    console.log('Check your internet connection');
  } else {
    console.log('Error:', apiUtils.formatError(error));
  }
}
```

## 📋 Available Services

### userService
- `registerVoter(userData: RegisterData): Promise<AuthResponse>`
- `login(credentials: LoginCredentials): Promise<AuthResponse>`
- `logout(): Promise<void>`
- `getProfile(): Promise<User>`
- `updateProfile(userData: Partial<User>): Promise<User>`

### electionService
- `getElections(params?: any): Promise<Election[]>`
- `getActiveElections(): Promise<Election[]>`
- `getElection(id: string): Promise<Election>`
- `createElection(data: Partial<Election>): Promise<Election>`
- `getCandidates(params?: any): Promise<Candidate[]>`
- `getElectionCandidates(electionId: string): Promise<Candidate[]>`
- `createCandidate(data: Partial<Candidate>): Promise<Candidate>`
- `initiateVote(voteData: VoteData): Promise<any>` ⭐ **Your specific endpoint**
- `castVote(voteData: VoteData): Promise<Vote>` (alternative)
- `getUserVotes(): Promise<Vote[]>`
- `hasUserVoted(electionId: string): Promise<boolean>`
- `getElectionResults(electionId: string): Promise<ElectionResults>`

### dashboardService
- `getDashboardStats(): Promise<DashboardStats>`
- `getRecentActivity(): Promise<any[]>`
- `getVotingTrends(timeframe: string): Promise<any[]>`
- `getPopularCandidates(limit: number): Promise<any[]>`
- `getPartyDistribution(): Promise<any[]>`

## 🎣 Available Hooks

### useAuth()
Returns: `{ user, isAuthenticated, isLoading, error, login, register, logout, clearError }`

## 🛠️ Available Utils

### apiUtils
- `formatError(error): string` - Get clean error message
- `isAuthError(error): boolean` - Check if 401/403 error
- `isNetworkError(error): boolean` - Check if network error
- `isServerError(error): boolean` - Check if 5xx error
- `isClientError(error): boolean` - Check if 4xx error
- `createQueryString(params): string` - Build query string
- `createFormData(file, data): FormData` - Build form data for uploads
- `retryWithBackoff(fn, retries, delay): Promise<T>` - Retry failed requests
- `debounce(fn, wait): Function` - Debounce API calls

## ✨ Key Features

- **Full TypeScript Support** - All API calls are type-safe
- **Automatic Authentication** - JWT tokens handled automatically
- **React Hooks** - Easy state management with useAuth
- **Error Utilities** - Consistent error handling helpers
- **Custom Endpoints** - Supports your `/vote/initiate-vote` endpoint
- **Retry Logic** - Built-in retry with exponential backoff
- **Clean API** - Simple, predictable interface

## 🔧 Configuration

Set your API URL in `.env`:
```env
VITE_API_URL=http://localhost:3000
```

The API client will automatically:
- Add auth tokens to requests
- Handle 401 errors by clearing tokens
- Provide consistent error formatting
- Support query parameters and form data

## 🎯 Migration Example

**Before (raw fetch):**
```javascript
const response = await fetch(`${API_URL}/vote/initiate-vote`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ candidateId, electionId })
});
```

**After (typed API):**
```typescript
const response = await electionService.initiateVote({
  candidateId,
  electionId
});
```

Much cleaner and type-safe! 🎉